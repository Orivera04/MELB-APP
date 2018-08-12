var ID_Estuche = [];
/* Funciones de la API*/

        function Cargar_Estuches(Reporte) 
        {
          $.ajax
          ({
              url: 'http://melbws.azurewebsites.net/api/Estuche',
              type: 'GET',
              success: function (Resultado) 
              {
                  ID_Estuche = [];                                                        
                  if(Resultado.Codigo == null)
                  {
                      if (Reporte == null) {
                          Resultado = JSON.parse(Resultado);
                          var Disponible;
                          Tabla_Estuche.clear().draw();
                          for (i = 0; i < Resultado.length; i++) {
                              ID_Estuche.push({ ID: Resultado[i].ID_Estuche, Nombre: Resultado[i].Nombre });
                              if (Resultado[i].Disponibilidad == 'En Prestamo') {
                                  Disponible = '<span class="label label-purple">En Prestamo</span>';
                              }
                              else if (Resultado[i].Disponibilidad == 'Asignado') {
                                  Disponible = '<span class="label label-success">Asignado</span>';
                              }
                              else {
                                  Disponible = '<span class="label label-inverse">Sin Asignar</span>';
                              }

                              var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "' + Resultado[i].Imagen + '"></img>';
                              Tabla_Estuche.row.add
                                  ([
                                      Resultado[i].ID_Estuche,
                                      Imagen,
                                      Resultado[i].Nombre,
                                      Resultado[i].Marca,
                                      Disponible,
                                      Resultado[i].Color,
                                      '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Estuche(' + Resultado[i].ID_Estuche + ')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                      '<button type="button" class="btn btn-danger" onclick ="Eliminar_Estuche(' + Resultado[i].ID_Estuche + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                                  ]).draw(false);
                          }
                      }
                      else
                      {
                          GeneralReporteEstuche(JSON.parse(Resultado));
                      }
                  }
                  $('.selectpicker').selectpicker('refresh');
                  if (Reporte == null) { Cargar_Proveedores();}
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
                      $('#Reporte').hide();
                      Resultado = Resultado[0]; 
                      $('#InstrumentoEstuche').show();
                      $('#ID_Estuche').val(Resultado.ID_Estuche); 
                      $('#Tipo_Estuche').val(Resultado.Nombre);
                      $('#Marca_Estuche').val(Resultado.Marca);
                      $('#Material_Estuche').selectpicker('val', Resultado.Material);
                      $('#Color_Estuche').selectpicker('val', Resultado.Color);                      
                      $('#Estado_Estuche').selectpicker('val', Resultado.Estado); 
                      $('#Imagen_Estuche').attr("src",Resultado.Imagen);
                      $('#Descripcion_Estuche').val(Resultado.Descripcion);

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

            $.ajax
                ({
                    url: 'http://melbws.azurewebsites.net/api/Instrumentos?Filtro=Estuche&ID_Filtro=' + ID,
                    type: 'GET',
                    success: function (Instrumento) {
                        Instrumento = JSON.parse(Instrumento);
                        if (Instrumento.Codigo != 0)
                        {
                            Instrumento = Instrumento[0];
                            $('#InstrumentoBotonEstuche').removeAttr('disabled');
                            $('#InstrumentoBotonEstuche').attr('onclick', 'Detallar_Datos_Instrumento(' + Instrumento.ID_Instrumento+')');
                            $('#Instrumento_Asociado').val('#'+Instrumento.ID_Instrumento);
                        }
                        else
                        {
                            $('#Instrumento_Asociado').val('Ninguno');
                            $('#InstrumentoBotonEstuche').prop('disabled', 'true');
                        }
                    },
                    error: function (Error)
                    {
                        $('#Instrumento_Asociado').val('Ninguno');
                        $('#InstrumentoBotonEstuche').prop('disabled', 'true');
                    }
                });
                    
        }

        function Insertar_Actualizar_Estuche(Comando)
        {
            if ($('#Marca_Estuche').val() != "" && $('#Descripcion_Estuche').val() != "")
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
                                 $('#ADD').html('<span class="btn-label"><i class="ion-bag" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
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
                             swal("Error", "No es posible eliminar estuche", "error");
                          },
                        });
                  }    
            });            
        }
        
        function Cargar_Estuches_No_Usados(Tipo_Instrumento_D)
        {
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Estuche?Filtro=Disponible&Instrumento='+Tipo_Instrumento_D,
                type: 'GET',
                success: function (Resultado) 
                {
                    $('#Estuche_Instrumento').html('');  
                    $('#Estuche_Instrumento').append('<option>Ninguno</option>');          
                    if(Resultado.Codigo == null)
                    {
                        Resultado = JSON.parse(Resultado); 
                        for (i = 0; i < Resultado.length; i++) 
                        {   
                            $('#Estuche_Instrumento').append('<option>#'+Resultado[i].ID_Estuche+'</option>'); 
                        }       
                    }
                    $('.selectpicker').selectpicker('refresh');  
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
    
/* Funcionalidad de formularios  */

        function Detallar_Datos_Estuche(ID)
        {           
            $('#Switch_Editar_Estuche').prop('checked',false);
            Habilitar_Deshabilitar_Estuche(false);        
            Operacion = 'Actualizar';                
            $('#Estuches').hide();
            $('#Estuche_Detalle').show(200);
            $('#ADD').hide();
            $('#Busqueda_Form').show();
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
                $("#Tipo_Estuche").removeAttr('disabled');
                $('#Color_Estuche').removeAttr('disabled');
                $('#Marca_Estuche').removeAttr('disabled');
                $('#Material_Estuche').removeAttr('disabled');
                $('#Estado_Estuche').removeAttr('disabled');
                $('#Cambiar_Imagen_Estuche').removeAttr('disabled');
                $('#Actualizar_Estuche').removeAttr('disabled');
                $('#Descripcion_Estuche').removeAttr('disabled');
                $("#ID_Estuche").prop("disabled", "true");
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
                $('#Actualizar_Estuche').prop('disabled', 'true');
                $('#Descripcion_Estuche').prop('disabled', 'true');
                $('.selectpicker').selectpicker('refresh');
            }
        }

        function Reiniciar_Controles_Estuche()
        {
            $("#ID_Estuche").prop("disabled", "true");
            $("#ID_Estuche").val(Tabla_Estuche.column(0).data().length + 1);
            $("#Tipo_Estuche").selectpicker('val', 'Guitarra');
            $('#Color_Estuche').selectpicker('val', 'Rojo');
            $('#Marca_Estuche').val('');
            $('#Material_Estuche').selectpicker('val','Plastico');
            $('#Estado_Estuche').selectpicker('val', 'Excelente');
            $('#Descripcion_Estuche').val('');
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
                    var Estuche_BBDD = { ID_Estuche: $('#ID_Estuche').val(), Nombre: $('#Tipo_Estuche').val(), Marca: $('#Marca_Estuche').val(), Material: $('#Material_Estuche').val(), Color: $('#Color_Estuche').val(), Estado: $('#Estado_Estuche').val(), Imagen: Resultado.data.link, Descripcion: $('#Descripcion_Estuche').val() };
                                       
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
                                     swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                     $('#Estuche_Detalle').hide(500);
                                     $('#Estuches').show(400);
                                     $('#ADD').html('<span class="btn-label"><i class="ion-bag" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
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
                                 Cargar_Estuches();
                                 Resultado = JSON.parse(Resultado);
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                 $('#Estuche_Detalle').hide(500);
                                 $('#Estuches').show(400);
                                 $('#ADD').html('<span class="btn-label"><i class="ion-bag" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
                                 $('#ADD').show("drop", 50);
                              },
                              error: function(Error)
                              {
                                 swal("Error", "Ocurrio un error al insertar el Estuche", "error");
                              },
                        });
                    }
                },                  
                error: function (Error) 
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


function GeneralReporteEstuche(Lista) {
    var Documento = new jsPDF("l", 'cm', "a4");
    var Columnas =
        [
            { title: "ID Estuche", dataKey: "ID_Estuche" },
            { title: "Tipo", dataKey: "Nombre" },
            { title: "Marca", dataKey: "Marca" },
            { title: "Material", dataKey: "Material" },
            { title: "Color", dataKey: "Color" },
            { title: "Estado", dataKey: "Estado" },
            { title: "Descripcion", dataKey: "Descripcion" },
            { title: "Disponible", dataKey: "Disponibilidad" }
        ];


    Documento.autoTable(Columnas, Lista,
        {
            theme: 'grid',
            bodyStyles: {
                lineColor: [221, 221, 221]
            },
            headerStyles: {
                lineWidth: 0,
                fillColor: [22, 12, 40],
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
            addPageContent: function (Event) {
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
                Documento.text(1, 4.2, 'Tipo de documento : Reporte');
                Documento.text(10 + 1, 4.2, 'Tipo de reporte: Estuches');

                /* Footer */
                Documento.text(1, 20, 'Generado automaticamente por : MELBMOI');
                Documento.text(25.5, 20, 'Pagina ' + Event.pageCount);
            }
        });
    window.open(Documento.output('bloburl'), '_blank');
}