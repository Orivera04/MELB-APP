var FormularioActivo = "Login";

$(document).ready(function()
{
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