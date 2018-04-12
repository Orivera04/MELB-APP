$(document).ready(function () {

    loadDataA();

});

//Load Data function

function loadDataA() {
    var Resultado

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Accesorio',

        type: 'GET',

        success: function (result) {
            //alert("listo");

            Resultado = JSON.parse(result);for (i = 0; i < Resultado.length; i++) 
            {      
                    Tabla_Accesorios.row.add( [
                    Resultado[i].ID_Instrumento,
                    Resultado[i].ID_Accesorio,
                    Resultado[i].Nombre,
                    Resultado[i].Descripcion,
                    'd'
                ] ).draw( false );                        
            }
        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });
}

//Add Data Function

function AddA() {

    var res = validateA();

    if (res == false) {

        return false;

    }
    
    var empObj = {

        ID_Accesorio: $('#IdAI').val(),

        ID_Instrumento: $('#IdA').val(),

        Nombre: $('#NombreA').val(),

        Descripcion: $('#DescripcionA').val()

    };

    //alert(valueB + ", " + codigoE + ", " + codigoP);

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Accesorio",

        data: JSON.stringify(empObj),

        type: "POST",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataA();

            $('#myModalA').modal('hide');

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Function for getting the Data Based upon Employee ID

function getbyIDA(EmpID) {
    var getResultado

    $('#IdAI').css('border-color', 'lightgrey');

    $('#IdA').css('border-color', 'lightgrey');

    $('#NombreA').css('border-color', 'lightgrey');

    $('#DescripcionA').css('border-color', 'lightgrey');

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Accesorio/' + EmpID,

        typr: 'GET',

        success: function (result) {

            getResultado = JSON.parse(result);

            $('#IdA').val(getResultado[0].ID_Accesorio);
            $('#IdA').prop('disabled', true);

            $('#IdAI').val(getResultado[0].ID_Instrumento);

            $('#NombreA').val(getResultado[0].Nombre);

            $('#DescripcionA').val(getResultado[0].Descripcion);

            $('#myModalA').modal('show');

            $('#btnUpdateA').show();

            $('#btnAddA').hide();

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

    return false;

}

//function for updating employee's record

function UpdateA() {

    var res = validateA();

    if (res == false) {

        return false;

    }

    var empObj = {

        ID_Accesorio: $('#IdA').val(),

        ID_Instrumento: $('#IdAI').val(),

        Nombre: $('#NombreA').val(),

        Descripcion: $('#DescripcionA').val()

    };

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Accesorio",

        data: JSON.stringify(empObj),

        type: "PUT",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataA();

            $('#myModalA').modal('hide');

            $('#IdAI').val("");

            $('#IdA').val("");

            $('#NombreA').val("");

            $('#DescripcionA').val("");

            $('#MarcaI').val("");

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function DeleleA(ID) {

    var ans = confirm("¿Seguro que quieres eliminar este registro?");

    if (ans) {

        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Accesorio/' + ID,

            type: 'DELETE',

            success: function (result) {

                loadDataA();

            },

            error: function (errormessage) {

                alert(errormessage.responseText);

            }

        });

    }

}

//Function for clearing the textboxes

function clearTextBoxA() {

    $('#IdAI').val("");

    $('#IdA').val("");

    $('#NombreA').val("");

    $('#DescripcionA').val("");

    $('#btnUpdateA').hide();

    $('#btnAddA').show();

    $('#IdAI').css('border-color', 'lightgrey');

    $('#IdA').css('border-color', 'lightgrey');

    $('#NombreA').css('border-color', 'lightgrey');

    $('#DescripcionA').css('border-color', 'lightgrey');

}

//Valdidation using jquery

function validateA() {

    var isValid = true;

    if (isNaN($('#IdA').val()) || $('#IdA').val().trim() == "") {

        $('#IdA').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#IdA').css('border-color', 'lightgrey');

    }

    if (isNaN($('#IdAI').val()) || $('#IdAI').val().trim() == "") {

        $('#IdAI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#IdAI').css('border-color', 'lightgrey');

    }

    if ($('#NombreA').val().trim() == "") {

        $('#NombreA').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#NombreA').css('border-color', 'lightgrey');

    }

    if ($('#DescripcionA').val().trim() == "") {

        $('#DescripcionA').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#DescripcionA').css('border-color', 'lightgrey');

    }    

    return isValid;

}
