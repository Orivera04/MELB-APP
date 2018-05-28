var ImagenBase64;
var ID_Instrumento = [];
var LogoIMG64Melb;
var LogoIMG64CasaTresMundos;
/* Funciones de la API*/
        function Cargar_Instrumentos(Reporte) 
        {
            if (Reporte == null) { Tabla_Instrumento.clear().draw(); }        
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Instrumentos',
                type: 'GET',
                success: function (Resultado) 
                {
                  if(Resultado.Codigo == null)
                  {
                      if (Reporte == null) {
                          ID_Instrumento = [];
                          Resultado = JSON.parse(Resultado);
                          for (i = 0; i < Resultado.length; i++) {
                              ID_Instrumento.push({ ID: Resultado[i].ID_Instrumento, Nombre: Resultado[i].Nombre });
                              var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "' + Resultado[i].Imagen + '"></img>'
                              if (Resultado[i].Estado != 'Extraviado') { var Disponibilidad = (Resultado[i].Disponible == 'Disponible') ? '<span class="label label-success">Disponible</span>' : '<span class="label label-purple">En Prestamo</span>' }
                              else { var Disponibilidad = '<span class="label label-danger">No Disponible</span>' }

                              Tabla_Instrumento.row.add
                                  ([
                                      Resultado[i].ID_Instrumento,
                                      Imagen,
                                      Resultado[i].Nombre,
                                      Resultado[i].Marca,
                                      Disponibilidad,
                                      Resultado[i].Tipo_Ubicacion,
                                      '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Instrumento(' + Resultado[i].ID_Instrumento + ')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                      '<button type="button" class="btn btn-danger" onclick ="Eliminar_Instrumento(' + Resultado[i].ID_Instrumento + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                                  ]).draw(false);
                          }
                          $('#CantidadInstrumentosDA').text(Tabla_Instrumento.column(0).data().length);
                      }
                      else
                      {
                          GeneralReporteInstrumento(JSON.parse(Resultado));
                      }
                  }
                   if (Reporte == null) { Cargar_Estuches(); }
                  ID_Instrumento.forEach(function(Elemento) 
                  {
                      $('#ID_Filtro_Remisiones').append('<option data-subtext="'+ Elemento.Nombre+'">#'+Elemento.ID+'</option>');                                                   
                  });
                },
                error: function (Error) 
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
                          $('#Reporte').hide();
                          $('#ID_Instrumento').val(Resultado.ID_Instrumento); 
                          $('#Tipo_Instrumento').selectpicker('val', Resultado.Nombre);
                          $('#Color_Instrumento').selectpicker('val', Resultado.Color);
                          $('#Marca_Instrumento').val(Resultado.Marca);
                          $('#Proveedor_Instrumento').selectpicker('val', '#'+Resultado.ID_Proveedor);
                          Cargar_Estuches_No_Usados(Resultado.Nombre);                                                                      
                          $('#Material_Instrumento').selectpicker('val', Resultado.Material);
                          $('#Descripcion_Inst').val(Resultado.Descripcion);
                          $('#Estado_Instrumento').selectpicker('val', Resultado.Estado); 
                          $('#Ubicacion_Instrumento').selectpicker('val', Resultado.Tipo_Ubicacion);
                          $('#Ubicacion_Instrumento').trigger('change');
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
                               $('#Aula_Clase').val('#'+Resultado.Numero_Aula);
                               $('#Gaveta_Form').hide(150);

                          }                
                          Base64Imagen(Resultado.Imagen) 
                          Cargar_Accesorios(Resultado.ID_Instrumento);
                          $('.selectpicker').selectpicker('refresh');
                          if(Resultado.ID_Estuche != -1)
                          {
                             $('#Estuche_Instrumento').selectpicker({title: '#'+Resultado.ID_Estuche}).selectpicker('render');
                             $('#Estuche_Instrumento').val('#'+Resultado.ID_Estuche);
                          }
                          else
                          {   
                             $('#Estuche_Instrumento').selectpicker({title:'Ninguno'}).selectpicker('render');
                             $('#Estuche_Instrumento').val('Ninguno');
                          }
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

        function Eliminar_Instrumento(ID)
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

                          url: 'http://melbws.azurewebsites.net/api/Instrumentos/'+ID,
                          type: 'DELETE',
                          success: function(Resultado)
                          {
                             
                             Resultado = JSON.parse(Resultado);
                             if(Resultado.Codigo == 5)
                             {                                    
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
                             Cargar_Instrumentos();
                          },
                          error: function(Respuesta)
                          {
                             console.log(Respuesta);
                             swal("Error", "No se puede borrar el instrumento,probablemente porque existen registros que tienen asociado a este instrumento", "error");
                          },
                        });
                  } 
                  
            });            
        }

        function Filtrar_Instrumentos(Tipo_Filtro, ID_Filtro)
        {          
           $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Instrumentos?Filtro='+Tipo_Filtro+'&ID_Filtro='+ID_Filtro,
                type: 'GET',
                success: function (Resultado) 
                {            
                      Tabla_Instrumento.clear().draw();
                      Resultado = JSON.parse(Resultado);
                      for (i = 0; i < Resultado.length; i++) 
                      {      
                              var Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "'+Resultado[i].Imagen+'"></img>'
                              var Disponibilidad =  (Resultado[i].Disponible == 'Disponible') ? '<span class="label label-success">Disponible</span>' : '<span class="label label-purple">En Prestamo</span>'
                              Tabla_Instrumento.row.add
                              ([
                                      Resultado[i].ID_Instrumento,
                                      Imagen,
                                      Resultado[i].Nombre,
                                      Resultado[i].Marca,
                                      Disponibilidad,                            
                                      Resultado[i].Tipo_Ubicacion,
                                      '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Instrumento('+Resultado[i].ID_Instrumento+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                      '<button type="button" class="btn btn-danger" onclick ="Eliminar_Instrumento('+Resultado[i].ID_Instrumento+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                              ] ).draw( false );
                      }                                                        
                                                       
                },
                error: function (Mensaje) 
                {
                    swal
                    ({
                          title: "Error",
                          text: "Ocurrio un inconveniente al filtrar los datos",
                          type: "error",
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
            $('#Instrumentos').hide();
            $('#Instrumento_Detalle').show(200);
            $('#ADD').hide();
            $('#Busqueda_Form').show();
            $('#Busqueda_Form').css('display','inline-flex');
            $('#Contenedor_Panel').show();
            $('#Header_Instrumento_Texto').text('Descripción del instrumento');
            $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Instrumento');
            Cargar_Instrumentos_Por_ID(ID); 
            $('.FlotarDerecha').show();
            $('#Panel_Accesorios').show();
        }

        function Habilitar_Deshabilitar_Instrumentos(Cond)
        {
            if(Cond == true)
            {
                $("#ID_Instrumento").prop("disabled", "false");
                $("#Aula_Clase").removeAttr("disabled");
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
                $("#Aula_Clase").prop("disabled", "true");
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
          if ($('#Estuche_Instrumento option:selected').text() != 'Seleccione un estuche')
          {
             if($('#Proveedor_Instrumento option:selected').text() != 'Seleccione un proveedor') 
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
                        if($('#Estuche_Instrumento').val() != 'Ninguno' && $('#Estuche_Instrumento').val() != '' )
                        {
                             var Instrumento_BBDD = ($('#Ubicacion_Instrumento').val() == 'Aula') 
                                                   ? {ID_Instrumento: $('#ID_Instrumento').val(), Nombre: $('#Tipo_Instrumento').val(),Material: $('#Material_Instrumento').val(),Color: $('#Color_Instrumento').val() ,Imagen: Resultado.data.link ,Marca: $('#Marca_Instrumento').val(),Descripcion: $('#Descripcion_Inst').val(),Estado: $('#Estado_Instrumento').val(),ID_Estuche:$('#Estuche_Instrumento option:selected').text().substring(1,$('#Estuche_Instrumento option:selected').text().length),ID_Proveedor: $('#Proveedor_Instrumento option:selected').text().substring(1,$('#Proveedor_Instrumento option:selected').text().length),Tipo_Ubicacion: 0,ID_Aula: parseInt($('#Aula_Clase').val().substring(1,$('#Aula_Clase').val().length))}
                                                   : {ID_Instrumento: $('#ID_Instrumento').val(), Nombre: $('#Tipo_Instrumento').val(),Material: $('#Material_Instrumento').val(),Color: $('#Color_Instrumento').val(), Imagen: Resultado.data.link ,Marca: $('#Marca_Instrumento').val(),Descripcion: $('#Descripcion_Inst').val(),Estado: $('#Estado_Instrumento').val(),ID_Estuche:$('#Estuche_Instrumento option:selected').text().substring(1,$('#Estuche_Instrumento option:selected').text().length),ID_Proveedor: $('#Proveedor_Instrumento option:selected').text().substring(1,$('#Proveedor_Instrumento option:selected').text().length),Tipo_Ubicacion: 1,Estante: $('#Estante_Instrumento').val(),Gaveta: $('#Gaveta_Instrumento').val()};                       
                        }
                        else
                        {
                             var Instrumento_BBDD = ($('#Ubicacion_Instrumento').val() == 'Aula') 
                                                   ? {ID_Instrumento: $('#ID_Instrumento').val(), Nombre: $('#Tipo_Instrumento').val(),Material: $('#Material_Instrumento').val(),Color: $('#Color_Instrumento').val() ,Imagen: Resultado.data.link ,Marca: $('#Marca_Instrumento').val(),Descripcion: $('#Descripcion_Inst').val(),Estado: $('#Estado_Instrumento').val(),ID_Proveedor: $('#Proveedor_Instrumento').val().substring(1,$('#Proveedor_Instrumento').val().length),Tipo_Ubicacion: 0,ID_Aula: parseInt($('#Aula_Clase').val().substring(1,$('#Aula_Clase').val().length)),ID_Estuche:-1}
                                                   : {ID_Instrumento: $('#ID_Instrumento').val(), Nombre: $('#Tipo_Instrumento').val(),Material: $('#Material_Instrumento').val(),Color: $('#Color_Instrumento').val(), Imagen: Resultado.data.link ,Marca: $('#Marca_Instrumento').val(),Descripcion: $('#Descripcion_Inst').val(),Estado: $('#Estado_Instrumento').val(),ID_Proveedor: $('#Proveedor_Instrumento').val().substring(1,$('#Proveedor_Instrumento').val().length),Tipo_Ubicacion: 1,Estante: $('#Estante_Instrumento').val(),Gaveta: $('#Gaveta_Instrumento').val(),ID_Estuche:-1}                              
                        }                  
                        if(Comando == 'Nuevo')
                        {                                                
                            $.ajax
                            ({

                                  url: 'http://melbws.azurewebsites.net/api/Instrumentos',                              
                                  type: 'POST',
                                  data: Instrumento_BBDD,
                                  success: function(Resultado)
                                  {
                                     Resultado = JSON.parse(Resultado);
                                     if(Resultado.Codigo == 5)
                                     {                                                                            
                                         swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                         $('#ADD').show();
                                         $('#Instrumento_Detalle').hide();
                                         $('#Instrumentos').show(200);
                                         Cargar_Instrumentos();
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
                        }
                        else
                        {
                            $.ajax
                            ({
                                  url: 'http://melbws.azurewebsites.net/api/Instrumentos',
                                  type: 'PUT',
                                  data: Instrumento_BBDD,
                                  success: function(Resultado)
                                  {
                                     Resultado = JSON.parse(Resultado);
                                     swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                     Cargar_Instrumentos();
                                     $('#ADD').show();
                                     $('#Instrumento_Detalle').hide();
                                     $('#Instrumentos').show(200);
                                  },
                                  error: function(xhr, status, error)
                                  {
                                     swal("Error", "Ocurrio un error al insertar el instrumento", "error");
                                  },
                            });
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
              else
              {
                  swal
                    ({
                          title: "Aviso",
                          text: "No ha seleccionado un proveedor",
                          type: "warning",
                    });     
              }
          }
          else
          {                
                swal
                    ({
                          title: "Aviso",
                          text: "No ha seleccionado un estuche",
                          type: "warning",
                    });
          }
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

        function BuscarInstrumentoObjeto(Tipo,Objeto)
        {
            
           for (var I = 0; I < Objeto.length; I++) 
           {
              if(Tipo == Objeto[I].Tipo_Instrumento)
              {
                  return Objeto[I];
              }
           }  
           return { Tipo_Instrumento : Tipo,Cantidad_Instrumento : 0,Porcentaje_Instrumento:0 }       
        }

        function EstadisticasInstrumentos(Parametro)
        {
           $.ajax
           ({
                  url: 'http://melbws.azurewebsites.net/api/Estadisticas?Estadistica=Inventario&Tipo='+Parametro,
                  type: 'GET',
                  success: function(Resultado)
                  {
                     Resultado = JSON.parse(Resultado);
                     var ListaEstadisticaInstrumento = [];
                     var ListaRecorrer = ['Flauta Dulce','Flauta Traversa','Clarinete','Violin','Viola','Cello','Guitarra'];
                     ListaRecorrer.forEach(function(TipoLinea)
                     {
                         ListaEstadisticaInstrumento.push(BuscarInstrumentoObjeto(TipoLinea,Resultado));
                     });
                     if(Parametro == "1")
                     {                                                        
                        Grafica_Estadisticas_Instrumentos(ListaEstadisticaInstrumento);
                     }
                     else
                     {
                        RemisionesGrafica(ListaEstadisticaInstrumento);
                     }
                     swal.closeModal();  
                  },
                  error: function(xhr, status, error)
                  {
                     swal("Error", "Ocurrio un error recolectando las estadisticas", "error");
                  },
           });
        } 
        function Grafica_Estadisticas_Instrumentos(Instrumento)
        {
            var ContextoInstrumento = document.getElementById("GraficaInstrumentos").getContext('2d');

            Chart.defaults.global.legend.display = false;

            var GraficaInstrumentos = new Chart(ContextoInstrumento, 
            {
                type: 'pie',
                data: 
                {
                    labels: ["Flauta Dulce", "Flauta Traversa", "Clarinete", "Violin", "Viola", "Cello","Guitarra"],
                    datasets: 
                    [{
                        label: 'Porcentaje',
                        data: [Instrumento[0].Cantidad_Instrumento,Instrumento[1].Cantidad_Instrumento,Instrumento[2].Cantidad_Instrumento,Instrumento[3].Cantidad_Instrumento,Instrumento[4].Cantidad_Instrumento,Instrumento[5].Cantidad_Instrumento,Instrumento[6].Cantidad_Instrumento],
                        backgroundColor: 
                        [
                            'rgba(214, 83, 3, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(255, 125, 173, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(52, 73, 94, 0.5)',
                            'rgba(0, 172, 172, 0.5)'
                        ],
                        borderColor: 
                        [
                            'rgba(214, 83, 3, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(255, 125, 173, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(52, 73, 94, 0.8)',
                            'rgba(0, 172, 172, 0.8)'
                        ],
                        borderWidth: 2
                    }],                    
                },
                options: 
                {
                   tooltips: 
                   {
                      mode: 'index',
                      callbacks: 
                      {
                        afterLabel: function(ToolTip, Datos) 
                        {
                          var Suma = 0;
                          for (var I = 0; I <= Datos.datasets[0].data.length - 1; I++) 
                          {
                              Suma = Suma + Datos.datasets[0].data[I];
                          }
                          var Porcentaje = Datos.datasets[ToolTip.datasetIndex].data[ToolTip.index] / Suma * 100;
                          Porcentaje = Porcentaje.toFixed(2); 
                          return Datos.datasets[ToolTip.datasetIndex].label + ': ' + Porcentaje + '%';
                        }
                      }
                   }
                }
            });            
}


function GeneralReporteInstrumento(Lista)
{
    var Documento = new jsPDF("l", 'cm', "a4");
    var Columnas =
        [
            { title: "ID Instrumento", dataKey: "ID_Instrumento" },
            { title: "Tipo", dataKey: "Nombre" },
            { title: "Material", dataKey: "Material"},
            { title: "Descripcion", dataKey:"Descripcion"},
            { title: "Color", dataKey: "Color" },
            { title: "Marca", dataKey: "Marca" },
            { title: "Estado", dataKey: "Estado" },
            { title: "Proveedor", dataKey: "Proveedor" },
            { title: "Ubicacion", dataKey:"Tipo_Ubicacion"},
            { title: "Disponible", dataKey: "Disponible" }
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
                Documento.text(10 + 1, 4.2, 'Tipo de reporte: Instrumentos');

                /* Footer */
                Documento.text(1, 20, 'Generado automaticamente por : MELBMOI');
                Documento.text(25.5, 20, 'Pagina ' + Event.pageCount);               
            }
        });
    Documento.save('Instrumentos.pdf');
}

function CargarImagenes() {

    var LogoMelb = new Image(1, 1);
    var LogoCasa = new Image(1, 1);

    LogoMelb.src = '/Content/assets/LogoMelb.png';
    LogoCasa.src = '/Content/assets/LogoCasa3Mundos.jpg';

    LogoMelb.onload = function () {
        var C1 = document.createElement('canvas');
        C1.height = LogoMelb.naturalHeight;
        C1.width = LogoMelb.naturalWidth;
        var Contexto = C1.getContext('2d');

        Contexto.drawImage(LogoMelb, 0, 0, C1.width, C1.height, 0, 0, C1.width, C1.height);
        LogoIMG64Melb = C1.toDataURL();
    };

    LogoCasa.onload = function () {
        var C2 = document.createElement('canvas');
        C2.height = LogoCasa.naturalHeight;
        C2.width = LogoCasa.naturalWidth;
        var Contexto = C2.getContext('2d');

        Contexto.drawImage(LogoCasa, 0, 0, C2.width, C2.height, 0, 0, C2.width, C2.height);
        LogoIMG64CasaTresMundos = C2.toDataURL();
    }

}