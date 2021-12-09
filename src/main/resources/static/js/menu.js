    function TampilData(){
        $.ajax({
        url: '/api/menu',
        type: 'get',
        contentType: 'application/json',
        success: function(data){
            // console.log(data);
            content(data);
        }
        })
    }

    function content(data) {
        let table = '';
        for (let i = 0; i < data.length; i++) {
            table += "<tr>";
            table += "<td>" + data[i].menu_name + "</td>";
            table += "<td>" + data[i].url + "</td>";
            table += "<td>" + data[i].keterangan + "</td>";
            table += "<td class='text-center'>" + "<span onclick='FormEdit("+data[i].id+")'>Edit</span>&nbsp&nbsp<span onclick='FormDelete("+data[i].id+")'>Delete</span>" + "</td>";
            table += "</tr>";
        }
        $('#tbody').html(table);
    }

    function Save(){
        if($('#menuname').val() == '' || $('#url').val() == '' || $('#keterangan').val() == ''){
            alert('Harap isi semua field');
        } else {
            var formData ='{' ;
            formData +='"menu_name":"' + $('#menuname').val() + '",' ;
            formData +='"url":"' + $('#url').val() + '",' ;
            formData +='"keterangan":"' + $('#keterangan').val() + '"' ;
            formData +='}' ;
            //console.log(formData);

            $.ajax({
                url:'/api/menu',
                type: 'post' ,
                contentType:'application/json',
                data: formData,
                success: function(){
                    //OpenList(0,5);
                    TampilData();
                    $('#daftarModal').modal('hide');
                }
            });
        }
    }

    function FormEdit(id){
        $.ajax({
            url:'/api/menu/' + id,
            type:'get',
            contentType:'application/json',
            success:function(data){
                $("#menuname-edit").val(data.menu_name);
                $("#url-edit").val(data.url);
                $("#keterangan-edit").val(data.keterangan);
                $("#edit-save-btn").val(data.id);
                $('#editModal').modal('show');
            }
        })
    }

    function Update(id){
        if($('#menuname-edit').val() == '' || $('url-edit').val() == '' || $('#keterangan-edit').val() == ''){
            alert('Harap isi semua field');
        } else {
            var formData ='{' ;
            formData +='"menu_name":"' + $('#menuname-edit').val() + '",' ;
            formData +='"url":"' + $('#url-edit').val() + '",' ;
            formData +='"keterangan":"' + $('#keterangan-edit').val() + '"' ;
            formData +='}' ;

            $.ajax({
                url:'/api/menu/'+id,
                type: 'put' ,
                contentType:'application/json',
                data: formData,
                success: function(){
                    TampilData();
                    $('#editModal').modal('hide');
                }
            });
        }
    }

    function FormDelete(id) {
        $("#delete-btn").val(id);
        $('#hapusModal').modal('show');
    }

    function Delete(id) {
        $.ajax({
            url:'/api/menu/'+id,
            type: 'delete' ,
            contentType:'application/json',
            data: {},
            success: function(){
                TampilData();
                $('#hapusModal').modal('hide');
            }
        });
    }

    $('#daftarModal').on('hidden.bs.modal', function() {
        $('#registerForm input').val('');
    });

    $(document).ready(function() {
        TampilData();
    });