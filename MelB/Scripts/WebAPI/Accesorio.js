
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
                                '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Insertar_Actualizar_Accesorio('+Resultado[i].ID_Instrumento+',\'Actualizar\','+Resultado[i].ID_Accesorio+',\''+Resultado[i].Nombre+'\',\''+Resultado[i].Descripcion+'\')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                '<button type="button" class="btn btn-danger" onclick ="Eliminar_Accesorio('+Resultado[i].ID_Accesorio+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
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


function Insertar_Actualizar_Accesorio(ID,Comando,ID_Accesorio,Nombre,Descripcion)
{
        
  var Titulo;
  var Error;
  swal.setDefaults
  ({
        input: 'text',
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        animation: true,
        progressSteps: ['1', '2', '3'],
        allowOutsideClick: false
  });

  if(Comando == 'Nuevo')
  {
      Titulo = 'Añadiendo accesorio';
      Error = 'Ocurrio un inconveniente al añadir al accesorio.';
      var Pasos = 
      [
        {
            title: 'Añadir Accesorio',
            text: 'ID Accesorio',
            input : 'number',
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
            inputAttributes: 
            {
                maxlength : 50
            },
            inputClass: 'form-control'
        }
      ]
  }
  else
  {
      Titulo = 'Actualizando accesorio';
      Error = 'Ocurrio un inconveniente al actualizar el accesorio.';
      var Pasos = 
      [  
        {
            title: 'Actualizar Accesorio',
            text: 'Nombre del accesorio',
            input : 'text',
            inputValue : Nombre,
            inputAttributes: 
            {
                maxlength : 15
            },
            inputClass: 'form-control'
        },
        {
            title: 'Actualizar Accesorio',
            text: 'Descripción del accessorio',
            input : 'textarea',
            inputValue : Descripcion,
            inputAttributes: 
            {
                maxlength : 50
            },
            inputClass: 'form-control'
        }
      ]
  }

    swal.queue(Pasos).then(function (Modal) 
    {
        if(Modal[1] != '' && Modal[2] != '')
        {         
            swal.resetDefaults();
            swal({title: Titulo,text: 'Espere por favor',type: 'info', allowOutsideClick: false});
            swal.showLoading();   

            if(Comando == 'Nuevo')
            {                
              $.ajax({

                  url: 'http://melbws.azurewebsites.net/api/Accesorio/',

                  type: 'POST',

                  data: {ID_Instrumento : $('#ID_Instrumento').val(),ID_Accesorio: Modal[0],Nombre: Modal[1],Descripcion:Modal[2]},

                  success: function (Resultado) 
                  {   
                     Resultado = JSON.parse(Resultado);
                     if(Resultado.Codigo == 5)
                     {                                    
                           swal.closeModal();
                           swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                        }
                   else
                   {
                       var Cadena_Errores = "";
                       for (var I = 0; I < Resultado.Errores.length; I++) 
                       {
                            Cadena_Errores = (I+1) +" - "+ Resultado.Errores[I].Mensaje;
                       }
                       swal(Resultado.Mensaje_Cabecera,Cadena_Errores, "warning");
                   }                                     
                  },

                  error: function (Mensaje) 
                  {
                      swal.closeModal();
                      swal
                      ({
                            title: "Error",
                            text: Error,
                            type: "error",
                      });
                  }

              });
            }
            else
            {
              $.ajax({

                  url: 'http://localhost:53603/api/Accesorio/',

                  type: 'PUT',

                  data: {ID_Instrumento : $('#ID_Instrumento').val(),ID_Accesorio: ID_Accesorio,Nombre: Modal[0],Descripcion:Modal[1]},

                  success: function (Resultado) 
                  {   
                     Resultado = JSON.parse(Resultado);
                     if(Resultado.Codigo == 5)
                     {                                    
                           swal.closeModal();
                           swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                        }
                   else
                   {
                       var Cadena_Errores = "";
                       for (var I = 0; I < Resultado.Errores.length; I++) 
                       {
                            Cadena_Errores = (I+1) +" - "+ Resultado.Errores[I].Mensaje;
                       }
                       swal(Resultado.Mensaje_Cabecera,Cadena_Errores, "warning");
                   }                                     
                  },

                  error: function (Mensaje) 
                  {
                      swal.closeModal();
                      swal
                      ({
                            title: "Error",
                            text: Error,
                            type: "error",
                      });
                  }

              });
            }
        }
        else
        {
            swal.resetDefaults();
            swal.closeModal();
            swal
            ({
                  title: "Aviso",
                  text: "Revise que haya introducido los campos correctamente",
                  type: "warning",
            });
        }        
    })
}

 function Eliminar_Accesorio(ID)
        {
            swal
            ({
                  title: "¿Estas seguro?",
                  text: "Una vez que lo borres, no hay marcha atras",
                  type: "question",
                  showCancelButton: true
            })
            .then((willDelete) => 
            {
                  if (willDelete) 
                  {
                        swal({title:'Eliminando',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
                        swal.showLoading();
                        $.ajax
                        ({

                          url: 'http://melbws.azurewebsites.net/api/Accesorio/'+ID,
                          type: 'DELETE',
                          success: function(Resultado)
                          {
                             
                             Resultado = JSON.parse(Resultado);
                             if(Resultado.Codigo == 5)
                             {                                    
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                             }
                             else
                             {
                                 var Cadena_Errores = "";
                                 for (var I = 0; I < Resultado.Errores.length; I++) 
                                 {
                                      Cadena_Errores = (I+1) +" - "+ Resultado.Errores[I].Mensaje;
                                 }
                                 swal(Resultado.Mensaje_Cabecera,Cadena_Errores, "warning");
                             }

                          },
                          error: function(Respuesta)
                          {
                             swal("Error", "Ocurrio un error al borrar el accesorio", "error");
                          },
                        });
                  } 
                  
            });            
        }