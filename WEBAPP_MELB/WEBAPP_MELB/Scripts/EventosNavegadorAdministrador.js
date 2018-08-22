var BanderaCerrar = false;
var AnimacionSideBar = false;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var FormularioActivo;

$(document).ready(function (event) {
    swal({ title: 'Cargando', text: 'Espere por favor', type: 'info', allowOutsideClick: false, timer: 3000 });
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
    //InicializacionTablas();
    //InicializacionControles();

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
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Inicio";
    });

    $('#PerfilSubMenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Administrador_Detalle').style.display = 'block';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        FormularioActivo = "Administrador_Detalle";
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

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}