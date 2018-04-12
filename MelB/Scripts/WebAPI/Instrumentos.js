//var Resultado, Contenido;

//$(
//    function () {
//        $.ajax({
//            url: 'http://melbws20180330015611.azurewebsites.net/api/Instrumentos',
//            type: 'GET',
//            success: function (result) {
//                Resultado = JSON.parse(result);
                
//                for (i = 0; i < Resultado.length; i++) { 
//                    Contenido+= "<tr><td>"
//                        + Resultado[i].Nombre+ "</td><td>"
//                        + Resultado[i].Marca + "</td><td>"
//                        + Resultado[i].Color + "</td><td>"
//                        + Resultado[i].Nombre_Estuche + "</td></tr>";
//                }
//                $('#ContenidoTI').append(Contenido)
                         
//            }
//        });
//    });

//Load Data in Table when documents is ready

var IDEstuche = [], IDProveedor = []

$(document).ready(function () {
    
    loadData();

});

//Load Data function

function loadData() {
    var Resultado

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Instrumentos',
        
        type: 'GET',

        success: function (result) {
            //alert("listo");

            Resultado = JSON.parse(result);
            

            for (i = 0; i < Resultado.length; i++) 
            {      

                     Tabla_Instrumento.row.add( [
                    Resultado[i].ID_Instrumento,
                    Resultado[i].Imagen,
                    Resultado[i].Nombre,
                    Resultado[i].Marca,
                    '<span class="label label-danger">'+Resultado[i].Ubicacion+'</span>',
                    'd',
                    'd'
                ] ).draw( false );                        
            }
        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });
}

function OpcionesEstuche() {
    select = document.getElementById('numberestuche');

    for (var i = 0; i < IDEstuche.length; i++) {
        var opt = document.createElement('option');
        if (i == 0) {
            opt.value = 0;
            opt.text = "Seleccione";
        } else {
            opt.value = IDEstuche[i];
            opt.text = IDEstuche[i];
        }
        select.appendChild(opt);
    }
}

function OpcionesProveedor() {
    select = document.getElementById('numberproveedor');

    for (var i = 0; i < IDProveedor.length; i++) {
        var opt = document.createElement('option');
        if (i == 0) {
            opt.value = 0;
            opt.text = "Seleccione";
        } else {
            opt.value = IDProveedor[i];
            opt.text = IDProveedor[i];
        }
        select.appendChild(opt);
    }
}

//Add Data Function

function Add() {

    var res = validate();

    if (res == false) {

        return false;

    }
    var codigoB = document.getElementById("numberubicacion").value;    
    var codigoE = document.getElementById("numberestuche").value;
    var codigoP = document.getElementById("numberproveedor").value;
        
    if (codigoB == 1) {
        var empObj = {

            ID_Instrumento: $('#IdI').val(),

            Nombre: $('#NombreI').val(),

            Material: $('#MaterialI').val(),

            Color: $('#ColorI').val(),

            Imagen: $('#ImagenI').val(),

            Marca: $('#MarcaI').val(),

            Descripcion: $('#DescripcionI').val(),

            Estado: $('#EstadoI').val(),

            ID_Estuche: codigoE,

            ID_Proveedor: codigoP,

            Tipo_Ubicacion: 1,

            Estante: $('#EstanteI').val(),

            Gaveta: $('#GavetaI').val()
        };
    } else if (codigoB == 2) {
        var empObj = {

            ID_Instrumento: $('#IdI').val(),

            Nombre: $('#NombreI').val(),

            Material: $('#MaterialI').val(),

            Color: $('#ColorI').val(),

            Imagen: $('#ImagenI').val(),

            Marca: $('#MarcaI').val(),

            Descripcion: $('#DescripcionI').val(),

            Estado: $('#EstadoI').val(),

            ID_Estuche: codigoE,

            ID_Proveedor: codigoP,

            Tipo_Ubicacion: 0,

            Numero_Aula: $('#NumAulaI').val(),

            Piso: $('#PisoI').val()
        };
    }

    //alert(valueB + ", " + codigoE + ", " + codigoP);

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Instrumentos",

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
    OpcionesEstuche();
    OpcionesProveedor();
    var getResultado

    // creamos un variable que hace referencia al select

    var ubicacion = document.getElementById("numberubicacion");
    var estuche = document.getElementById("numberestuche");
    var proveedor = document.getElementById("numberproveedor");

    $('#NombreI').css('border-color', 'lightgrey');

    $('#MaterialI').css('border-color', 'lightgrey');

    $('#MarcaI').css('border-color', 'lightgrey');

    $('#ColorI').css('border-color', 'lightgrey');

    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Instrumentos/' + EmpID,

        typr: 'GET',

        success: function (result) {

            getResultado = JSON.parse(result);

            $('#IdI').val(getResultado[0].ID_Instrumento);
            $('#IdI').prop('disabled', true);

            $('#NombreI').val(getResultado[0].Nombre);

            $('#MaterialI').val(getResultado[0].Material);

            $('#ColorI').val(getResultado[0].Color);

            $('#ImagenI').val(getResultado[0].Imagen);

            $('#MarcaI').val(getResultado[0].Marca);

            $('#DescripcionI').val(getResultado[0].Descripcion);

            $('#EstadoI').val(getResultado[0].Estado);

            //select.selectedIndex = 2;


            if (getResultado[0].Tipo_Ubicacion == "Bodega") {
                $('#EstanteI').val(getResultado[0].Estante);
                $('#GavetaI').val(getResultado[0].Gaveta);
                document.getElementById('Aula').style.display = 'none';
                document.getElementById('Bodega').style.display = 'block';
                var buscar = 1;
            } else if (getResultado[0].Tipo_Ubicacion == "Aula") {
                $('#NumAulaI').val(getResultado[0].Numero_Aula);
                $('#PisoI').val(getResultado[0].Piso);
                document.getElementById('Bodega').style.display = 'none';
                document.getElementById('Aula').style.display = 'block';
                var buscar = 2;
            }

            for (i = 0; i < ubicacion.length; i++) {
                if (ubicacion[i].value == buscar) {
                    ubicacion[i].selected = true;
                }
            }

            for (i = 0; i < estuche.length; i++) {
                if (estuche[i].value == getResultado[0].ID_Estuche) {
                    estuche[i].selected = true;
                }
            }

            for (i = 0; i < proveedor.length; i++) {
                if (proveedor[i].value == getResultado[0].ID_Proveedor) {
                    proveedor[i].selected = true;
                }
            }

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

    var res = validate();

    if (res == false) {

        return false;

    }

    var codigoB = document.getElementById("numberubicacion").value;
    var codigoE = document.getElementById("numberestuche").value;
    var codigoP = document.getElementById("numberproveedor").value;

    if (codigoB == 1) {
        var empObj = {

            ID_Instrumento: $('#IdI').val(),

            Nombre: $('#NombreI').val(),

            Material: $('#MaterialI').val(),

            Color: $('#ColorI').val(),

            Imagen: $('#ImagenI').val(),

            Marca: $('#MarcaI').val(),

            Descripcion: $('#DescripcionI').val(),

            Estado: $('#EstadoI').val(),

            ID_Estuche: codigoE,

            ID_Proveedor: codigoP,

            Tipo_Ubicacion: 1,

            Estante: $('#EstanteI').val(),

            Gaveta: $('#GavetaI').val()
        };
    } else if (codigoB == 2) {
        var empObj = {

            ID_Instrumento: $('#IdI').val(),

            Nombre: $('#NombreI').val(),

            Material: $('#MaterialI').val(),

            Color: $('#ColorI').val(),

            Imagen: $('#ImagenI').val(),

            Marca: $('#MarcaI').val(),

            Descripcion: $('#DescripcionI').val(),

            Estado: $('#EstadoI').val(),

            ID_Estuche: codigoE,

            ID_Proveedor: codigoP,

            Tipo_Ubicacion: 0,

            Numero_Aula: $('#NumAulaI').val(),

            Piso: $('#PisoI').val()
        };
    }

    $.ajax({

        url: "http://melbws.azurewebsites.net/api/Instrumentos",

        data: JSON.stringify(empObj),

        type: "PUT",

        contentType: "application/json;charset=utf-8",

        dataType: "json",

        success: function (result) {

            loadData();

            $('#myModal').modal('hide');

            $('#NombreI').val("");

            $('#MaterialI').val("");

            $('#ColorI').val("");

            $('#EstadoI').val("");

            $('#DescripcionI').val("");

        },

        error: function (errormessage) {

            alert(errormessage.responseText);

        }

    });

}

//function for deleting employee's record

function Delele(ID) {

    var ans = confirm("¿Seguro que quieres eliminar este registro?");

    if (ans) {

        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Instrumentos/' + ID,

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

function clearTextBox() {
    document.getElementById("numberubicacion").selectedIndex = 0;
    document.getElementById("numberestuche").selectedIndex = 0;
    document.getElementById("numberproveedor").selectedIndex = 0;
    document.getElementById('Bodega').style.display = 'none';
    document.getElementById('Aula').style.display = 'none';
    OpcionesEstuche();
    OpcionesProveedor();

    $('#IdI').val("");
    $('#IdI').prop('disabled', false);

    $('#NombreI').val("");

    $('#MaterialI').val("");

    $('#ColorI').val("");

    $('#ImagenI').val("");

    $('#MarcaI').val("");

    $('#DescripcionI').val("");

    $('#EstadoI').val("");

    $('#EstanteI').val("");

    $('#GavetaI').val("");

    $('#NumAulaI').val("");

    $('#PisoI').val("");

    $('#btnUpdate').hide();

    $('#btnAdd').show();

    //CSS//

    $('#IdI').css('border-color', 'lightgrey');

    $('#NombreI').css('border-color', 'lightgrey');

    $('#MaterialI').css('border-color', 'lightgrey');

    $('#ColorI').css('border-color', 'lightgrey');

    $('#ImagenI').css('border-color', 'lightgrey');

    $('#MarcaI').css('border-color', 'lightgrey');

    $('#DescripcionI').css('border-color', 'lightgrey');

    $('#EstadoI').css('border-color', 'lightgrey');

    $('#EstanteI').css('border-color', 'lightgrey');

    $('#GavetaI').css('border-color', 'lightgrey');

    $('#NumAulaI').css('border-color', 'lightgrey');

    $('#PisoI').css('border-color', 'lightgrey');
    
    //document.getElementById('numberubicacion').addEventListener("change", Seleccion);


}

//Valdidation using jquery

function validate() {

    var isValid = true;

    if (isNaN($('#IdI').val()) || $('#IdI').val().trim() == "") {

        $('#IdI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#IdI').css('border-color', 'lightgrey');

    }

    if ($('#NombreI').val().trim() == "") {

        $('#NombreI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#NombreI').css('border-color', 'lightgrey');

    }

    if ($('#MaterialI').val().trim() == "") {

        $('#MaterialI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#MaterialI').css('border-color', 'lightgrey');

    }

    if ($('#ColorI').val().trim() == "") {

        $('#ColorI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#ColorI').css('border-color', 'lightgrey');

    }

    if ($('#ImagenI').val().trim() == "") {

        $('#ImagenI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#ImagenI').css('border-color', 'lightgrey');

    }

    if ($('#MarcaI').val().trim() == "") {

        $('#MarcaI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#MarcaI').css('border-color', 'lightgrey');

    }

    if ($('#DescripcionI').val().trim() == "") {

        $('#DescripcionI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#DescripcionI').css('border-color', 'lightgrey');

    }

    if ($('#EstadoI').val().trim() == "") {

        $('#EstadoI').css('border-color', 'Red');

        isValid = false;

    }

    else {

        $('#EstadoI').css('border-color', 'lightgrey');

    }    

    ubicacion = document.getElementById("numberubicacion").selectedIndex;
    if (ubicacion == 0) {
        $('#numberubicacion').css('border-color', 'Red');
        isValid = false;
    }else if (ubicacion == 1) {
        $('#numberubicacion').css('border-color', 'lightgrey');

        if (isNaN($('#EstanteI').val()) || $('#EstanteI').val().trim() == "") {

            $('#EstanteI').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#EstanteI').css('border-color', 'lightgrey');

        }

        if (isNaN($('#GavetaI').val()) || $('#GavetaI').val().trim() == "") {

            $('#GavetaI').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#GavetaI').css('border-color', 'lightgrey');

        }
    } else if (ubicacion == 2) {
        $('#numberubicacion').css('border-color', 'lightgrey');

        if (isNaN($('#NumAulaI').val()) || $('#NumAulaI').val().trim() == "") {

            $('#NumAulaI').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#NumAulaI').css('border-color', 'lightgrey');

        }

        if (isNaN($('#PisoI').val()) || $('#PisoI').val().trim() == "") {

            $('#PisoI').css('border-color', 'Red');

            isValid = false;

        }

        else {

            $('#PisoI').css('border-color', 'lightgrey');

        }

    }

    estuche = document.getElementById("numberestuche").selectedIndex;
    if (estuche == 0) {
        $('#numberestuche').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#numberestuche').css('border-color', 'lightgrey');
    }

    proveedor = document.getElementById("numberproveedor").selectedIndex;
    if (proveedor == 0) {
        $('#numberproveedor').css('border-color', 'Red');
        isValid = false;
    } else {
        $('#numberproveedor').css('border-color', 'lightgrey');
    }

    return isValid;

}

function Seleccion(event) {
    if (document.getElementById('numberubicacion').value == "0") {
        document.getElementById('Aula').style.display = 'none';
        document.getElementById('Bodega').style.display = 'none';

    }else if (document.getElementById('numberubicacion').value == "1") {
        document.getElementById('Aula').style.display = 'none';
        document.getElementById('Bodega').style.display = 'block';

    }
    else if (document.getElementById('numberubicacion').value == "2") {
        document.getElementById('Bodega').style.display = 'none';
        document.getElementById('Aula').style.display = 'block';

    }
}

