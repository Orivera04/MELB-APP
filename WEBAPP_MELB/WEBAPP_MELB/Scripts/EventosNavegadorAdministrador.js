var BanderaCerrar = false;
var AnimacionSideBar = false;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var FormularioActivo = "Inicio";
var Tabla_EstudiantesR;
var Tabla_ProfesoresR;
var Tabla_AdministradoresA;
var Tabla_Matriculas;
var Tabla_Pagos;

$(document).ready(function (event) {
    swal({ title: 'Cargando', text: 'Espere por favor', type: 'info', allowOutsideClick: false });
    swal.showLoading();

    /* Verificamos si el navegador es de un telefono */
    if (EsTelefono == true) {
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
    //Cargar_InfoAdministrador();

    /* Cargar Imagenes para reportes */
    //CargarImagenes();
});

function InicializacionEventos() {

    /* Eventos del menu lateral */
    $('#menuinicio').click(function (event) {
        document.getElementById('Inicio').style.display = 'block';
        document.getElementById('Administrador_Detalle').style.display = 'none';
        document.getElementById('Estudiantes').style.display = 'none';
        document.getElementById('Profesores').style.display = 'none';
        document.getElementById('Administradores').style.display = 'none';
        document.getElementById('Matriculas').style.display = 'none';
        document.getElementById('Pagos').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Inicio";
    });

    $('#PerfilSubMenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'block';
        document.getElementById('Estudiantes').style.display = 'none';
        document.getElementById('Profesores').style.display = 'none';
        document.getElementById('Administradores').style.display = 'none';
        document.getElementById('Matriculas').style.display = 'none';
        document.getElementById('Pagos').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Administrador_Detalle";
    });

    $('#estudiantessubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'none';
        document.getElementById('Estudiantes').style.display = 'block';
        document.getElementById('Profesores').style.display = 'none';
        document.getElementById('Administradores').style.display = 'none';
        document.getElementById('Matriculas').style.display = 'none';
        document.getElementById('Pagos').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Estudiantes";
    });

    $('#profesoressubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'none';
        document.getElementById('Estudiantes').style.display = 'none';
        document.getElementById('Profesores').style.display = 'block';
        document.getElementById('Administradores').style.display = 'none';
        document.getElementById('Matriculas').style.display = 'none';
        document.getElementById('Pagos').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Profesores";
    });

    $('#administradoressubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'none';
        document.getElementById('Estudiantes').style.display = 'none';
        document.getElementById('Profesores').style.display = 'none';
        document.getElementById('Administradores').style.display = 'block';
        document.getElementById('Matriculas').style.display = 'none';
        document.getElementById('Pagos').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Administradores";
    });

    $('#matriculassubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'none';
        document.getElementById('Estudiantes').style.display = 'none';
        document.getElementById('Profesores').style.display = 'none';
        document.getElementById('Administradores').style.display = 'none';
        document.getElementById('Matriculas').style.display = 'block';
        document.getElementById('Pagos').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Matriculas";
    });

    $('#pagossubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'none';
        document.getElementById('Estudiantes').style.display = 'none';
        document.getElementById('Profesores').style.display = 'none';
        document.getElementById('Administradores').style.display = 'none';
        document.getElementById('Matriculas').style.display = 'none';
        document.getElementById('Pagos').style.display = 'block';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Pagos";
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

    /*Evento para editar informacion del administrador*/
    $('#Switch_Editar_Administrador').change(function () {
        if ($('#Switch_Editar_Administrador').prop('checked') == true) {
            //ControlesLecturaEscritura(true);
            $('#BotonDatosAdministrador').show(200);
        }
        else {
            //ControlesLecturaEscritura(false);
            $('#BotonDatosAdministrador').hide(200);
        }
    });

    /*Eventos para cerrar sesion*/
    $('#Perfil').click(function (event) {
        $('#MenuEmergente').show(200);
        BanderaCerrar = true;
        TimeOut = setTimeout(function () { if (BanderaCerrar == true) { $('#MenuEmergente').hide(200); } }, 6000);
    });

    $('#MenuEmergente').mouseenter(function (event) {
        BanderaCerrar = false;
    });

    $('#MenuEmergente').mouseleave(function (Event) {
        $('#MenuEmergente').hide(200);
    });
}

function InicializacionControles() {
    $('#BotonDatosAdministrador').hide();
}

function InicializacionTablas() {

    /* Inicialización de las tablas de Usuarios*/
    Tabla_EstudiantesR = $('#Estudiantes_T').DataTable
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

    Tabla_ProfesoresR = $('#Profesor_T').DataTable
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

    Tabla_AdministradoresA = $('#Administrador_T').DataTable
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

    /* Inicialización de las tablas de Academico*/
    Tabla_Matriculas = $('#Matriculas_T').DataTable
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

    Tabla_Pagos = $('#Pagos_T').DataTable
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

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}