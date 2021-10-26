// ajax get
$(document).ready(function() {
  $.ajax({
    url: '/api/mahasiswa',
    type: 'get',
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
      let table = ''
      for (let i = 0; i < data.length; i++) {
          table += "<tr>";
          table += "<td>" + (i + 1) + "</td>";
          table += "<td>" + data[i].nim + "</td>";
          table += "<td>" + data[i].nama+ "</td>";
          table += "<td>" + data[i].alamat+ "</td>";
          table += "<td>" + data[i].jurusan+ "</td>";
          table += `<td class="text-center">
              <button onclick=Delete(`+data[i].id+`) class="btn btn-sm btn-danger">hapus</button>
              <button onclick=FormEdit(`+data[i].id+`) class="btn btn-sm btn-info">edit</button>
            </td>`;
          table += "</tr>";
      }
      $('#content').html(table);
      $('.my-table').DataTable();
    }
  })
});

// ajax delete
function Delete(id) {
  let isDelete = window.confirm("Are you sure?");
  if(isDelete){
    $.ajax({
      url: '/api/mahasiswa/'+id,
      type: 'delete',
      contentType: 'application/json',
      success: function() {
        window.location.reload();
      }
    })
  }
}

// ajax edit
function FormEdit(id){
  $.ajax({
    url: '/api/mahasiswa/'+id,
    type: 'get',
    contentType: 'application/json',
    success: function(data){
      $('#exampleModal').modal('show');
      $('#nim').val(data.nim);
      $('#nama').val(data.nama);
      $('#alamat').val(data.alamat);
      $('#jurusan').val(data.jurusan);
      $('#btn-edit').val(data.id);
    }
  })
}

function Update(id){
  var formData ='{' ;
      formData +='"nim":"' + $('#nim').val() + '",' ;
      formData +='"nama":"' + $('#nama').val() + '",' ;
      formData +='"alamat":"' + $('#alamat').val() + '",' ;
      formData +='"jurusan":"' + $('#jurusan').val() + '"' ;
      formData +='}' ;
      // console.log(formData);

      $.ajax({
        url:'/api/mahasiswa/'+id,
        type: 'put' ,
        contentType:'application/json',
        data: formData,
        success: function(){
            //OpenList(0,5);
            // getAllData(0,5);
            // $('#exampleModal').modal('hide');
            window.location.reload();
        }
    });
}
