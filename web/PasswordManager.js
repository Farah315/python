export class PasswordManager {
    constructor() {
        this.passwords = new Map();
        this.users = new Map();
        this.encryptionKey = this.generateEncryptionKey();
        this.loadFromStorage();
    }

    generateEncryptionKey() {
        let key = localStorage.getItem('pm_encryption_key');
        if (!key) {
            key = this.generateRandomString(32);
            localStorage.setItem('pm_encryption_key', key);
        }
        return key;
    }

    generateRandomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    encrypt(text) {
        return btoa(text + this.encryptionKey);
    }

    decrypt(encryptedText) {
        try {
            const decoded = atob(encryptedText);
            return decoded.substring(0, decoded.length - this.encryptionKey.length);
        } catch (e) {
            return encryptedText;
        }
    }

    registerUser(username, password) {
        if (!username || !password) throw new Error('errorFillFields');
        if (this.users.has(username)) throw new Error('errorUserExists');
        this.users.set(username, this.encrypt(password));
        this.saveUsersToStorage();
    }

    validateUser(username, password) {
        const encryptedPassword = this.users.get(username);
        if (!encryptedPassword) return false;
        return this.decrypt(encryptedPassword) === password;
    }

    savePassword(account, password) {
        if (!account || !password) throw new Error('errorRequired');
        if (this.passwords.has(account)) throw new Error('errorExists');
        this.passwords.set(account, this.encrypt(password));
        this.saveToStorage();
        return true;
    }

    updatePassword(oldAccount, newAccount, newPassword) {
        if (!this.passwords.has(oldAccount)) throw new Error('errorNotFound');
        if (oldAccount !== newAccount && this.passwords.has(newAccount)) throw new Error('errorNewExists');
        if (oldAccount !== newAccount) this.passwords.delete(oldAccount);
        this.passwords.set(newAccount, this.encrypt(newPassword));
        this.saveToStorage();
        return true;
    }

    deletePassword(account) {
        if (!this.passwords.has(account)) throw new Error('errorNotFound');
        this.passwords.delete(account);
        this.saveToStorage();
        return true;
    }

    getPassword(account) {
        const encryptedPassword = this.passwords.get(account);
        return encryptedPassword ? this.decrypt(encryptedPassword) : null;
    }

    getAllPasswords() {
        return Array.from(this.passwords.entries()).map(([account, encryptedPassword]) => ({
            account,
            password: this.decrypt(encryptedPassword)
        }));
    }

    searchPasswords(query) {
        return query
            ? this.getAllPasswords().filter(item => item.account.toLowerCase().includes(query.toLowerCase()))
            : this.getAllPasswords();
    }

    saveToStorage() {
        const data = Object.fromEntries(this.passwords);
        localStorage.setItem('pm_passwords', JSON.stringify(data));
    }

    saveUsersToStorage() {
        const data = Object.fromEntries(this.users);
        localStorage.setItem('pm_users', JSON.stringify(data));
    }

    loadFromStorage() {
        try {
            const passwordData = localStorage.getItem('pm_passwords');
            if (passwordData) {
                const parsed = JSON.parse(passwordData);
                for (const [account, encryptedPassword] of Object.entries(parsed)) {
                    this.passwords.set(account, encryptedPassword);
                }
            }
            const userData = localStorage.getItem('pm_users');
            if (userData) {
                const parsed = JSON.parse(userData);
                for (const [username, encryptedPassword] of Object.entries(parsed)) {
                    this.users.set(username, encryptedPassword);
                }
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}