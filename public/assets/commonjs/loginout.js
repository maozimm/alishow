$('#loginout').on('click', function() {
    const value = confirm('确定退出吗');
    if (value) {
        $.ajax({
            url: '/logout',
            type: 'post',
            success: function(data) {
                console.log(data);
                location.href = 'login.html'
            }
        })
    }

})