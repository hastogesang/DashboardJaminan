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
                    <td><span class="text-danger" onclick="edit(${result[i].id})">Edit</span></td>
                    <td>${result[i].id}</td>
                    <td>${result[i].businessDate}</td>
                    <td>${result[i].code}</td>
                    <td>${result[i].bank}</td>
                    <td>${result[i].nomimal}</td>
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
                <label for="anggotaKeliring" class="col-sm-4 col-form-label">Anggota Keliring</label>
                <div class="col-sm-8">
                    <select id="anggotaKeliring" class="form-control">
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
                    <input type="text" class="form-control" id="tanggalPenempatan">
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
                <label for="bungaAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="bungaAdjustment">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                <div class="col-sm-8">
                    <select id="aro" class="form-control">
                        <option selected>-- Pilih --</option>
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
                        <option selected>-- Pilih --</option>
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
        
        <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Simpan</button>
        <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Batal</button>
    <!-- </form> -->`

    $('#card-body').html(str)
}

function edit(id){
    var str = ''
    str = 
    `<h3>Create</h3>
                    
    <!-- <form> -->
        <input type="text" id="id" value="${id}">
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="anggotaKeliring" class="col-sm-4 col-form-label">Anggota Keliring</label>
                <div class="col-sm-8">
                    <select id="anggotaKeliring" class="form-control">
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
                    <input type="text" class="form-control" id="tanggalPenempatan">
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
                <label for="bungaAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="bungaAdjustment">
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                <div class="col-sm-8">
                    <select id="aro" class="form-control">
                        <option selected>-- Pilih --</option>
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
                        <option selected>-- Pilih --</option>
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
        
        <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Simpan</button>
        <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/danacollateral', '_self')">Batal</button>
    <!-- </form> -->`

    $('#card-body').html(str)
}