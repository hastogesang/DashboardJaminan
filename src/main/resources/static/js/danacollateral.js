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
                    <td>${result[i].businessDate}</td>
                    <td>${result[i].code}</td>
                    <td>${result[i].bank}</td>
                    <td>${result[i].nominal}</td>
                    <td>${result[i].tanggalPenempatan}</td>
                    <td>${result[i].jatuhTempo}</td>
                    <td>${result[i].sukuBunga}</td>
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
                <label for="anggotaKliring" class="col-sm-4 col-form-label">Anggota Kliring</label>
                <div class="col-sm-8">
                    <select id="anggotaKliring" class="form-control">
                        <option selected>PT Agrodana Futures</option>
                        <option>PT Asia Trade Point Futures</option>
                        <option>PT Askap Futures</option>
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
                <label for="penempatanBaru" class="col-sm-4 col-form-label">Penempatan Baru</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="penempatanBaru">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="tanggalPenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="tanggalPenempatan" placeholder="dd/mm/yy">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="jatuhTempo" class="col-sm-4 col-form-label">Tanggal Jatoh Tempo</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="jatuhTempo" placeholder="dd/mm/yy">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="transferDana" class="col-sm-4 col-form-label">Transfer Dana</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="transferDana">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="sukuBunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="sukuBunga">
                </div>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="bunga">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="adjustmentBunga" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="adjustmentBunga">
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

    $('#card-body').html(str)
}

function save(){
    var submitted_data =
    `{
        "code":"`+ $('#anggotaKliring').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "penempatanBaru":"`+ $('#penempatanBaru').val() +`",
        "tanggalPenempatan":"`+ $('#tanggalPenempatan').val() +`",
        "jatuhTempo":"`+ $('#jatuhTempo').val() +`",
        "nominal":"`+ $('#transferDana').val() +`",
        "sukuBunga":"`+ $('#sukuBunga').val() +`",
        "adjustmentBunga":"`+ $('#adjustmentBunga').val() +`",
        "bungaSetelahAdjustment":"`+ $('#bungaSetelahAdjustment').val() +`",
        "aro":"`+ $('#aro').val() +`",
        "multiple":"`+ $('#multiple').val() +`",
        "sequence":"`+ $('#sequence').val() +`",
        "businessDate":"`+ $('#tanggalPenempatan').val() +`"
    }`;
    console.log(submitted_data)

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
            var str = ''
            str = 
            `<h3>Edit</h3>
                            
            <!-- <form> -->
                <input type="text" id="id" value="${r.id}" disabled>
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="anggotaKliring" class="col-sm-4 col-form-label">Anggota Kliring</label>
                        <div class="col-sm-8">
                            <select id="anggotaKliring" class="form-control">
                                <option selected>PT Agrodana Futures</option>
                                <option>PT Asia Trade Point Futures</option>
                                <option>PT Askap Futures</option>
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
                        <label for="penempatanBaru" class="col-sm-4 col-form-label">Penempatan Baru</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="penempatanBaru" value="${r.penempatanBaru}">
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="tanggalPenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="tanggalPenempatan" value="${r.tanggalPenempatan}">
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="jatuhTempo" class="col-sm-4 col-form-label">Tanggal Jatoh Tempo</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="jatuhTempo" value="${r.jatuhTempo}">
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="transferDana" class="col-sm-4 col-form-label">Transfer Dana</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="transferDana" value="${r.nominal}">
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="sukuBunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="sukuBunga" value="${r.sukuBunga}">
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="bunga">
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="adjustmentBunga" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="adjustmentBunga" value="${r.adjustmentBunga}">
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="bungaSetelahAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="bungaSetelahAdjustment" value="${r.bungaSetelahAdjustment}">
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
                            <input type="text" class="form-control" id="sequence">
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Simpan</button>
                <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Batal</button>
            <!-- </form> -->`
        
            $('#card-body').html(str)
        }
    })
}