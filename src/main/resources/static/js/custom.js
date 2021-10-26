function OpenList() {
    $.ajax({
        url: '/api/category',
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            let table = "<table class='table table-bordered'>";
            table += "<tr> <th width='10%'>Index</th> <th>Category Code</th> <th>Category Name</th> <th>Action</th> </tr>"
            for (let i = 0; i < data.length; i++) {
                table += "<tr>";
                table += "<td class='text-center'>" + (i+1) + "</td>";
                table += "<td>" + data[i].categoryCode + "</td>";
                table += "<td>" + data[i].categoryName + "</td>";
                table += "<td><button class='btn btn-primary' value='" + data[i].id + "' onclick='FormEdit(this.value)'>Edit</button> <button class='btn btn-danger' value='" + data[i].id + "' onclick='Delete(this.value)'>Delete</button> </td>";
                table += "</tr>";
            }
            table += "</table>";
            $('#categoryList').html(table);
        }
    });
}

function OpenForm() {
    let form = "<table class='table table-bordered'>";
    form += "<tr>";
    form += "<td>Category Code </td>";
    form += "<td><input class='form-control' type='text' id='category_code'></td>";
    form += "</tr>";
    form += "<tr>";
    form += "<td>Category Name </td>";
    form += "<td><input class='form-control' type='text' id='category_name'></td>";
    form += "</tr>";
    form += "<tr>";
    form += "<td colspan='2'> <button class='btn btn-primary' onclick='SaveCategory()'>Save</button> </td>";
    form += "</tr>";
    form += "</table>";

    $('#categoryList').html(form)
}

function SaveCategory() {
    let formData = '{';
    formData += '"categoryCode":"' + $('#category_code').val() + '",';
    formData += '"categoryName":"' + $('#category_name').val() + '"';
    formData += '}';

    $.ajax({
        url: '/api/category',
        type: 'POST',
        contentType: 'application/json',
        data: formData,
        success: function (data) {
            OpenList();
        }
    });

    console.log('requestJSON: ', formData)
}

function FormEdit(id) {
    console.log('Update: ', id)
    $.ajax({
        url: '/api/category/'+id,
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
            let form = "<table class='table table-bordered'>";
            form += "<tr>";
            form += "<td>Category Code </td>";
            form += "<td><input class='form-control' type='text' id='category_code' value='" + data.categoryCode + "'></td>";
            form += "</tr>";
            form += "<tr>";
            form += "<td>Category Name </td>";
            form += "<td><input class='form-control' type='text' id='category_name' value='" + data.categoryName + "'></td>";
            form += "</tr>";
            form += "<tr>";
            form += "<td colspan='2'> <button class='btn btn-primary' onclick='UpdateCategory(this.value)'>Save</button> </td>";
            form += "</tr>";
            form += "</table>";

            $('#categoryList').html(form);

        }
    });
}

function Delete(id) {
    console.log('Delete: ', id)
    $.ajax({
        url: '/api/category/'+id,
        type: 'DELETE',
        contentType: 'application/json',
        success: function () {
            console.log('Delete: ', id)
        }
    });
}