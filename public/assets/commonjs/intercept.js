$.ajax({
    url: '/login/status',
    type: 'get',
    success: function(data) {
        if (!data.includes('true')) {
            location.href = 'login.html'
        }
    },
    async: false
})