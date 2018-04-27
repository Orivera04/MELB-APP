/* Funciones de la API*/
function Cargar_Estuches() 
{
    Tabla_Estuche.clear().draw();
    $.ajax
    ({
        url: 'http://melbws.azurewebsites.net/api/Estuche',
        type: 'GET',
        success: function (Resultado) 
        {
            if(Resultado.Codigo == null)
            {
                Resultado = JSON.parse(Resultado); 
                for (i = 0; i < Resultado.length; i++) 
                {   
                    var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "'+Resultado[i].Imagen+'"></img>';
                    Tabla_Estuche.row.add
                    ([
                        Resultado[i].ID_Estuche,
                        Imagen,
                        Resultado[i].Color,
                        '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Estuche('+Resultado[i].ID_Estuche+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                        '<button type="button" class="btn btn-danger" onclick ="Eliminar_Estuche('+Resultado[i].ID_Estuche+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                    ] ).draw( false );
                    $('#Estuche_Instrumento').append('<option data-subtext="'+Resultado[i].Nombre+'">#'+Resultado[i].ID_Estuche+'</option>'); 
                }       
                    Cargar_Proveedores();
            }
        },
        error: function (Mensaje) 
        {
           swal
            ({
                  title: "Error listando estuches",
                  text: "No se pudo conectar con el servidor.",
                  type: "error",
            });
        }
    });
}

        function Cargar_Estuches_Por_ID(ID) 
        {
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Estuche/'+ID,
                type: 'GET',
                success: function (Resultado) 
                {   
                    Resultado = JSON.parse(Resultado);     
                    if(Resultado.Codigo == null)
                    {            
                      Resultado = Resultado[0]; 
                      $('#ID_Estuche').val(Resultado.ID_Estuche); 
                      $('#Tipo_Estuche').val(Resultado.Nombre);
                      $('#Marca_Estuche').val(Resultado.Marca);
                      $('#Material_Estuche').selectpicker('val', Resultado.Material);
                      $('#Color_Estuche').selectpicker('val', Resultado.Color);                      
                      $('#Estado_Estuche').selectpicker('val', Resultado.Estado); 
                      $('#Imagen_Estuche').attr("src",Resultado.Imagen);

                      Base64Imagen(Resultado.Imagen) 
                      $('.selectpicker').selectpicker('refresh');   
                    }
                    else
                    {
                        swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "info");
                    }              
                },
                error: function (Mensaje) 
                {
                    swal
                    ({
                          title: "Error al intentar ver el detalle del estuche",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }
            });
        }

        function Insertar_Actualizar_Estuche(Comando)
        {     
            if($('#Marca_Estuche').val() != "")
            {
                var Ancho  =  document.getElementById('Imagen_Estuche').naturalWidth;
                var Altura =  document.getElementById('Imagen_Estuche').naturalHeight;

                if((Ancho <= 600 & Ancho >= 0) & (Altura <= 600 & Altura >= 0))
                {       
                    if(Comando == "Nuevo")
                    {                    
                        swal({title:'Espere',text: 'Se esta subiendo la imagen al servidor e insertando el Estuche',type: 'info', allowOutsideClick: false});
                    }
                    else
                    {
                        swal({title:'Espere',text: 'Se esta actualizando el Estuche',type: 'info', allowOutsideClick: false});
                    }
                    swal.showLoading();
                    Insertar_Imagen_API_Estuche(Comando);
                }                  
                else
                {
                    swal
                        ({
                              title: "Error al subir la imagen",
                              text: "La imagen debe ser como maximo de  600 x 600.",
                              type: "error",
                        });
                }
            }
            else
            {
                 swal
                        ({
                              title: "Aviso",
                              text: "Algunos campos estan vacios",
                              type: "warning",
                        });
            }
        };

        function Eliminar_Estuche(ID)
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

                          url: 'http://melbws.azurewebsites.net/api/Estuche/'+ID,
                          type: 'DELETE',
                          success: function(Resultado)
                          {
                             swal.closeModal();
                             Resultado = JSON.parse(Resultado);
                             if(Resultado.Codigo == 5)
                             {                                    
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                 $('#ADD').html('<span class="btn-label"><i class="ion-nuclear" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
                                 $('#ADD').show("drop", 50);  
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
                             Cargar_Estuches();
                          },
                          error: function(Respuesta)
                          {
                             swal("Error", "Ocurrio un error al borrar el Estuche", "error");
                          },
                        });
                  }    
            });            
        }
    
/* Funcionalidad de formularios  */

        function Detallar_Datos_Estuche(ID)
        {           
            $('#Switch_Editar_Estuche').prop('checked',false);
            Habilitar_Deshabilitar_Estuche(false);        
            Operacion = 'Actualizar';                
            $('#Estuches').hide(300);
            $('#Estuche_Detalle').show(400);
            $('#ADD').hide('drop',400);
            $('#Busqueda_Form').show(400);
            $('#Busqueda_Form').css('display','inline-flex');
            $('#Contenedor_Panel').show();
            $('#Header_Estuche_Texto').text('Descripción del Estuche');
            $('#Actualizar_Estuche').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Estuche');
            Cargar_Estuches_Por_ID(ID);
            $('.FlotarDerecha').show();
        }

        function Habilitar_Deshabilitar_Estuche(Cond)
        {
            if(Cond == true)
            {
                $("#ID_Estuche").prop("disabled", "false");
                $("#Tipo_Estuche").removeAttr('disabled');
                $('#Color_Estuche').removeAttr('disabled');
                $('#Marca_Estuche').removeAttr('disabled');
                $('#Material_Estuche').removeAttr('disabled');
                $('#Estado_Estuche').removeAttr('disabled');
                $('#Cambiar_Imagen_Estuche').removeAttr('disabled');
                $('#Actualizar_Estuche').removeAttr('disabled');
                $('.selectpicker').selectpicker('refresh');
            }
            else
            {
                $("#ID_Estuche").prop("disabled", "true");
                $('#Tipo_Estuche').prop('disabled','true');
                $('#Color_Estuche').prop('disabled','true');
                $('#Marca_Estuche').prop('disabled','true');
                $('#Material_Estuche').prop('disabled','true');
                $('#Estado_Estuche').prop('disabled','true');
                $('#Cambiar_Imagen_Estuche').prop('disabled','true');
                $('#Actualizar_Estuche').prop('disabled','true');
                $('.selectpicker').selectpicker('refresh');
            }
        }

        function Reiniciar_Controles_Estuche()
        {
            $('#ID_Estuche').val(1);
            $("#Tipo_Estuche").selectpicker('val', 'Guitarra');
            $('#Color_Estuche').selectpicker('val', 'Rojo');
            $('#Marca_Estuche').val('');
            $('#Material_Estuche').selectpicker('val','Plastico');
            $('#Estado_Estuche').selectpicker('val','Excelente');
        }


        var Imagen_Estuche = function(Archivo)
        {
            var IMG_Estuche = Archivo.target;
            var Lector_Estuche = new FileReader();

            Lector_Estuche.onload = function()
            {
               ImagenBase64 = (Lector_Estuche.result).split(',')[1];
               $('#Imagen_Estuche').prop('src',Lector_Estuche.result);

            }
            Lector_Estuche.readAsDataURL(IMG_Estuche.files[0]);
        };

/* Funciones de soporte */
        
        function Insertar_Imagen_API_Estuche(Comando)
        {
            $.ajax
            ({
                url: 'https://api.imgur.com/3/image',
                type: 'POST',
                headers: 
                {
                    'Authorization':'Client-ID 46be03ad12c8728'                    
                },
                data : {image : ImagenBase64},
                success: function (Resultado)
                {
                    var Estuche_BBDD = {ID_Estuche: $('#ID_Estuche').val(), Nombre: $('#Tipo_Estuche').val(), Marca: $('#Marca_Estuche').val(),Material: $('#Material_Estuche').val(), Color: $('#Color_Estuche').val(), Estado: $('#Estado_Estuche').val(),Imagen: Resultado.data.link};
                                       
                    if(Comando == 'Nuevo')
                    {                                                
                        $.ajax
                        ({

                              url: 'http://melbws.azurewebsites.net/api/Estuche/',
                              type: 'POST',
                              data: Estuche_BBDD,
                              success: function(Resultado)
                              {
                                 Resultado = JSON.parse(Resultado);
                                 if(Resultado.Codigo == 5)
                                 {                                    
                                     swal.closeModal();
                                     swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                     $('#Estuche_Detalle').hide(500);
                                     $('#Estuches').show(400);
                                     $('#ADD').html('<span class="btn-label"><i class="ion-nuclear" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
                                     $('#ADD').show("drop", 50);  
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
                                Cargar_Estuches();
                              },
                              error: function(Respuesta)
                              {
                                 swal("Error", "Ocurrio un error al insertar el Estuche", "error");
                              },
                        });
                        swal.closeModal();
                    }
                    else
                    {
                        $.ajax
                        ({
                              url: 'http://melbws.azurewebsites.net/api/Estuche/',
                              type: 'PUT',
                              data: Estuche_BBDD,
                              success: function(Resultado)
                              {
                                 Resultado = JSON.parse(Resultado);
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                 $('#Estuche_Detalle').hide(500);
                                 $('#Estuches').show(400);
                                 $('#ADD').html('<span class="btn-label"><i class="ion-nuclear" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
                                 $('#ADD').show("drop", 50);
                              },
                              error: function(xhr, status, error)
                              {
                                 swal("Error", "Ocurrio un error al insertar el Estuche", "error");
                              },
                        });
                        Cargar_Estuches();
                        swal.closeModal();
                    }
                },                  
                error: function (xhr, status, error) 
                {
                    swal.closeModal();
                    swal
                    ({
                          title: "Error",
                          text: "Ocurrio un error al subir la imagen,intentelo de nuevo",
                          type: "error",
                    });
                }               
            })
        }