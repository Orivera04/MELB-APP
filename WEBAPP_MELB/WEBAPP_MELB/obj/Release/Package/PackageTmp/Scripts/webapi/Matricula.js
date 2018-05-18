/* Funciones de la API */
var ID_Matricula;
function CargarDatosMatricula()
{
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Matricula?&ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno_Mat').val() + '&Semestre=' + $('#SemestreMat').val() + '&Año=' + $('#Año_Alumno_Mat').val(),    
        type: 'GET',
        success: function (Resultado)
        {
            Resultado = JSON.parse(Resultado);
            if (Resultado.Codigo == null)
            {
                Resultado = Resultado[0];
                ID_Matricula = Resultado.ID_Matricula;
                $('#Num_Matricula').val('#'+Resultado.ID_Matricula);
                $('#Num_Inscripcion').val('#'+Resultado.ID_Inscripcion);
                $('#Num_Semestre').val($('#SemestreMat').val());
                $('#Matricula_Año').val($('#Año_Alumno_Mat').val());
                $('#Tutor_EstudianteApellido').val(Resultado.Tutor_Apellido);
                $('#Matricula_Modalidad').val(Resultado.Modalidad);               
                $('#Matricula_Fecha').val(Resultado.Fecha.substring(0, 10));
                $('#Matricula_TipoCurso').val($('#Curso_Alumno_Mat').val());
                $('#Matricula_Nombre').val(Resultado.Estudiante);
                Cargar_Pagos();
            }
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