var Tabla_HorarioProfesor;
var Tabla_CursosProfesor;
var AnimacionSideBar = false;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var FormularioActivo = "PerfilProfesor";

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

    swal.closeModal();

    /* Peticiones AJAX */
    

    /* Cargar Imagenes para reportes */

});

function InicializacionControles() 
{
    /* Inicialziación de los controles de los formularios */

    /* Inputs : Numericos */
    $("input[name='ID_Profesor']").TouchSpin({});
    $("input[name='ID_CursoDetalle']").TouchSpin({});

    /* Inptus : Combobox */
    $('.selectpicker').selectpicker
    ({
        noneResultsText: 'No se encontraron resultados',
        noneSelectedText: 'No hay datos'
    });

    /* Inputs : Mascara de caracteres */
    $('#Correo_Profesor').maxlength
    ({
            alwaysShow: true,
            threshold: 25
    });

    $('#ProfesorCedula').maxlength
    ({
            alwaysShow: true,
            threshold: 14 
    });

	$('#ProfesorTelefono1').maxlength
    ({
        alwaysShow: true,
        threshold: 8
    });

    $('#ProfesorTelefono2').maxlength
    ({
            alwaysShow: true,
            threshold: 8
    });

     $('#ProfesorDireccion').maxlength
    ({
            alwaysShow: true,
            threshold: 100
    });

    /* Tooltips */
    $('[data-toggle="tooltip"]').tooltip();  
}

function InicializacionTablas()
{
    /* Inicialización de tablas de estudiante */


    Tabla_HorarioProfesor = $('#HorarioProfesor_T').DataTable
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
        
        Tabla_ListadoEstudiantesCursos = $('#ListadoEstudiantes_T').DataTable
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

    	Tabla_CursosProfesor = $('#CursosProfesor_T').DataTable
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

function InicializacionEventos() {
    /* Eventos del menu lateral */

    $('#PerfilProfesorSubMenu').click(function (event) {
        document.getElementById('Profesor_Detalle').style.display = 'block';
        document.getElementById('Cursos_Profesor').style.display = 'none';
        document.getElementById('Horario_DetalleProfesor').style.display = 'none';
        document.getElementById('Curso_DetalleProfesor').style.display = 'none';
        document.getElementById('Estadistica_Profesor').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "PerfilProfesor";
    });

    $('#CursosProfesorSubMenu').click(function (event) {
    	document.getElementById('Profesor_Detalle').style.display = 'none';
    	document.getElementById('Cursos_Profesor').style.display = 'block';
    	document.getElementById('Horario_DetalleProfesor').style.display = 'none';
    	document.getElementById('Curso_DetalleProfesor').style.display = 'none';
    	document.getElementById('Estadistica_Profesor').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "CursosProfesor";
    });

    $('#HorarioProfesorSubMenu').click(function (event) {
    	document.getElementById('Profesor_Detalle').style.display = 'none';
    	document.getElementById('Cursos_Profesor').style.display = 'none';
    	document.getElementById('Horario_DetalleProfesor').style.display = 'block';
    	document.getElementById('Curso_DetalleProfesor').style.display = 'none';
    	document.getElementById('Estadistica_Profesor').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "HorarioProfesor";
    });

    $('#EstadisticaProfesorSubMenu').click(function (event) {
    	document.getElementById('Profesor_Detalle').style.display = 'none';
    	document.getElementById('Cursos_Profesor').style.display = 'none';
    	document.getElementById('Horario_DetalleProfesor').style.display = 'none';
    	document.getElementById('Curso_DetalleProfesor').style.display = 'none';
    	document.getElementById('Estadistica_Profesor').style.display = 'block';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "EstadisticaProfesor";
    });

    /* Eventos Barra de navegación */
    $('#sidebarCollapse').click(function (event) {
        $('#sidebar').show();
        if (AnimacionSideBar == false) {
            $('#sidebar').css('margin-left', '-110px');
            if (EsTelefono === false) { $('#content').css('margin-left', '0px'); }
            AnimacionSideBar = true;
        }
        else {
            if (EsTelefono == false) { $('#content').css('margin-left', '110px'); }
            $('#sidebar').css('margin-left', '0px');
            AnimacionSideBar = false;
        }
    }); 

}

function isNumber(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}