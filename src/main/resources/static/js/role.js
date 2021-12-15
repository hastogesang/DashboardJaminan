    
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

    function roleCheck(role) {
        var rolename = $('#rolename').val()
        if(role == rolename){
            $('#alert_rolename').addClass("hide")
            $('#avail_rolename').removeClass("hide")
            $('#role_check').val(0)
        }
        else if(rolename != ""){
            $('#alert_rolename').addClass("hide")
            return $.ajax({
                url: '/api/rolebyname/' + rolename,
                type: 'get',
                contentType: 'application/json',
                success: function(result) {
                    // console.log(result);
                    if(result == ""){
                        $('#avail_rolename').removeClass("hide")
                        $('#alert_rolename').addClass("hide")
                        $('#role_check').val(0)
                    }
                    else {
                        $('#avail_rolename').addClass("hide")
                        $('#alert_rolename').removeClass("hide")
                        $('#alert_rolename').text("rolename already exists");

                        $('#role_check').val(1)
                    }
                }
            })
        }
        else{
            $('#alert_rolename').removeClass("hide")
            $('#alert_rolename').text("rolename must be filled")
        }
    }

    function resetRoleCheck(){
        $('#rolename').removeClass("border-danger border-success")
        $('#role_check').val(-1)
    }

    function resetAlertAksesmenu(){
        $('#alert_aksesmenu').addClass("hide")
    }

    async function Save(){
        var ok_user = false;
        var ok_aksesmenu = false;
        var rolename = $('#rolename').val()
        if(rolename == ""){
            $('#avail_rolename').addClass("hide")
            $('#alert_rolename').removeClass("hide")
            $('#alert_rolename').text("rolename harus diisi")
        } else {
            $('#alert_rolename').addClass("hide")
            await roleCheck()
            var role_check = $('#role_check').val()
            if(role_check == 0)
                ok_user = true
        }

        if($('#aksesmenu').val().length == 0){
            $('#alert_aksesmenu').removeClass("hide")
        } else {
            ok_aksesmenu = true
        }
        var datarole ='{' ;
            datarole +='"rolename":"' + $('#rolename').val() + '"' ;
            datarole +='}' ;

        if(ok_user && ok_aksesmenu){
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
        $('.form-group span').addClass('hide')
    });

    $(document).ready(function() {
        TampilData();
    });

    $('select').selectpicker();