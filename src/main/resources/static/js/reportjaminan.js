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
                  <label for="code" class="col-sm-4 col-form-label">Nama Anggota Kliring</label>
                  <div class="col-sm-8">
                    <select id="code" class="form-control form-control-sm">
                    </select>
                  </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="tanggalAwal" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control form-control-sm" id="tanggalAwal" placeholder="mm/dd/yyyy" required>
                </div>
              </div>
              <div class="form-group form-row col-md-4">
                <label for="tanggalAkhir" class="col-sm-4 col-form-label">Sampai Dengan</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control form-control-sm" id="tanggalAkhir" placeholder="mm/dd/yyyy" required>
                </div>
              </div>
            </div>
            
            <button type="submit" class="btn btn-sm btn-primary">Generate single report</button>
            <button type="submit" class="btn btn-sm btn-primary">Generate all report</button>
        </form>
    `;

    $.ajax({
      url: '/api/anggotakliring/',
      type: 'get',
      contentType: 'application/json',
      success: function(anggotaKliringResult) {
          var akr = anggotaKliringResult
          var str2 = ''
          for (i = 0; i < akr.length; i++) {
              if(akr[i].name == null){
                str2 += `<option value="${akr[i].code}"></option>`
              } else {
                str2 += `<option value="${akr[i].code}">${akr[i].name}</option>`
              }
          }
          $('#code').html(str2)
      }
  })
    $("#content").html(form);
}

$(document).ready(function() {
    TampilData();
})