  function FormTambah(){
      let form = '';
      form += `
          <!-- <form> -->
              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="code" class="col-sm-4 col-form-label">Anggota Keliring</label>
                  <div class="col-sm-8">
                    <select id="code" class="form-control input-sm">
                    </select>
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="bank" class="col-sm-4 col-form-label">Bank</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control input-sm" id="bank">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="jumlah" class="col-sm-4 col-form-label">Penempatan Awal</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="jumlah" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="tanggalpenempatan" placeholder="mm/dd/yyyy">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="jatuhtempo" placeholder="mm/dd/yyyy">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" id="sukubunga" onchange="calcInterest()" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                  </div>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" id="bunga" readonly="readonly">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="adjustment" onchange="calcAdjusment();" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="afterAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="afterAdjustment" readonly="readonly">
                  </div>
                </div>
              </div>
                
              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="transferdana" class="col-sm-4 col-form-label">Transfer Dana</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="transferdana" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="transferdanakbi" class="col-sm-4 col-form-label">Transfer Dana Ke KBI</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="transferdanakbi" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="admin" class="col-sm-4 col-form-label">Biaya Admin</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="admin" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
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
                    <input type="number" class="form-control" id="sequence">
                  </div>
                </div>
              </div>
              
              <button type="submit" class="btn btn-sm btn-primary" onclick="save(this.value)">Simpan</button>
              <button type="submit" class="btn btn-sm btn-dark" onclick="javascript:window.open('/danajaminan', '_self')">Batal</button>
          <!-- </form> -->
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
      $("#card-body").html(form);
  }

  function save(){
    var datediff = DateDiff();
    var jumlah = $("#jumlah").val().replaceAll(".", "").replaceAll(",", ".");
    var afterAdjusment = $('#afterAdjustment').val().replaceAll(".", "").replaceAll(",", ".");
    var transferDana = $('#transferdana').val().replaceAll(".", "").replaceAll(",", ".");
    var transferDanaKbi = $('#transferdanakbi').val().replaceAll(".", "").replaceAll(",", ".");
    var admin = $('#admin').val().replaceAll(".", "").replaceAll(",", ".");
    
    var bungaBruto = (jumlah * $("#sukubunga").val() / 100) / 365 * datediff;
    var penempatan = parseFloat(jumlah) + parseFloat(afterAdjusment) - parseFloat(transferDana) - parseFloat(transferDanaKbi);

    var submitted_data =
    `{
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "jumlah":"`+ jumlah +`",
        "jangkawaktu":"`+ datediff +`",
        "tanggalpenempatan":"`+ $('#tanggalpenempatan').val() +`",
        "jatuhtempo":"`+ $('#jatuhtempo').val() +`",
        "transferdana":"`+ transferDana +`",
        "sukubunga":"`+ $('#sukubunga').val() +`",
        "bungabruto":"`+ bungaBruto +`",
        "adjustment":"`+ $('#adjustment').val().replaceAll(".", "").replaceAll(",", ".") +`",
        "bunga":"`+ parseFloat(afterAdjusment) +`",
        "admin":"`+ admin +`",
        "transferdanakbi":"`+ transferDanaKbi +`",
        "penempatan":"`+ penempatan.toFixed(4) +`",
        "aro":"`+ $('#aro').val().substring(0,1) +`",
        "multiple":"`+ $('#multiple').val().substring(0,1) +`",
        "sequence":"`+ $('#sequence').val() +`",
        "businessdate":"`+ $('#tanggalpenempatan').val() +`"
    }`;

    console.log(submitted_data);

    // $.ajax({
    //     url: "/api/danacollateral",
    //     type: "post",
    //     contentType: "application/json",
    //     data : submitted_data,
    //     success: function(){
    //         window.location.reload();
    //     }
    // })
  }

  function FormEdit(id){
    $.ajax({
      url: '/api/danajaminan/' + id,
      type: 'get',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
          let form = '';
            form += `
            <!-- <form> -->
            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="code" class="col-sm-4 col-form-label">Anggota Keliring</label>
                <div class="col-sm-8">
                  <select id="code" class="form-control input-sm">
                  </select>
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="bank" class="col-sm-4 col-form-label">Bank</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control input-sm" id="bank" value="${data.bank}">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="jumlah" class="col-sm-4 col-form-label">Penempatan Awal</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="jumlah" value="${formatRupiah(data.penempatan)}" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="tanggalpenempatan" placeholder="dd/mm/yy" value="${data.tanggalpenempatan}">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="jatuhtempo" placeholder="dd/mm/yy" value="${data.jatuhtempo}">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" id="sukubunga" onblur="calcInterest()" value="${data.sukubunga.toFixed(4)}">
                </div>
                <div class="col-sm-4">
                  <input type="text" class="form-control" id="bunga" readonly="readonly">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="adjustment" onblur="calcAdjusment(); ubahAngka(this.value, this.id)" value="${formatRupiah(data.adjustment)}" onfocus="reformat(this.value, this.id)">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="afterAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="afterAdjustment" readonly="readonly" >
                </div>
              </div>
            </div>
              
            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="transferdana" class="col-sm-4 col-form-label">Transfer Dana</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="transferdana" value="${formatRupiah(data.transferdana)}" onfocus="reformat(this.value, this.id)" onblur="ubahAngka(this.value, this.id)">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="transferdanakbi" class="col-sm-4 col-form-label">Transfer Dana Ke KBI</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="transferdanakbi" value="${formatRupiah(data.transferdanakbi)}" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="admin" class="col-sm-4 col-form-label">Biaya Admin</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="admin" value="${formatRupiah(data.admin)}" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                <div class="col-sm-8">
                  <select id="aro" class="form-control">
                    <option ${data.aro == "T" ? "Selected" : ""}>True</option>
                    <option ${data.aro == "F" ? "Selected" : ""}>False</option>
                  </select>
                </div>
              </div>
            </div>
              
            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="multiple" class="col-sm-4 col-form-label">Multiple</label>
                <div class="col-sm-8">
                  <select id="multiple" class="form-control">
                    <option ${data.multiple == "T" ? "Selected" : ""}>True</option>
                    <option ${data.multiple == "F" ? "Selected" : ""}>False</option>
                  </select>
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="sequence" class="col-sm-4 col-form-label">Sequence</label>
                <div class="col-sm-8">
                  <input type="number" class="form-control" id="sequence" value="${data.sequence}">
                </div>
              </div>
            </div>
            
            <button type="submit" class="btn btn-sm btn-primary" onclick="save(this.value)">Simpan</button>
            <button type="submit" class="btn btn-sm btn-dark" onclick="javascript:window.open('/danajaminan', '_self')">Batal</button>
            <!-- </form> -->
            `;
            $('#tanggalpenempatan').val()

            $.ajax({
                url: '/api/anggotakliring/',
                type: 'get',
                contentType: 'application/json',
                success: function(anggotaKliringResult) {
                    var akr = anggotaKliringResult
                    var str2 = ''
                    for (i = 0; i < akr.length; i++) {
                        str2 += `<option value="${akr[i].code}" ${data.code == akr[i].code ? "Selected" : ""}>${akr[i].name}</option>`
                    }
                    $('#code').html(str2)
                }
            })
            $("#card-body").html(form);
        }
    })
  }

  function TampilData(){
      $.ajax({
        url: '/api/danajaminan',
        type: 'get',
        contentType: 'application/json',
        success: function(data){
          console.log(data);
          content(data);
        }
      })
  }

  function content(data) {
    let table = '';
    for (let i = 0; i < data.length; i++) {
      table += "<tr>";
      table += `<td class="text-center">
                            <div onclick="FormEdit(${data[i].id})">edit</div>
                          </td>`;
      table += "<td>" + data[i].id + "</td>";
      table += "<td>" + data[i].businessdate + "</td>";
      table += "<td>" + data[i].anggotaKliring[0].name + "</td>";
      table += "<td id='cek'>" + data[i].bank + "</td>";
      table += "<td>" + formatRupiah(data[i].jumlah) + "</td>";
      table += "<td>" + data[i].tanggalpenempatan + "</td>";
      table += "<td>" + data[i].jatuhtempo + "</td>";
      if (data[i].sukubunga != null) {
        table += "<td>" + data[i].sukubunga.toFixed(4) + "</td>";
      }
      if (data[i].admin != null) {
        table += "<td>" + formatRupiah(data[i].admin) + "</td>";
      }
      table += "</tr>";
    }
    $('#tbody').html(table);
  }

  function ubahAngka(angka,id){
    $('#'+id).val(formatRupiah(angka));
  }

  function reformat(angka, id){
      $("#"+id).val(reformatAngka(angka))
  }

  /* Fungsi formatRupiah */
  function formatRupiah(angka){
    // if(angka.includes(",") && angka.includes("."))
    //     return angka
    // else
        return new Intl.NumberFormat("id", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(angka)
  }

  function reformatAngka(angka){
      return angka = angka.replaceAll(".","").replaceAll(",", ".")
  }



  function SearchBydate(){
    var date1 = $("#date1").val();
    var date2 = $("#date2").val();
    var bank = $('#bank').val();

    if(date1 != '' && date2 != ''){
      date1 = date1.replaceAll("-", "/");
      date2 = date2.replaceAll("-", "/");
    }

    var data = 
    `{
      "bank":"`+bank+`",
      "date1":"`+date1+`",
      "date2":"`+date2+`"
    }`

    $.ajax({
      url:'/api/danajaminan/filter',
      type: 'post',
      contentType: 'application/json',
      data: data,
      success: function(data){
        console.log(data);
        content(data)
      }
    })
  }

  function ResetSearch(){
    $('#bank').val("");
    $('#date1').val("");
    $('#date2').val("");
  }

  function DateDiff(){
    var date1 = new Date($("#jatuhtempo").val());
    var date2 = new Date($("#tanggalpenempatan").val());
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return datediff;
  }

  function stopRKey(evt) { 
    var evt = (evt) ? evt : ((event) ? event : null); 
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
    if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
  }

  document.onkeypress = stopRKey;

  function calcInterest() {
    var jumlah = reformatAngka($("#jumlah").val());
    
    var datediff = DateDiff();
    var bungaBruto = (jumlah * $("#sukubunga").val() / 100) / 365 * datediff;
    var bungaNeto = parseFloat(bungaBruto) - parseFloat(bungaBruto * 20 / 100);

    $("#bunga").val(formatRupiah(bungaNeto.toFixed(4)));
  }

  function calcAdjusment() {
    var adjustment = $("#adjustment").val();
    var bunga = reformatAngka($("#bunga").val());
    var afterAdjustment = parseFloat(bunga) + parseFloat(adjustment);

    $("#afterAdjustment").val(formatRupiah(afterAdjustment.toFixed(4)));
  }

  $(document).ready(function() {
      TampilData();
  });

