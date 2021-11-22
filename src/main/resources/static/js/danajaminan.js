// main function
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

  function FormTambah(){
      let form = '';
      form += `
          <form onsubmit="event.preventDefault();">
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
                    <input type="date" class="form-control" id="tanggalpenempatan">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                  <div class="col-sm-8">
                    <input type="date" class="form-control" id="jatuhtempo">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="sukubunga" onblur="ubahAngka(this.value, this.id); calcInterest()" onfocus="reformat(this.value, this.id)">
                    <input type="text" class="form-control mt-2" id="bunga" readonly="readonly">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="adjustment" onblur="ubahAngka(this.value, this.id); calcAdjusment()" onfocus="reformat(this.value, this.id)">
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
              
              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="flag_bunga" class="col-sm-4 col-form-label">Bunga</label>
                  <div class="col-sm-8">
                    <select id="flag_bunga" class="form-control">
                      <option selected>-- Pilih --</option>
                      <option value="T">Transfer</option>
                      <option value="F">Tambah</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button type="submit" class="btn btn-sm btn-primary" onclick="save(this.value)">Simpan</button>
              <input type="reset" class="btn btn-sm btn-dark" value="batal"></input>
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
      $("#card-body").html(form);
  }

  function FormEdit(id){
    $.ajax({
      url: '/api/danajaminan/' + id,
      type: 'get',
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        var tanggalpenempatan = data.tanggalpenempatan.split("/");
        tanggalpenempatan = tanggalpenempatan[2]+'-'+tanggalpenempatan[0]+'-'+tanggalpenempatan[1];
        var jatuhtempo = data.jatuhtempo.split("/");
        jatuhtempo = jatuhtempo[2]+'-'+jatuhtempo[0]+'-'+jatuhtempo[1];
        
          let form = '';
            form += `
          <form onsubmit="event.preventDefault();">
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
                  <input type="text" class="form-control" id="jumlah" value="${formatRupiah(data.jumlah)}" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                <div class="col-sm-8">
                  <input type="date" class="form-control" id="tanggalpenempatan" placeholder="dd/mm/yy" value="${tanggalpenempatan}">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                <div class="col-sm-8">
                  <input type="date" class="form-control" id="jatuhtempo" placeholder="dd/mm/yy" value="${jatuhtempo}">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="sukubunga" value="${formatRupiah(data.sukubunga)}" onblur="ubahAngka(this.value, this.id); calcInterest()" onfocus="reformat(this.value, this.id)">
                  <input type="text" class="form-control mt-2" id="bunga" readonly="readonly">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="adjustment" value="${formatRupiah(data.adjustment)}" onblur="ubahAngka(this.value, this.id); calcAdjusment()" onfocus="reformat(this.value, this.id)">
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
                  <input type="text" class="form-control" id="transferdana" value="${formatRupiah(data.transferdana)}" onblur="ubahAngka(this.value, this.id)" onfocus="reformat(this.value, this.id)">
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

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="flag_bunga" class="col-sm-4 col-form-label">Bunga</label>
                <div class="col-sm-8">
                  <select id="flag_bunga" class="form-control">
                    <option selected>-- Pilih --</option>
                    <option value="T">Transfer</option>
                    <option value="F">Tambah</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button type="submit" class="btn btn-sm btn-primary" onclick="Update(${data.id})">Simpan</button>
            <input type="reset" class="btn btn-sm btn-dark" value="batal"></input>
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
                        str2 += `<option value="${akr[i].code}" ${data.code == akr[i].code ? "Selected" : ""}>${akr[i].name}</option>`
                    }
                    $('#code').html(str2)
                }
            })
            $("#card-body").html(form);
        }
    })
  }

  function save(){

    var bussinessDate = new Date();
    var today = (bussinessDate.getMonth()+1)+'/'+ bussinessDate.getDate()+'/'+bussinessDate.getFullYear();
    var datediff = DateDiff();
    var jumlah = reformatAngka($("#jumlah").val());
    var transferDana = reformatAngka($('#transferdana').val());
    var transferDanaKbi = reformatAngka($('#transferdanakbi').val());
    var adjustment = reformatAngka($("#adjustment").val());
    
    var bungaBruto = (jumlah * reformatAngka($("#sukubunga").val()) / 100) / 365 * datediff;
    var pph = bungaBruto * 20 / 100;
    var bungaNeto = parseFloat(bungaBruto) - parseFloat(bungaBruto * 20 / 100);
    var afterAdjustment = bungaNeto + parseFloat(adjustment);
    var penempatan = parseFloat(jumlah) + parseFloat(afterAdjustment) - parseFloat(transferDana) - parseFloat(transferDanaKbi);
    var tanggalpenempatan = new Date($('#tanggalpenempatan').val());
    tanggalpenempatan = (tanggalpenempatan.getMonth()+1)+'/'+ tanggalpenempatan.getDate()+'/'+tanggalpenempatan.getFullYear();
    var jatuhtempo = new Date($('#jatuhtempo').val());
    jatuhtempo = (jatuhtempo.getMonth()+1)+'/'+ jatuhtempo.getDate()+'/'+jatuhtempo.getFullYear();

    console.log(tanggalpenempatan);
    console.log(jatuhtempo);

    var submitted_data =
    `{
        "businessdate":"`+ today +`",
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "jumlah":"`+ reformatAngka($('#jumlah').val()) +`",
        "jangkawaktu":"`+ datediff +`",
        "tanggalpenempatan":"`+ tanggalpenempatan +`",
        "jatuhtempo":"`+ jatuhtempo +`",
        "sukubunga":"`+ reformatAngka($('#sukubunga').val()) +`",
        "bungabruto":"`+ toFixed(bungaBruto, 4) +`",
        "pph":"`+ toFixed(pph, 4) +`",
        "bunga":"`+ toFixed(afterAdjustment, 4) +`",
        "adjustment":"`+ reformatAngka($('#adjustment').val()) +`",
        "admin":"`+ reformatAngka($('#admin').val()) +`",
        "transferdana":"`+ reformatAngka($('#transferdana').val()) +`",
        "transferdanakbi":"`+ reformatAngka($('#transferdanakbi').val()) +`",
        "penempatan":"`+ toFixed(penempatan, 4) +`",
        "aro":"`+ $('#aro').val().substring(0,1) +`",
        "multiple":"`+ $('#multiple').val().substring(0,1) +`",
        "sequence":"`+ $('#sequence').val() +`",
        "flag":"`+ 0 +`",
        "flag_bunga":"`+ $('#flag_bunga').val() +`"
    }`;

    console.log(submitted_data);

    if($('#flag_bunga').val()=="T"){
      console.log("oke");
    }
    // $.ajax({
    //     url: "/api/danajaminan",
    //     type: "post",
    //     contentType: "application/json",
    //     data : submitted_data,
    //     success: function(){
    //         window.location.reload();
    //     }
    // })

  }

  function Update(id){
    // var bussinessDate = new Date();
    // var today = (bussinessDate.getMonth()+1)+'/'+ bussinessDate.getDate()+'/'+bussinessDate.getFullYear();
    var datediff = DateDiff();
    var jumlah = reformatAngka($("#jumlah").val());
    var transferDana = reformatAngka($('#transferdana').val());
    var transferDanaKbi = reformatAngka($('#transferdanakbi').val());
    var adjustment = reformatAngka($("#adjustment").val());
    
    var bungaBruto = (jumlah * reformatAngka($("#sukubunga").val()) / 100) / 365 * datediff;
    var pph = bungaBruto * 20 / 100;
    var bungaNeto = parseFloat(bungaBruto) - parseFloat(bungaBruto * 20 / 100);
    var afterAdjustment = bungaNeto + parseFloat(adjustment);
    var penempatan = parseFloat(jumlah) + parseFloat(afterAdjustment) - parseFloat(transferDana) - parseFloat(transferDanaKbi);
    var tanggalpenempatan = new Date($('#tanggalpenempatan').val());
    tanggalpenempatan = (tanggalpenempatan.getMonth()+1)+'/'+ tanggalpenempatan.getDate()+'/'+tanggalpenempatan.getFullYear();
    var jatuhtempo = new Date($('#jatuhtempo').val());
    jatuhtempo = (jatuhtempo.getMonth()+1)+'/'+ jatuhtempo.getDate()+'/'+jatuhtempo.getFullYear();

    console.log(tanggalpenempatan);
    console.log(jatuhtempo);

    var formData =
    `{
        "businessdate":"`+ tanggalpenempatan +`",
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "jumlah":"`+ reformatAngka($('#jumlah').val()) +`",
        "jangkawaktu":"`+ datediff +`",
        "tanggalpenempatan":"`+ tanggalpenempatan +`",
        "jatuhtempo":"`+ jatuhtempo +`",
        "sukubunga":"`+ reformatAngka($('#sukubunga').val()) +`",
        "bungabruto":"`+ toFixed(bungaBruto, 4) +`",
        "pph":"`+ toFixed(pph, 4) +`",
        "bunga":"`+ toFixed(afterAdjustment, 4) +`",
        "adjustment":"`+ reformatAngka($('#adjustment').val()) +`",
        "admin":"`+ reformatAngka($('#admin').val()) +`",
        "transferdana":"`+ reformatAngka($('#transferdana').val()) +`",
        "transferdanakbi":"`+ reformatAngka($('#transferdanakbi').val()) +`",
        "penempatan":"`+ toFixed(penempatan, 4) +`",
        "aro":"`+ $('#aro').val().substring(0,1) +`",
        "multiple":"`+ $('#multiple').val().substring(0,1) +`",
        "sequence":"`+ $('#sequence').val() +`",
        "flag":"`+ 0 +`",
        "flag_bunga":"`+ $('#flag_bunga').val() +`"
    }`;

    console.log(formData);
    // console.log(id);

    $.ajax({
        url:'/api/danajaminan/'+id,
        type: 'put' ,
        contentType:'application/json',
        data: formData,
        success: function(){
          alert('success');
        }
    });
  }





// function tambahan

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
        return new Intl.NumberFormat("id", {minimumFractionDigits: 2, maximumFractionDigits: 4}).format(angka)
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
        // console.log(data);
        content(data)
      }
    })

    $('#exportbutton').attr("href", `/api/danajaminan/export?bankParam=${bank}&date1Param=${date1}&date2Param=${date2}`);
  }

  // function ExportData(){
  //   var date1 = $("#date1").val();
  //   var date2 = $("#date2").val();
  //   var bank = $('#bank').val();

  //   if(date1 != '' && date2 != ''){
  //     date1 = date1.replaceAll("-", "/");
  //     date2 = date2.replaceAll("-", "/");
  //   }

  //   console.log(date1);
  //   console.log(date2);
  //   console.log(bank);

  //   $('#exportbutton').attr("href", `/api/danajaminan/export?bankParam=${bank}&date1Param=${date1}&date2Param=${date2}`);
    // window.location.href(`/api/danajaminan/export?bankParam=${bank}&date1Param=${date1}&date2Param=${date2}`);

  // }

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

  // function stopRKey(evt) { 
  //   var evt = (evt) ? evt : ((event) ? event : null); 
  //   var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  //   if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
  // }

  // document.onkeypress = stopRKey;

  function toFixed(num, fixed) {
      var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
      return num.toString().match(re)[0];
  }

  function calcInterest() {
    var jumlah = reformatAngka($("#jumlah").val());
    
    var datediff = DateDiff();
    var bungaBruto = (jumlah * reformatAngka($("#sukubunga").val()) / 100) / 365 * datediff;
    var bungaNeto = parseFloat(bungaBruto) - parseFloat(bungaBruto * 20 / 100);
    console.log(jumlah);
    console.log(datediff);
    console.log($("#sukubunga").val());

    $("#bunga").val(bungaNeto.toFixed(2));
    // console.log(toFixed(bungaNeto, 4));
  }

  function calcAdjusment() {
    var adjustment = reformatAngka($("#adjustment").val());
    var bunga = $("#bunga").val();
    console.log(adjustment);
    console.log(bunga);
    var afterAdjustment = parseFloat(bunga) + parseFloat(adjustment);

    $("#afterAdjustment").val(afterAdjustment.toFixed(2));
  }

  $(document).ready(function() {
      TampilData();
      $('#exportbutton').attr("href", `/api/danajaminan/export?bankParam=&date1Param=&date2Param=`);
  });

