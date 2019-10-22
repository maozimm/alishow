 //渲染分类
 $.ajax({
         url: '/categories',
         type: 'get',
         success: function(data) {
             let html = template('add-tpl', {
                 data: data
             });
             $('tbody').html(html);
         }
     })
     //添加分类
 $('#addform').on('submit', function(e) {
     e.preventDefault();
     $.ajax({
         url: '/categories',
         type: 'post',
         data: $(this).serialize(),
         success: function(data) {
             location.reload();
         }
     })
 })