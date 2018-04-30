/* Funciones de la API*/

        function Cargar_Proveedores() 
        {
            Tabla_Proveedor.clear().draw();
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Proveedor',
                type: 'GET',
                success: function (Resultado) 
                {
                  if(Resultado.Codigo == null)
                  {
                      Resultado = JSON.parse(Resultado);
                      $('#Proveedor_Instrumento').html('');
                      for (i = 0; i < Resultado.length; i++) 
                      {      
                        var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "'+Resultado[i].Imagen+'"></img>';
                        Tabla_Proveedor.row.add
                            ([
                                Resultado[i].ID_Proveedor,
                                Imagen,
                                Resultado[i].Nombre,
                                '<a href="tel:' + Resultado[i].Telefono_1 + '">' + Resultado[i].Telefono_1 +'</a>',
                                '<a href="mailto:' + Resultado[i].Correo + '">' + Resultado[i].Correo +'</a>',
                                '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Proveedor('+Resultado[i].ID_Proveedor+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                '<button type="button" class="btn btn-danger" onclick ="Eliminar_Proveedor('+Resultado[i].ID_Proveedor+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                            ]).draw( false );
                        $('#Proveedor_Instrumento').append('<option data-subtext="'+Resultado[i].Nombre+'">#'+Resultado[i].ID_Proveedor+'</option>'); 
                      }
                      Cargar_Remisiones();
                  }                   
                },
                error: function (Error) 
                {
                    swal
                    ({
                          title: "Error listando Proveedores",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }
            });
        }


        function Cargar_Proveedor_Por_ID(ID) 
        {        
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Proveedor/'+ID,
                type: 'GET',
                success: function (Resultado) 
                {            
                      Resultado = JSON.parse(Resultado);     
                      if(Resultado.Codigo == null)
                      {       
                          Resultado = Resultado[0];                  
                          $('#ID_Proveedor').val(Resultado.ID_Proveedor); 
                          $('#Correo_Proveedor').val(Resultado.Correo);
                          $('#Direccion_Proveedor').val(Resultado.Direccion);
                          $('#Telefono1_Proveedor').val(Resultado.Telefono_1);
                          $('#Telefono2_Proveedor').val(Resultado.Telefono_2);
                          $('#Nombre_Proveedor').val(Resultado.Nombre);
                          $('#Imagen_Proveedor').attr("src",Resultado.Imagen);
                          Base64Imagen(Resultado.Imagen) 
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
                          title: "Error al intentar ver el detalle del proveedor",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }
            });
        }

        function Insertar_Actualizar_Proveedor(Comando)
        {     
            if($('#Telefono1_Proveedor').val() != "" && $('#Nombre_Proveedor').val() != "" && $('#Correo_Proveedor').val() != "" && $('#Direccion_Proveedor').val() != "")
            {
              if($('#Telefono1_Proveedor').val().length == 8 && $('#Telefono2_Proveedor').val().length == 8 )
              {
                if(ValidarCorreo($('#Correo_Proveedor').val()) == true)
                {                  
                  var Ancho  =  document.getElementById('Imagen_Proveedor').naturalWidth;
                  var Altura =  document.getElementById('Imagen_Proveedor').naturalHeight;

                      if((Ancho <= 600 & Ancho >= 0) & (Altura <= 600 & Altura >= 0))
                      {       
                          if(Comando == "Nuevo")
                          {                    
                              swal({title:'Espere',text: 'Se esta subiendo la imagen al servidor e insertando el proveedor',type: 'info', allowOutsideClick: false});
                          }
                          else
                          {
                              swal({title:'Espere',text: 'Se esta actualizando el proveedor',type: 'info', allowOutsideClick: false});
                          }
                          swal.showLoading();
                          Insertar_Imagen_API_Proveedor(Comando);
                          
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
                              text: "El formato del correo ingresado no es correcto",
                              type: "warning",
                    });
                }
              }
              else
              {
                  swal
                        ({
                              title: "Aviso",
                              text: "Los numeros de telefonos deben ser de 8 digitos.",
                              type: "warning",
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

        function Eliminar_Proveedor(ID)
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

                          url: 'http://melbws.azurewebsites.net/api/Proveedor/'+ID,
                          type: 'DELETE',
                          success: function(Resultado)
                          {
                             swal.closeModal();
                             Resultado = JSON.parse(Resultado);
                             if(Resultado.Codigo == 5)
                             {                                    
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                 $('#ADD').html('<span class="btn-label"><i class="ion-person" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
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
                             Cargar_Proveedores();
                          },
                          error: function(Respuesta)
                          {
                             swal("Error", "Ocurrio un error al borrar el proveedor", "error");
                          },
                        });
                  } 
                  
            });            
        }
    
/* Funcionalidad de formularios  */

        function Detallar_Datos_Proveedor(ID)
        {           
            $('#Switch_Editar_Proveedor').prop('checked',false);
            Habilitar_Deshabilitar_Proveedor(false);        
            Operacion = 'Actualizar';                
            $('#Proveedores').hide(300);
            $('#Proveedor_Detalle').show(400);
            $('#ADD').hide('drop',400);
            $('#Busqueda_Form').show(400);
            $('#Busqueda_Form').css('display','inline-flex');
            $('#Contenedor_Panel').show();
            $('#Header_Proveedor_Texto').text('Descripción del proveedor');
            $('#Actualizar_Proveedor').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Proveedor');
            Cargar_Proveedor_Por_ID(ID); 
            $('.FlotarDerecha').show();
        }

        function Habilitar_Deshabilitar_Proveedor(Cond)
        {
            if(Cond == true)
            {
                $("#ID_Proveedor").prop("disabled", false);
                $('#Nombre_Proveedor').removeAttr('disabled');
                $('#Direccion_Proveedor').removeAttr('disabled');
                $('#Telefono1_Proveedor').removeAttr('disabled');
                $('#Telefono2_Proveedor').removeAttr('disabled');
                $('#Correo_Proveedor').removeAttr('disabled');
                $('#Cambiar_Imagen_Proveedor').removeAttr('disabled');
                $('#Actualizar_Proveedor').removeAttr('disabled');
                $('.selectpicker').selectpicker('refresh');
            }
            else
            {
                $("#ID_Proveedor").prop("disabled", "true");
                $('#Nombre_Proveedor').prop('disabled','true');
                $('#Direccion_Proveedor').prop('disabled','true');
                $('#Telefono1_Proveedor').prop('disabled','true');
                $('#Telefono2_Proveedor').prop('disabled','true');
                $('#Correo_Proveedor').prop('disabled','true');
                $('#Cambiar_Imagen_Proveedor').prop('disabled','true');
                $('#Actualizar_Proveedor').prop('disabled','true');
                $('.selectpicker').selectpicker('refresh');
            }
        }

        function Reiniciar_Controles_Proveedor()
        {
            $('#ID_Proveedor').val(1);
            $('#Nombre_Proveedor').val('');
            $('#Direccion_Proveedor').val('');
            $('#Telefono1_Proveedor').val('');
            $('#Telefono2_Proveedor').val('');
            $('#Correo_Proveedor').val('');
        }

        var Imagen_Proveedor = function(Archivo)
        {
            var IMG = Archivo.target;
            var Lector = new FileReader();

            Lector.onload = function()
            {
               ImagenBase64 = (Lector.result).split(',')[1];
               $('#Imagen_Proveedor').prop('src',Lector.result);

            }
            Lector.readAsDataURL(IMG.files[0]);
        };

/* Funciones de soporte */
        
        function Insertar_Imagen_API_Proveedor(Comando)
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
                    var Proveedor_BBDD = {ID_Proveedor: $('#ID_Proveedor').val(), Nombre: $('#Nombre_Proveedor').val(), Telefono_1: $('#Telefono1_Proveedor').val(), Telefono_2: $('#Telefono2_Proveedor').val(), Correo: $('#Correo_Proveedor').val(), Direccion: $('#Direccion_Proveedor').val(),Imagen: Resultado.data.link};

                    if(Comando == 'Nuevo')
                    {                                                
                        $.ajax
                        ({
                              url: 'http://melbws.azurewebsites.net/api/Proveedor/',
                              type: 'POST',
                              data: Proveedor_BBDD,
                              success: function(Resultado)
                              {
                                 Resultado = JSON.parse(Resultado);
                                 if(Resultado.Codigo == 5)
                                 {                                    
                                     swal.closeModal();
                                     swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                     Cargar_Proveedores();
                                     $('#Proveedor_Detalle').hide(500);
                                     $('#Proveedores').show(400);
                                     $('#ADD').html('<span class="btn-label"><i class="ion-person" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
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

                              },
                              error: function(Respuesta)
                              {
                                 swal("Error", "Ocurrio un error al insertar el proveedor", "error");
                              },
                        });
                        swal.closeModal();
                    }
                    else
                    {
                        $.ajax
                        ({
                              url: 'http://melbws.azurewebsites.net/api/Proveedor/',
                              type: 'PUT',
                              data: Proveedor_BBDD,
                              success: function(Resultado)
                              {
                                 Resultado = JSON.parse(Resultado);
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                 Cargar_Proveedores();
                                 $('#Proveedor_Detalle').hide(500);
                                 $('#Proveedores').show(400);
                                 $('#ADD').html('<span class="btn-label"><i class="ion-person" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
                                 $('#ADD').show("drop", 50);
                              },
                              error: function(xhr, status, error)
                              {
                                 swal("Error", "Ocurrio un error al insertar el proveedor", "error");
                              },
                        });
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

   function ValidarCorreo(Correo) 
   {
      var RegXP = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return RegXP.test( Correo );
   }