$(document).ready(function(){
    $.ajax({
        url:'/api/user',
        type:'get',
        contentType:'application/json',
        success:function(result) {
            console.log(result)
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
            // console.log(urResult)
            var str = ""
            var roles = ""
            for(var j = 0; j < urResult.length; j++){
                roles += urResult[j].role.rolename

                if((j+1) != urResult.length)
                    roles += ", "
            }

            str +=
                `<tr>
                    <td><div class="text-center"><span onclick="edit(${result.id})">Edit</span></div></td>
                    <td>${result.id}</td>
                    <td>${result.username}</td>
                    <td>${result.divisi}</td>
                    <td>${roles}</td>
                    <td><div class="text-center"><span onclick="deleted(${result.id})">Delete</span></div></td>

                </tr>`                

            $('#tbody').append(str)
        }
    })
}

function add(){
    var str = ''
    str += `
    <h3>Create</h3>

    <form onsubmit="event.preventDefault();">
        <div class="col-lg-6">
            <div class="form-group form-row">
                <label for="username" class="col-sm-3 col-form-label">Username*</label>

                <input type="hidden" id="user_check" value="-1">
                <div class="col-sm-9">
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control border" id="username" onchange="resetUserCheck()" required>
                        </div>
                        <div class="col-auto" id="check">
                            <button type="button" class="btn btn-primary" onclick="userCheck()">Check</button>
                        </div>
                    </div>
                    <span id="alert_username" class="text-danger d-none"></span>
                </div>

            </div>

            
            <div class="form-group form-row">
                <label for="password" class="col-sm-3 col-form-label">Password*</label>
                <div class="col-sm">
                    <input type="password" class="form-control" id="password" required>
                </div>
            </div>
            <div class="form-group form-row">
                <label for="conf_password" class="col-sm-3 col-form-label">Confirm Password*</label>
                <div class="col-sm">
                    <input type="password" class="form-control" id="conf_password" required>
                    <span id="alert_pass" class="text-danger d-none"></span>
                </div>
            </div>
            <div class="form-group form-row">
                <label for="divisi" class="col-sm-3 col-form-label">Divisi</label>
                <div class="col-sm">
                    <input type="text" class="form-control" id="divisi">
                </div>
            </div>
            <div class="form-group">
                <label for="roles" class="col-form-label">Roles*</label>
                <div id="roles" class="form-control overflow-auto" style="height:100px;">
                </div>
                <span id="alert_role" class="text-danger d-none">Must have at least one role</span>

            </div>
        </div>
                        
        <button type="submit" class="btn btn-sm btn-primary" onclick="save()">Simpan</button>
        <button type="reset" class="btn btn-sm btn-dark">Batal</button>
    </form>`

    $.ajax({
        url: '/api/role',
        type: 'get',
        contentType: 'application/json',
        success: function(roleResult) {
            var str2 = ''
            for (i = 0; i < roleResult.length; i++) {
                str2 += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${roleResult[i].id}" id="role${i}" name="roles">
                    <label class="form-check-label" for="role${i}">
                    ${roleResult[i].rolename}
                    </label>
                </div>`
            }
            $('#roles').html(str2)
        }
    })

    $('#card-body').html(str)
}

function userCheck(user) {
    var username = $('#username').val()
    if(user == username){
        $('#username').removeClass("border-danger")
        $('#username').addClass("border-success")
        $('#alert_username').addClass("d-none")
        $('#user_check').val(0)
    }
    else if(username != ""){
        $('#alert_username').addClass("d-none")
        $.ajax({
            url: '/api/user/username/' + username,
            type: 'get',
            contentType: 'application/json',
            success: function(result) {
                if(result == ""){
                    $('#username').removeClass("border-danger")
                    $('#username').addClass("border-success")
                    $('#alert_username').addClass("d-none")

                    $('#user_check').val(0)
                }
                else {
                    $('#username').removeClass("border-success")
                    $('#username').addClass("border-danger")
                    $('#alert_username').removeClass("d-none")
                    $('#alert_username').text("Username already exists");

                    $('#user_check').val(1)
                }
            }
        })
    }
    else{
        $('#alert_username').removeClass("d-none")
        $('#alert_username').text("Username must be filled")
    }
}

function resetUserCheck(){
    $('#username').removeClass("border-danger border-success")
    $('#user_check').val(-1)
}

function save() {
    var ok_user = false
    var ok_pass = false
    var ok_role = false
    var checked = []
    $('input[name="roles"]:checked').each(function(){
        checked.push($(this).val())
    })
    var user_check = $('#user_check').val()
    var username = $('#username').val()
    var password = $('#password').val()
    var conf_pass = $('#conf_password').val()
    var divisi = $('#divisi').val()
    
    if(username == ""){
        $('#alert_username').removeClass("d-none")
        $('#alert_username').text("Username must be filled")
    }
    else{
        $('#alert_username').addClass("d-none")
        userCheck()
        if(user_check == 0)
            ok_user = true
    }

    if(password == "" || conf_pass == ""){
        $('#alert_pass').removeClass("d-none")
        $('#alert_pass').text("Password must be filled")
    }
    else if(password != conf_pass){
        $('#alert_pass').removeClass("d-none")
        $('#alert_pass').text("Password doesn't match")
    }
    else{
        $('#alert_pass').addClass("d-none")
        ok_pass = true
    }

    if(checked.length == 0)
        $('#alert_role').removeClass("d-none")
    else{
        $('#alert_role').addClass("d-none")
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

                        $('input[name="roles"]:checked').each(function(){
                            var submitted_data =
                                `{
                                    "userId": "`+result.id+`",
                                    "roleId": "`+$(this).val()+`"
                                }`

                            $.ajax({
                                url: "/api/userrole",
                                type: "post",
                                contentType: "application/json",
                                data : submitted_data,
                                success: function(){
                                    window.location.reload();
                                }
                            })
                        })
                    }
                })
            }
        })
    }

}

function edit(id){
    var str = ''

    $.ajax({
        url:"/api/user/"+id,
        type:"get",
        contentType:"application/json",
        success:function(result) {
            console.log(result)
            str += `
            <h3>Edit</h3>

            <form onsubmit="event.preventDefault();">
            <input type="hidden" id="user_id" value="${result.id}" disabled>
                <div class="col-lg-6">
                    <div class="form-group form-row">
                        <label for="username" class="col-sm-3 col-form-label">Username</label>

                        <input type="hidden" id="user_check" value="0">
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control border" id="username" onchange="resetUserCheck()" value="${result.username}" required>
                                </div>
                                <div class="col-auto" id="check">
                                    <button type="button" class="btn btn-primary" onclick="userCheck('${result.username}')">Check</button>
                                </div>
                            </div>
                            <span id="alert_username" class="text-danger d-none"></span> 
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label for="password" class="col-sm-3 col-form-label">New Password</label>
                        <div class="col-sm">
                            <input type="password" class="form-control" id="password" value="${result.password}" required>
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label for="conf_password" class="col-sm-3 col-form-label">Confirm Password</label>
                        <div class="col-sm">
                            <input type="password" class="form-control" id="conf_password" value="${result.password}" required>
                            <span id="alert_pass" class="text-danger d-none"></span>
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <label for="divisi" class="col-sm-3 col-form-label">Divisi</label>
                        <div class="col-sm">
                            <input type="text" class="form-control" id="divisi" value="${result.divisi}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="roles" class="col-form-label">Roles</label>
                        <div id="roles" class="form-control overflow-auto" style="height:100px;">
                        <span id="alert_role" class="text-danger d-none">Must have at least one role</span>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-sm btn-primary" onclick="update('${result.username}')">Simpan</button>
                <button type="reset" class="btn btn-sm btn-dark">Batal</button>
            </form>`
            
            $('#card-body').html(str)

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
                            var str2 = ''
                            for (var i = 0; i < roleResult.length; i++) {
                                var roleResultId = roleResult[i].id
                                str2 += `
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="${roleResultId}" id="role${i}" name="roles" ${roleResultId != null ? roleid.includes(roleResultId) ? "Checked" : "" : ""}>
                                    <label class="form-check-label" for="role${i}">
                                    ${roleResult[i].rolename}
                                    </label>
                                </div>`
                            }
                            $('#roles').html(str2)
                        }
                    })
                }
            })
        }
    })
}

function update(user) {
    var ok_user = false
    var ok_pass = false
    var ok_role = false
    var checked = []
    $('input[name="roles"]:checked').each(function(){
        checked.push($(this).val())
    })
    var user_id = $('#user_id').val()
    var user_check = $('#user_check').val()
    var username = $('#username').val()
    var password = $('#password').val()
    var conf_pass = $('#conf_password').val()
    var divisi = $('#divisi').val()
    
    if(username == ""){
        $('#alert_username').removeClass("d-none")
        $('#alert_username').text("Username must be filled")
    }
    else{
        $('#alert_username').addClass("d-none")
        userCheck(user)
        if(user_check == 0)
            ok_user = true
    }

    if(password == "" || conf_pass == ""){
        $('#alert_pass').removeClass("d-none")
        $('#alert_pass').text("Password must be filled")
    }
    else if(password != conf_pass){
        $('#alert_pass').removeClass("d-none")
        $('#alert_pass').text("Password doesn't match")
    }
    else{
        $('#alert_pass').addClass("d-none")
        ok_pass = true
    }

    if(checked.length == 0)
        $('#alert_role').removeClass("d-none")
    else{
        $('#alert_role').addClass("d-none")
        ok_role = true
    }

    var submitted_data =
    `{
        "id": "`+user_id+`",
        "username": "`+username+`",
        "password": "`+password+`",
        "divisi": "`+divisi+`"
    }`

    // console.log(submitted_data);
    if(ok_user && ok_pass && ok_role){
        $.ajax({
            url: "/api/user",
            type: "put",
            contentType: "application/json",
            data : submitted_data,
            success: function(){
                $.ajax({
                    url:'/api/user/username/'+username,
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
    
                        $('input[name="roles"]:checked').each(function(){
                            var submitted_data =
                                `{
                                    "userId": "`+result.id+`",
                                    "roleId": "`+$(this).val()+`"
                                }`
    
                            $.ajax({
                                url: "/api/userrole",
                                type: "post",
                                contentType: "application/json",
                                data : submitted_data,
                                success: function(){
                                    window.location.reload();
                                }
                            })
                        })
                    }
                })
            }
        })
    }
}

function deleted(id){
    $.ajax({
        url: "/api/user/delete",
        type: "put",
        data : '{"id": "'+id+'"}',
        contentType: "application/json",
        success: function(){
            $.ajax({
                url: "/api/userrole/"+id,
                type: "delete",
                contentType: "application/json",
                success: function(){
                    window.location.reload();
                }
            })
        }
    })
}