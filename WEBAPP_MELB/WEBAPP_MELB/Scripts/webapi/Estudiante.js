var ID;

/* Funciones de la API */
function Cargar_InfoEstudiante()
{
    Tabla_Inscripciones.clear().draw();    
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Estudiante/' + $('#ID_Estudiante').val(),
        type: 'GET',
        success: function (Resultado)
        {
            Resultado = JSON.parse(Resultado);
            Resultado = Resultado[0];            
            if (Resultado.Codigo == null)
            {
                $('#Nombre_Estudiante').val(Resultado.Nombre);
                $('#Apellido_Estudiante').val(Resultado.Apellido);
                $('#Correo_Estudiante').val(Resultado.Correo);
                $('#Tutor_EstudianteNombre').val(Resultado.Tutor_Nombre);
                $('#Tutor_Apellido').val(Resultado.Tutor_Apellido);                
                $('#EstudianteCedula').val(Resultado.Cedula);
                $('#EstudianteTelefono1').val(Resultado.Telefono_1);
                $('#EstudianteTelefono2').val(Resultado.Telefono_2);
                $('#EstudianteDireccion').val(Resultado.Direccion);
                $('#SexoEstudiante').val(Resultado.Sexo);
                $('#EstudianteRol').val(Resultado.Rol);
                $('#ImagenEstudiante').attr("src", Resultado.Foto);
                $('#EstudianteIngreso').val(Resultado.Ano_Ingreso);
                $('#FechaNacimiento_Estudiante').val(Resultado.Fecha_Nacimiento.substring(0,10));
                ID = Resultado.ID_Beca;
                $('.selectpicker').selectpicker('refresh');

            }
            Cargar_Inscripciones();
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando información del estudiante",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}

function ActualizarInfoEstudiante()
{
    if (new Date($('#FechaNacimiento_Estudiante').val()) < new Date()) {
        swal({ title: 'Espere', text: 'Se estan actualizando los datos espere por favor', type: 'info', allowOutsideClick: false });
        swal.showLoading();
        var EstudianteInfo = { ID_Estudiante: $('#ID_Estudiante').val(), Nombre: $('#Nombre_Estudiante').val(), Apellido: $('#Apellido_Estudiante').val(), Correo: $('#Correo_Estudiante').val(), Fecha_Nacimiento: $('#FechaNacimiento_Estudiante').val(), Tutor_Nombre: $('#Tutor_EstudianteNombre').val(), Tutor_Apellido: $('#Tutor_Apellido').val(), Cedula: $('#EstudianteCedula').val(), Telefono_1: $('#EstudianteTelefono1').val(), Telefono_2: $('#EstudianteTelefono2').val(), Direccion: $('#EstudianteDireccion').val(), Sexo: $('#SexoEstudiante').val(), Foto: $('#ImagenEstudiante').attr('src'), Rol: $('#EstudianteRol').val(), ID_Beca: ID };
        $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Estudiante',
                type: 'PUT',
                data: EstudianteInfo,
                success: function (Resultado) {
                    Resultado = JSON.parse(Resultado);
                    if (Resultado.Exito == "true") {
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
    else
    {
        swal("Aviso", "La fecha de nacimiento debe ser menor que el dia de hoy", "warning");
    }
}

// Funciones de soporte //

function ControlesLecturaEscritura(Cond) {
    if (Cond == true) {
        $('#Correo_Estudiante').removeAttr("disabled");
        $('#EstudianteCedula').removeAttr("disabled");
        $('#EstudianteTelefono1').removeAttr("disabled");
        $('#EstudianteTelefono2').removeAttr("disabled");
        $('#EstudianteDireccion').removeAttr("disabled");
        $('#SexoEstudiante').removeAttr("disabled");
        $('#FechaNacimiento_Estudiante').removeAttr("disabled");
        $('.selectpicker').selectpicker('refresh');
    }
    else {
        $('#Correo_Estudiante').prop('disabled', 'true');
        $('#EstudianteCedula').prop('disabled', 'true');
        $('#EstudianteTelefono1').prop('disabled', 'true');
        $('#EstudianteTelefono2').prop('disabled', 'true');
        $('#EstudianteDireccion').prop('disabled', 'true');
        $('#SexoEstudiante').prop('disabled', 'true');
        $('#FechaNacimiento_Estudiante').prop('disabled', 'true');
        $('.selectpicker').selectpicker('refresh');

    }
}

function ValidarCorreo(Correo)
{
    var RegXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return RegXP.test(Correo);
}