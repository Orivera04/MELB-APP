var LogoIMG64Melb;
var LogoIMG64CasaTresMundos;

/* Modulo estudiante */

    function Cargar_Horario_Estudiante(Parametro)
    {
        if (Parametro == 0) { Tabla_Horario.clear().draw();}
        $.ajax({
            url: 'http://melbws.azurewebsites.net/api/HorarioxEstudiante?ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno_Horario').val(),
            type: 'GET',
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.Codigo == null) {
                    if (Parametro == 0) {
                        var HorarioFormateado = GenerarFilasHorario(Resultado, Parametro,false);
                        for (I = 0; I < HorarioFormateado.length; I++) {
                            Tabla_Horario.row.add
                                ([
                                    HorarioFormateado[I].Hora,
                                    HorarioFormateado[I].D1,
                                    HorarioFormateado[I].D2,
                                    HorarioFormateado[I].D3,
                                    HorarioFormateado[I].D4,
                                    HorarioFormateado[I].D5,
                                    HorarioFormateado[I].D6,
                                    HorarioFormateado[I].D7
                                ]).draw(false);
                        }
                    }
                    if (Parametro == 1) {
                        GeneralReporte(Resultado,null,false);
                    }
                    swal.closeModal();
                }
                else
                {
                    swal("Aviso", "No tiene clases asociadas a este curso en el ultimo semestre inscrito", "warning");
                }
            },

            error: function (Mensaje) {

                swal
                    ({
                        title: "Error listando horario del estudiante",
                        text: "No se pudo conectar con el servidor.",
                        type: "error",
                    });
            }
        });
    }    
    function ObtenerUltimoAño(Curso)
    {
        for (I = 0; I < ListaSemestresPorCurso.length; I++)
        {
            if (ListaSemestresPorCurso[I].Curso == $('#Curso_Alumno_Horario').val())
            {
                return ListaSemestresPorCurso[I].ListaAño[0].Cod_Año;
            }
        }
    }
    function ObtenerUltimoSemestre(Horario)
    {
        for (I = 0; I < ListaSemestresPorCurso.length; I++)
        {
            if (ListaSemestresPorCurso[I].Curso == $('#Curso_Alumno_Horario').val())
            {
                return ListaSemestresPorCurso[I].ListaSemestre[0].Cod_Semestre;
            }
        }
    }

/* Modulo Profesor */

    function GenerarHorarioProfesor(Parametro) {
    $.ajax
        ({
            url: 'http://melbws.azurewebsites.net/api/HorarioxProfesor/' + $('#ID_Profesor').val(),
            type: 'GET',
            success: function (Resultado) {
                Resultado = JSON.parse(Resultado);
                if (Resultado.Codigo == null) {
                    if (Parametro == 0) {
                        var HorarioFormateado = GenerarFilasHorario(Resultado, Parametro,false);
                        for (I = 0; I < HorarioFormateado.length; I++) {
                            Tabla_HorarioProfesor.row.add
                                ([
                                    HorarioFormateado[I].Hora,
                                    HorarioFormateado[I].D1,
                                    HorarioFormateado[I].D2,
                                    HorarioFormateado[I].D3,
                                    HorarioFormateado[I].D4,
                                    HorarioFormateado[I].D5,
                                    HorarioFormateado[I].D6,
                                    HorarioFormateado[I].D7
                                ]).draw(false);
                        }
                    }
                    if (Parametro == 1) {
                        GeneralReporte(Resultado,1,true);
                    }
                    CargarClasesDocente();                    
                }
                else {
                    swal("Aviso", "No tiene clases asociadas a este curso en el ultimo semestre inscrito", "warning");
                }
            },
            error: function (Respuesta) {
                swal("Error", "Ocurrio un error al obtener los cursos del semestre", "error");
            },
        });
}


/* Todos los modulos */

function GenerarFilasHorario(HorarioWS, Parametro,BanderaProfesor) {
    var HorarioEstudianteFinal = [];
    var Periodos = [];

    for (I = 0; I < HorarioWS.length; I++) {
        if (Periodos.includes(HorarioWS[I].HorarioInicioFormateada) == false) {
            HorarioEstudianteFinal.push({ Hora: HorarioWS[I].HoraInicioFormateada + " : " + HorarioWS[I].HoraFinFormateada, D1: "Libre", D2: "Libre", D3: "Libre", D4: "Libre", D5: "Libre", D6: "Libre", D7: "Libre" });
            Periodos.push(HorarioWS[I].HoraInicioFormateada);
            if (BanderaProfesor == false) {
                if (Parametro == null) {
                    HorarioEstudianteFinal[HorarioEstudianteFinal.length - 1]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre + "\nProfesor:" + HorarioWS[I].Docente + "\nAula : " + HorarioWS[I].Aula;
                }
                else {
                    HorarioEstudianteFinal[HorarioEstudianteFinal.length - 1]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre;
                }
            }
            else {
                HorarioEstudianteFinal[HorarioEstudianteFinal.length - 1]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre + "\nAula : " + HorarioWS[I].Aula;
            }
        }
        else {
            if (BanderaProfesor == false) {
                if (Parametro != null) {
                    HorarioEstudianteFinal[Periodos.indexOf(HorarioWS[I].HoraInicioFormateada)]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre;
                }
                else {
                    HorarioEstudianteFinal[Periodos.indexOf(HorarioWS[I].HoraInicioFormateada)]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre + "Profesor" + HorarioWS[I].Docente;
                }
            }
            else {
                HorarioEstudianteFinal[HorarioEstudianteFinal.length - 1]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre + "\nAula : " + HorarioWS[I].Aula;
            }
        }
    }
    return HorarioEstudianteFinal;
}
function GeneralReporte(Horario,Parametro,BanderaProfesor) {
    var Documento = new jsPDF("l", 'cm', "a4");


    var Columnas =
        [
            { title: "Hora", dataKey: "Hora" },
            { title: "Lunes", dataKey: "D1" },
            { title: "Martes", dataKey: "D2" },
            { title: "Miercoles", dataKey: "D3" },
            { title: "Jueves", dataKey: "D4" },
            { title: "Viernes", dataKey: "D5" },
            { title: "Sabado", dataKey: "D6" },
            { title: "Domingo", dataKey: "D7" }
        ];


    Documento.autoTable(Columnas, GenerarFilasHorario(Horario, null, BanderaProfesor),
        {
            theme: 'grid',
            bodyStyles: {
                lineColor: [221, 221, 221]
            },
            headerStyles: {
                lineWidth: 0,
                fillColor: [22, 12, 40],
                textColor: [255, 255, 255],
                cellPadding: 0.3,
            },
            styles: {
                overflow: 'linebreak',
                lineWidth: 0.03,
                halign: 'center',
                cellPadding: 0.07,
                fillcolor: [199, 0, 57],
                cellPadding: 1
            },
            margin: {
                top: 5,
                left: 1
            },
            addPageContent: function (Event) {
                /* Encabezado parte izquierda*/
                Documento.setFont("helvetica");
                Documento.setFontType("bold");
                Documento.setFontSize(11);
                Documento.text(1, 0.9, 'Música en los barrios - MeLB');

                Documento.setFontType("normal");
                Documento.text(1, 1.5, 'Linda vista norte, de la Estación II de Policía 1 1/2c. abajo,');
                Documento.text(1, 2, 'contiguo al parque.  Managua – Nicaragua.')
                Documento.text(1, 2.5, 'Tel. 2254-6043');
                Documento.text(1, 3, 'Correo electrónico: melbnicaragua@gmail.com');

                /* Encabezado parte derecha */

                Documento.addImage(LogoIMG64CasaTresMundos, 'png', 24.5, 0.2, 3, 3);
                Documento.addImage(LogoIMG64Melb, 'jpg', 21.6, 0.25, 3, 3);


                /* Cuerpo */

                Documento.setFontType("bold");
                Documento.text(1, 4.2, 'Tipo de documento : Horario de clases');               

                if (Parametro == null)
                {
                    Documento.text(19.5 + 3.3, 4.2, 'Curso : ' + $('#Curso_Alumno_Horario').val());
                    Documento.text(10 + 1, 4.2, 'Año : ' + ObtenerUltimoAño(Horario));
                    Documento.text(13.6 + 2.1, 4.2, 'Semestre Academico : ' + ObtenerUltimoSemestre(Horario));
                }

                /* Footer */
                Documento.text(1, 20, 'Generado automaticamente por : MELBMOE');
                Documento.text(25.5, 20, 'Pagina ' + Event.pageCount);

            }
        });
        window.open(Documento.output('bloburl'), '_blank');

}
function CargarImagenes() {

    var LogoMelb = new Image(1, 1);
    var LogoCasa = new Image(1, 1);

    LogoMelb.src = '/Content/assets/LogoMelb.png';
    LogoCasa.src = '/Content/assets/LogoCasa3Mundos.jpg';

    LogoMelb.onload = function () {
        var C1 = document.createElement('canvas');
        C1.height = LogoMelb.naturalHeight;
        C1.width = LogoMelb.naturalWidth;
        var Contexto = C1.getContext('2d');

        Contexto.drawImage(LogoMelb, 0, 0, C1.width, C1.height, 0, 0, C1.width, C1.height);
        LogoIMG64Melb = C1.toDataURL();
    };

    LogoCasa.onload = function () {
        var C2 = document.createElement('canvas');
        C2.height = LogoCasa.naturalHeight;
        C2.width = LogoCasa.naturalWidth;
        var Contexto = C2.getContext('2d');

        Contexto.drawImage(LogoCasa, 0, 0, C2.width, C2.height, 0, 0, C2.width, C2.height);
        LogoIMG64CasaTresMundos = C2.toDataURL();
    }

}
