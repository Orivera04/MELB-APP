/* Funciones de la API */
var Cursos = [];
Cursos.push({FlautaD: 0, FlautaT: 0, Clarinete: 0, Violin: 0, Viola: 0, Cello: 0, Guitarra: 0, Piano: 0 });
function Cargar_InfoEmpleadoProfesor()
{
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Empleado/' + $('#ID_Profesor').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);
            Resultado = Resultado[0];
            if (Resultado.Codigo == null) {
                $('#ProfesorCedula').val(Resultado.Cedula);
                $('#Nombre_Profesor').val(Resultado.Nombre);
                $('#Apellido_Profesor').val(Resultado.Apellido);
                $('#Correo_Profesor').val(Resultado.Correo);
                $('#Tutor_Apellido').val(Resultado.Tutor_Apellido);
                $('#ProfesorDireccion').val(Resultado.Direccion);
                $('#ProfesorTelefono1').val(Resultado.Telefono_1);
                $('#ProfesorTelefono2').val(Resultado.Telefono_2);
                $('#SexoProfesor').val(Resultado.Sexo);
                $('#ProfesorCargo').val("Profesor");
                $('#Imagen_Profesor').prop('src',Resultado.Imagen);
                $('.selectpicker').selectpicker('refresh');
            }
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando información del usuario",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}


function ActualizarInfoProfesor()
{
    swal({ title: 'Espere', text: 'Se estan actualizando los datos espere por favor', type: 'info', allowOutsideClick: false });
    swal.showLoading();
    var ProfesorInfo = { ID_Empleado: $('#ID_Profesor').val(), Cedula: $('#ProfesorCedula').val(), Nombre: $('#Nombre_Profesor').val(), Apellido: $('#Apellido_Profesor').val(), Correo: $('#Correo_Profesor').val(), Direccion: $('#ProfesorDireccion').val(), Telefono_1: $('#ProfesorTelefono1').val(), Telefono_2: $('#ProfesorTelefono2').val(), Sexo: $('#SexoProfesor').val(), ID_Cargo: 4, Activo: 1};
    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/Empleado',
            type: 'PUT',
            data: ProfesorInfo,
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.Exito === true) {
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

// Funciones de soporte //
function ControlesLecturaEscrituraProfesor(Cond) {
    if (Cond == true) {
        $('#ProfesorCedula').removeAttr("disabled");
        $('#Correo_Profesor').removeAttr("disabled");
        $('#ProfesorDireccion').removeAttr("disabled");
        $('#ProfesorTelefono1').removeAttr("disabled");
        $('#ProfesorTelefono2').removeAttr("disabled");
        $('#SexoProfesor').removeAttr("disabled");
        $('.selectpicker').selectpicker('refresh');
    }
    else
    {
        $('#ProfesorCedula').prop('disabled', 'true');
        $('#Correo_Profesor').prop('disabled', 'true');
        $('#ProfesorDireccion').prop('disabled', 'true');
        $('#ProfesorTelefono1').prop('disabled', 'true');
        $('#ProfesorTelefono2').prop('disabled', 'true');
        $('#SexoProfesor').prop('disabled', 'true');
        $('.selectpicker').selectpicker('refresh');
    }
}

function ValidarCorreo(Correo) {
    var RegXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return RegXP.test(Correo);
}

function Filtrar_Empleados(Tipo_Filtro, ID_Empleado) {
    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/MateriasxProfesor?Filtro=' + Tipo_Filtro + '&ID_Empleado=' + ID_Empleado,
            type: 'GET',
            success: function (Resultado)
            {
                Resultado = JSON.parse(Resultado);

                if (Tipo_Filtro == 'CantidadAlumnosCurso') {
                    var Contando = 0;
                    for (i = 0; i < Resultado.length; i++)
                    {
                        Contando = Contando + Resultado[i].Cantidad_Alumnos;
                        try {
                            if ((Resultado[i].Nombre).trim() == "Flauta Dulce") {
                                Cursos[0].FlautaD = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Flauta Traversa") {
                                Cursos[0].FlautaT = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Clarinete") {
                                Cursos[0].Clarinete = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Violin") {
                                Cursos[0].Violin = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Viola") {
                                Cursos[0].Viola = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Cello") {
                                Cursos[0].Cello = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Guitarra") {
                                Cursos[0].Guitarra = Resultado[i].Cantidad_Alumnos;
                            }
                            else if ((Resultado[i].Nombre).trim() == "Piano") {
                                Cursos[0].Piano = Resultado[i].Cantidad_Alumnos;
                            }
                        }
                        catch(err)
                        {

                        }
                    }
                    //Tarjeta Cantidad Alumnos Registrados
                    $('#CantidadAlumnos').text(Contando);

                    //Tarjeta Cantidad Cursos Impartidos
                    $('#CantidadCursos').text(Resultado.length);

                    var ContextoCursos = document.getElementById("AlumnosCursoGrafica").getContext('2d');
                    Chart.defaults.global.legend.display = false;

                    GraficaCursosAlumnos = new Chart(ContextoCursos,
                        {
                            type: 'bar',
                            data:
                            {
                                labels: ["Flauta Dulce", "Flauta Traversa", "Clarinete", "Violin", "Viola", "Cello", "Guitarra", "Piano"],
                                datasets:
                                [{
                                    label: 'Cantidad de Alumnos por Curso',
                                    data: [Cursos[0].FlautaD, Cursos[0].FlautaT, Cursos[0].Clarinete, Cursos[0].Violin, Cursos[0].Viola, Cursos[0].Cello, Cursos[0].Guitarra, Cursos[0].Piano],
                                    backgroundColor:
                                    [
                                        'rgba(214, 83, 3, 0.5)',
                                        'rgba(54, 162, 235, 0.5)',
                                        'rgba(255, 206, 86, 0.5)',
                                        'rgba(255, 125, 173, 0.5)',
                                        'rgba(153, 102, 255, 0.5)',
                                        'rgba(52, 73, 94, 0.5)',
                                        'rgba(0, 172, 172, 0.5)'
                                    ],
                                    borderColor:
                                    [
                                        'rgba(214, 83, 3, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(255, 125, 173, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(52, 73, 94, 1)',
                                        'rgba(0, 172, 172, 1)'
                                    ],
                                    borderWidth: 2
                                }],
                            },
                        });
                    GraficaCursosAlumnos.options.scales.yAxes[0].ticks.beginAtZero = true;
                    GraficaCursosAlumnos.update();

                }

                else if (Tipo_Filtro == 'CantidadAlumnosMaterias')
                {
                    //Tarjeta de Materias Impartidas
                    $('#CantidadMaterias').text(Resultado.length);
                }

            },
            error: function (Mensaje) {
                swal
                    ({
                        title: "Error",
                        text: "Algo no esta bien",
                        type: "error",
                    });
            }
        });
}

function CargarAsignaturas()
{
    $.ajax({
        url: 'http://melbws.azurewebsites.net/api/MateriasxProfesor?Filtro=CantidadAlumnosMaterias&ID_Empleado=' + $('#ID_Profesor').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);
            Resultado = Resultado[0];
            if (Resultado.Codigo == null) {              
              $('.selectpicker').selectpicker('refresh');
            }
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando información del usuario",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}
