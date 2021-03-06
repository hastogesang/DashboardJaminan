$(document).ready(function(){
    $.ajax({
        url:'/api/user',
        type:'get',
        contentType:'application/json',
        success:function(result) {
            for (var i = 0; i < result.length; i++) {
                setTBody(result[i])
            }
        }
    })
})

function setTBody(result) {
    $.ajax({
        url:'/api/userrole/' + result.id,
        type:'get',
        contentType:'application/json',
        success:function(urResult) {
            var str = ""
            var roles = ""
            for(var j = 0; j < urResult.length; j++){
                roles += urResult[j].role.rolename

                if((j+1) != urResult.length)
                    roles += ", "
            }

            str +=
                `<tr>
                    <td>${result.username}</td>
                    <td>${result.divisi}</td>
                    <td>${roles}</td>
                    <td><div class="text-center"><span onclick="FormEdit(${result.id})">Edit</span>&nbsp&nbsp<span onclick="FormDelete(${result.id})">Delete</span></div></td>

                </tr>`                

            $('#tbody').append(str)
        }
    })
}

function FormTambah(){
    $.ajax({
        url: '/api/role',
        type: 'get',
        contentType: 'application/json',
        success: function(result) {
            var str = '';
            for (var i = 0; i < result.length; i++) {
                str += `<option value="${result[i].id}">${result[i].rolename}</option>`
            }
            $('#roles').html(str)
            $("#roles").selectpicker("refresh")
            $('#daftarModal').modal('show')
        }
    })
}

function userCheck(user, additional) {
    var username = $('#username'+additional).val()
    if(user == username && user!= ""){
        $('#avail_username'+additional).removeClass("hide")
        $('#user_check'+additional).val(0)
    }
    else if(username != ""){
        return $.ajax({
            url: '/api/user/username/' + username,
            type: 'get',
            contentType: 'application/json',
            success: function(result) {
                if(result == ""){
                    $('#avail_username'+additional).removeClass("hide")
                    $('#user_check'+additional).val(0)
                }
                else {
                    $('#alert_username'+additional).text("Username already exists");
                    $('#alert_username'+additional).removeClass("hide")

                    $('#user_check'+additional).val(1)
                }
            }
        })
    }
    else{
        $('#alert_username'+additional).text("Username must be filled")
        $('#alert_username'+additional).removeClass("hide")
    }
}

function resetUserCheck(additional){
    $('#alert_username'+additional).addClass("hide")
    $('#avail_username'+additional).addClass("hide")
    $('#user_check'+additional).val(-1)
}

async function Save() {
    var ok_user = false
    var ok_pass = false
    var ok_role = false
    var username = $('#username').val()
    var password = $('#password').val()
    var conf_pass = $('#conf_password').val()
    var divisi = $('#divisi').val()
    var roles = $('#roles').val()
    
    if(username == ""){
        $('#alert_username').text("Username must be filled")
        $('#alert_username').removeClass("hide")
    }
    else{
        await userCheck('','')
        var user_check = $('#user_check').val()
        if(user_check == 0)
            ok_user = true
    }

    if(password == "" || conf_pass == ""){
        $('#alert_pass').text("Password must be filled")
        $('#alert_pass').removeClass("hide")
    }
    else if(password != conf_pass){
        $('#alert_pass').text("Password doesn't match")
        $('#alert_pass').removeClass("hide")
    }
    else{
        $('#alert_pass').addClass("hide")
        ok_pass = true
    }

    if(roles == null)
        $('#alert_role').removeClass("hide")
    else{
        $('#alert_role').addClass("hide")
        ok_role = true
    }

    var submitted_data =
    `{
        "username": "`+username+`",
        "password": "`+password+`",
        "divisi": "`+divisi+`"
    }`

    if(ok_user && ok_pass && ok_role){
        $.ajax({
            url: "/api/user",
            type: "post",
            contentType: "application/json",
            data : submitted_data,
            success: function(){

                $.ajax({
                    url:'/api/user/username/'+username,
                    type:'get',
                    contentType:'application/json',
                    success:function(result) {
                        for (var i = 0; i < roles.length; i++) {
                            var submitted_data =
                                `{
                                    "userId": "`+result.id+`",
                                    "roleId": "`+roles[i]+`"
                                }`

                            $.ajax({
                                url: "/api/userrole",
                                type: "post",
                                contentType: "application/json",
                                data : submitted_data,
                                success: function(){
                                    $('#daftarModal').modal('hide');
                                    location.reload();
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}

function FormEdit(id) {
    $.ajax({
        url:"/api/user/"+id,
        type:"get",
        contentType:"application/json",
        success:function(result) {
            $("#user_id-edit").val(result.id);
            $("#username-edit").val(result.username);
            $("#password-edit").val(result.password);
            $("#conf_password-edit").val(result.password);
            $("#divisi-edit").val(result.divisi);
            $("#btncheck-edit").val(result.username);
            $("#edit-save-btn").val(result.username);

            $.ajax({
                url:'/api/userrole/' + id,
                type:'get',
                contentType:'application/json',
                success:function(urResult) {
                    var roleid = []
                    for (var i = 0; i < urResult.length; i++) {
                        roleid.push(urResult[i].role.id)
                    }

                    $.ajax({
                        url: '/api/role',
                        type: 'get',
                        contentType: 'application/json',
                        success: function(roleResult) {
                            var str = '';
                            for (var i = 0; i < roleResult.length; i++) {
                                var roleResultId = roleResult[i].id
                                str += `<option value="${roleResultId}" ${roleResultId != null ? roleid.includes(roleResultId) ? "Selected" : "" : ""}>${roleResult[i].rolename}</option>`
                            }
                            $('#roles-edit').html(str)
                            $("#roles-edit").selectpicker("refresh");
                            $('#editModal').modal('show')
                        }
                    })
                }
            })
        }
    })
}

async function Update(user) {
    var ok_user = false
    var ok_pass = false
    var ok_role = false
    var user_id = $('#user_id-edit').val()
    var username = $('#username-edit').val()
    var password = $('#password-edit').val()
    var conf_pass = $('#conf_password-edit').val()
    var divisi = $('#divisi-edit').val()
    var roles = $('#roles-edit').val()
    
    if(username == ""){
        $('#alert_username-edit').text("Username must be filled")
        $('#alert_username-edit').removeClass("hide")
    }
    else{
        await userCheck(user, '-edit')
        var user_check = $('#user_check-edit').val()
        if(user_check == 0)
            ok_user = true
    }

    if(password == "" || conf_pass == ""){
        $('#alert_pass-edit').text("Password must be filled")
        $('#alert_pass-edit').removeClass("hide")
    }
    else if(password != conf_pass){
        $('#alert_pass-edit').text("Password doesn't match")
        $('#alert_pass-edit').removeClass("hide")
    }
    else{
        $('#alert_pass-edit').addClass("hide")
        ok_pass = true
    }

    if(roles.length == 0)
        $('#alert_role-edit').removeClass("hide")
    else{
        $('#alert_role-edit').addClass("hide")
        ok_role = true
    }

    if(ok_user && ok_pass && ok_role){
        $.ajax({
            url:'/api/user/username/'+user,
            type:'get',
            contentType:'application/json',
            success:function(result) {

                $.ajax({
                    url: "/api/userrole/"+result.id,
                    type: "delete",
                    contentType: "application/json",
                    success: function(){
                    }
                })

                for (var i = 0; i < roles.length; i++) {
                    var submitted_data =
                        `{
                            "userId": "`+result.id+`",
                            "roleId": "`+roles[i]+`"
                        }`

                    $.ajax({
                        url: "/api/userrole",
                        type: "post",
                        contentType: "application/json",
                        data : submitted_data,
                        success: function(){
                            var submitted_data =
                            `{
                                "id": "`+user_id+`",
                                "username": "`+username+`",
                                "password": "`+password+`",
                                "divisi": "`+divisi+`"
                            }`

                            $.ajax({
                                url: "/api/user",
                                type: "put",
                                contentType: "application/json",
                                data : submitted_data,
                                success: function(result){
                                    $('#editModal').modal('hide')
                                    if(user == result && username != result)
                                        open("/logout", "_self")
                                    else
                                        location.reload()
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

function FormDelete(id) {
    $("#delete-btn").val(id);
    $('#hapusModal').modal('show');
}

function Delete(id){
    $.ajax({
        url: "/api/user/"+id,
        type: "delete",
        contentType: "application/json",
        success: function(){
            $.ajax({
                url: "/api/userrole/"+id,
                type: "delete",
                contentType: "application/json",
                success: function(){
                    $('#hapusModal').modal('hide');
                    location.reload();
                }
            })
        }
    })
}