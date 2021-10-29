function FormTambah(){
    let form = '';
    form += `
        <!-- <form> -->
            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="anggotaKeliring" class="col-sm-4 col-form-label">Anggota Keliring</label>
                <div class="col-sm-8">
                  <select id="anggotaKeliring" class="form-control input-sm">
                    <option selected>PT Agrodana Futures</option>
                    <option>PT Asia Trade Point Futures</option>
                    <option>PT Askap Futures</option>
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
            
            <button type="submit" class="btn btn-sm btn-primary" onclick="TambahData(this.value)">Simpan</button>
            <button type="submit" class="btn btn-sm btn-dark" onclick="javascript:window.open('/danajaminan', '_self')">Batal</button>
        <!-- </form> -->
    `;
    $("#content").html(form);
}

function FormEdit(){
  let form = '';
    form += `
        <!-- <form> -->
          <h5>Edit Dana Jaminan</h5>
            <div class="row">
              <div class="form-group form-row col-md-6">
                <label for="anggotaKeliring" class="col-sm-4 col-form-label">Anggota Keliring</label>
                <div class="col-sm-8">
                  <select id="anggotaKeliring" class="form-control input-sm">
                    <option selected>PT Agrodana Futures</option>
                    <option>PT Asia Trade Point Futures</option>
                    <option>PT Askap Futures</option>
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
            
            <button type="submit" class="btn btn-sm btn-primary" onclick="TambahData(this.value)">Simpan</button>
            <button type="submit" class="btn btn-sm btn-dark" onclick="javascript:window.open('/danajaminan', '_self')">Batal</button>
        <!-- </form> -->
    `;
    $("#content").html(form);
}

function TampilData(){
    let table = '';
    table += `
      <div class="table-responsive mt-3">
        <table class="table table-bordered table-sm my-table">
          <thead>
            <tr>
              <th>
                  <div onclick="FormTambah()">Tambah</div>
              </th>
              <th>id</th>
              <th>businessdate</th>
              <th>code</th>
              <th>bank</th>
              <th>jumlah</th>
              <th>tanggalpenempatan</th>
              <th>jatuhtempo</th>
              <th>sukubunga</th>
              <th>admin</th>
            </tr>
          </thead>
          <tbody id="content">
            <tr>
                <td class="text-center">
                    <div onclick="FormEdit()">edit</div>
                </td>
                <td>5599</td>
                <td>10/26/2021</td>
                <td>PT Menara mas futures</td>
                <td>BCA</td>
                <td>100000000000.000</td>
                <td>9/20/2021</td>
                <td>10/21/2021</td>
                <td>2.68000</td>
                <td>0.0000</td>
            </tr>
            <tr>
                <td class="text-center">
                    <div onclick="FormEdit()">edit</div>
                </td>
                <td>5599</td>
                <td>10/26/2021</td>
                <td>PT Menara mas futures</td>
                <td>BCA</td>
                <td>100000000000.000</td>
                <td>9/20/2021</td>
                <td>10/21/2021</td>
                <td>2.68000</td>
                <td>0.0000</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    
    $('#content').html(table);
}

function TambahData(){
    var test = $('#bank').val();
    console.log(test);
}

$(document).ready(function() {
    TampilData();
});