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
    //上传头像
$('#modifybox').on('change', '#avatar', function() {
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
    //增加用户
$('#add').on('click', function(e) {
    //阻止默认行为
    e.preventDefault();
    $.ajax({
        url: '/users',
        type: 'post',
        data: $('form').serialize(),
        success: function(data) {
            //刷新页面
            location.reload();
        },
        error: function(data) {
            // alert('输入的格式有错误');
            console.log(data);

        }
    })
});
//删除用户
$('#box').on('click', '#delete', function() {
    let value = confirm('你确定要删除吗');
    if (value) {
        $.ajax({
            url: '/users/' + $(this).attr('data-id'),
            type: 'delete',
            success: function(data) {
                location.reload();
            }
        })
    }
});
//渲染修改页面
$('#box').on('click', '#modify', function() {
    $.ajax({
        url: '/users/' + $(this).attr('data-id'),
        type: 'get',
        success: function(data) {
            let html = template('form-tpl', data);
            $('#modifybox').html(html);
        }
    })
});
//修改数据提交
$('#modifybox').on('submit', 'form', function(e) {
    e.preventDefault();
    console.log($('form').attr('data-id'));
    $.ajax({
        url: '/users/' + $('form').attr('data-id'),
        type: 'put',
        data: $('form').serialize(),
        success: function(data) {
            location.reload();
        }
    })
});
//批量删除部分
$('.checkboxall').on('change', function() {
    //最上面的复选框控制下面的复选框
    $(this).parents('table').find('.checkbox').prop('checked', $(this).prop('checked'));
    if ($(this).prop('checked')) {
        $('#deleteall').show();
    } else {
        $('#deleteall').hide();
    }
});
//下面的复选框控制上面的复选框
$('#table').on('change', '.checkbox', function() {
    //过滤出选中的复选框
    let checks = $('#table').find('.checkbox').filter(':checked');
    if (checks.length > 0) {
        $('#deleteall').show();
    } else {
        $('#deleteall').hide();
    }
    if (checks.length == $('#table').find('.checkbox').length) {
        $('.checkboxall').prop('checked', true);
    } else {
        $('.checkboxall').prop('checked', false);
    }
});
//批量删除
$('#deleteall').on('click', function() {
    let id = [];
    let checks = $('#table').find('.checkbox').filter(':checked');
    checks.each((inex, element) => {
        id.push($(element).data('id'))
    });
    let ids = id.join('-');
    $.ajax({
        url: '/users/' + ids,
        type: 'delete',
        success: function(data) {
            location.reload();
        }
    })
});