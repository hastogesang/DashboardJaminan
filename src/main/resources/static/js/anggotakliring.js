$(document).ready(function(){
    $.ajax({
        url:'/api/anggotakliring',
        type:'get',
        contentType:'application/json',
        success:function(result) {
            var str = "";
            for(i=0; i < result.length; i++) {
                str+=
                `<tr>
                    <td>
                        <div class="text-center"><span onclick="edit(${result[i].id})">Edit</span></div>
                        <div class="text-center"><span onclick="FormDelete(${result[i].id})">Hapus</span></div>
                    </td>
                    <td>${result[i].code}</td>
                    <td>${result[i].name}</td>
                    <td>${result[i].address}</td>
                </tr>`
            }

            $('#tbody').html(str)
        }
    })
})

function add(){
    var str = ''
    str = 
    `<h3>Create</h3>
    <div id="alert" class="alert alert-danger fade show" role="alert" style="display:none">
    </div>

    <form onsubmit="event.preventDefault();">
        <div class="row">
            <div class="col">
                <div class="form-group form-row">
                    <label for="code" class="col-sm-2 col-form-label">Code</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="code">
                    </div>
                </div>
                <div class="form-group form-row">
                    <label for="nama" class="col-sm-2 col-form-label">AnggotaKliring</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="nama">
                    </div>
                </div>
                <div class="form-group form-row">
                    <label for="address" class="col-sm-2 col-form-label">Alamat</label>
                    <div class="col-sm-4">
                        <textarea class="form-control" id="address" rows="2"></textarea>
                    </div>
                </div>
                <div class="form-group form-row">
                    <label for="type" class="col-sm-2 col-form-label">Tipe</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="type" placeholder="B/T">
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <button type="submit" class="btn btn-sm btn-primary" onclick="save()">Simpan</button>
            <button type="reset" class="btn btn-sm btn-dark">Batal</button>
        </div>
        </form>`

    $('#card-body').html(str)
}

function save(){
    var submitted_data =
    `{
        "code":"`+ $('#code').val() +`",
        "name":"`+ $('#nama').val() +`",
        "address":"`+ $('#address').val() +`",
        "type":"`+ $('#type').val() +`"
    }`;

    $.ajax({
        url: "/api/anggotakliring/code/" + $('#code').val(),
        type: "get",
        contentType: "application/json",
        success: function(result){
            if(result){
                $('#alert').text("Code " + $('#code').val() + " already exist")
                $('#alert').show("fast")
            } 
            else {
                $.ajax({
                    url: "/api/anggotakliring",
                    type: "post",
                    contentType: "application/json",
                    data : submitted_data,
                    success: function(){
                        window.location.reload();
                    }
                })
            }
        }
    })
}

function edit(id){
    $.ajax({
        url:"/api/anggotakliring/"+id,
        type:"get",
        contentType:"application/json",
        success:function(result) {
            var str =""
            str = 
            `<h3>Edit</h3>
                            
            <form onsubmit="event.preventDefault();">
                <input type="hidden" id="id" value="${result.id}" disabled>
                <div class="row">
                    <div class="col">
                        <div class="form-group form-row">
                            <label for="code" class="col-sm-2 col-form-label">Code</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="code" value="${result.code}">
                            </div>
                        </div>
                        <div class="form-group form-row">
                            <label for="nama" class="col-sm-2 col-form-label">AnggotaKliring</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="nama" value="${result.name}">
                            </div>
                        </div>
                        <div class="form-group form-row">
                            <label for="address" class="col-sm-2 col-form-label">Alamat</label>
                            <div class="col-sm-4">
                                <textarea class="form-control" id="address" rows="2">${result.address}</textarea>
                            </div>
                        </div>
                        <div class="form-group form-row">
                            <label for="type" class="col-sm-2 col-form-label">Tipe</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="type" value="${result.type}">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col">
                    <button type="submit" class="btn btn-sm btn-primary" onclick="update()">Simpan</button>
                    <button type="reset" class="btn btn-sm btn-dark">Batal</button>
                </div>
            </form>`

            $('#card-body').html(str)
        }
    })
}

function update(){
    var submitted_data =
    `{
        "id":"`+ $('#id').val() +`",
        "code":"`+ $('#code').val() +`",
        "name":"`+ $('#nama').val() +`",
        "address":"`+ $('#address').val() +`",
        "type":"`+ $('#type').val() +`"
    }`;

    $.ajax({
        url: "/api/anggotakliring",
        type: "put",
        contentType: "application/json",
        data : submitted_data,
        success: function(){
            window.location.reload();
        }
    })
}

function FormDelete(id) {
    $("#delete-btn").val(id);
    $('#hapusModal').modal('show');
}

function Delete(id){
    $.ajax({
        url: "/api/anggotakliring/"+id,
        type: "delete",
        contentType: "application/json",
        success: function(){
            location.reload();
        }
    })
}