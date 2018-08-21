var AnimacionSideBar = false;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var FormularioActivo = "Perfil";

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
    //InicializacionEventos();
    //InicializacionTablas();
    //InicializacionControles();

    /* Peticiones AJAX */
    //Cargar_InfoAdministrador();

    /* Cargar Imagenes para reportes */
    //CargarImagenes();
});

function InicializacionEventos() {
    /* Eventos del menu lateral */

    $('#PerfilSubMenu').click(function (event) {
        document.getElementById('Alumno_Detalle').style.display = 'block';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        $('#Reporte').hide();
        FormularioActivo = "Perfil";
    });

    $('#NotasSubMenu').click(function (event) {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'block';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        $('#Reporte').show();
        FormularioActivo = "Notas";
    });

    $('#MatriculaSubMenu').click(function (event) {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'block';
        document.getElementById('Horario_Detalle').style.display = 'none';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        $('#Reporte').hide();
        FormularioActivo = "Matricula";
    });

    $('#HorarioSubMenu').click(function (event) {
        document.getElementById('Alumno_Detalle').style.display = 'none';
        document.getElementById('Nota_Detalle').style.display = 'none';
        document.getElementById('Matricula_Detalle').style.display = 'none';
        document.getElementById('Horario_Detalle').style.display = 'block';
        if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
        $('#Reporte').show();
        FormularioActivo = "Horario";
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

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}