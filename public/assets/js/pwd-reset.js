$('#form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/users/password',
        type: 'put',
        data: $(this).serialize(),
        success: function(data) {
            location.href = '/admin/login.html'
        },
        error: function(data) {
            console.log(data);
        }
    })
})