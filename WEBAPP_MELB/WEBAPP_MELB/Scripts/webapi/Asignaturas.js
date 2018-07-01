/* Funcionalidad del modulo de profesor */

var Tabla = document.getElementById('Notas_T').getElementsByTagName('tbody')[0];

function CargarClasesDocente()
{
    Tabla_CursosProfesor.clear().draw();
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
            url: 'http://melbws.azurewebsites.net/api/ProfesorNotas/' + Codigo,
            type: 'GET',
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.length > 0) {
                    Tabla_Notas.clear().draw();
                    for (I = 0; I < Resultado.length; I++) {

                        var ID;
                        var Nombre;
                        var Apellido;
                        var IP;
                        var IIP;
                        var NF;


                        ID = Resultado[I].IDEstudiante;
                        Nombre = Resultado[I].Nombre;
                        Apellido = Resultado[I].Apellido;
                        
                        
                        if ($('#Estado_Curso').val() == "En curso") {
                            IP = '<input id="0" type="number" name="x" maxlength="3" size="2" min ="0" max = "100"  class="form-control" value="' + Resultado[I].IP + '" onkeyup="Cambiar(this)"/>';
                            IIP = '<input id="0" type="number" name="x" maxlength="3" size="2" min ="0" max = "100"  class="form-control" value="' + Resultado[I].IIP + '" onkeyup="Cambiar(this)"/>';
                            NF = '<input id="0" type="number" min ="0" max = "100" disabled  class="form-control" value="' + (Resultado[I].IIP + Resultado[I].IP) + '"/>';                        

                            $('#SubirNota').removeAttr('disabled');
                        }
                        else {
                            IP = '<input id="0" disabled type="number" name="x" maxlength="3" size="2" min ="0" max = "100"  class="form-control" value="' + Resultado[I].IP + '" onkeyup="Cambiar(this)"/>';
                            IIP = '<input id="0" disabled type="number" name="x" maxlength="3" size="2" min ="0" max = "100"  class="form-control" value="' + Resultado[I].IIP + '" onkeyup="Cambiar(this)"/>';
                            NF = '<input id="0" disabled type="number" min ="0" max = "100" disabled  class="form-control" value="' + (Resultado[I].IIP + Resultado[I].IP) + '"/>';                        

                            $('#SubirNota').prop('disabled', true);
                        }

                        Tabla_Notas.row.add
                            ([
                                ID,
                                Nombre,
                                Apellido,
                                IP,
                                IIP,
                                NF
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

function Cambiar(Event) {
    if (parseInt(Event.value) <= 50) {
        Event.id = Event.value;
    }
    else {
        Event.value = null;
        Event.id = Event.value;

    }
}

    function ValidarTablaNotas()
    {
        var ErroresFormateo = 0;
        var ID_Estudiante="";
        var IP ="";
        var IIP="";
        var CodigoCurso = parseInt($('#CodigoCurso').val().substr(1, $('#CodigoCurso').val().length));
        
        for (I = 0; I < Tabla.rows.length; I++) {

            var LI1 = document.createElement('li');
            LI1.innerHTML = Tabla.rows[I].cells[3].innerHTML;

            var LI2 = document.createElement('li');
            LI2.innerHTML = Tabla.rows[I].cells[4].innerHTML;

            if (LI1.getElementsByTagName('input')[0].id != "" && LI2.getElementsByTagName('input')[0].id != "") {

                ID_Estudiante = ID_Estudiante+ ","+(parseInt(Tabla.rows[I].cells[0].innerHTML));


                IP = IP + ',' + (parseInt(LI1.getElementsByTagName('input')[0].id));
                var N1 = parseInt(LI1.getElementsByTagName('input')[0].id);


                IIP = IIP + ',' + (parseInt(LI2.getElementsByTagName('input')[0].id));
                var N2 = parseInt(LI2.getElementsByTagName('input')[0].id);


                Tabla.rows[I].cells[5].innerHTML = '<input type="number" min ="0" max = "100" disabled  class="form-control" value="' + (N1 + N2) + '"/>';
            }
            else {
                ErroresFormateo++;
            }
        }
        

       

        if (ErroresFormateo == 0) {
            swal({
                title: "¿Esta seguro?",
                text: "Una vez que suba notas el curso se cerrara",
                type: "question",
                showCancelButton: true,
                confirmButtonText: 'Subir',
                cancelButtonText: "Cancelar"
            }).then(
                function ()
                {
                    swal({ title: 'Subiendo', text: 'Espere por favor', type: 'info', allowOutsideClick: false });
                    swal.showLoading();

                    $.ajax
                        ({
                            url: 'http://melbws.azurewebsites.net/api/ProfesorNotas/',
                            type: 'POST',
                            data: { IDEstudiante: ID_Estudiante, IPP: IP, IIPP: IIP, CodigoCursoP: CodigoCurso },
                            success: function (Resultado) {
                                Resultado = JSON.parse(Resultado);
                                if (Resultado.Exito == "true") {
                                    CargarClasesDocente();
                                    swal("Exito", "Se registraron las notas exitosamente", "success");
                                }
                            },
                            error: function (Respuesta) {
                                swal("Error", "Ocurrio un error al registrar las notas de los estudiantes", "error");
                            },
                        });

                    document.getElementById('Profesor_Detalle').style.display = 'none';
                    document.getElementById('Cursos_Profesor').style.display = 'block';
                    document.getElementById('Horario_DetalleProfesor').style.display = 'none';
                    document.getElementById('Curso_DetalleProfesor').style.display = 'none';
                    document.getElementById('Estadistica_Profesor').style.display = 'none';
                    if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
                    FormularioActivo = "CursosProfesor";
                    $('#ReporteProfesor').hide();


                },
                function () { return false; });

            
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
