$(document).ready(function(){
    var str = ""
    str+= 
    `<tr>
        <td><div class="text-center"><span onclick="edit(1)">Edit</span></div></td>
        <td>172</td>
        <td>PT Abi Komoditi Berjangka</td>
        <td>Menara Rajawali Lt. 11 Jl. DR Ide Anak Agung Gde Agung Lot. 5.1 Kawasan Mega Kuningan Jakarta Selatan</td>
    </tr>
    <tr>
        <td><div class="text-center"><span onclick="edit(2)">Edit</span></div></td>
        <td>111</td>
        <td>PT Adhikarya Cipta Persada</td>
        <td>Multivision Tower Lt. 6 Jl. Kuningan Mulia LOT 9B
        </td>
    </tr>`

    $('#tbody').html(str)
})

function add(){
    var str = ''
    str = 
    `<h3>Create</h3>
                    
    <!-- <form> -->

        <div class="form-group form-row">
            <label for="code" class="col-sm-2 col-form-label">Code</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="code">
            </div>
        </div>
        <div class="form-group form-row">
            <label for="anggotaKliring" class="col-sm-2 col-form-label">AnggotaKliring</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="anggotaKliring">
            </div>
        </div>
        <div class="form-group form-row">
            <label for="alamat" class="col-sm-2 col-form-label">Alamat</label>
            <div class="col-sm-4">
                <textarea class="form-control" id="alamat" rows="2"></textarea>
            </div>
        </div>
        <div class="form-group form-row">
            <label for="tipe" class="col-sm-2 col-form-label">Tipe</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="tipe" placeholder="B/T">
            </div>
        </div>

        <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/anggotakliring', '_self')">Simpan</button>
        <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/anggotakliring', '_self')">Batal</button>
    <!-- </form> -->`

    $('#card-body').html(str)
}

function edit(id){
    var str =""
    str = 
    `<h3>Edit</h3>
                    
    <!-- <form> -->
    <input type="text" id="id" value="${id}" disabled>
    <div class="form-group form-row">
        <label for="code" class="col-sm-2 col-form-label">Code</label>
        <div class="col-sm-4">
            <input type="text" class="form-control" id="code">
        </div>
    </div>
    <div class="form-group form-row">
        <label for="anggotaKliring" class="col-sm-2 col-form-label">AnggotaKliring</label>
        <div class="col-sm-4">
            <input type="text" class="form-control" id="anggotaKliring">
        </div>
    </div>
    <div class="form-group form-row">
        <label for="alamat" class="col-sm-2 col-form-label">Alamat</label>
        <div class="col-sm-4">
            <textarea class="form-control" id="alamat" rows="2"></textarea>
        </div>
    </div>
    <div class="form-group form-row">
        <label for="tipe" class="col-sm-2 col-form-label">Tipe</label>
        <div class="col-sm-4">
            <input type="text" class="form-control" id="tipe" placeholder="B/T">
        </div>
    </div>

    <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/anggotakliring', '_self')">Simpan</button>
    <button type="submit" class="btn btn-sm btn-primary" onclick="javascript:window.open('/anggotakliring', '_self')">Batal</button>
    <!-- </form> -->`

    $('#card-body').html(str)
}