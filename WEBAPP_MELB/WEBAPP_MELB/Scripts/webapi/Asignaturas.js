/* Funcionalidad del modulo de profesor */

var Tabla = document.getElementById('Notas_T').getElementsByTagName('tbody')[0];

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


function CargarCurso(Codigo, Nombre, NAlumnos, Nivel, Modalidad, Estado) {
    $('#Cursos_Profesor').hide();
    $('#Curso_DetalleProfesor').show();

    $('#CodigoCurso').val('#' + Codigo);
    $('#Nombre_Curso').val(Nombre);
    $('#NAlumnos').val(NAlumnos);
    $('#Nivel_Curso').val(Nivel);
    $('#Modalidad').val(Modalidad);
    $('#Estado_Curso').val((Estado == 0) ? 'En curso' : 'Finalizado');
    document.getElementById('Notas_TBody').innerHTML = '';
    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/ProfesorNotas//' + Codigo,
            type: 'GET',
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.length > 0) {
                    for (I = 0; I < Resultado.length; I++) {

                        Fila = Tabla.insertRow(Tabla.rows.length);
                        var ID = Fila.insertCell(0);
                        var Nombre = Fila.insertCell(1);
                        var Apellido = Fila.insertCell(2);
                        var IP = Fila.insertCell(3);
                        var IIP = Fila.insertCell(4);
                        var NF = Fila.insertCell(5);

                        IP.contentEditable = true;
                        IIP.contentEditable = true;




                        IP.addEventListener("keypress", function (Event) {

                            if (SwtichNotasPR.checked == true) {
                                var Keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

                                if (Event.key == '0' && IP.innerHTML == '') {
                                    Event.preventDefault();
                                }

                                if (Keys.indexOf(Event.key) < 0 || parseInt(IP.innerHTML + Event.key) > 51) {
                                    Event.preventDefault();
                                }
                            }
                            else {
                                Event.preventDefault();
                            }
                        });

                        IP.addEventListener("click", function (Event) {

                            if (SwtichNotasPR.checked == true) {

                                if (IP.innerHTML == '0') {
                                    IP.innerHTML = '';
                                }
                            }
                            else {
                                Event.preventDefault();
                            }
                        });


                        IIP.addEventListener("keypress", function (Event) {
                            if (SwtichNotasPR.checked == true) {
                                var Keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                                if (Event.key == '0' && IIP.innerHTML == '') {
                                    Event.preventDefault();
                                }

                                if (Keys.indexOf(Event.key) < 0 || parseInt(IIP.innerHTML + Event.key) > 51) {
                                    Event.preventDefault();
                                }
                            }
                            else {
                                Event.preventDefault();

                            }
                        });

                        IIP.addEventListener("click", function (Event) {
                            if (SwtichNotasPR.checked == true) {
                                if (IIP.innerHTML == '0') {
                                    IIP.innerHTML = '';
                                }
                            }
                            else {
                                Event.preventDefault();

                            }
                        });

                        ID.innerHTML = Resultado[I].IDEstudiante;
                        Nombre.innerHTML = Resultado[I].Nombre;
                        Apellido.innerHTML = Resultado[I].Apellido;
                        IP.innerHTML = Resultado[I].IP;
                        IIP.innerHTML = Resultado[I].IIP;
                        NF.innerHTML = '?';
                    }
                    swal.closeModal();
                }
            },
            error: function (Respuesta) {
                swal("Error", "Ocurrio un error al listar los estudiantes del curso", "error");
            },
        });
}
    function ValidarTablaNotas()
    {
        var ErroresFormateo = 0;
        var ID_Estudiante="";
        var IP ="";
        var IIP="";
        var CodigoCurso = parseInt($('#CodigoCurso').val().substr(1, $('#CodigoCurso').val().length));

        for (I = 0; I < Tabla.rows.length; I++) {
            if (Tabla.rows[I].cells[3].innerHTML != "" && Tabla.rows[I].cells[4].innerHTML != "") {

                ID_Estudiante = ID_Estudiante+ ","+(parseInt(Tabla.rows[I].cells[0].innerHTML));
                IP = IP + ','+(parseInt(Tabla.rows[I].cells[3].innerHTML));
                IIP = IIP+ ','+(parseInt(Tabla.rows[I].cells[4].innerHTML));

                var NF = (parseInt(Tabla.rows[I].cells[3].innerHTML) + parseInt(Tabla.rows[I].cells[4].innerHTML) > 59) ? '<span class="label label-success">' + (parseInt(Tabla.rows[I].cells[3].innerHTML) + parseInt(Tabla.rows[I].cells[4].innerHTML)) + '</span>' : '<span class="label label-danger">' + (parseInt(Tabla.rows[I].cells[3].innerHTML) + parseInt(Tabla.rows[I].cells[4].innerHTML))+'</span>';
                Tabla.rows[I].cells[5].innerHTML = NF;
            }
            else {
                ErroresFormateo++;
            }
        }

        if (ErroresFormateo == 0) {
            $.ajax
                ({
                    url: 'http://localhost:53603/api/ProfesorNotas/',
                    type: 'POST',
                    data: { IDEstudiante: ID_Estudiante, IPP: IP, IIPP: IIP, CodigoCursoP: CodigoCurso },                    
                    success: function (Resultado) {
                        Resultado = JSON.parse(Resultado);
                        
                    },
                    error: function (Respuesta) {
                        swal("Error", "Ocurrio un error al registrar las notas de los estudiantes", "error");
                    },
                });
        }
        else {
            swal
                ({
                    title: "Error",
                    text: "Revise por favor que haya puesto las notas correctamente a cada alumno.",
                    type: "error",
                });
        }
    }
