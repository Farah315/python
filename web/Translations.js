export class Translations {
    constructor() {
        this.translations = {
            en: {
                mainTitle: 'Password Manager',
                tabGenerate: 'Generate Password',
                tabSave: 'Save Password',
                tabView: 'View Passwords',
                tabManage: 'Manage Passwords',
                generatorTitle: 'Password Generator',
                lengthLabel: 'Password Length:',
                uppercaseLabel: 'Uppercase Letters (A-Z)',
                lowercaseLabel: 'Lowercase Letters (a-z)',
                numbersLabel: 'Numbers (0-9)',
                symbolsLabel: 'Symbols (!@#$)',
                generateBtn: 'Generate Password',
                generatedLabel: 'Generated Password:',
                copyBtn: 'Copy Password',
                accountOptionalLabel: 'Account Name (Optional):',
                saveGeneratedBtn: 'Save Password',
                saveAccountLabel: 'Account Name:',
                savePasswordLabel: 'Password:',
                toggleSaveBtn: 'Show',
                saveBtn: 'Save Password',
                storedPasswordsTitle: 'Stored Passwords',
                refreshBtn: 'Refresh',
                searchPlaceholder: 'Search passwords...',
                selectAccountLabel: 'Select Account:',
                selectAccountOption: '-- Select Account --',
                newAccountLabel: 'New Account Name:',
                newPasswordLabel: 'New Password:',
                toggleEditBtn: 'Show',
                updateBtn: 'Update Password',
                deleteBtn: 'Delete Password',
                copyBtnShort: 'Copy',
                strengthLabel: 'Password Strength:',
                strengthWeak: 'Weak',
                strengthMedium: 'Medium',
                strengthStrong: 'Strong',
                noPasswords: 'No stored passwords',
                noResults: 'No results found',
                accountPlaceholder: 'e.g., Gmail, Facebook',
                passwordPlaceholder: 'Enter password',
                errorRequired: 'Account name and password are required',
                errorExists: 'This account already exists. Use the edit feature to update it.',
                errorNotFound: 'Account not found',
                errorNewExists: 'New account name already exists',
                errorCharTypes: 'At least one character type must be selected',
                errorAccountRequired: 'Please enter account name',
                errorFillFields: 'Please fill all fields',
                errorInvalidCredentials: 'Invalid username or password',
                errorUserExists: 'Username already exists',
                successSaved: 'Password saved successfully',
                successUpdated: 'Password updated successfully',
                successDeleted: 'Password deleted successfully',
                successCopied: 'Password copied to clipboard',
                successRegistered: 'Registered successfully',
                confirmDelete: 'Are you sure you want to delete password for'
            }
        };
    }

    get(lang, key) {
        return this.translations[lang][key] || key;
    }
}