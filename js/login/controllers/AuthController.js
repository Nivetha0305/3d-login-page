export default class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bind View events to Controller handlers
        this.view.bindEmailValidation(this.handleEmailValidation.bind(this));
        this.view.bindPasswordValidation(this.handlePasswordValidation.bind(this));
        this.view.bindSubmit(this.handleSubmit.bind(this));
    }

    handleEmailValidation(email, hasErrorState) {
        if (email !== '' || hasErrorState) {
            const result = this.model.validateEmail(email);
            this.view.updateEmailFeedback(result.valid, result.message);
            return result.valid;
        }
        return false;
    }

    handlePasswordValidation(password, hasErrorState) {
        if (password !== '' || hasErrorState) {
            const result = this.model.validatePassword(password);
            this.view.updatePasswordFeedback(result.valid, result.message);
            return result.valid;
        }
        return false;
    }

    async handleSubmit(email, password) {
        // Force full validation on submit
        const emailResult = this.model.validateEmail(email);
        const passwordResult = this.model.validatePassword(password);
        
        let isValid = true;
        
        if (!emailResult.valid) {
            this.view.updateEmailFeedback(false, emailResult.message);
            this.view.shakeField(this.view.$email);
            isValid = false;
        } else {
            this.view.updateEmailFeedback(true);
        }
        
        if (!passwordResult.valid) {
            this.view.updatePasswordFeedback(false, passwordResult.message);
            this.view.shakeField(this.view.$password);
            isValid = false;
        } else {
            this.view.updatePasswordFeedback(true);
        }

        if (isValid) {
            try {
                this.view.setLoadingState();
                
                // Ask model to authenticate (simulated)
                await this.model.authenticate(email, password);
                
                // Display success
                this.view.setSuccessState();
                
                setTimeout(() => {
                    this.view.resetBtnState();
                    alert('Login successful! Welcome back.');
                }, 1500);
            } catch (error) {
                console.error(error);
                this.view.resetBtnState();
                alert('An error occurred during login.');
            }
        }
    }
}
