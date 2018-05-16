/* Funciones de la API */
function CargarDatosMatricula()
{
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Matricula?&ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno_Mat').val() + '&Semestre=' + $('#SemestreMat').val() + '&Año=' + $('#Año_Alumno_Mat').val(),    
        type: 'GET',
        success: function (Resultado)
        {
            Resultado = JSON.parse(Resultado);
            Resultado = Resultado[0];
            if (Resultado.Codigo == null)
            {
                $('#Num_Matricula').val('#'+Resultado.ID_Matricula);
                $('#Num_Inscripcion').val('#'+Resultado.ID_Inscripcion);
                $('#Num_Semestre').val($('#SemestreMat').val());
                $('#Matricula_Año').val($('#Año_Alumno_Mat').val());
                $('#Tutor_EstudianteApellido').val(Resultado.Tutor_Apellido);
                $('#Matricula_Modalidad').val(Resultado.Modalidad);
                $('#Matricula_Fecha').val(Resultado.Fecha);
                $('#Matricula_TipoCurso').val($('#Curso_Alumno_Mat').val());
                $('#Matricula_Nombre').val(Resultado.Estudiante);
            }
            swal.closeModal();
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando matricula",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });

}