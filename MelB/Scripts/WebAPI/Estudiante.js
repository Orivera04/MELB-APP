$(document).ready(function () {

    loadData();

});

//Load Data function

function loadData() {
    var Resultado

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Estudiante',

        type: 'GET',

        success: function (result) {
            //alert("listo");

            Resultado = JSON.parse(result);

            var html = '';

            for (i = 0; i < Resultado.length; i++) {//$.each(result, function (key, item) {

                IDEstuche[i] = Resultado[i].ID_Estuche;

                IDProveedor[i] = Resultado[i].ID_Proveedor;

                html += '<tr>';

                html += '<td>' + Resultado[i].ID_Instrumento + '</td>';

                html += '<td>' + Resultado[i].Nombre + '</td>';

                html += '<td>' + Resultado[i].Marca + '</td>';

                html += '<td>' + Resultado[i].Color + '</td>';

                html += '<td>' + Resultado[i].Nombre_Estuche + '</td>';

                html += '<td>' + Resultado[i].Proveedor + '</td>';

                html += '<td><a href="#" onclick="return getbyID(' + Resultado[i].ID_Instrumento + ')">Edit</a> | <a href="#" onclick="Delele(' + Resultado[i].ID_Instrumento + ')">Delete</a></td>';

                html += '</tr>';

            }//);

            $('.tbody').html(html);



        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });
}

//Add Data Function

function Add() {

    //var res = validate();

    //if (res == false) {

    //    return false;

    //}
    var valueB

    var codigoB = document.getElementById("numberubicacion").value;
    if (codigoB == 1) {
        valueB = 0;
    } else if (codigoB == 2) {
        valueB = 1;
    }
    var codigoE = document.getElementById("numberestuche").value;
    var codigoP = document.getElementById("numberproveedor").value;

    var empObj = {

        ID_Instrumento: $('#IdI').val(),

        Nombre: $('#NombreI').val(),

        Material: $('#MaterialI').val(),

        Color: $('#ColorI').val(),

        Imagen: $('#ImagenI').val(),

        Marca: $('#MarcaI').val(),

        Descripcion: $('#DescripcionI').val(),

        Esta_En_Bodega: valueB,

        Estado: $('#EstadoI').val(),

        ID_Estuche: codigoE,

        ID_Proveedor: codigoP


    };

    //alert(valueB + ", " + codigoE + ", " + codigoP);

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Estudiante",

        data: JSON.stringify(empObj),

        type: "POST",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadData();

            $('#myModal').modal('hide');

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Function for getting the Data Based upon Employee ID

function getbyID(EmpID) {
    var getResultado

    $('#NombreI').css('border-color', 'lightgrey');

    $('#MaterialI').css('border-color', 'lightgrey');

    $('#MarcaI').css('border-color', 'lightgrey');

    $('#ColorI').css('border-color', 'lightgrey');

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Estudiante/' + EmpID,

        typr: 'GET',

        success: function (result) {

            alert("entro");

            getResultado = JSON.parse(result);

            $('#IdI').val(getResultado.ID_Instrumento);

            $('#NombreI').val(getResultado.Nombre);

            $('#MaterialI').val(getResultado.Material);

            $('#ColorI').val(getResultado.Color);

            $('#ImagenI').val(getResultado.Imagen);

            $('#MarcaI').val(getResultado.Marca);

            $('#DescripcionI').val(getResultado.Descripcion);

            $('#EstadoI').val(getResultado.Estado);

            $('#myModal').modal('show');

            $('#btnUpdate').show();

            $('#btnAdd').hide();

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

    return false;

}

//function for updating employee's record

function Update() {

    //var res = validate();

    //if (res == false) {

    //    return false;

    //}

    var valueB

    var codigoB = document.getElementById("numberubicacion").value;
    if (codigoB == 1) {
        valueB = 0;
    } else if (codigoB == 2) {
        valueB = 1;
    }
    var codigoE = document.getElementById("numberestuche").value;
    var codigoP = document.getElementById("numberproveedor").value;

    var empObj = {

        ID_Instrumento: $('#IdI').val(),

        Nombre: $('#NombreI').val(),

        Material: $('#MaterialI').val(),

        Color: $('#ColorI').val(),

        Imagen: $('#ImagenI').val(),

        Marca: $('#MarcaI').val(),

        Descripcion: $('#DescripcionI').val(),

        Esta_En_Bodega: valueB,

        Estado: $('#EstadoI').val(),

        ID_Estuche: codigoE,

        ID_Proveedor: codigoP

    };

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Estudiante/",

        data: JSON.stringify(empObj),

        type: "UPDATE",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadData();

            $('#myModal').modal('hide');

            $('#EmployeeID').val("");

            $('#NombreI').val("");

            $('#MaterialI').val("");

            $('#ColorI').val("");

            $('#MarcaI').val("");

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function Delele(ID) {

    var ans = confirm("Are you sure you want to delete this Record?");

    if (ans) {

        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Estudiante/' + ID,

            type: 'DELETE',

            success: function (result) {

                loadData();

            },

            error: function (errormessage) {

                alert(errormessage.responseText);

            }

        });

    }

}

//Function for clearing the textboxes

function clearTextBoxStudent() {

    $('#IdStudent').val("");

    $('#NombreStudent').val("");

    $('#ApellidoStudent').val("");

    $('#CorreoStudent').val("");

    $('#btnUpdate').hide();

    $('#btnAdd').show();

    $('#NombreStudent').css('border-color', 'lightgrey');

    $('#ApellidoStudent').css('border-color', 'lightgrey');

    $('#CorreoStudent').css('border-color', 'lightgrey');

    $('#NTutorStudent').css('border-color', 'lightgrey');

}

//Valdidation using jquery

function validate() {

    var isValid = true;

    if ($('#Name').val().trim() == "") {

        $('#Name').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Name').css('border-color', 'lightgrey');

    }

    if ($('#Age').val().trim() == "") {

        $('#Age').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Age').css('border-color', 'lightgrey');

    }

    if ($('#State').val().trim() == "") {

        $('#State').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#State').css('border-color', 'lightgrey');

    }

    if ($('#Country').val().trim() == "") {

        $('#Country').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Country').css('border-color', 'lightgrey');

    }

    return isValid;

}