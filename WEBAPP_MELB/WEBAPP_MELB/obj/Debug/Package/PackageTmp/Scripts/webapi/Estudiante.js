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
                $('#Tutor_EstudianteApellido').val(Resultado.Tutor_Apellido);
                $('#EstudianteCedula').val(Resultado.Cedula);
                $('#EstudianteTelefono1').val(Resultado.Telefono_1);
                $('#EstudianteTelefono2').val(Resultado.Telefono_2);
                $('#EstudianteDireccion').val(Resultado.Direccion);
                $('#SexoEstudiante').val(Resultado.Sexo);
                $('#EstudianteRol').val(Resultado.Rol);
                $('#EstudianteIngreso').val(Resultado.Ano_Ingreso);


            }
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
