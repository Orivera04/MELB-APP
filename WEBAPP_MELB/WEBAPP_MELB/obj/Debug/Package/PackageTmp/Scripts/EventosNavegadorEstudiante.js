$(document).ready(function (event)
{

    // Construcción de los formularios de la pagina //
    InicializacionEventos();
    InicializacionTablas();
    InicializacionControles(); 

    /* Peticiones AJAX */
    Cargar_InfoEstudiante();

});

function InicializacionControles() 
{
    /* Inicialziación de los controles de los formularios */

    /* Inputs : Numericos */
    $("input[name='ID_Estudiante']").TouchSpin({});

    /* Inptus : Combobox */
    $('.selectpicker').selectpicker({ noneResultsText: 'No se encontraron resultados' });

    /* Inputs : Mascara de caracteres */

    $('#Correo_Estudiante').maxlength
    ({
            alwaysShow: true,
            threshold: 25
    });

    $('#EstudianteCedula').maxlength
    ({
            alwaysShow: true,
            threshold: 14 
    });


    $('#EstudianteTelefono1').maxlength
    ({
        alwaysShow: true,
        threshold: 8
    });

    $('#EstudianteTelefono1').maxlength
    ({
            alwaysShow: true,
            threshold: 8
    });

    $('#EstudianteDireccion').maxlength
    ({
            alwaysShow: true,
            threshold: 100
    });

    /* Inputs : Fecha */

    $('#FechaNacimiento_Estudiante').dateDropper
    ({
        "data-format": 'd/m/Y',
    });



}

function InicializacionTablas()
{
    /* Inicialización de tablas de estudiante */

    Tabla_Inscripciones = $('#Inscripciones_T').DataTable
        ({
            "language":
                {
                    "lengthMenu": "Mostrar _MENU_ registros por pagina",
                    "zeroRecords": "No se encontraron datos",
                    "info": "Mostrando pagina _PAGE_ de _PAGES_",
                    "infoEmpty": "La busqueda no devolvio resultados",
                    "infoFiltered": "(Se busco en _MAX_ registros )",
                    "sSearch": "Buscar",
                    "paginate":
                        {
                            "next": "Siguiente pagina",
                            "previous": "Pagina anterior"
                        },
                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }],
                    "responsive": true,
                    "search": {
                        "caseInsensitive": false
                    }
                }
        });

}

function InicializacionEventos()
{
    /* Eventos del menu lateral */

    $('#PerfilSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'block';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'none';

    });

    $('#NotasSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'block';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'none';
    });

    $('#MatriculaSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'block';
        document.getElementById('Horario_Detalle').style.display = 'none';
    });

    $('#HorarioSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'none';
    });


}