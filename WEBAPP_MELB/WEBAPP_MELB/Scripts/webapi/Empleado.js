/* Funciones de la API */

function Cargar_InfoEmpleadoProfesor()
{
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Empleado/' + $('#ID_Profesor').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);
            Resultado = Resultado[0];
            if (Resultado.Codigo == null) {
                $('#ProfesorCedula').val(Resultado.Cedula);
                $('#Nombre_Profesor').val(Resultado.Nombre);
                $('#Apellido_Profesor').val(Resultado.Apellido);
                $('#Correo_Profesor').val(Resultado.Correo);
                $('#Tutor_Apellido').val(Resultado.Tutor_Apellido);
                $('#ProfesorDireccion').val(Resultado.Direccion);
                $('#ProfesorTelefono1').val(Resultado.Telefono_1);
                $('#ProfesorTelefono2').val(Resultado.Telefono_2);
                $('#SexoProfesor').val(Resultado.Sexo);
                $('#ProfesorCargo').val("Profesor");
                $('#Imagen_Profesor').prop('src',Resultado.Imagen);
                $('.selectpicker').selectpicker('refresh');
                GenerarHorarioProfesor(0);
            }
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando información del usuario",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}


function ActualizarInfoProfesor()
{
    swal({ title: 'Espere', text: 'Se estan actualizando los datos espere por favor', type: 'info', allowOutsideClick: false });
    swal.showLoading();
    var ProfesorInfo = { ID_Empleado: $('#ID_Profesor').val(), Cedula: $('#ProfesorCedula').val(), Nombre: $('#Nombre_Profesor').val(), Apellido: $('#Apellido_Profesor').val(), Correo: $('#Correo_Profesor').val(), Direccion: $('#ProfesorDireccion').val(), Telefono_1: $('#ProfesorTelefono1').val(), Telefono_2: $('#ProfesorTelefono2').val(), Sexo: $('#SexoProfesor').val(), ID_Cargo: 4, Activo: 1};
    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/Empleado',
            type: 'PUT',
            data: ProfesorInfo,
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.Exito === true) {
                    swal(Resultado.Mensaje_Cabecera, Resultado.Mensaje_Usuario, "success");
                }
                else {
                    var Cadena_Errores = "";
                    for (var I = 0; I < Resultado.Errores.length; I++) {
                        Cadena_Errores = (I + 1) + " - " + Resultado.Errores[I].Mensaje;
                    }
                    swal(Resultado.Mensaje_Cabecera, Cadena_Errores, "warning");
                }
            },
            error: function (Respuesta) {
                swal("Error", "Ocurrio un error al actualizar los datos", "error");
            },
        });        
}


// Funciones de soporte //
function ControlesLecturaEscrituraProfesor(Cond) {
    if (Cond == true) {
        $('#ProfesorCedula').removeAttr("disabled");
        $('#Correo_Profesor').removeAttr("disabled");
        $('#ProfesorDireccion').removeAttr("disabled");
        $('#ProfesorTelefono1').removeAttr("disabled");
        $('#ProfesorTelefono2').removeAttr("disabled");
        $('#SexoProfesor').removeAttr("disabled");
        $('.selectpicker').selectpicker('refresh');
    }
    else
    {
        $('#ProfesorCedula').prop('disabled', 'true');
        $('#Correo_Profesor').prop('disabled', 'true');
        $('#ProfesorDireccion').prop('disabled', 'true');
        $('#ProfesorTelefono1').prop('disabled', 'true');
        $('#ProfesorTelefono2').prop('disabled', 'true');
        $('#SexoProfesor').prop('disabled', 'true');
        $('.selectpicker').selectpicker('refresh');
    }
}

function ValidarCorreo(Correo) {
    var RegXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return RegXP.test(Correo);
}