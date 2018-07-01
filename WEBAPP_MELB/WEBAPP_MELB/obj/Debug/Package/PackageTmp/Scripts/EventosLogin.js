var FormularioActivo = "Login";
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
$(document).ready(function()
{
    if (EsTelefono == true)
    {       
        $('.selectpicker').selectpicker('mobile');
    }

	InicializacionControles();
	InicializacionEventos();
});


function InicializacionControles()
{
	$('.selectpicker').selectpicker();
	$('.selectpicker').selectpicker('refresh');
}

function InicializacionEventos()
{
	$('#RecuperarContraseña').click(function(event)
	{
		if(FormularioActivo === "Login")
		{			
			$('#FormularioLogin').hide(300);
			$('#FormularioRecuperarContraseña').show(300);
			$('#RecuperarContraseña').text('Regresar');
			FormularioActivo = "Recuperación";
		}
		else
		{
			$('#FormularioRecuperarContraseña').hide(300);
			$('#FormularioLogin').show(300);
			$('#RecuperarContraseña').text('¿Olvidaste la contraseña?');
			FormularioActivo = "Login";
		}
    });

    $('#BotonLogin').click(function (event)
    {
        if (!($('#Usuario').val() !== "" && $('#Contraseña').val() !== ""))
        {
            swal("Aviso", "Faltan campos","warning");
            event.preventDefault();
        }
    });

    $('#BotonEnviarContraseña').click(function (event)
    {
        if ($('#Correo').val() != "") {
            if (ValidarCorreo($('#Correo').val()) == true) {
                swal({ title: 'Enviando', text: 'Se esta enviando el mensaje espere por favor', type: 'info', allowOutsideClick: false });
                swal.showLoading();
                $.ajax
                    ({
                        url: 'http://melbws.azurewebsites.net/api/Credenciales?Correo=' + $('#Correo').val() + '&Modulo=' + $('#ModuloContraseña').val(),
                        type: 'GET',
                        success: function (Resultado) {
                            var Resultado = JSON.parse(Resultado);
                            if (Resultado.Exito == true) {
                                swal
                                    ({
                                        title: "Exito",
                                        text: "Las credenciales se enviaron al correo ingresado",
                                        type: "success",
                                    });
                            }
                            else {
                                swal
                                    ({
                                        title: Resultado.Mensaje_Cabecera,
                                        text: Resultado.Mensaje_Usuario,
                                        type: "warning",
                                    });
                            }
                        },
                        error: function (Error) {
                            swal
                                ({
                                    title: "Error",
                                    text: "Ocurrio un error al intentar enviar el correo",
                                    type: "error",
                                });
                        }
                    })
            }
            else
            {
                swal
                    ({
                        title: "Aviso",
                        text: "El correo no tiene un formato correcto",
                        type: "warning",
                    });
            }
        }
        else
        {
            swal("Aviso", "Tiene que introducir un correo", "warning");
        }
    });

    $('#Usuario').keypress(function (event)
    {
        if (event.which == 13)
        {
            event.preventDefault();
            $("#Contraseña").focus();
        }
    });

    $('#Contraseña').keypress(function (event)
    {
        if (event.which == 13)
        {
            event.preventDefault();
            $("#BotonLogin").click();
        }
    });
}

/* Funciones de soporte */

function ValidarCorreo(Correo)
{
    var RegXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return RegXP.test(Correo);
}