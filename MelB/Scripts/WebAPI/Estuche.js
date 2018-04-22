function Cargar_Estuches() {
    var Resultado

    $.ajax(
    {

        url: 'http://melbws.azurewebsites.net/api/Estuche',

        type: 'GET',

        success: function (result) 
        {
            Resultado = JSON.parse(result); 
            for (i = 0; i < Resultado.length; i++) 
            {      
                Tabla_Estuche.row.add
                ([
                    Resultado[i].ID_Estuche,
                    Resultado[i].Nombre,
                    Resultado[i].Marca,
                    Resultado[i].Material,
                    Resultado[i].Color,
                    Resultado[i].Estado,
                    'd'
                ] ).draw( false ); 
                $('#Estuche_Instrumento').append('<option data-subtext="'+Resultado[i].Nombre+'">'+Resultado[i].ID_Estuche+'</option>'); 
            }       
            $('select[name=Estuche_Instrumento]').val(1);
            $('.selectpicker').selectpicker('refresh');  
            Cargar_Proveedores();
        },

        error: function (Mensaje) 
        {
           swal
            ({
                  title: "Error listando estuches",
                  text: "No se pudo conectar con el servidor.",
                  type: "error",
            });
        }

    });
}

//Add Data Function

function AddE() {

    var res = validateE();

    if (res == false) {

        return false;

    }

    var empObj = {

        ID_Estuche: $('#IdE').val(),

        Nombre: $('#NombreE').val(),

        Marca: $('#MarcaE').val(),

        Material: $('#MaterialE').val(),

        Color: $('#ColorE').val(),

        Estado: $('#EstadoE').val()    


    };

    //alert(valueB + ", " + codigoE + ", " + codigoP);

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Estuche",

        data: JSON.stringify(empObj),

        type: "POST",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataE();

            $('#myModalE').modal('hide');

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Function for getting the Data Based upon Employee ID

function getbyIDE(EmpID) {
    var getResultado

    $('#IdE').css('border-color', 'lightgrey');

    $('#NombreE').css('border-color', 'lightgrey');

    $('#MarcaE').css('border-color', 'lightgrey');

    $('#Material').css('border-color', 'lightgrey');

    $('#ColorE').css('border-color', 'lightgrey');

    $('#EstadoE').css('border-color', 'lightgrey');

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Estuche/' + EmpID,

        typr: 'GET',

        success: function (result) {

            getResultado = JSON.parse(result);

            $('#IdE').val(getResultado[0].ID_Estuche);
            $('#IdE').prop('disabled', true);

            $('#NombreE').val(getResultado[0].Nombre);

            $('#MaterialE').val(getResultado[0].Material);

            $('#ColorE').val(getResultado[0].Color);

            $('#MarcaE').val(getResultado[0].Marca);

            $('#EstadoE').val(getResultado[0].Estado);

            $('#myModalE').modal('show');

            $('#btnUpdateE').show();

            $('#btnAddE').hide();

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

    return false;

}

//function for updating employee's record

function UpdateE() {

    var res = validateE();

    if (res == false) {

        return false;

    }   

    var empObj = {

        ID_Estuche: $('#IdE').val(),

        Nombre: $('#NombreE').val(),

        Marca: $('#MarcaE').val(),

        Material: $('#MaterialE').val(),

        Color: $('#ColorE').val(),

        Estado: $('#EstadoE').val()    


    };

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Estuche",

        data: JSON.stringify(empObj),

        type: "PUT",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataE();

            $('#myModalE').modal('hide');

            $('#IdE').val("");

            $('#NombreE').val("");

            $('#MaterialE').val("");

            $('#ColorE').val("");

            $('#MarcaE').val("");

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function DeleleE(ID) {

    var ans = confirm("Are you sure you want to delete this Record?");

    if (ans) {

        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Estuche/' + ID,

            type: 'DELETE',

            success: function (result) {

                loadDataE();

            },

            error: function (errormessage) {

                alert(errormessage.responseText);

            }

        });

    }

}

//Function for clearing the textboxes

function clearTextBoxE() {

    $('#IdE').val("");

    $('#NombreE').val("");

    $('#MaterialE').val("");

    $('#ColorE').val("");

    $('#MarcaE').val("");

    $('#EstadoE').val("");

    $('#btnUpdateE').hide();

    $('#btnAddE').show();

    $('#IdE').css('border-color', 'lightgrey');

    $('#NombreE').css('border-color', 'lightgrey');

    $('#MarcaE').css('border-color', 'lightgrey');

    $('#MaterialE').css('border-color', 'lightgrey');

    $('#ColorE').css('border-color', 'lightgrey');

    $('#EstadoE').css('border-color', 'lightgrey');

}

//Valdidation using jquery

function validateE() {

    var isValid = true;

    if (isNaN($('#IdE').val()) || $('#IdE').val().trim() == "") {

        $('#IdE').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#IdE').css('border-color', 'lightgrey');

    }

    if ($('#NombreE').val().trim() == "") {

        $('#NombreE').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#NombreE').css('border-color', 'lightgrey');

    }

    if ($('#MarcaE').val().trim() == "") {

        $('#MarcaE').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#MarcaE').css('border-color', 'lightgrey');

    }

    if ($('#MaterialE').val().trim() == "") {

        $('#MaterialE').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#MaterialE').css('border-color', 'lightgrey');

    }

    if ($('#ColorE').val().trim() == "") {

        $('#ColorE').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#ColorE').css('border-color', 'lightgrey');

    }

    if ($('#EstadoE').val().trim() == "") {

        $('#EstadoE').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#EstadoE').css('border-color', 'lightgrey');

    }

    return isValid;

}