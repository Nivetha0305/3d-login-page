export default class AuthModel {
    constructor() {
        // Regex validations
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.passwordRegex = /^.{6,}$/; // Minimum 6 characters for testing
    }

    /**
     * Validates an email address.
     * @returns {Object} { valid: boolean, message?: string }
     */
    validateEmail(email) {
        if (email === '') {
            return { valid: false, message: 'Email cannot be empty.' };
        }
        if (!this.emailRegex.test(email)) {
            return { valid: false, message: 'Please enter a valid email address (e.g., name@example.com).' };
        }
        return { valid: true };
    }

    /**
     * Validates a password.
     * @returns {Object} { valid: boolean, message?: string }
     */
    validatePassword(password) {
        if (password === '') {
            return { valid: false, message: 'Password cannot be empty.' };
        }
        if (!this.passwordRegex.test(password)) {
            return { valid: false, message: 'Must be at least 6 characters.' };
        }
        return { valid: true };
    }

    /**
     * Simulates sending credentials to a server
     * @returns {Promise}
     */
    async authenticate(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                if (email && password) {
                    resolve({ success: true, user: { email } });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 2000);
        });
    }
}
