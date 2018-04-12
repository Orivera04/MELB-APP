var A;
var A;

var empObj = {

    ID_Remision: 2,

    ID_Estudiante: 4,

    Empleado_ID: 2,

    Fecha_Prestamo: "4-9-2016 03:00:10",

    Fecha_Entrega: "5-9-2016 03:00:10",

    ID_Estado_Remision: 1,

    ID_Instrumentos: 1025,

    Observaciones_Iniciales: "Shit Fuck",

    Observaciones_Finales: "Shit Fuck 2"

};

function Ejemplo()
{
    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Remision",

        data: JSON.stringify(empObj),

        type: "PUT",

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

//Resultado[i].Lista_Desglose.forEach(function (iteracion) {
//    html += '<td>' + iteracion.Nombre + '</td>';
//});

//$.each(Resultado[i].Lista_Desglose, function (key, item) {
//    if (Resultado[i].Lista_Desglose.length == 0) {
//        html += '<td>No asignado</td>';
//    } else {
//        html += '<td>' + item.Nombre + '</td>';
//    }
//});   