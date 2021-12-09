    
    function TampilData(){
        $.ajax({
        url: '/api/role',
        type: 'get',
        contentType: 'application/json',
        success: function(data){
                for (let i = 0; i < data.length; i++) {
                    content(data[i].id, data[i].rolename);
                }
            }
        })

    }

    function content(id, rolename) {
        $.ajax({
            url: '/api/menurole/' + id,
            type: 'get',
            contentType: 'application/json',
            success: function(data){
                // console.log(data);
                // console.log(rolename);
                var str = "";
                var menus = [];
                for(var j = 0; j < data.length; j++){
                    menus[j] = data[j].menu.menu_name;
                    // console.log(data[j].menu.menu_name);
                }
                
                str +=
                    `<tr>
                        <td>${rolename}</td>
                        <td>${menus}</td>
                        <td><div class="text-center"><span onclick="FormEdit(${id})">Edit</span>&nbsp&nbsp<span onclick="FormDelete(${id})">Delete</span></div></td>
        
                    </tr>`;
                    
                $('#tbody').append(str);
            }
        })
    }

    function FormTambah(){
        $.ajax({
            url: '/api/menu',
            type: 'get',
            contentType: 'application/json',
            success: function(data){
                var str = '';
                for (let i = 0; i < data.length; i++) {
                    str += `
                        <option value="${data[i].id}">${data[i].menu_name}</option>
                    `;
                }
                $('#aksesmenu').html(str)
                $("#aksesmenu").selectpicker("refresh");
                $('#daftarModal').modal('show');
            }
        })
    }

    function Save(){
        var datarole ='{' ;
            datarole +='"rolename":"' + $('#rolename').val() + '"' ;
            datarole +='}' ;

        if($('#rolename').val() == '' || $('#aksesmenu').val().length == 0){
            alert('Role dan Akses Menu harus diisi!')
        } else {
            $.ajax({
                url: '/api/role',
                type: 'post',
                contentType:'application/json',
                data: datarole,
                success: function(){
                    $.ajax({
                        url: '/api/rolebyname/'+ $('#rolename').val(),
                        type: 'get',
                        contentType:'application/json',
                        success: function(data){
                            var menu = [];
                            menu = $('#aksesmenu').val();

                            for (let i = 0; i < menu.length; i++) {
                                var formData ='{' ;
                                formData +='"roleId":"' + data.id + '",' ;
                                formData +='"menuId":"' + menu[i] + '"' ;
                                formData +='}' ;
                                // console.log(formData);
                                $.ajax({
                                    url: '/api/menurole',
                                    type:'post',
                                    data: formData,
                                    contentType: 'application/json',
                                    success: function(){
                                    }
                                })
                            }
                            $('#daftarModal').modal('hide');
                            location.reload();

                        }
                    })
                }
            })
        }

    }

    function FormEdit(id){
        $.ajax({
            url:'/api/menurole/' + id,
            type:'get',
            contentType:'application/json',
            success:function(dataMenuRole){
                $.ajax({
                    url: '/api/role/'+id,
                    type: 'get',
                    contentType: 'application/json',
                    success: function(data){
                        $("#rolename-edit").val(data.rolename);
                    }
                })

                var menuRole = []
                for (var i = 0; i < dataMenuRole.length; i++) {
                    menuRole.push(dataMenuRole[i].menu.menu_name)
                }

                $.ajax({
                    url: '/api/menu',
                    type: 'get',
                    contentType: 'application/json',
                    success: function(datamenu){
                        var str = '';
                        for (let i = 0; i < datamenu.length; i++) {
                            // str += `<option value="${datamenu[i].id}">${datamenu[i].menu_name}</option>`;
                            str += `<option value="${datamenu[i].id}" ${menuRole.includes(datamenu[i].menu_name) ? "Selected" : ""}>${datamenu[i].menu_name}</option>`
                        }
                        $('#aksesmenu-edit').html(str)
                        $("#aksesmenu-edit").selectpicker("refresh");
                    }
                })
                
                // console.log(id);
                $("#edit-save-btn").val(id);
                $('#editModal').modal('show');
            }
        })
    }
    
    function Update(id){
        if($('#rolename-edit').val() == '' || $('#aksesmenu-edit').val().length == 0){
            alert('Role dan Akses Menu harus diisi!')
        } else {
            var datarole ='{' ;
            datarole +='"rolename":"' + $('#rolename-edit').val() + '"' ;
            datarole +='}' ;
    
            $.ajax({
                url:'/api/role/'+id,
                type: 'put' ,
                contentType:'application/json',
                data: datarole,
                success: function(){
                    
                    $.ajax({
                        url: '/api/menurole/'+id,
                        type: 'delete',
                        contentType: 'application/json',
                        success: function(){
                            var menu = [];
                            menu = $('#aksesmenu-edit').val();
                            // console.log(menu);
                            for (let i = 0; i < menu.length; i++) {
                                var formData ='{' ;
                                formData +='"roleId":"' + id + '",' ;
                                formData +='"menuId":"' + menu[i] + '"' ;
                                formData +='}' ;
                                // console.log(formData);
                                $.ajax({
                                    url: '/api/menurole',
                                    type:'post',
                                    data: formData,
                                    contentType: 'application/json',
                                    success: function(){
                                    }
                                })
                            }
                            $('#daftarModal').modal('hide');
                            location.reload();
                            // console.log("oke");
                        }
                    })
    
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
            url:'/api/role/'+id,
            type: 'delete' ,
            contentType:'application/json',
            success: function(){
                $.ajax({
                    url:'/api/menurole/'+id,
                    type: 'delete' ,
                    contentType:'application/json',
                    success: function(){
                        $('#hapusModal').modal('hide');
                        location.reload();
                    }
                });
            }
        });
    }

    $('#daftarModal').on('hidden.bs.modal', function() {
        $('#registerForm input').val('');
    });

    $(document).ready(function() {
        TampilData();
    });

    $('select').selectpicker();