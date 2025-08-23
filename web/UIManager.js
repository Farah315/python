export class UIManager {
    constructor(translations, passwordManager, passwordGenerator) {
        this.translations = translations;
        this.passwordManager = passwordManager;
        this.passwordGenerator = passwordGenerator;
    }

    initUI() {
        this.updateLanguage('en');
        this.switchTab('generate');
        this.loadPasswords();
    }

    updateLanguage(lang) {
        document.documentElement.lang = lang;
        document.body.className = `min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4`;
        const elements = document.querySelectorAll('[id$="-label"], [id$="-btn"], [id$="-title"], [id$="-option"], [id$="-input"]');
        elements.forEach(element => {
            const key = element.id.replace(/-label|-btn|-title|-option|-input/, '');
            element.textContent = this.translations.get(lang, key);
            if (element.tagName === 'INPUT' && element.placeholder) {
                element.placeholder = this.translations.get(lang, `${key}Placeholder`);
            }
        });
    }

    switchTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`#tab-${tabId}`).classList.add('active');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        document.querySelector(`#${tabId}-content`).classList.remove('hidden');
        if (tabId === 'view') this.loadPasswords();
        if (tabId === 'manage') this.loadAccountData();
    }

    showAlert(message, type = 'success') {
        const alerts = document.getElementById('alerts');
        alerts.innerHTML = `<div class="alert-${type}">${this.translations.get('en', message)}</div>`;
        setTimeout(() => alerts.innerHTML = '', 3000);
    }

    generatePassword() {
        try {
            const options = {
                length: parseInt(document.getElementById('password-length').value),
                includeUppercase: document.getElementById('include-uppercase').checked,
                includeLowercase: document.getElementById('include-lowercase').checked,
                includeNumbers: document.getElementById('include-numbers').checked,
                includeSymbols: document.getElementById('include-symbols').checked
            };
            const password = this.passwordGenerator.generate(options);
            const strength = this.passwordGenerator.checkStrength(password);
            document.getElementById('password-output').textContent = password;
            document.getElementById('password-strength-info').innerHTML = 
                `<span class="password-strength ${strength.class}">${this.translations.get('en', 'strengthLabel')} ${this.translations.get('en', strength.text)}</span>`;
            document.getElementById('generated-password').classList.remove('hidden');
        } catch (e) {
            this.showAlert(e.message, 'error');
        }
    }

    copyPassword() {
        const password = document.getElementById('password-output').textContent;
        navigator.clipboard.writeText(password).then(() => {
            this.showAlert('successCopied');
        });
    }

    saveGeneratedPassword() {
        try {
            const account = document.getElementById('generate-account').value;
            const password = document.getElementById('password-output').textContent;
            if (!password) throw new Error('errorFillFields');
            this.passwordManager.savePassword(account || 'Unnamed', password);
            this.showAlert('successSaved');
            document.getElementById('generate-account').value = '';
        } catch (e) {
            this.showAlert(e.message, 'error');
        }
    }

    savePassword() {
        try {
            const account = document.getElementById('save-account').value;
            const password = document.getElementById('save-password').value;
            if (!account || !password) throw new Error('errorFillFields');
            this.passwordManager.savePassword(account, password);
            this.showAlert('successSaved');
            document.getElementById('save-account').value = '';
            document.getElementById('save-password').value = '';
        } catch (e) {
            this.showAlert(e.message, 'error');
        }
    }

    loadPasswords() {
        const passwords = this.passwordManager.getAllPasswords();
        const list = document.getElementById('passwords-list');
        list.innerHTML = passwords.length
            ? passwords.map(item => `
                <div class="password-item">
                    <div class="flex justify-between items-center mb-2">
                        <span class="account-name">${item.account}</span>
                        <button class="btn bg-purple-500 text-white py-1 px-3 rounded-lg hover:bg-purple-600 transition-all" onclick="navigator.clipboard.writeText('${item.password}').then(() => app.showAlert('successCopied'))">${this.translations.get('en', 'copyBtnShort')}</button>
                    </div>
                    <div class="password-display">${item.password}</div>
                </div>`).join('')
            : `<div class="empty-state">${this.translations.get('en', 'noPasswords')}</div>`;
    }

    searchPasswords() {
        const query = document.getElementById('search-input').value;
        const passwords = this.passwordManager.searchPasswords(query);
        const list = document.getElementById('passwords-list');
        list.innerHTML = passwords.length
            ? passwords.map(item => `
                <div class="password-item">
                    <div class="flex justify-between items-center mb-2">
                        <span class="account-name">${item.account}</span>
                        <button class="btn bg-purple-500 text-white py-1 px-3 rounded-lg hover:bg-purple-600 transition-all" onclick="navigator.clipboard.writeText('${item.password}').then(() => app.showAlert('successCopied'))">${this.translations.get('en', 'copyBtnShort')}</button>
                    </div>
                    <div class="password-display">${item.password}</div>
                </div>`).join('')
            : `<div class="empty-state">${this.translations.get('en', 'noResults')}</div>`;
    }

    loadAccountData() {
        const select = document.getElementById('manage-account');
        const accounts = this.passwordManager.getAllPasswords();
        select.innerHTML = `<option value="" id="select-account-option">${this.translations.get('en', 'selectAccountOption')}</option>` +
            accounts.map(item => `<option value="${item.account}">${item.account}</option>`).join('');
        const editForm = document.getElementById('edit-form');
        editForm.classList.add('hidden');
        select.onchange = () => {
            const account = select.value;
            if (account) {
                const password = this.passwordManager.getPassword(account);
                document.getElementById('edit-account').value = account;
                document.getElementById('edit-password').value = password;
                editForm.classList.remove('hidden');
            } else {
                editForm.classList.add('hidden');
            }
        };
    }

    updatePassword() {
        try {
            const oldAccount = document.getElementById('manage-account').value;
            const newAccount = document.getElementById('edit-account').value;
            const newPassword = document.getElementById('edit-password').value;
            if (!oldAccount || !newAccount || !newPassword) throw new Error('errorFillFields');
            this.passwordManager.updatePassword(oldAccount, newAccount, newPassword);
            this.showAlert('successUpdated');
            this.loadAccountData();
        } catch (e) {
            this.showAlert(e.message, 'error');
        }
    }

    deletePassword() {
        const account = document.getElementById('manage-account').value;
        if (!account) {
            this.showAlert('errorAccountRequired', 'error');
            return;
        }
        if (confirm(`${this.translations.get('en', 'confirmDelete')} ${account}?`)) {
            try {
                this.passwordManager.deletePassword(account);
                this.showAlert('successDeleted');
                this.loadAccountData();
            } catch (e) {
                this.showAlert(e.message, 'error');
            }
        }
    }

    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        input.type = input.type === 'password' ? 'text' : 'password';
        const button = input.nextElementSibling;
        if (button && button.tagName === 'BUTTON') {
            button.textContent = input.type === 'password' ? 'Show' : 'Hide';
        }
    }
}