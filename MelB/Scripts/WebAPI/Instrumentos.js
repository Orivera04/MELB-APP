var ImagenBase64;
/* Funciones de la API*/
        function Cargar_Instrumentos() 
        {
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Instrumentos',
                type: 'GET',
                success: function (Resultado) 
                {
                    Resultado = JSON.parse(Resultado);
                    for (i = 0; i < Resultado.length; i++) 
                    {      
                            var Bodega_HTML = (Resultado[i].Tipo_Ubicacion == 'Bodega') ? '<span class="label label-warning ">Bodega</span>' : '<span class="label label-info">Aula</span>'
                            var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "'+Resultado[i].Imagen+'"></img>'
                            Tabla_Instrumento.row.add
                            ([
                                    Resultado[i].ID_Instrumento,
                                    Imagen,
                                    Resultado[i].Nombre,
                                    Resultado[i].Marca,                    
                                    Resultado[i].Tipo_Ubicacion,
                                    '<button type="button" class="btn btn-success" onclick ="Detallar_Datos_Instrumento('+Resultado[i].ID_Instrumento+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                    '<button type="button" class="btn btn-danger" onclick ="Eliminar_Instrumento('+Resultado[i].ID_Instrumento+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                            ] ).draw( false );
                    }
                    Cargar_Estuches();                   
                },
                error: function (xhr, status, error) 
                {
                    swal
                    ({
                          title: "Error listando instrumentos",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }
            });
        }


        function Cargar_Instrumentos_Por_ID(ID) 
        {
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Instrumentos/'+ID,
                type: 'GET',
                success: function (Resultado) 
                {            
                      Resultado = JSON.parse(Resultado);     
                      if(Resultado.Codigo == null)
                      {       
                          Resultado = Resultado[0];                  
                          $('#ID_Instrumento').val(Resultado.ID_Instrumento); 
                          $('#Tipo_Instrumento').selectpicker('val', Resultado.Nombre);
                          $('#Color_Instrumento').selectpicker('val', Resultado.Color);
                          $('#Marca_Instrumento').val(Resultado.Marca);
                          $('#Proveedor_Instrumento').selectpicker('val', Resultado.Proveedor);                      
                          $('#Estuche_Instrumento').selectpicker('val', Resultado.Nombre_Estuche);
                          $('#Material_Instrumento').selectpicker('val', Resultado.Material);
                          $('#Descripcion_Inst').val(Resultado.Descripcion);
                          $('#Estado_Instrumento').selectpicker('val', Resultado.Estado); 
                          $('#Ubicacion_Instrumento').selectpicker('val', Resultado.Tipo_Ubicacion);
                          $('#Imagen_Instrumento').attr("src",Resultado.Imagen);

                          if(Resultado.Tipo_Ubicacion == "Bodega")
                          {   
                              $('#Label_Tipo_A_B').text('Estante');
                              $('#Estante_Instrumento').val(Resultado.Estante);
                              $('#Gaveta_Instrumento').val(Resultado.Gaveta);
                              $('#Gaveta_Form').show(150);
                          }
                          else
                          {
                               $('#Label_Tipo_A_B').text('ID Aula');
                               $('#Estante_Instrumento').val(Resultado.Numero_Aula);
                               $('#Gaveta_Form').hide(150);

                          }                
                          Base64Imagen(Resultado.Imagen) 
                          $('.selectpicker').selectpicker('refresh');    
                      }
                      else
                      {
                          swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "warning");

                      }           
                },
                error: function (Mensaje) 
                {
                    swal
                    ({
                          title: "Error al intentar ver el detalle del instrumento",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }
            });
        }

        function Insertar_Actualizar_Instrumento(Comando)
        {     
            if($('#Marca_Instrumento').val() != "" && $('#Descripcion_Inst').val() != "")
            {
                var Ancho  =  document.getElementById('Imagen_Instrumento').naturalWidth;
                var Altura =  document.getElementById('Imagen_Instrumento').naturalHeight;

                if((Ancho <= 600 & Ancho >= 0) & (Altura <= 600 & Altura >= 0))
                {       
                    if(Comando == "Nuevo")
                    {                    
                        swal({title:'Espere',text: 'Se esta subiendo la imagen al servidor e insertando el instrumento',type: 'info', allowOutsideClick: false});
                    }
                    else
                    {
                        swal({title:'Espere',text: 'Se esta actualizando el instrumento',type: 'info', allowOutsideClick: false});
                    }
                    swal.showLoading();
                    Insertar_Imagen_API(Comando);
                }                  
                else
                {
                    swal
                        ({
                              title: "Error al añadir el instrumento",
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

        function Eliminar_Instrumento(ID)
        {
            swal
            ({
                  title: "¿Estas seguro?",
                  text: "Una vez que lo borres, no hay marcha atras",
                  type: "error",
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

                          url: 'http://melbws.azurewebsites.net/api/Instrumentos/'+ID,
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
                             swal("Error", "Ocurrio un error al borrar el instrumento", "error");
                          },
                        });
                  } 
                  
            });            
        }
    
/* Funcionalidad de formularios  */

        function Detallar_Datos_Instrumento(ID)
        {           
            $('#Switch_Editar').prop('checked',false);
            Habilitar_Deshabilitar_Instrumentos(false);        
            Operacion = 'Actualizar';                
            $('#Instrumentos').hide(300);
            $('#Instrumento_Detalle').show(400);
            $('#ADD').hide('drop',400);
            $('#Busqueda_Form').show(400);
            $('#Busqueda_Form').css('display','inline-flex');
            $('#Contenedor_Panel').show();
            $('#Header_Instrumento_Texto').text('Descripción del instrumento');
            $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Instrumento');
            Cargar_Instrumentos_Por_ID(ID); 
            $('.FlotarDerecha').show();
        }

        function Habilitar_Deshabilitar_Instrumentos(Cond)
        {
            if(Cond == true)
            {
                $("#ID_Instrumento").prop("disabled", "false");
                $("#Tipo_Instrumento").removeAttr('disabled');
                $('#Color_Instrumento').removeAttr('disabled');
                $('#Marca_Instrumento').removeAttr('disabled');
                $('#Proveedor_Instrumento').removeAttr('disabled');
                $('#Estuche_Instrumento').removeAttr('disabled');
                $('#Material_Instrumento').removeAttr('disabled');
                $('#Descripcion_Inst').removeAttr('disabled');
                $('#Estado_Instrumento').removeAttr('disabled');
                $('#Ubicacion_Instrumento').removeAttr('disabled');
                $('#Estante_Instrumento').removeAttr('disabled');
                $('#Gaveta_Instrumento').removeAttr('disabled');
                $('#Cambiar_Imagen_Instrumento').removeAttr('disabled');
                $('#Actualizar_Instrumento').removeAttr('disabled');
                $('.selectpicker').selectpicker('refresh');
            }
            else
            {
                $("#ID_Instrumento").prop("disabled", "true");
                $('#Tipo_Instrumento').prop('disabled','true');
                $('#Color_Instrumento').prop('disabled','true');
                $('#Marca_Instrumento').prop('disabled','true');
                $('#Proveedor_Instrumento').prop('disabled','true');
                $('#Estuche_Instrumento').prop('disabled','true');
                $('#Material_Instrumento').prop('disabled','true');
                $('#Descripcion_Inst').prop('disabled','true');
                $('#Estado_Instrumento').prop('disabled','true');
                $('#Ubicacion_Instrumento').prop('disabled','true');
                $('#Estante_Instrumento').prop('disabled','true');
                $('#Gaveta_Instrumento').prop('disabled','true');
                $('#Cambiar_Imagen_Instrumento').prop('disabled','true');
                $('#Actualizar_Instrumento').prop('disabled','true');
                $('.selectpicker').selectpicker('refresh');
            }
        }

        function Reiniciar_Controles_Instrumento()
        {
            $('#ID_Instrumento').val(1);
            $("#Tipo_Instrumento").selectpicker('val', 'Guitarra');
            $('#Color_Instrumento').selectpicker('val', 'Rojo');
            $('#Marca_Instrumento').val('');
            $('#Proveedor_Instrumento').selectpicker('val','Bansbach NIC');            
            $('#Material_Instrumento').selectpicker('val','Madera');
            $('#Descripcion_Inst').val('');
            $('#Estado_Instrumento').selectpicker('val','Excelente');
            $('#Ubicacion_Instrumento').selectpicker('val','Bodega');
            $('#Estante_Instrumento').val(1);
            $('#Gaveta_Instrumento').val(1);
        }


        var Imagen_Instrumento = function(Archivo)
        {
            var IMG = Archivo.target;
            var Lector = new FileReader();

            Lector.onload = function()
            {
               ImagenBase64 = (Lector.result).split(',')[1];
               $('#Imagen_Instrumento').prop('src',Lector.result);

            }
            Lector.readAsDataURL(IMG.files[0]);
        };

/* Funciones de soporte */
        
        function Insertar_Imagen_API(Comando)
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
                    var Instrumento_BBDD = ($('#Ubicacion_Instrumento').val() == 'Aula') 
                                               ? {ID_Instrumento: $('#ID_Instrumento').val(), Nombre: $('#Tipo_Instrumento').val(),Material: $('#Material_Instrumento').val(),Color: $('#Color_Instrumento').val() ,Imagen: Resultado.data.link ,Marca: $('#Marca_Instrumento').val(),Descripcion: $('#Descripcion_Inst').val(),Estado: $('#Estado_Instrumento').val(),ID_Estuche:$('#Estuche_Instrumento').val().substring(1,$('#Estuche_Instrumento').val().length),ID_Proveedor: $('#Proveedor_Instrumento').val().substring(1,$('#Proveedor_Instrumento').val().length),Tipo_Ubicacion: 0,Numero_Aula: $('#Estante_Instrumento').val()}
                                               : {ID_Instrumento: $('#ID_Instrumento').val(), Nombre: $('#Tipo_Instrumento').val(),Material: $('#Material_Instrumento').val(),Color: $('#Color_Instrumento').val(), Imagen: Resultado.data.link ,Marca: $('#Marca_Instrumento').val(),Descripcion: $('#Descripcion_Inst').val(),Estado: $('#Estado_Instrumento').val(),ID_Estuche:$('#Estuche_Instrumento').val().substring(1,$('#Estuche_Instrumento').val().length),ID_Proveedor: $('#Proveedor_Instrumento').val().substring(1,$('#Proveedor_Instrumento').val().length),Tipo_Ubicacion: 1,Estante: $('#Estante_Instrumento').val(),Gaveta: $('#Gaveta_Instrumento').val()}                       
                    if(Comando == 'Nuevo')
                    {                                                
                        $.ajax
                        ({

                              url: 'http://melbws.azurewebsites.net/api/Instrumentos/',
                              type: 'POST',
                              data: Instrumento_BBDD,
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
                                 swal("Error", "Ocurrio un error al insertar el instrumento", "error");
                              },
                        });
                        swal.closeModal();
                    }
                    else
                    {
                        $.ajax
                        ({
                              url: 'http://melbws.azurewebsites.net/api/Instrumentos/',
                              type: 'PUT',
                              data: Instrumento_BBDD,
                              success: function(Resultado)
                              {
                                 Resultado = JSON.parse(Resultado);
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                              },
                              error: function(xhr, status, error)
                              {
                                 swal("Error", "Ocurrio un error al insertar el instrumento", "error");
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

        function Base64Imagen(URL) 
        {
            var Imagen = new Image();
            Imagen.setAttribute('crossOrigin', 'anonymous');

            Imagen.onload = function () 
            {
                var Canvas = document.createElement("canvas");
                Canvas.width =this.width;
                Canvas.height =this.height;
                var Contexto = Canvas.getContext("2d");
                Contexto.drawImage(this, 0, 0);
                ImagenBase64 = Canvas.toDataURL().split(',')[1];                
            };

            Imagen.src = URL;
        }