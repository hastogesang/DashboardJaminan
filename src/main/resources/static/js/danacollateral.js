$(document).ready(function(){
    $.ajax({
        url:'/api/danacollateral',
        type:'get',
        contentType:'application/json',
        success:function(result) {
            var str = "";
            for(i=0; i < result.length; i++) {
                str+=
                `<tr>
                    <td><div class="text-center"><span onclick="edit(${result[i].id})">Edit</span></div></td>
                    <td>${result[i].id}</td>
                    <td>${result[i].businessdate}</td>
                    <td>${result[i].code}</td>
                    <td>${result[i].bank}</td>
                    <td>${result[i].nominal}</td>
                    <td>${result[i].tanggalpenempatan}</td>
                    <td>${result[i].jatuhtempo}</td>
                    <td>${result[i].sukubunga}</td>
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
                    
    <!-- <form> -->
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="code" class="col-sm-4 col-form-label">Anggota Kliring</label>
                <div class="col-sm-8">
                    <select id="code" class="form-control">
                    </select>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="bank" class="col-sm-4 col-form-label">Bank</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="bank">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="penempatan" class="col-sm-4 col-form-label">Penempatan Baru</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="penempatan">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="tanggalpenempatan" placeholder="dd/mm/yy">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatoh Tempo</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="jatuhtempo" placeholder="dd/mm/yy">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="nominal" class="col-sm-4 col-form-label">Transfer Dana</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="nominal">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="sukubunga">
                </div>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="bunga">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="adjustment">
                </div>
            </div>
        </div>
            
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="bungaSetelahAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="bungaSetelahAdjustment">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                <div class="col-sm-8">
                    <select id="aro" class="form-control">
                        <option selected hidden disabled>-- Pilih --</option>
                        <option>True</option>
                        <option>False</option>
                    </select>
                </div>
            </div>
        </div>
            
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="multiple" class="col-sm-4 col-form-label">Multiple</label>
                <div class="col-sm-8">
                    <select id="multiple" class="form-control">
                        <option selected hidden disabled>-- Pilih --</option>
                        <option>True</option>
                        <option>False</option>
                    </select>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="sequence" class="col-sm-4 col-form-label">Sequence</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="sequence">
                </div>
            </div>
        </div>
        
        <button type="button" class="btn btn-sm btn-primary" onclick="save()">Simpan</button>
        <button type="button" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Batal</button>
    <!-- </form> -->`

    $.ajax({
        url: '/api/anggotakliring/',
        type: 'get',
        contentType: 'application/json',
        success: function(anggotaKliringResult) {
            var akr = anggotaKliringResult
            var str2 = ''
            for (i = 0; i < akr.length; i++) {
                str2 += `<option value="${akr[i].code}">${akr[i].name}</option>`
            }
            $('#code').html(str2)
        }
    })

    $('#card-body').html(str)
}

function save(){
    var submitted_data =
    `{
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "penempatan":"`+ $('#penempatan').val() +`",
        "tanggalpenempatan":"`+ $('#tanggalpenempatan').val() +`",
        "jatuhtempo":"`+ $('#jatuhtempo').val() +`",
        "nominal":"`+ $('#nominal').val() +`",
        "sukubunga":"`+ $('#sukubunga').val() +`",
        "adjustment":"`+ $('#adjustment').val() +`",
        "aro":"`+ $('#aro').val() +`",
        "multiple":"`+ $('#multiple').val() +`",
        "sequence":"`+ $('#sequence').val() +`",
        "businessDate":"`+ $('#tanggalPenempatan').val() +`"
    }`;
    // console.log(submitted_data)

    $.ajax({
        url: "/api/danacollateral",
        type: "post",
        contentType: "application/json",
        data : submitted_data,
        success: function(){
            window.location.reload();
        }
    })
}

function edit(id){
    $.ajax({
        url:"/api/danacollateral/"+id,
        type:"get",
        contentType:"application/json",
        success:function(result) {
            r = result[0]
            // console.log(r)
            var str = ''
            str = 
            `<h3>Edit</h3>
                            
            <!-- <form> -->
                <input type="hidden" id="id" value="${r.id}" disabled>
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="anggotaKliring" class="col-sm-4 col-form-label">Anggota Kliring</label>
                        <div class="col-sm-8">
                            <select id="anggotaKliring" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="bank" class="col-sm-4 col-form-label">Bank</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="bank" value="${r.bank}">
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="penempatan" class="col-sm-4 col-form-label">Penempatan Baru</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="penempatan" value="${r.penempatan}">
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="tanggalpenempatan" value="${r.tanggalpenempatan}">
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatoh Tempo</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="jatuhtempo" value="${r.jatuhtempo}">
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="nominal" class="col-sm-4 col-form-label">Transfer Dana</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="nominal" value="${r.nominal}">
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="sukubunga" value="${r.sukubunga}">
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="bunga" readonly>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="adjustment" value="${r.adjustment}">
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="bungaSetelahAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="bungaSetelahAdjustment" readonly>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                        <div class="col-sm-8">
                            <select id="aro" class="form-control">
                                <option ${r.aro == true ? "Selected" : ""}>True</option>
                                <option ${r.aro == false ? "Selected" : ""}>False</option>
                                
                            </select>
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="multiple" class="col-sm-4 col-form-label">Multiple</label>
                        <div class="col-sm-8">
                            <select id="multiple" class="form-control">
                                <option ${r.multiple == true ? "Selected" : ""}>True</option>
                                <option ${r.multiple == false ? "Selected" : ""}>False</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="sequence" class="col-sm-4 col-form-label">Sequence</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="sequence" value="${r.sequence}">
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-sm btn-primary" onclick="update()">Simpan</button>
                <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Batal</button>
            <!-- </form> -->`
        
            $.ajax({
                url: '/api/anggotakliring/',
                type: 'get',
                contentType: 'application/json',
                success: function(anggotaKliringResult) {
                    var akr = anggotaKliringResult
                    var str2 = ''
                    for (i = 0; i < akr.length; i++) {
                        str2 += `<option value="${akr[i].code}" ${r.code == akr[i].code ? "Selected" : ""}>${akr[i].name}</option>`
                    }
                    $('#anggotaKliring').html(str2)
                }
            })

            $('#card-body').html(str)
        }
    })
}

function update(){
    var submitted_data =
    `{
        "id":"`+ $('#id').val() +`",
        "code":"`+ $('#anggotaKliring').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "penempatan":"`+ $('#penempatan').val() +`",
        "tanggalpenempatan":"`+ $('#tanggalpenempatan').val() +`",
        "jatuhtempo":"`+ $('#jatuhtempo').val() +`",
        "nominal":"`+ $('#nominal').val() +`",
        "sukubunga":"`+ $('#sukubunga').val() +`",
        "adjustment":"`+ $('#adjustment').val() +`",
        "aro":"`+ $('#aro').val() +`",
        "multiple":"`+ $('#multiple').val() +`",
        "sequence":"`+ $('#sequence').val() +`",
        "businessDate":"`+ $('#tanggalpenempatan').val() +`"
    }`;

    $.ajax({
        url: "/api/danacollateral",
        type: "put",
        contentType: "application/json",
        data : submitted_data,
        success: function(){
            window.location.reload();
        }
    })
}
