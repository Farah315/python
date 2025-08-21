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
        this.currentLanguage = 'ar';
        this.currentTab = 'generate';
        this.init();
    }

    init() {
        this.uiManager.initUI();
        this.uiManager.updateLanguage(this.currentLanguage);
        this.uiManager.switchTab(this.currentTab);
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('password-length').addEventListener('input', () => {
            document.getElementById('length-value').textContent = document.getElementById('password-length').value;
        });
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        this.uiManager.updateLanguage(lang);
    }

    switchTab(tabId) {
        this.currentTab = tabId;
        this.uiManager.switchTab(tabId);
    }

    generatePassword() {
        this.uiManager.generatePassword();
    }

    copyPassword() {
        this.uiManager.copyPassword();
    }

    saveGeneratedPassword() {
        this.uiManager.saveGeneratedPassword();
    }

    savePassword() {
        this.uiManager.savePassword();
    }

    loadPasswords() {
        this.uiManager.loadPasswords();
    }

    searchPasswords() {
        this.uiManager.searchPasswords();
    }

    loadAccountData() {
        this.uiManager.loadAccountData();
    }

    updatePassword() {
        this.uiManager.updatePassword();
    }

    deletePassword() {
        this.uiManager.deletePassword();
    }

    togglePasswordVisibility(inputId) {
        this.uiManager.togglePasswordVisibility(inputId);
    }
}

const app = new App();
window.app = app;