﻿var AnimacionSideBar = false;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
$(document).ready(function (event)
{   
    swal({ title: 'Cargando', text: 'Espere por favor', type: 'info', allowOutsideClick: false });
    swal.showLoading();

    /* Verificamos si el navegador es de un telefono */
    if (EsTelefono == true)
    {            
        $('#content').css('margin-left', '0px');
        $('#sidebar').css('z-index', '2000');
        $('.selectpicker').selectpicker('mobile');
        AnimacionSideBar = true;
    }

    // Construcción de los formularios de la pagina //
    InicializacionEventos();
    InicializacionTablas();
    InicializacionControles(); 

    /* Peticiones AJAX */
    Cargar_InfoEstudiante();

    /* Cargar Imagenes para reportes */
    CargarImagenes();
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

    $('#EstudianteTelefono2').maxlength
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

    $('#FechaNacimiento_Estudiante').dateDropper();  
    $('#Matricula_Fecha').dateDropper();  
}

function InicializacionTablas()
{
    /* Inicialización de tablas de estudiante */

    Tabla_Inscripciones = $('#Inscripciones_T').DataTable
        ({
        responsive:
            {
                details: true
            },        
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
                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }]                   
            }
            
        });
   
    Tabla_Notas = $('#Notas_T').DataTable
        ({
            responsive:
                {
                    details: true
            },

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
                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
                }

        });

    Tabla_Pagos = $('#Pagos_T').DataTable
        ({
            responsive:
                {
                    details: true
                },

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
                    "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
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
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }

    });

    $('#NotasSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'block';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
    });

    $('#MatriculaSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'block';
        document.getElementById('Horario_Detalle').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
    });

    $('#HorarioSubMenu').click(function (event)
    {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'block';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
    });

    /* Eventos Barra de navegación */
    $('#sidebarCollapse').click(function (event)
    {
        $('#sidebar').show();
        if (AnimacionSideBar == false) {
            $('#sidebar').css('margin-left', '-110px');
            if (EsTelefono === false) { $('#content').css('margin-left', '0px'); }
            AnimacionSideBar = true;
        }
        else
        {
            if (EsTelefono == false) { $('#content').css('margin-left', '110px'); }
            $('#sidebar').css('margin-left', '0px');
            AnimacionSideBar = false;
        }
    });

    /* Eventos de formulario estudiante */

    $('#Switch_Editar').change(function ()
    {
        if ($('#Switch_Editar').prop('checked') == true)
        {
            ControlesLecturaEscritura(true);
            $('#BotonDatosAlumno').show(200);
        }
        else
        {
            ControlesLecturaEscritura(false);  
            $('#BotonDatosAlumno').hide(200);
        }
    });

    $('#BotonDatosAlumno').click(function (event)
    {
        if (ValidarCorreo($('#Correo_Estudiante').val()))
        {
            if ($('#EstudianteCedula').val() != "" && $('#EstudianteDireccion').val() != "" && $('#EstudianteTelefono1').val() != "" && $('#EstudianteTelefono2').val() != "")
            {
                if ($('#EstudianteTelefono1').val().length == 8 & $('#EstudianteTelefono2').val().length == 8) {
                    ActualizarInfoEstudiante();
                }
                else
                {
                    swal("Aviso", "Los numeros de telefonos deben ser de 8 digitos", "warning");
                }
            }
            else
            {
                swal("Aviso", "Algunos campos estan vacios", "warning");
            }
        }
        else
        {
            swal("Aviso", "El correo ingresado no es valido", "warning");
        }        
    });

    $('#EstudianteTelefono1').keypress(function (event) {
        if (!isNumber(event.key)) {
            event.preventDefault();
        }
    });

    $('#EstudianteTelefono2').keypress(function (event)
    {
        if (!isNumber(event.key)) {
            event.preventDefault();
        }
    });


    /* Eventos formulario Notas */

    $('#NotasBoton').click(function (event)
    {
        Cargar_Notas();
    });

    $('#Curso_Alumno').change(function (event)
    {
        var Indice = $("#Curso_Alumno option:selected").index()
        $('#Semestre').html('');
        $('#Año_Alumno').html('');

        for (I = 0; I < ListaSemestresPorCurso[Indice].ListaAño.length; I++) {
            $('#Año_Alumno').append('<option>' + ListaSemestresPorCurso[Indice].ListaAño[I].Cod_Año + '</option>');
        }

        for (I = 0; I < ListaSemestresPorCurso[Indice].ListaSemestre.length; I++) {
            if (ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Año == $('#Año_Alumno').val()) {
                $('#Semestre').append('<option>' + ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Semestre + '</option>');
            }
        }
        $('.selectpicker').selectpicker('refresh');
    });

    $('#Año_Alumno').change(function (event)
    {
        $('#Semestre').html('');
        var Indice = $("#Curso_Alumno option:selected").index()
        for (I = 0; I < ListaSemestresPorCurso[Indice].ListaSemestre.length; I++)
        {
            if (ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Año == $('#Año_Alumno').val()) {
                $('#Semestre').append('<option>' + ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Semestre + '</option>');
            }
        }
    });

    /* Eventos formulario Matricula */

    $('#MatriculaBoton').click(function (event)
    {
        CargarDatosMatricula();
    });

    $('#Curso_Alumno_Mat').change(function (event) {
        var Indice = $("#Curso_Alumno_Mat option:selected").index()
        $('#SemestreMat').html('');
        $('#Año_Alumno_Mat').html('');

        for (I = 0; I < ListaSemestresPorCurso[Indice].ListaAño.length; I++) {
            $('#Año_Alumno_Mat').append('<option>' + ListaSemestresPorCurso[Indice].ListaAño[I].Cod_Año + '</option>');
        }

        for (I = 0; I < ListaSemestresPorCurso[Indice].ListaSemestre.length; I++) {
            if (ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Año == $('#Año_Alumno').val()) {
                $('#SemestreMat').append('<option>' + ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Semestre + '</option>');
            }
        }
        $('.selectpicker').selectpicker('refresh');
    });

    $('#Año_Alumno_Mat').change(function (event) {
        $('#SemestreMat').html('');
        var Indice = $("#Curso_Alumno_Mat option:selected").index()
        for (I = 0; I < ListaSemestresPorCurso[Indice].ListaSemestre.length; I++) {
            if (ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Año == $('#Año_Alumno_Mat').val()) {
                $('#SemestreMat').append('<option>' + ListaSemestresPorCurso[Indice].ListaSemestre[I].Cod_Semestre + '</option>');
            }
        }
    });

}


function isNumber(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
}