
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
        
            swal.mixin({ 
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['1', '2', '3']
}).queue([
  {
    title: 'Question 1',
    text: 'Chaining swal2 modals is easy',
    input: 'number'
  },
  {
    title: 'Question 1',
    text: 'Chaining swal2 modals is easy',
    input: 'text'
  },
  'Question 3'
]).then((result) => {
  if (result.value) {
    swal({
      title: 'All done!',
      html:
        'Your answers: <pre>' +
          JSON.stringify(result.value) +
        '</pre>',
      confirmButtonText: 'Lovely!'
    })
  }
})

}