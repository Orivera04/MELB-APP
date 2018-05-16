/* Funciones de la API */

function Cargar_Inscripciones() {
    Tabla_Inscripciones.clear().draw();
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/CursosxEstudiantes/' + $('#ID_Estudiante').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);            
            if (Resultado.Codigo == null)
            {
                for (I = 0; I < Resultado.length; I++)
                {
                    var Estado = (Resultado[I].Estado_Inscripcion== 'Activo') ? '<span class="label label-success">Activo</span>' : '<span class="label label-inverse">Inactivo</span>'
                    Tabla_Inscripciones.row.add
                        ([
                            '#'+Resultado[I].ID_Inscripcion,
                            Resultado[I].Nombre,
                            Estado
                        ]).draw(false);
                    $('#Curso_Alumno').append('<option>' + Resultado[I].Nombre + '</option>');
                    $('#Curso_Alumno_Mat').append('<option>' + Resultado[I].Nombre + '</option>');
                    $('#Curso_Alumno_Horario').append('<option>' + Resultado[I].Nombre + '</option>');
                }                
            }          
            $('.selectpicker').selectpicker('refresh');
            Cargar_Notas();
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando inscripciones del estudiante",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}

   