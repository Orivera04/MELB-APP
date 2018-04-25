
/* Funciones de la API */
    function Cargar_Accesorios(ID)  
    {
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Accesorio/'+ID,

            type: 'GET',

            success: function (Resultado) 
            {    
                if(Resultado.Codigo == null)
                {            
                    Resultado = JSON.parse(Resultado);
                    if(Resultado.Codigo == null)
                    {                 
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
                    }
                }                
            },

            error: function (Mensaje) 
            {

                swal
                    ({
                          title: "Error listando accesorios",
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
        input : 'text',
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

    swal.queue(Pasos).then(function (Modal) 
    {
        swal({title:'Añadiendo accesorio',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
        swal.showLoading();
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Accesorio/',

            type: 'POST',

            data: {ID_Instrumento : $('#ID_Instrumento').val(),ID_Accesorio: Modal[0],Nombre: Modal[1],Descripcion:Modal[2]},

            success: function (Resultado) 
            {                
                Resultado = JSON.parse(Resultado);                                                     
                swal.closeModal();
                swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");                                      
            },

            error: function (Mensaje) 
            {

                swal
                ({
                      title: "Error",
                      text: "Ocurrio un inconveniente al añadir al accesorio.",
                      type: "error",
                });
            }

        });        
    })
}