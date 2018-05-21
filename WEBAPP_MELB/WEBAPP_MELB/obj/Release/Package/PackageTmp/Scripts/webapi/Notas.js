/* Funciones de la API */

function Cargar_Notas()
{
    Tabla_Notas.clear().draw();
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Notas?Filtro=Semestre&ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno').val() + '&Semestre=' + $('#Semestre').val() + '&Año=' + $('#Año_Alumno').val(),    
        type: 'GET',
        success: function (Resultado)
        {
            Resultado = JSON.parse(Resultado);
            if (Resultado.Codigo == null) {
                for (I = 0; I < Resultado.length; I++) {
                    var NotaFinal = (Resultado[I].IP + Resultado[I].IIP >= 60) ? '<span class="label label-success">' + (Resultado[I].IP + Resultado[I].IIP) + '</span> ' : ' < span class="label label-inverse" >' + (Resultado[I].IP + Resultado[I].IIP)+'</span > ';
                Tabla_Notas.row.add
                    ([
                        '#' + Resultado[I].Codigo_Curso,
                        Resultado[I].Asignatura,
                        Resultado[I].Nivel,
                        Resultado[I].Docente,
                        Resultado[I].IP,
                        Resultado[I].IIP,
                        NotaFinal
                    ]).draw(false)           
                }
            }
            CargarDatosMatricula();
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

function HistorialNotas()
{
    $.ajax({

        url: 'http://melbws.azurewebsites.net/api/Notas?Filtro=Historial&ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);
            if (Resultado.Codigo == null) {
                GeneralReporteHistorialPDF(Resultado);
            }
            else
            {
                swal
                  ({
                        title: "Aviso",
                        text: "Aun no hay notas asociadas a este curso.",
                        type: "warning",
                    });
            }
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Errror generando reporte de notas",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}
function FormatearHistorial(Historial)
{
    var HistorialNotas = [];
    var I = 0;
    while (I < Historial.length)
    {
        HistorialNotas.push({ Año: Historial[I].Año, Semestre: Historial[I].Semestre, Codigo: '#' + Historial[I].Codigo_Curso, Nombre: Historial[I].Asignatura +' - '+ Historial[I].Nivel, Nota: Historial[I].IP + Historial[I].IIP })
        I++;
    }
    return HistorialNotas;
}

function ContarSemestres(Semestre, Año,Filas)
{
    var Contador = 0;
    for (I = 0; I < Filas.length; I++)
    {
        if (Filas[I].Semestre == Semestre & Filas[I].Año == Año)
        {
            Contador++;
        }
    }
    return Contador;
}

function GeneralReporteHistorialPDF(Historial)
{
    var Documento = new jsPDF("l", 'cm', "a4");
    var Años = [];
    var Semestres;
    var Contador = 0;
    var ContadorCeldas = -1;

    var Columnas =
        [
            { title: "Semestre", dataKey: "Semestre" },
            { title: "Codigo Curso", dataKey: "Codigo" },
            { title: "Asignatura", dataKey: "Nombre" },      
            { title: "Nota final", dataKey: "Nota" }            
        ];

    var Filas = FormatearHistorial(Historial);

    Documento.autoTable(Columnas,Filas ,
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
            drawRow: function (Row, Data) {
                if (Años.includes(Filas[Contador].Año) == false)
                {
                    Semestres = null;
                    Documento.setFontStyle('bold');
                    Documento.setFontSize(12);
                    Documento.rect(Data.settings.margin.left, Row.y, Data.table.width, 1, 'S');
                    Documento.autoTableText("Año " + Filas[Contador].Año, Data.settings.margin.left + Data.table.width / 2, (Row.y + Row.height / 2) - 0.7,
                        {
                            halign: 'center',
                            valign: 'middle'
                        });
                    Data.cursor.y += 1;
                    Años.push(Filas[Contador].Año);
                    Contador++;
                }   
            },
            drawCell: function (Celda, Datos)
            {
                if (Datos.column.dataKey === 'Semestre') {
                    ContadorCeldas++;
                    if (Semestres == null || Semestres != Filas[ContadorCeldas].Semestre) {
                        Semestres = Filas[ContadorCeldas].Semestre;
                        var NR = ContarSemestres(Filas[ContadorCeldas].Semestre, Filas[ContadorCeldas].Año, Filas);
                        Documento.rect(Celda.x, Celda.y, Datos.table.width, Celda.height * NR, 'S');
                        Documento.autoTableText(Semestres, Celda.x + Celda.width / 2, Celda.y + Celda.height * NR / 2,
                            {
                                halign: 'center',
                                valign: 'middle'
                            });
                    }
                    return false;
                }
                else if (Datos.column.datakey === "Nota")
                {
                    if (Filas[ContadorCeldas].Nota < 60)
                    {
                        Celda.styles.fillColor = [255, 0, 0];
                    }
                    else
                    {
                        Celda.styles.fillColor = [0, 0, 0];
                    }
                }
            },
            addPageContent: function (Event)
            {
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
                Documento.text(1, 4.2, 'Tipo de documento : Historial de notas');
                Documento.text(10 + 1, 4.2, 'Estudiante : ' + $('#Nombre_Estudiante').val() + ' ' + $('#Apellido_Estudiante').val());
                Documento.text(19.5 + 3.3, 4.2, 'Curso : ' + $('#Curso_Alumno').val());

                /* Footer */
                Documento.text(1, 20, 'Generado automaticamente por : MELBMOE');
                Documento.text(25.5, 20, 'Pagina ' + Event.pageCount);

            }
        });
    Documento.save('Historial.pdf');
}