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
                    <input type="text" class="form-control" id="jumlah">
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
                  <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="jatuhtempo" placeholder="dd/mm/yy">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" id="sukubunga" onblur="calcInterest()">
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
                    <input type="text" class="form-control" id="adjustment" onblur="calcAdjusment();">
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
                    <input type="text" class="form-control" id="transferdana">
                  </div>
                </div>
                <div class="form-group form-row col-md-6">
                  <label for="transferdanakbi" class="col-sm-4 col-form-label">Transfer Dana Ke KBI</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="transferdanakbi">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group form-row col-md-6">
                  <label for="admin" class="col-sm-4 col-form-label">Biaya Admin</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="admin">
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
    var submitted_data =
    `{
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "jumlah":"`+ $('#jumlah').val() +`",
        "tanggalpenempatan":"`+ $('#tanggalpenempatan').val() +`",
        "jatuhtempo":"`+ $('#jatuhtempo').val() +`",
        "transferdana":"`+ $('#transferdana').val() +`",
        "sukubunga":"`+ $('#sukubunga').val() +`",
        "adjustment":"`+ $('#adjustment').val() +`",
        "bunga":"`+ $('#afterAdjustment').val() +`",
        "admin":"`+ $('#admin').val() +`",
        "transferdanakbi":"`+ $('#transferdanakbi').val() +`",
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
                  <input type="text" class="form-control" id="jumlah" value="${data.penempatan}">
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
                  <input type="text" class="form-control" id="sukubunga" onblur="calcInterest()" value="${data.sukubunga}">
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
                  <input type="text" class="form-control" id="adjustment" onblur="calcAdjusment();" value="${data.adjustment}">
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
                  <input type="text" class="form-control" id="transferdana" value="${data.transferdana}">
                </div>
              </div>
              <div class="form-group form-row col-md-6">
                <label for="transferdanakbi" class="col-sm-4 col-form-label">Transfer Dana Ke KBI</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="transferdanakbi" value="${data.transferdanakbi}">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="admin" class="col-sm-4 col-form-label">Biaya Admin</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="admin" value="${data.admin}">
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
        url: 'api/danajaminan',
        type: 'get',
        contentType: 'application/json',
        success: function(data){
          // console.log(data);
          let table = ''
          for (let i = 0; i < data.length; i++) {
              table += "<tr>";
              table += `<td class="text-center">
                          <div onclick="FormEdit(${data[i].id})">edit</div>
                        </td>`;
              table += "<td>" + data[i].id + "</td>";
              table += "<td>" + data[i].businessdate+ "</td>";
              table += "<td>" + data[i].code+ "</td>";
              table += "<td>" + data[i].bank+ "</td>";
              table += "<td>" + data[i].jumlah+ "</td>";
              table += "<td>" + data[i].tanggalpenempatan+ "</td>";
              table += "<td>" + data[i].jatuhtempo+ "</td>";
              table += "<td>" + data[i].sukubunga.toFixed(4)+ "</td>";
              table += "<td>" + data[i].admin.toFixed(4)+ "</td>";
              table += "</tr>";
          }
          $('#tbody').html(table);
        }
      })
  }


  $(document).ready(function() {
      TampilData();
  });

  function stopRKey(evt) { 
    var evt = (evt) ? evt : ((event) ? event : null); 
    var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
    if ((evt.keyCode == 13) && (node.type=="text"))  {return false;} 
  }

  document.onkeypress = stopRKey;

  function calcInterest() {
    var date1 = $("#jatuhtempo").val();
    var match = /(\d+)\/(\d+)\/(\d+)/.exec(date1)
    var start_date = new Date(match[3], match[2], match[1]);
    var date2 = $("#tanggalpenempatan").val();
    var match = /(\d+)\/(\d+)\/(\d+)/.exec(date2)
    var end_date = new Date(match[3], match[2], match[1]);
    var timeDiff = Math.abs(end_date.getTime() - start_date.getTime());
    var datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var bungaBruto = ($("#jumlah").val() * $("#sukubunga").val() / 100) / 365 * datediff;
    var bungaNeto = parseFloat(bungaBruto) - parseFloat(bungaBruto * 20 / 100);

    $("#bunga").val(bungaNeto.toFixed(2));
  }

  function calcAdjusment() {
    var adjustment = $("#adjustment").val();
    var bunga = $("#bunga").val();
    var afterAdjustment = parseFloat(bunga) + parseFloat(adjustment);

    $("#afterAdjustment").val(afterAdjustment.toFixed(2));
  }

