//渲染用户
$.ajax({
        url: '/users',
        type: 'get',
        success: function(data) {
            let html = template('user-tpl', {
                users: data
            });
            $('tbody').html(html);
        }
    })
    //添加用户
$('#add').on('click', function(e) {
    //阻止默认行为
    e.preventDefault();
    console.log($('form').serialize());

    // $.ajax({
    //     url: '/users',
    //     type: 'post',
    //     data: $('form').serialize(),
    //     success: function(data) {
    //         //刷新页面
    //         location.reload();
    //     },
    //     error: function() {
    //         alert('输入的格式有错误');
    //     }
    // })
});
$('#avatar').on('change', function() {
    let formdata = new FormData();
    formdata.append('avatar', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formdata,
        //告诉ajax不要解析参数
        processData: false,
        //告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function(data) {
            //图片预览
            $('#uesr_img').attr('src', data[0].avatar);
            //需要一个隐藏域存储上传图片的路径
            $('#hidden').val(data[0].avatar);
        }
    })

})