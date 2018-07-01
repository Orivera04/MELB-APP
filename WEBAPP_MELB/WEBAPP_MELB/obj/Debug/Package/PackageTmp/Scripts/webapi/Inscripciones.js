var ListaSemestresPorCurso;
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
            CargarSemestresAño();
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

function CargarSemestresAño()
{
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/CursosxEstudiantes?ID_Estudiante=' + $('#ID_Estudiante').val() + '&Operacion=1',
        type: 'GET',
        success: function (Resultado)
        {
            ListaSemestresPorCurso = JSON.parse(Resultado);

            $('#Año_Alumno_Mat').html('');
            $('#Año_Alumno').html('');

            for (I = 0; I < ListaSemestresPorCurso[0].ListaAño.length; I++)
            {
                $('#Año_Alumno_Mat').append('<option>' + ListaSemestresPorCurso[0].ListaAño[I].Cod_Año + '</option>');
                $('#Año_Alumno').append('<option>' + ListaSemestresPorCurso[0].ListaAño[I].Cod_Año + '</option>');
            }

            for (I = 0; I < ListaSemestresPorCurso[0].ListaSemestre.length; I++)
            {
                if (ListaSemestresPorCurso[0].ListaSemestre[I].Cod_Año == $('#Año_Alumno_Mat').val())
                {                
                    $('#Semestre').append('<option>' + ListaSemestresPorCurso[0].ListaSemestre[I].Cod_Semestre + '</option>');
                    $('#SemestreMat').append('<option>' + ListaSemestresPorCurso[0].ListaSemestre[I].Cod_Semestre + '</option>');
                }
            }
            $('.selectpicker').selectpicker('refresh');    
            Cargar_Notas();
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando datos de los cursos",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}

