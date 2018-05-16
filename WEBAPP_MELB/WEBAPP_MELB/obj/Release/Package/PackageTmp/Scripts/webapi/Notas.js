/* Funciones de la API */

function Cargar_Notas()
{
    Tabla_Notas.clear().draw();
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Notas?&ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno').val() + '&Semestre=' + $('#Semestre').val() + '&Año=' + $('#Año_Alumno').val(),    
        type: 'GET',
        success: function (Resultado)
        {
            Resultado = JSON.parse(Resultado);
            if (Resultado.Codigo == null) {
                for (I = 0; I < Resultado.length; I++)
                {
                    Tabla_Notas.row.add
                        ([
                            '#'+Resultado[I].Codigo_Curso,
                            Resultado[I].Asignatura,
                            Resultado[I].Nivel,
                            Resultado[I].Docente,
                            Resultado[I].IP,
                            Resultado[I].IIP,
                            Resultado[I].IP + Resultado[I].IIP
                        ]).draw(false)                
                }
                swal.closeModal();
            }
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando notas del estudiante",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}