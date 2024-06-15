$(document).ready(function() {
    $('#login-link').click(function() {
        $('#auth-modal').show();
    });

    $('#auth-modal .close').click(function() {
        $('#auth-modal').hide();
    });

    $('#register-link').click(function() {
        $('#register-form-container').show();
        $('#login-form-container').hide();
    });

    $('#login-link').click(function() {
        $('#register-form-container').hide();
        $('#login-form-container').show();
    });

    $('#register-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/hungrypeople/public/auth/register',
            data: $(this).serialize(),
            success: function(response) {
                try {
                    const res = JSON.parse(response);
                    alert(res.message);
                    if (res.status === 'success') {
                        window.location.href = '/hungrypeople/public';
                    }
                } catch (e) {
                    alert('An error occurred: ' + e.message + ' Response: ' + response);
                }
            },
            error: function(xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    });

    $('#login-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/hungrypeople/public/auth/login',
            data: $(this).serialize(),
            success: function(response) {
                try {
                    const res = JSON.parse(response);
                    alert(res.message);
                    if (res.status === 'success') {
                        window.location.href = '/hungrypeople/public';
                    }
                } catch (e) {
                    alert('An error occurred: ' + e.message + ' Response: ' + response);
                }
            },
            error: function(xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    });
});
