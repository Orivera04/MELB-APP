function Cargar_Proveedores()
{
    var Resultado
    $.ajax({
        url: 'http://melbws.azurewebsites.net/api/Proveedor',
        type: 'GET',
        success: function (result) {
            //alert("listo");
            Resultado = JSON.parse(result);
            for (i = 0; i < Resultado.length; i++) 
            {      
                Tabla_Proveedor.row.add
                ([
                    Resultado[i].ID_Proveedor,
                    Resultado[i].Nombre,
                    Resultado[i].Telefono_1,
                    Resultado[i].Telefono_1,
                    Resultado[i].Correo,
                    Resultado[i].Direccion,
                    'd'

                ]).draw( false );
                $('#Proveedor_Instrumento').append('<option value="'+Resultado[i].Nombre+'"></option>');

            }
            $('select[name=Proveedor_Instrumento]').val(1);
            $('.selectpicker').selectpicker('refresh')
            Cargar_Remisiones();
        },
        error: function (Mensaje) 
        {
            swal
            ({
                  title: "Error listando proveedores",
                  text: "No se pudo conectar con el servidor.",
                  type: "error",
            });
        }
    });
}

//Add Data Function

function AddP() {

    var res = validateP();

    if (res == false) {

        return false;

    }
    

    var empObj = {

        ID_Proveedor: $('#IdP').val(),

        Nombre: $('#NombreP').val(),

        Telefono_1: $('#Tel1P').val(),

        Telefono_2: $('#Tel2P').val(),

        Correo: $('#CorreoP').val(),

        Direccion: $('#DireccionP').val(),

        Imagen: $('#ImagenP').val()  

    };

    //alert(valueB + ", " + codigoE + ", " + codigoP);

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Proveedor",

        data: JSON.stringify(empObj),

        type: "POST",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataP();

            $('#myModalP').modal('hide');

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Function for getting the Data Based upon Employee ID

function getbyIDP(EmpID) {
    var getResultado

    $('#IdP').css('border-color', 'lightgrey');

    $('#NombreP').css('border-color', 'lightgrey');

    $('#Tel1P').css('border-color', 'lightgrey');

    $('#Tel2P').css('border-color', 'lightgrey');

    $('#CorreoP').css('border-color', 'lightgrey');

    $('#DireccionP').css('border-color', 'lightgrey');

    $('#ImagenP').css('border-color', 'lightgrey');

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Proveedor/' + EmpID,

        typr: 'GET',

        success: function (result) {
            
            getResultado = JSON.parse(result);

            $('#IdP').val(getResultado[0].ID_Proveedor);
            $('#IdP').prop('disabled', true);

            $('#NombreP').val(getResultado[0].Nombre);

            $('#Tel1P').val(getResultado[0].Telefono_1);

            $('#Tel2P').val(getResultado[0].Telefono_2);

            $('#CorreoP').val(getResultado[0].Correo);

            $('#DireccionP').val(getResultado[0].Direccion);

            $('#ImagenP').val(getResultado[0].Imagen);

            $('#myModalP').modal('show');

            $('#btnUpdateP').show();

            $('#btnAddP').hide();

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

    return false;

}

//function for updating employee's record

function UpdateP() {

    var res = validateP();

    if (res == false) {

        return false;

    }

    var empObj = {

        ID_Proveedor: $('#IdP').val(),

        Nombre: $('#NombreP').val(),

        Telefono_1: $('#Tel1P').val(),

        Telefono_2: $('#Tel2P').val(),

        Correo: $('#CorreoP').val(),

        Direccion: $('#DireccionP').val(),

        Imagen: $('#ImagenP').val()

    };

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Proveedor",

        data: JSON.stringify(empObj),

        type: "PUT",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataP();

            $('#myModalP').modal('hide');

            $('#IdP').val("");

            $('#NombreP').val("");

            $('#CorreoP').val("");

            $('#Tel1P').val("");

            $('#Tel2P').val("");

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function DeleleP(ID) {

    var ans = confirm("¿Seguro que quieres eliminar este registro?");

    if (ans) {

        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Proveedor/' + ID,

            type: 'DELETE',

            success: function (result) {

                loadDataP();

            },

            error: function (errormessage) {

                alert(errormessage.responseText);

            }

        });

    }

}

//Function for clearing the textboxes

function clearTextBoxP() {

    $('#IdP').val("");

    $('#NombreP').val("");

    $('#Tel1P').val("");

    $('#Tel2P').val("");

    $('#CorreoP').val("");

    $('#DireccionP').val("");

    $('#ImagenP').val("");

    $('#btnUpdateP').hide();

    $('#btnAddP').show();

    $('#IdP').css('border-color', 'lightgrey');

    $('#NombreP').css('border-color', 'lightgrey');

    $('#Tel1P').css('border-color', 'lightgrey');

    $('#Tel2P').css('border-color', 'lightgrey');

    $('#CorreoP').css('border-color', 'lightgrey');

    $('#DireccionP').css('border-color', 'lightgrey');

    $('#ImagenP').css('border-color', 'lightgrey');

}

//Valdidation using jquery

function validateP() {

    var isValid = true;

    if (isNaN($('#IdP').val()) || $('#IdP').val().trim() == "") {

        $('#IdP').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#IdP').css('border-color', 'lightgrey');

    }

    if ($('#NombreP').val().trim() == "") {

        $('#NombreP').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#NombreP').css('border-color', 'lightgrey');

    }

    if (!(/^\d{8}$/.test($('#Tel1P').val()))) {

        $('#Tel1P').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Tel1P').css('border-color', 'lightgrey');

    }

    if (!(/^\d{8}$/.test($('#Tel2P').val()))) {

        $('#Tel2P').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#Tel2P').css('border-color', 'lightgrey');

    }

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!(re.test($('#CorreoP').val()))) {

        $('#CorreoP').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#CorreoP').css('border-color', 'lightgrey');

    }

    if ($('#DireccionP').val().trim() == "") {

        $('#DireccionP').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#DireccionP').css('border-color', 'lightgrey');

    }

    if ($('#ImagenP').val().trim() == "") {

        $('#ImagenP').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#ImagenP').css('border-color', 'lightgrey');

    }

    return isValid;

}