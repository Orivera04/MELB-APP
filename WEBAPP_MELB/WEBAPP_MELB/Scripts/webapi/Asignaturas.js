/* Funcionalidad del modulo de profesor */


function CargarClasesDocente()
{
    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/AsignaturaProfesor/' + $('#ID_Profesor').val(),
            type: 'GET',
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.length > 0) {
                    for (I = 0; I < Resultado.length; I++)
                    {
                        var Estado = (Resultado[I].Estado == true) ? '<span class="label label-success">Finalizado</span>' : '<span class="label label-purple">En curso</span>'; 
                        Tabla_CursosProfesor.row.add
                            ([
                                '#'+Resultado[I].CodigoCurso,
                                Resultado[I].NombreCurso,
                                Resultado[I].AlumnosInscritos,
                                Resultado[I].Nivel,
                                Resultado[I].Modalidad,
                                Estado,
                                '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="CargarCurso(' + Resultado[I].CodigoCurso + ',\'' + Resultado[I].NombreCurso + '\',' + Resultado[I].AlumnosInscritos + ',' + Resultado[I].Nivel + ',\'' + Resultado[I].Modalidad + '\',' + Resultado[I].Estado+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                            ]).draw(false);
                    }
                    swal.closeModal();
                }
            },
            error: function (Respuesta) {
                swal("Error", "Ocurrio un error al listar las clases de este semestre", "error");
            },
        });
}


function CargarCurso(Codigo,Nombre,NAlumnos,Nivel,Modalidad,Estado)
{
    $('#Cursos_Profesor').hide();
    $('#Curso_DetalleProfesor').show();

    $('#CodigoCurso').val('#'+Codigo);
    $('#Nombre_Curso').val(Nombre);
    $('#NAlumnos').val(NAlumnos);
    $('#Nivel_Curso').val(Nivel);
    $('#Modalidad').val(Modalidad);    
    $('#Estado_Curso').val((Estado == 0) ? 'En curso' : 'Finalizado');

    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/ProfesorNotas//' + Codigo,
            type: 'GET',
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.length > 0) {
                    for (I = 0; I < Resultado.length; I++) {
                        var NF = (Resultado[I].NF > 59) ? '<span class="label label-success">' + Resultado[I].NF+'</span>' : '<span class="label label-danger">' + Resultado[I].NF+'</span>';
                        Tabla_Notas.row.add
                            ([
                                '#' + Resultado[I].IDEstudiante,
                                Resultado[I].Nombre,
                                Resultado[I].Apellido,
                                Resultado[I].IP,
                                Resultado[I].IIP,
                                NF,                               
                            ]).draw(false);
                    }
                    swal.closeModal();
                }
            },
            error: function (Respuesta) {
                swal("Error", "Ocurrio un error al listar los estudiantes del curso", "error");
            },
        });
}