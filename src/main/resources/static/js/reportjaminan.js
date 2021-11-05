function TampilData(){
    let form = '';
    form += `
        <form>
            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="namaReport" class="col-sm-4 col-form-label">Nama Report</label>
                <div class="col-sm-8">
                  <select id="namaReport" class="form-control form-control-sm">
                    <option selected>Report Dana Jaminan</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="anggotaKeliring" class="col-sm-4 col-form-label">Nama Anggota Kliring</label>
                <div class="col-sm-8">
                  <select id="anggotaKeliring" class="form-control form-control-sm">
                      <option selected>PT Agrodana Futures</option>
                      <option>PT Asia Trade Point Futures</option>
                      <option>PT Askap Futures</option>
                  </select>
                </div>
            </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="tanggalAwal" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control form-control-sm" id="tanggalAwal" placeholder="dd/mm/yy" required>
                </div>
              </div>
              <div class="form-group form-row col-md-4">
                <label for="tanggalAkhir" class="col-sm-4 col-form-label">Sampai Dengan</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control form-control-sm" id="tanggalAkhir" placeholder="dd/mm/yy" required>
                </div>
              </div>
            </div>
            
            <button type="submit" class="btn btn-sm btn-primary">Generate single report</button>
            <button type="submit" class="btn btn-sm btn-primary">Generate all report</button>
        </form>
    `;
    $("#content").html(form);
}

$(document).ready(function() {
    TampilData();
})