$(document).ready(function(){
    // $.ajax({
    //     url:'/api/danacollateral',
    //     type:'get',
    //     contentType:'application/json',
    //     success:function(result) {
    //         var str = "";
    //         for(i=0; i < result.length; i++) {
    //             str+=
    //             `<tr>
    //                 <td><div class="text-center"><span onclick="edit(${result[i].id})">Edit</span></div></td>
    //                 <td>${result[i].id}</td>
    //                 <td>${result[i].businessDate}</td>
    //                 <td>${result[i].code}</td>
    //                 <td>${result[i].bank}</td>
    //                 <td>${result[i].nomimal}</td>
    //                 <td>${result[i].tanggalPenempatan}</td>
    //                 <td>${result[i].jatuhTempo}</td>
    //                 <td>${result[i].sukuBunga}</td>
    //             </tr>`
    //         }

    //         $('#tbody').html(str)
    //     }
    // })

    var str = "";
        str+=
        `<tr>
            <td><div class="text-center"><span onclick="edit(1294)">Edit</span></div></td>
            <td>1294</td>
            <td>10/26/2021</td>
            <td>PT Prolindo Buana Semesta</td>
            <td>BCA</td>
            <td>6400000000.0000</td>
            <td>9/20/2021</td>
            <td>10/21/2021</td>
            <td>2.6800</td>
        </tr>
        <tr>
            <td><div class="text-center"><span onclick="edit(1293)">Edit</span></div></td>
            <td>1293</td>
            <td>10/4/2021</td>
            <td>PT Global Buana Karya</td>
            <td>BCA</td>
            <td>252468042.9600</td>
            <td>8/30/2021</td>
            <td>9/30/2021</td>
            <td>2.7500</td>
        </tr>`

    $('#tbody').html(str)
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
    `<h3>Edit</h3>
                    
    <!-- <form> -->
        <input type="text" id="id" value="${id}" disabled>
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
                    <input type="text" class="form-control" id="tanggalPenempatan">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="jatuhTempo" class="col-sm-4 col-form-label">Tanggal Jatoh Tempo</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="jatuhTempo">
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