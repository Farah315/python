import { Translations } from './Translations.js';
import { PasswordManager } from './PasswordManager.js';
import { PasswordGenerator } from './PasswordGenerator.js';
import { UIManager } from './UIManager.js';

class App {
    constructor() {
        this.translations = new Translations();
        this.passwordManager = new PasswordManager();
        this.passwordGenerator = new PasswordGenerator();
        this.uiManager = new UIManager(this.translations, this.passwordManager, this.passwordGenerator);
        this.currentTab = 'generate';
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.showLogin();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('password-length').addEventListener('input', () => {
            document.getElementById('length-value').textContent = document.getElementById('password-length').value;
        });
    }

    login() {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        if (this.passwordManager.validateUser(username, password)) {
            this.isLoggedIn = true;
            this.showApp();
            this.uiManager.initUI();
        } else {
            this.uiManager.showAlert('errorInvalidCredentials', 'error');
        }
    }

    register() {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        try {
            this.passwordManager.registerUser(username, password);
            this.uiManager.showAlert('successRegistered');
            this.showLogin();
        } catch (e) {
            this.uiManager.showAlert(e.message, 'error');
        }
    }

    logout() {
        this.isLoggedIn = false;
        this.showLogin();
    }

    showLogin() {
        document.getElementById('login-page').classList.remove('hidden');
        document.getElementById('register-page').classList.add('hidden');
        document.getElementById('app-page').classList.add('hidden');
    }

    showRegister() {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('register-page').classList.remove('hidden');
        document.getElementById('app-page').classList.add('hidden');
    }

    showApp() {
        if (!this.isLoggedIn) return;
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('register-page').classList.add('hidden');
        document.getElementById('app-page').classList.remove('hidden');
    }

    switchTab(tabId) {
        if (!this.isLoggedIn) return;
        this.currentTab = tabId;
        this.uiManager.switchTab(tabId);
    }

    generatePassword() {
        if (!this.isLoggedIn) return;
        this.uiManager.generatePassword();
    }

    copyPassword() {
        if (!this.isLoggedIn) return;
        this.uiManager.copyPassword();
    }

    saveGeneratedPassword() {
        if (!this.isLoggedIn) return;
        this.uiManager.saveGeneratedPassword();
    }

    savePassword() {
        if (!this.isLoggedIn) return;
        this.uiManager.savePassword();
    }

    loadPasswords() {
        if (!this.isLoggedIn) return;
        this.uiManager.loadPasswords();
    }

    searchPasswords() {
        if (!this.isLoggedIn) return;
        this.uiManager.searchPasswords();
    }

    loadAccountData() {
        if (!this.isLoggedIn) return;
        this.uiManager.loadAccountData();
    }

    updatePassword() {
        if (!this.isLoggedIn) return;
        this.uiManager.updatePassword();
    }

    deletePassword() {
        if (!this.isLoggedIn) return;
        this.uiManager.deletePassword();
    }

    togglePasswordVisibility(inputId) {
        this.uiManager.togglePasswordVisibility(inputId);
    }
}

const app = new App();
window.app = app;