/* Funciones de la API */

var LogoIMG64Melb;
var LogoIMG64CasaTresMundos;
function Cargar_Horario_Estudiante()
{
    $.ajax({
        url: 'http://melbws.azurewebsites.net/api/HorarioxEstudiante?ID_Estudiante=' + $('#ID_Estudiante').val() + '&Curso=' + $('#Curso_Alumno_Horario').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);
            if (Resultado.Codigo == null)
            {
                swal.closeModal();
                GeneralReporte(Resultado);                
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


/* Reporte */
function GeneralReporte(Horario)
{
    var Documento = new jsPDF("l", 'cm', "a4");

    
           var Columnas =
           [
                { title: "Hora", dataKey: "Hora"    },
                { title: "Lunes", dataKey: "D1"     },
                { title: "Martes", dataKey: "D2"    },
                { title: "Miercoles", dataKey: "D3" }, 
                { title: "Jueves", dataKey: "D4"    },
                { title: "Viernes", dataKey: "D5"   },
                { title: "Sabado", dataKey: "D6"    },
                { title: "Domingo", dataKey: "D7"   }
           ];
           

    Documento.autoTable(Columnas, GenerarFilasHorario(Horario),
    {
        theme: 'grid',
        bodyStyles: {
                lineColor: [221, 221, 221]
        },
        headerStyles:{
                lineWidth: 0,
                fillColor: [22,12,40],
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
            Documento.text(1, 4.2, 'Tipo de documento : Horario de clases');
            Documento.text(10 + 1, 4.2, 'Año : 2018');
            Documento.text(13.6 + 2.1, 4.2, 'Semestre Academico : I');
            Documento.text(19.5 + 3.3, 4.2, 'Curso : Guitarra');  

            /* Footer */
            Documento.text(1, 20, 'Generado automaticamente por : MELBMOE');
            Documento.text(25.5, 20, 'Pagina ' + Event.pageCount);

        }
        });
           $('#ContenedorHorario').attr("src", Documento.output('datauristring'));
           //Documento.save('Horario.pdf');
}

function GenerarFilasHorario(HorarioWS)
{
    var HorarioEstudianteFinal = [];
    var Periodos = [];
    var Dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

    for (I = 0; I < HorarioWS.length; I++)
    {
        if (Periodos.includes(HorarioWS[I].HorarioInicioFormateada) == false) {
            HorarioEstudianteFinal.push({ Hora: HorarioWS[I].HoraInicioFormateada + " : " + HorarioWS[I].HoraFinFormateada, D1: "Libre", D2: "Libre", D3: "Libre", D4: "Libre", D5: "Libre", D6: "Libre", D7: "Libre" });
            Periodos.push(HorarioWS[I].HoraInicioFormateada);
            HorarioEstudianteFinal[HorarioEstudianteFinal.length - 1]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre;
        }
        else
        {
            HorarioEstudianteFinal[Periodos.indexOf(HorarioWS[I].HoraInicioFormateada)]["D" + HorarioWS[I].Dia] = HorarioWS[I].Nombre;
        }
    }
    return HorarioEstudianteFinal;
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
        C2.width =  LogoCasa.naturalWidth;
        var Contexto = C2.getContext('2d');

        Contexto.drawImage(LogoCasa, 0, 0, C2.width, C2.height, 0, 0, C2.width, C2.height);
        LogoIMG64CasaTresMundos = C2.toDataURL();
    }
   
}