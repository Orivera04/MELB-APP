var edicion = false;

$(document).ready(function () {

    loadDataR();

});

//Load Data function

function loadDataR() {
    var Resultado

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Remision',

        type: 'GET',

        success: function (result) {

            Resultado = JSON.parse(result);

            var html = '';

            for (i = 0; i < Resultado.length; i++) {

                //if (Resultado[i].Lista_Desglose.length == 0) {
                    
                //}

                html += '<tr>';

                html += '<td>' + Resultado[i].ID_Remision + '</td>';

                html += '<td>' + Resultado[i].Nombre_Estudiante + '</td>';

                html += '<td>' + Resultado[i].Fecha_Prestamo + '</td>';

                html += '<td>' + Resultado[i].Fecha_Entrega + '</td>';

                html += '<td>' + Resultado[i].Estado_Remision + '</td>';

                html += '<td>' + Resultado[i].Empleado_Nombre + '</td>';

                html += '<td>';

                Resultado[i].Lista_Desglose.forEach(function (iteracion) {
                    if (Resultado[i].Lista_Desglose.length > 0) {

                        html += iteracion.Nombre + "   ";
                        //html += '<td>' + iteracion.Nombre + '</td>';
                    }
                });

                html += '</td>';

                html += '<td><a href="#" onclick="return getbyIDR(' + Resultado[i].ID_Remision + ')">Editar</a> | <a href="#" onclick="DeleleR(' + Resultado[i].ID_Remision + ')">Eliminar</a></td>';

                html += '</tr>';

                

            }//);

            $('.tbodyR').html(html);

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });
}

//Add Data Function

function AddR() {

    var res = validateR();

    if (res == false) {

        return false;

    }

    var empObj = {

        ID_Remision: $('#IdR').val(),

        ID_Estudiante: $('#IdSR').val(),

        Empleado_ID: $('#IdCR').val(),

        Fecha_Prestamo: $('#datetimepicker1').val(),

        Fecha_Entrega: $('#datetimepicker2').val(),

        ID_Estado_Remision: 1,

        ID_Instrumentos: $('#IdIR').val(),

        Observaciones_Iniciales: $('#ObsR').val(),

    };

    //var codigoIdER = document.getElementById("numberIdER").value;

    //if (codigoIdER == 1) {
    //    var empObj = {

    //        ID_Remision: $('#IdR').val(),

    //        ID_Estudiante: $('#IdSR').val(),

    //        Empleado_ID: $('#IdCR').val(),

    //        Fecha_Prestamo: $('#datetimepicker1').val(),

    //        Fecha_Entrega: $('#datetimepicker2').val(),

    //        ID_Estado_Remision: 1,

    //        ID_Instrumentos: $('#IdIR').val(),

    //        Observaciones_Iniciales: $('#ObsR').val(),

    //    };
    //} else if (codigoIdER == 2) {
    //    var empObj = {

    //        ID_Remision: $('#IdR').val(),

    //        ID_Estudiante: $('#IdSR').val(),

    //        Empleado_ID: $('#IdCR').val(),

    //        Fecha_Prestamo: $('#datetimepicker1').val(),

    //        Fecha_Entrega: $('#datetimepicker2').val(),

    //        ID_Estado_Remision: 0,

    //        ID_Instrumentos: $('#IdIR').val(),

    //        Observaciones_Iniciales: $('#ObsR').val(),

    //    };
    //}


    //alert(valueB + ", " + codigoE + ", " + codigoP);

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Remision",

        data: JSON.stringify(empObj),

        type: "POST",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataR();

            $('#myModalR').modal('hide');

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//Function for getting the Data Based upon Employee ID

function getbyIDR(EmpID) {
    edicion = true;

    var getResultado

    var ubicacion = document.getElementById("numberIdER");

    $('#IdR').css('border-color', 'lightgrey');

    $('#IdSR').css('border-color', 'lightgrey');

    $('#IdCR').css('border-color', 'lightgrey');

    $('#IdIR').css('border-color', 'lightgrey');

    $('#ObsR').css('border-color', 'lightgrey');

    $('#ObsFR').css('border-color', 'lightgrey');

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Remision/' + EmpID,

        typr: 'GET',

        success: function (result) {

            getResultado = JSON.parse(result);

            var Inst = '', ObsI = '', ObsF = '';

            for (i = 0; i < getResultado.length; i++) {

                getResultado[i].Lista_Desglose.forEach(function (iteracion) {
                    if (getResultado[i].Lista_Desglose.length > 0) {                        
                        Inst += iteracion.ID_Instrumento + ",";
                        ObsI += iteracion.Observacion_Inicial + ",";
                        ObsF += iteracion.Observacion_Final + ",";
                        //html += '<td>' + iteracion.Nombre + '</td>';
                    }
                });
            }          

            if (getResultado[0].Estado_Remision == "Activa") {
                var buscar = 1;
            } else if (getResultado[0].Estado_Remision == "No Activa") {
                var buscar = 2;
            }

            for (i = 0; i < ubicacion.length; i++) {
                if (ubicacion[i].value == buscar) {
                    ubicacion[i].selected = true;
                }
            }

            $('#divIdEtiR').hide();
            $('#divIdER').show();

            $('#IdR').val(getResultado[0].ID_Remision);
            $("#IdR").prop('disabled', true);

            $('#IdSR').val(getResultado[0].Nombre_Estudiante);
            $('#IdSR').prop('disabled', true);

            $('#IdCR').val(getResultado[0].Empleado_Nombre);
            $('#IdCR').prop('disabled', true);

            $('#datetimepicker1').val(getResultado[0].Fecha_Prestamo);
            $('#datetimepicker1').prop('disabled', true);

            $('#datetimepicker2').val(getResultado[0].Fecha_Entrega);
            $('#datetimepicker2').prop('disabled', true);

            $('#IdIR').val(Inst.substring(0, Inst.length - 1));
            $('#IdIR').prop('disabled', true);

            $('#ObsR').val(ObsI.substring(0, ObsI.length - 1));

            $('#divObsFR').show();
            $('#ObsFR').val(ObsF.substring(0, ObsF.length - 1));

            $('#myModalR').modal('show');

            $('#btnUpdateR').show();

            $('#btnAddR').hide();

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

    return false;

}

//function for updating employee's record

function UpdateR() {

    var res = validateR();

    if (res == false) {

        return false;

    }   

    var codigoIdER = document.getElementById("numberIdER").value;

    if (codigoIdER == 1) {
        var empObj = {

            ID_Remision: $('#IdR').val(),

            ID_Estudiante: 2,//$('#IdSR').val(),

            Empleado_ID: 4,//$('#IdCR').val(),

            Fecha_Prestamo: $('#datetimepicker1').val(),

            Fecha_Entrega: $('#datetimepicker2').val(),

            ID_Estado_Remision: 1,

            ID_Instrumentos: $('#IdIR').val(),

            Observaciones_Iniciales: $('#ObsR').val(),

            Observaciones_Finales: $('#ObsFR').val()
            
        };
    } else if (codigoIdER == 2) {
        var empObj = {

            ID_Remision: $('#IdR').val(),

            ID_Estudiante: 2,//$('#IdSR').val(),

            Empleado_ID: 4,//$('#IdCR').val(),

            Fecha_Prestamo: $('#datetimepicker1').val(),

            Fecha_Entrega: $('#datetimepicker2').val(),

            ID_Estado_Remision: 0,

            ID_Instrumentos: $('#IdIR').val(),

            Observaciones_Iniciales: $('#ObsR').val(),

            Observaciones_Finales: $('#ObsFR').val()
            
        };
    }

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Remision",

        data: JSON.stringify(empObj),

        type: "PUT",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadDataR();

            $('#myModalR').modal('hide');

            $('#IdR').val("");

            $('#IdSR').val("");

            $('#datetimepicker1').val("");

            $('#ObsR').val("");

            $('#IdCR').val("");

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function DeleleR(ID) {

    var ans = confirm("¿Seguro que quieres eliminar este registro?");

    if (ans) {

        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Remision/' + ID,

            type: 'DELETE',

            success: function (result) {

                loadDataR();

            },

            error: function (errormessage) {

                alert(errormessage.responseText);

            }

        });

    }

}

//Function for clearing the textboxes

function clearTextBoxR() {
    edicion = false;

    $("#IdR").prop('disabled', false);
    $('#IdSR').prop('disabled', false);
    $('#IdCR').prop('disabled', false);
    $('#datetimepicker1').prop('disabled', false);
    $('#datetimepicker2').prop('disabled', false);
    $('#IdIR').prop('disabled', false);

    $('#IdR').val("");

    $('#IdSR').val("");

    $('#IdCR').val("");

    $('#datetimepicker1').val("");

    $('#datetimepicker2').val("");

    $('#IdIR').val("");

    $('#ObsR').val("");

    $('#IdEtiR').val("Activa");
    $('#IdEtiR').prop('disabled', true);

    $('#divIdER').hide();

    $('#divObsFR').hide();

    $('#btnUpdateR').hide();

    $('#btnAddR').show();

    $('#IdR').css('border-color', 'lightgrey');

    $('#IdSR').css('border-color', 'lightgrey');

    $('#IdCR').css('border-color', 'lightgrey');

    $('#datetimepicker1').css('border-color', 'lightgrey');

    $('#datetimepicker2').css('border-color', 'lightgrey');

    $('#IdIR').css('border-color', 'lightgrey');

    $('#ObsR').css('border-color', 'lightgrey');

}

//Valdidation using jquery

function validateR() {

    var isValid = true;    

    if (edicion) {
        estado = document.getElementById("numberIdER").selectedIndex;
        if (estado == 0) {
            $('#numberIdER').css('border-color', 'Red');
            isValid = false;
        } else {
            $('#numberIdER').css('border-color', 'lightgrey');
        }

        if ($('#ObsR').val().trim() == "") {

            $('#ObsR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#ObsR').css('border-color', 'lightgrey');

        }

        if ($('#ObsFR').val().trim() == "") {

            $('#ObsFR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#ObsFR').css('border-color', 'lightgrey');

        }
    } else {
        if (isNaN($('#IdR').val()) || $('#IdR').val().trim() == "") {

            $('#IdR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#IdR').css('border-color', 'lightgrey');

        }

        if (isNaN($('#IdSR').val()) || $('#IdSR').val().trim() == "") {

            $('#IdSR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#IdSR').css('border-color', 'lightgrey');

        }

        if (isNaN($('#IdCR').val()) || $('#IdCR').val().trim() == "") {

            $('#IdCR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#IdCR').css('border-color', 'lightgrey');

        }

        if ($('#datetimepicker1').val().trim() == "") {

            $('#datetimepicker1').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#datetimepicker1').css('border-color', 'lightgrey');

        }

        if ($('#datetimepicker2').val().trim() == "") {

            $('#datetimepicker2').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#datetimepicker2').css('border-color', 'lightgrey');

        }

        estado = document.getElementById("numberIdER").selectedIndex;
        if (estado == 0) {
            $('#numberIdER').css('border-color', 'Red');
            isValid = false;
        } else {
            $('#numberIdER').css('border-color', 'lightgrey');
        }

        if ($('#IdIR').val().trim() == "") {

            $('#IdIR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#IdIR').css('border-color', 'lightgrey');

        }

        if ($('#ObsR').val().trim() == "") {

            $('#ObsR').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#ObsR').css('border-color', 'lightgrey');

        }
    }

    

    return isValid;

}
