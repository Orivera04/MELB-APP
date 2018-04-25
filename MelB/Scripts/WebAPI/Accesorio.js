
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


function Insertar_Accesorio(ID)
{
        
  swal.setDefaults
  ({
        input: 'text',
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        animation: true,
        progressSteps: ['1', '2', '3']
  });

  var Pasos = 
  [
    {
        title: 'Añadir Accesorio',
        text: 'ID Accesorio',
        input : 'number',
        inputPlaceholder: 'Ingrese el identificador unico de accesorio',
        inputAttributes: 
        {
            min: 1,
            max: 200000,
            step: 1
        },
        inputClass: 'form-control'
    },
    {
        title: 'Añadir Accesorio',
        text: 'Nombre del accesorio',
        input : 'number',
        inputPlaceholder: 'Ingrese el nombre que tendra el accesorio',
        inputAttributes: 
        {
            maxlength : 15
        },
        inputClass: 'form-control'
    },
    {
        title: 'Añadir Accesorio',
        text: 'Descripción del accessorio',
        input : 'textarea',
        inputPlaceholder: 'Ingrese la descripción que tendra el accesorio',
        inputAttributes: 
        {
            maxlength : 50
        },
        inputClass: 'form-control'
    }
  ]

    swal.queue(Pasos).then(function (result) 
    {

        swal.resetDefaults()
        swal({
            title: 'All done!',
            html: 'Your answers: <pre>' +
            JSON.stringify(result) +
            '</pre>',
            confirmButtonText: 'Lovely!',
            showCancelButton: false
        })
    }, function () {
        swal.resetDefaults()
    })
    
}