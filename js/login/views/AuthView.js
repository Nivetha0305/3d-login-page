export default class AuthView {
    constructor() {
        // Elements
        this.$form = $('#loginForm');
        this.$email = $('#email');
        this.$password = $('#password');
        this.$btn = $('.login-btn');
        this.$card = $('#tilt-card');
        
        this.initTiltEffect();
        this.initPasswordToggle();
        
        // Inject keyframes for shake animation dynamically
        if (!$('#shake-style').length) {
            $('<style id="shake-style">')
                .prop('type', 'text/css')
                .html(`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }
                `)
                .appendTo('head');
        }
    }

    // --- Events binding ---
    bindEmailValidation(handler) {
        this.$email.on('input blur', () => {
            handler(this.$email.val().trim(), this.$email.hasClass('is-invalid'));
        });
    }

    bindPasswordValidation(handler) {
        this.$password.on('input blur', () => {
            handler(this.$password.val().trim(), this.$password.hasClass('is-invalid'));
        });
    }

    bindSubmit(handler) {
        this.$form.on('submit', (e) => {
            e.preventDefault();
            handler(this.$email.val().trim(), this.$password.val().trim());
        });
    }

    // --- UI Updaters ---
    updateEmailFeedback(isValid, message) {
        const $feedback = this.$email.siblings('.invalid-feedback');
        if (isValid) {
            this.$email.removeClass('is-invalid').addClass('is-valid');
        } else {
            this.$email.removeClass('is-valid').addClass('is-invalid');
            if (message) $feedback.text(message);
        }
    }

    updatePasswordFeedback(isValid, message) {
        const $feedback = this.$password.siblings('.invalid-feedback');
        if (isValid) {
            this.$password.removeClass('is-invalid').addClass('is-valid');
        } else {
            this.$password.removeClass('is-valid').addClass('is-invalid');
            if (message) $feedback.text(message);
        }
    }

    shakeField($field) {
        $field.closest('.form-group').css('animation', 'shake 0.4s');
        setTimeout(() => $field.closest('.form-group').css('animation', 'none'), 400);
    }

    setLoadingState() {
        this.originalBtnHtml = this.$btn.html();
        this.$btn.html('<i class="fa-solid fa-circle-notch fa-spin"></i><span class="ms-2">Authenticating...</span>');
        this.$btn.prop('disabled', true);
        this.$btn.css('transform', 'translateY(0)'); // reset hover effect during loading
    }

    setSuccessState() {
        this.$btn.html('<i class="fa-solid fa-check"></i><span class="ms-2">Success</span>');
        this.$btn.css('background', 'linear-gradient(135deg, #22c55e, #16a34a)');
    }

    resetBtnState() {
        if (this.originalBtnHtml) {
            this.$btn.html(this.originalBtnHtml);
            this.$btn.css('background', '');
            this.$btn.prop('disabled', false);
        }
    }

    // --- UI Effects ---
    initTiltEffect() {
        $(document).on('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            this.$card.css('transform', `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`);
        });

        $(document).on('mouseleave', () => {
            this.$card.css({
                'transform': 'rotateY(0deg) rotateX(0deg)',
                'transition': 'transform 0.5s ease'
            });
        });

        $(document).on('mouseenter', () => {
            this.$card.css('transition', 'transform 0.1s ease-out');
        });
    }

    initPasswordToggle() {
        $('.toggle-password').on('click', function() {
            $(this).toggleClass('fa-eye fa-eye-slash');
            const $input = $('#password');
            $input.attr('type', $input.attr('type') === 'password' ? 'text' : 'password');
        });
    }
}
