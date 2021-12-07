$(document).ready(function(){
    $.ajax({
        url:'/api/danacollateral',
        type:'get',
        contentType:'application/json',
        success:function(result) {
            setTBody(result);
        }
    })

    // $('#exportbutton').attr("href", `/api/danacollateral/export?bankParam=&date1Param=&date2Param=`);
})

function setTBody(result) {
    var str = "";
    for (i = 0; i < result.length; i++) {
        str +=
            `<tr>
                <td><div class="text-center"><span onclick="edit(${result[i].id})">Edit</span></div></td>
                <td>${result[i].id}</td>
                <td>${result[i].businessdate}</td>
                <td>${result[i].anggotaKliring[0].name}</td>
                <td>${result[i].bank}</td>
                <td>${formatAngka(result[i].nominal)}</td>
                <td>${result[i].tanggalpenempatan}</td>
                <td>${result[i].jatuhtempo}</td>
                <td>${formatAngka(result[i].sukubunga)}</td>
            </tr>`;
    }

    $('#tbody').html(str);
}

function searchFiltered() {
    var bank = $("#myInput").val()
    var date1 = $("#startDate").val()
    var date2 = $("#endDate").val()

    date1 = date1.replaceAll("-", "/")
    date2 = date2.replaceAll("-", "/")

    var submitted_data =
    `{
        "bank":"`+ bank +`",
        "date1":"`+ date1 +`",
        "date2":"`+ date2 +`"
    }`;

    $.ajax({
        url:'/api/danacollateral/filter',
        type:'post',
        data: submitted_data,
        contentType:'application/json',
        success:function(result) {
            setTBody(result)
        }
    })
};

function reset(){
    $("#myInput").val("")
    $("#startDate").val("")
    $("#endDate").val("")
}

function exportData(){
    var bank = $("#myInput").val()
    var date1 = $("#startDate").val()
    var date2 = $("#endDate").val()
    if(date1 != '' && date2 != ''){
        date1 = date1.replaceAll("-", "/");
        date2 = date2.replaceAll("-", "/");
    }
    // $('#exportbutton').attr("href", `/api/danacollateral/export?bankParam=${bank}&date1Param=${date1}&date2Param=${date2}`);
    window.location.assign(`/api/danacollateral/export?bankParam=${bank}&date1Param=${date1}&date2Param=${date2}`, "Download")

  }

function format(angka, id){
    $("#"+id).val(formatAngka(angka))
}

function reformat(angka, id){
    $("#"+id).val(reformatAngka(angka))
}

function formatAngka(angka){
    // if(angka.includes(",") && angka.includes("."))
    //     return angka
    // else
        return new Intl.NumberFormat("id", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(angka)
}

function reformatAngka(angka){
    return angka = angka.replaceAll(".","").replaceAll(",", ".")
}


function calcInterest() {
    var jumlah = reformatAngka($("#jumlah").val())
    var sukuBunga = reformatAngka($("#sukubunga").val())

    var datediff = calcDatediff();
    var bungaBruto = (jumlah * sukuBunga / 100) / 365 * datediff
    var bungaNeto = parseFloat(bungaBruto) - parseFloat(bungaBruto * 20 / 100)

    // console.log(bungaNeto)
    $("#bunga").val(formatAngka(bungaNeto.toFixed(2)));
}

function calcDatediff() {
    var date1 = new Date($("#jatuhtempo").val())
    var date2 = new Date($("#tanggalpenempatan").val())

    var timeDiff = Math.abs(date1.getTime() - date2.getTime())
    var datediff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return datediff;
}

function calcAdjustment() {
    var adjustment = reformatAngka($("#adjustment").val())
    var bunga = reformatAngka($("#bunga").val())
    // console.log(adjustment)
    // console.log(bunga)

    var afterAdjustment = parseFloat(bunga) + parseFloat(adjustment)

    $("#afterAdjustment").val(formatAngka(afterAdjustment.toFixed(2)))
    // $("#afterAdjustment").val(afterAdjustment.toFixed(2))
}

function add(){
    var str = ''
    str = 
    `<h3>Create</h3>
                    
    <form onsubmit="event.preventDefault();">
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="code" class="col-sm-4 col-form-label">Anggota Kliring</label>
                <div class="col-sm-8">
                    <select id="code" class="form-control">
                    </select>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="bank" class="col-sm-4 col-form-label">Bank</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="bank" required>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="jumlah" class="col-sm-4 col-form-label">Penempatan Baru</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="jumlah" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id)" required>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="tanggalpenempatan" required>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                <div class="col-sm-8">
                    <input type="date" class="form-control" id="jatuhtempo" required>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="transferdana" class="col-sm-4 col-form-label">Transfer Dana</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="transferdana" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id)" required>
                    <span id="alerttransfer" class="text-danger d-none">transfer dana harus sama dengan bunga after adjustment dan tidak boleh 0</span> 
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="sukubunga" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id);calcInterest();" required>
                </div>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="bunga" readonly>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="adjustment" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id);calcAdjustment();" required>
                </div>
            </div>
        </div>
            
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="afterAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" id="afterAdjustment" readonly>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                <div class="col-sm-8">
                    <select id="aro" class="form-control" required>
                        <option selected hidden disabled value="">-- Pilih --</option>
                        <option value="T">True</option>
                        <option value="F">False</option>
                    </select>
                </div>
            </div>
        </div>
            
        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="multiple" class="col-sm-4 col-form-label">Multiple</label>
                <div class="col-sm-8">
                    <select id="multiple" class="form-control" required>
                        <option selected hidden disabled value="">-- Pilih --</option>
                        <option value="T">True</option>
                        <option value="F">False</option>
                    </select>
                </div>
            </div>
            <div class="form-group form-row col-md-6">
                <label for="sequence" class="col-sm-4 col-form-label">Sequence</label>
                <div class="col-sm-8">
                    <input type="number" class="form-control" id="sequence" required>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group form-row col-md-6">
                <label for="flagBunga" class="col-sm-4 col-form-label">Bunga</label>
                <div class="col-sm-8">
                    <select id="flagBunga" class="form-control" required>
                        <option selected hidden disabled value="">-- Pilih --</option>
                        <option value="T">Transfer</option>
                        <option value="F">Tambah</option>
                    </select>
                </div>
            </div>
        </div>
        
        <button type="submit" class="btn btn-sm btn-primary" onclick="save()">Simpan</button>
        <button type="reset" class="btn btn-sm btn-dark">Batal</button>
    </form>`

    $.ajax({
        url: '/api/anggotakliring/',
        type: 'get',
        contentType: 'application/json',
        success: function(akResult) {
            var str2 = ''
            for (i = 0; i < akResult.length; i++) {
                str2 += `<option value="${akResult[i].code}">${akResult[i].name}</option>`
            }
            $('#code').html(str2)
        }
    })

    $('#card-body').html(str)
}

function save(){
    var today = new Date()
    var businessDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear()
    var temp_tglPenempatan = new Date($('#tanggalpenempatan').val())
    var tanggalPenempatan = (temp_tglPenempatan.getMonth()+1) + "/" + temp_tglPenempatan.getDate() + "/" + temp_tglPenempatan.getFullYear()
    var temp_jatuhTempo = new Date($('#jatuhtempo').val())
    var jatuhTempo = (temp_jatuhTempo.getMonth()+1) + "/" + temp_jatuhTempo.getDate() + "/" + temp_jatuhTempo.getFullYear()
    var datediff = calcDatediff()
    var bungaBruto = reformatAngka($("#jumlah").val()) * reformatAngka($("#sukubunga").val()) / 100 / 365 * datediff
    var pph = parseFloat(bungaBruto * 20 / 100)

    var adjustment = reformatAngka($("#adjustment").val())
    var bunga = reformatAngka($("#bunga").val())
    var afterAdjustment = (parseFloat(bunga) + parseFloat(adjustment)).toFixed(2)

    var penempatan = (parseFloat(reformatAngka($('#jumlah').val())) + parseFloat(afterAdjustment) - parseFloat(reformatAngka($('#transferdana').val())).toFixed(2))
    var flag = 0
    var admin = 0
    var submitted_data =
    `{
        "businessdate":"`+ businessDate +`",
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "nominal":"`+ reformatAngka($('#jumlah').val()) +`",
        "tanggalpenempatan":"`+ tanggalPenempatan +`",
        "jatuhtempo":"`+ jatuhTempo +`",
        "jangkawaktu":"`+ datediff +`",
        "sukubunga":"`+ reformatAngka($('#sukubunga').val()) +`",
        "bungabruto":"`+ bungaBruto +`",
        "pph":"`+ pph +`",
        "adjustment":"`+ reformatAngka($('#adjustment').val()) +`",
        "bunganetto":"`+ afterAdjustment +`",
        "bungatransfer":"`+ reformatAngka($('#transferdana').val()) +`",
        "penempatan":"`+ penempatan +`",
        "aro":"`+ $('#aro').val() +`",
        "multiple":"`+ $('#multiple').val() +`",
        "sequence":"`+ $('#sequence').val() +`",
        "flag":"`+ flag +`",
        "admin":"`+ admin +`",
        "flag_bunga":"` + $('#flagBunga').val() + `"
    }`

    // console.log(submitted_data)

    if($('#flagBunga').val() == "T"){
        if(reformatAngka($('#transferdana').val()) == afterAdjustment && reformatAngka($('#transferdana').val()) != 0){
            $('#alerttransfer').addClass('d-none')
            $.ajax({
                url: "/api/danacollateral",
                type: "post",
                contentType: "application/json",
                data : submitted_data,
                success: function(){
                    window.location.reload()
                }
            })
        } else {
            $('#alerttransfer').removeClass('d-none')
        }
    } else if($('#flagBunga').val() == "F"){
        $.ajax({
            url: "/api/danacollateral",
            type: "post",
            contentType: "application/json",
            data : submitted_data,
            success: function(){
                window.location.reload()
            }
        })
    }
}

function edit(id){
    $.ajax({
        url:"/api/danacollateral/"+id,
        type:"get",
        contentType:"application/json",
        success:function(result) {
            var temp_tanggalPenempatan = result.tanggalpenempatan.split("/")
            var tanggalpenempatan = temp_tanggalPenempatan[2] + "-" + temp_tanggalPenempatan[0] + "-" + temp_tanggalPenempatan[1]
            var temp_jatuhTempo = result.jatuhtempo.split("/")
            var jatuhtempo = temp_jatuhTempo[2] + "-" + temp_jatuhTempo[0] + "-" + temp_jatuhTempo[1]
            var str = ''
            str = 
            `<h3>Edit</h3>
                            
            <form onsubmit="event.preventDefault();">
                <input type="hidden" id="id" value="${result.id}" disabled>
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="code" class="col-sm-4 col-form-label">Anggota Kliring</label>
                        <div class="col-sm-8">
                            <select id="code" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="bank" class="col-sm-4 col-form-label">Bank</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="bank" value="${result.bank}" required>
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="jumlah" class="col-sm-4 col-form-label">Penempatan Baru</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="jumlah" value="${formatAngka(result.nominal)}" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id)" required>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="tanggalpenempatan" class="col-sm-4 col-form-label">Tanggal Penempatan</label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control" id="tanggalpenempatan" value="${tanggalpenempatan}" required>
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="jatuhtempo" class="col-sm-4 col-form-label">Tanggal Jatuh Tempo</label>
                        <div class="col-sm-8">
                            <input type="date" class="form-control" id="jatuhtempo" value="${jatuhtempo}" required>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="transferdana" class="col-sm-4 col-form-label">Transfer Dana</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="transferdana" value="${formatAngka(result.bungatransfer)}" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id)" required>
                            <span id="alerttransfer" class="text-danger d-none">transfer dana harus sama dengan bunga after adjustment dan tidak boleh 0</span>
                        </div>
                    </div>
                </div>
        
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="sukubunga" class="col-sm-4 col-form-label">Suku Bunga</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="sukubunga" value="${formatAngka(result.sukubunga)}" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id);calcInterest();" required>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="bunga" readonly>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="adjustment" class="col-sm-4 col-form-label">Adjustment Bunga</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="adjustment" value="${formatAngka(result.adjustment)}" onfocus="reformat(this.value, this.id)" onblur="format(this.value, this.id);calcAdjustment();" required>
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="afterAdjustment" class="col-sm-4 col-form-label">Bunga Setelah Adjustment</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="afterAdjustment" readonly>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="aro" class="col-sm-4 col-form-label">ARO</label>
                        <div class="col-sm-8">
                            <select id="aro" class="form-control">
                                <option value="T" ${result.aro != null ? result.aro.toUpperCase() == "T" ? "Selected" : "" : ""}>True</option>
                                <option value="F" ${result.aro != null ? result.aro.toUpperCase() == "F" ? "Selected" : "" : ""}>False</option>
                            </select>
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="form-group form-row col-md-6">
                        <label for="multiple" class="col-sm-4 col-form-label">Multiple</label>
                        <div class="col-sm-8">
                            <select id="multiple" class="form-control">
                                <option value="T" ${result.multiple != null ? result.multiple.toUpperCase() == "T" ? "Selected" : "" : ""}>True</option>
                                <option value="F" ${result.multiple != null ? result.multiple.toUpperCase() == "F" ? "Selected" : "" : ""}>False</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group form-row col-md-6">
                        <label for="sequence" class="col-sm-4 col-form-label">Sequence</label>
                        <div class="col-sm-8">
                            <input type="number" class="form-control" id="sequence" value="${result.sequence}" required>
                        </div>
                    </div>
                </div>

                <div class="row"> 
                    <div class="form-group form-row col-md-6">
                        <label for="flagBunga" class="col-sm-4 col-form-label">Bunga</label>
                        <div class="col-sm-8">
                            <select id="flagBunga" class="form-control">
                                <option value="T" ${result.flag_bunga != null ? result.flag_bunga.toUpperCase() == "T" ? "Selected" : "" : ""}>Transfer</option>
                                <option value="F" ${result.flag_bunga != null ? result.flag_bunga.toUpperCase() == "F" ? "Selected" : "" : ""}>Tambah</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-sm btn-primary" onclick="update()">Simpan</button>
                <button type="reset" class="btn btn-sm btn-dark">Batal</button>
            </form>`

            $.ajax({
                url: '/api/anggotakliring/',
                type: 'get',
                contentType: 'application/json',
                success: function(akResult) {
                    var str2 = ''
                    for (i = 0; i < akResult.length; i++) {
                        str2 += `<option value="${akResult[i].code}" ${result.code == akResult[i].code ? "Selected" : ""}>${akResult[i].name}</option>`
                    }
                    $('#code').html(str2)
                }
            })

            $('#card-body').html(str)
        }
    })
}

function update(){
    calcInterest()
    calcAdjustment()
    var today = new Date()
    var businessDate = (today.getMonth()+1) + "/" + today.getDate() + "/" + today.getFullYear()
    var temp_tglPenempatan = new Date($('#tanggalpenempatan').val())
    var tanggalPenempatan = (temp_tglPenempatan.getMonth()+1) + "/" + temp_tglPenempatan.getDate() + "/" + temp_tglPenempatan.getFullYear()
    var temp_jatuhTempo = new Date($('#jatuhtempo').val())
    var jatuhTempo = (temp_jatuhTempo.getMonth()+1) + "/" + temp_jatuhTempo.getDate() + "/" + temp_jatuhTempo.getFullYear()
    var datediff = calcDatediff()
    var bungaBruto = reformatAngka($("#jumlah").val()) * reformatAngka($("#sukubunga").val()) / 100 / 365 * datediff
    var pph = parseFloat(bungaBruto * 20 / 100)

    var adjustment = reformatAngka($("#adjustment").val())
    var bunga = reformatAngka($("#bunga").val())
    var afterAdjustment = (parseFloat(bunga) + parseFloat(adjustment)).toFixed(2)

    var penempatan = (parseFloat(reformatAngka($('#jumlah').val())) + parseFloat(afterAdjustment) - parseFloat(reformatAngka($('#transferdana').val())).toFixed(2))
    var flag = 0
    var admin = 0

    var submitted_data =
    `{
        "id":"`+ $('#id').val() +`",
        "businessdate":"`+ businessDate +`",
        "code":"`+ $('#code').val() +`",
        "bank":"`+ $('#bank').val() +`",
        "nominal":"`+ reformatAngka($('#jumlah').val()) +`",
        "tanggalpenempatan":"`+ tanggalPenempatan +`",
        "jatuhtempo":"`+ jatuhTempo +`",
        "jangkawaktu":"`+ datediff +`",
        "sukubunga":"`+ reformatAngka($('#sukubunga').val()) +`",
        "bungabruto":"`+ bungaBruto +`",
        "pph":"`+ pph +`",
        "adjustment":"`+ reformatAngka($('#adjustment').val()) +`",
        "bunganetto":"`+ afterAdjustment +`",
        "bungatransfer":"`+ reformatAngka($('#transferdana').val()) +`",
        "penempatan":"`+ penempatan +`",
        "aro":"`+ $('#aro').val() +`",
        "multiple":"`+ $('#multiple').val() +`",
        "sequence":"`+ $('#sequence').val() +`",
        "flag":"`+ flag +`",
        "admin":"`+ admin +`",
        "flag_bunga":"` + $('#flagBunga').val() + `"
    }`;

    // console.log(submitted_data)

    if($('#flagBunga').val() == "T"){
        if(reformatAngka($('#transferdana').val()) == afterAdjustment && reformatAngka($('#transferdana').val()) != 0){
            $('#alerttransfer').addClass('d-none')
            $.ajax({
                url: "/api/danacollateral",
                type: "put",
                contentType: "application/json",
                data : submitted_data,
                success: function(){
                    window.location.reload();
                }
            })
        } else {
            $('#alerttransfer').removeClass('d-none')
        }
    } else if($('#flagBunga').val() == "F"){
        $.ajax({
            url: "/api/danacollateral",
            type: "put",
            contentType: "application/json",
            data : submitted_data,
            success: function(){
                window.location.reload();
            }
        })
    }
}
