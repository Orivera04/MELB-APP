$(document).ready(function (event)
{



    // Construcción de los formularios de la pagina //
    InicializacionEventos();
    InicializacionTablas();
    InicializacionControles(); 

});

function InicializacionControles() 
{
    /* Inicialziación de los controles de los formularios */

    $("input[name='ID_Estudiante']").TouchSpin({});

    $('.selectpicker').selectpicker({ noneResultsText: 'No se encontraron resultados' });


}

function InicializacionTablas()
{


}

function InicializacionEventos()
{

}