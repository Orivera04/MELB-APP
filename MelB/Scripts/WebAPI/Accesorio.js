
/* Funciones de la API */
    function Cargar_Accesorios(ID)  
    {
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Accesorio/'+ID,

            type: 'GET',

            success: function (Resultado) 
            {                
                Resultado = JSON.parse(Resultado);
                for (i = 0; i < Resultado.length; i++) 
                {      
                    Tabla_Accesorios.row.add
                    ([                        
                        Resultado[i].ID_Accesorio,
                        Resultado[i].Nombre,
                        Resultado[i].Descripcion,
                        'd',
                        'd'
                    ]).draw( false );                        
                }
            },

            error: function (Mensaje) 
            {

                swal
                    ({
                          title: "Error listandoa accesorios",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
            }

        });
}


function wea()
{
        
        var a = '<div class="panel-heading"><i class="ion-music-note" aria-hidden="true"></i><h3 class="TextoHeader">Instrumentos registrados en inventario</h3></div>';
        swal
        ({
              title: a,
              html: a
        })
}