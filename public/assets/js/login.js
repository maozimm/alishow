$('button').on('click', function() {
    if ($('#email').val().trim().length == 0) {
        alert('邮箱不能为空');
        return false;
    }
    if ($('#password').val().trim().length == 0) {
        alert('密码不能为空');
        return false;
    }
    $.ajax({
        type: 'post',
        url: '/login',
        data: {
            email: $('#email').val(),
            password: $('#password').val()
        },
        success: function(data) {
            location.href = 'index.html';
        },
        error: function() {
            alert('邮箱或者密码错误');
        }
    })
})