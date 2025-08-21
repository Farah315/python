export class PasswordGenerator {
    constructor() {
        this.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.lowercase = 'abcdefghijklmnopqrstuvwxyz';
        this.numbers = '0123456789';
        this.symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    generate({ length = 16, includeUppercase = true, includeLowercase = true, includeNumbers = true, includeSymbols = true }) {
        let characters = '';
        let mandatoryChars = [];

        if (includeUppercase) {
            characters += this.uppercase;
            mandatoryChars.push(this.getRandomChar(this.uppercase));
        }
        if (includeLowercase) {
            characters += this.lowercase;
            mandatoryChars.push(this.getRandomChar(this.lowercase));
        }
        if (includeNumbers) {
            characters += this.numbers;
            mandatoryChars.push(this.getRandomChar(this.numbers));
        }
        if (includeSymbols) {
            characters += this.symbols;
            mandatoryChars.push(this.getRandomChar(this.symbols));
        }

        if (!characters) throw new Error('errorCharTypes');

        let password = mandatoryChars.join('');
        for (let i = password.length; i < length; i++) {
            password += this.getRandomChar(characters);
        }
        return this.shuffleString(password);
    }

    getRandomChar(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    }

    shuffleString(str) {
        return str.split('').sort(() => Math.random() - 0.5).join('');
    }

    checkStrength(password) {
        let score = 0;
        const checks = {
            length: password.length >= 12,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)
        };

        score = Object.values(checks).filter(Boolean).length;
        if (score < 3) return { level: 'weak', text: 'strengthWeak', class: 'strength-weak' };
        if (score < 5) return { level: 'medium', text: 'strengthMedium', class: 'strength-medium' };
        return { level: 'strong', text: 'strengthStrong', class: 'strength-strong' };
    }
}