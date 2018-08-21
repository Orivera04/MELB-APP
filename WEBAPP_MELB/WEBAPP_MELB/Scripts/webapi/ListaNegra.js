/* Funciones de la API */

function Cargar_ListaNegra()
{    
    $.ajax
        ({
            url: 'https://melbws.azurewebsites.net/api/ListaNegra',
            type: 'GET',
            success: function (Resultado) {
                if (Resultado.Codigo == null) {                                            
                        Resultado = JSON.parse(Resultado);
                        for (i = 0; i < Resultado.length; i++) {                                                                              
                            Tabla_ListaNegra.row.add
                                ([
                                    Resultado[i].ID_Estudiante,
                                    Resultado[i].Nombre,
                                    Resultado[i].Motivo_Ingreso,
                                    Resultado[i].Fecha_Formateada,
                                    Resultado[i].Estado,
                                    '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Instrumento(' + Resultado[i].ID_Instrumento + ')"><i class="ion-navicon-round" data-pack="default"></i></button>',                                    
                                ]).draw(false);
                        }
                        Cargar_Aulas();                                                                
                }               
            },
            error: function (Error) {
                swal
                    ({
                        title: "Error listando estudiante en lista negra",
                        text: "No se pudo conectar con el servidor.",
                        type: "error",
                    });
            }
        });
}

