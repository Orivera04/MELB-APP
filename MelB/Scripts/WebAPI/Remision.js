/* Funciones de la API*/
var Fecha_Actual;
var Lista_Instrumentos = '';
var Lista_Observaciones_Iniciales = '';
var Lista_Observaciones_Finales = '';  
//var Arreglo_Listado = { ID_Instrumento:'', Nombre: '', Observacion_Inicial: '', Observacion_Final: ''};

var Arreglo_Listado = [];


        function Cargar_Remisiones() 
        {
            Tabla_Remision.clear().draw();
            Tabla_Desglose_Remision.clear().draw();
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Remision',
                type: 'GET',
                success: function (Resultado) 
                {
                    if(Resultado.Codigo == null)
                    {
                        Resultado = JSON.parse(Resultado);
                        for (i = 0; i < Resultado.length; i++) 
                        {  
                            Tabla_Remision.row.add
                            ([
                                Resultado[i].ID_Remision,
                                Resultado[i].Nombre_Estudiante,
                                Resultado[i].Estado_Remision,
                                '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Remision('+Resultado[i].ID_Remision+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                '<button type="button" class="btn btn-danger" onclick ="Eliminar_Remision('+Resultado[i].ID_Remision+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                            ]).draw( false );  
                        }

                        $.ajax
                              ({
                                  url: 'http://melbws.azurewebsites.net/api/Estudiante/',
                                  type: 'GET',
                                  success: function (Resultado_Estudiante) 
                                  {
                                      document.getElementById("ID_Estudiante_Remision").options.length = 0;

                                      if(Resultado_Estudiante.Codigo == null)
                                      {
                                          Resultado_Estudiante = JSON.parse(Resultado_Estudiante);
                                          for (i = 0; i < Resultado_Estudiante.length; i++) 
                                          {  
                                            $('#ID_Estudiante_Remision').append('<option data-subtext="'+Resultado_Estudiante[i].Nombre+'">#'+Resultado_Estudiante[i].ID_Estudiante+'</option>'); 
                                          }

                                          
                                      }
                                  },
                                  error: function (Mensaje) 
                                  {        
                                      swal
                                      ({
                                            title: "Error listando Estudiantes",
                                            text: "No se pudo conectar con el servidor.",
                                            type: "error",
                                      });
                                  }
                                });

                        $.ajax
                              ({
                                  url: 'http://melbws.azurewebsites.net/api/Empleado/',
                                  type: 'GET',
                                  success: function (Resultado_Empleado) 
                                  {
                                      document.getElementById("ID_Empleado_Remision").options.length = 0;

                                      if(Resultado_Empleado.Codigo == null)
                                      {
                                          Resultado_Empleado = JSON.parse(Resultado_Empleado);
                                          for (i = 0; i < Resultado_Empleado.length; i++) 
                                          {  
                                            $('#ID_Empleado_Remision').append('<option data-subtext="'+Resultado_Empleado[i].Nombre+'">#'+Resultado_Empleado[i].ID_Empleado+'</option>'); 
                                          }
                                      }
                                  },
                                  error: function (Mensaje) 
                                  {        
                                      swal
                                      ({
                                            title: "Error listando Empleados",
                                            text: "No se pudo conectar con el servidor.",
                                            type: "error",
                                      });
                                  }
                              });

                        Cargar_Aulas(); 
                    }
                },

                error: function (Mensaje) 
                {        
                    swal
                    ({
                          title: "Error listando Remisiones",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }

            });
        }

        function Cargar_Remision_Por_ID(ID) 
        {
          Arreglo_Listado = [];

            Tabla_Desglose_Remision.clear().draw();
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Remision/'+ID,
                type: 'GET',
                success: function (Resultado) 
                {
                      Resultado = JSON.parse(Resultado);     
                      if(Resultado.Codigo == null)
                      {       
                          Resultado = Resultado[0];                  
                          $('#ID_Remision').val(Resultado.ID_Remision); 
                          $('#ID_Estudiante_Remision').selectpicker('val', '#'+Resultado.ID_Estudiante);
                          $('#ID_Empleado_Remision').selectpicker('val', '#' +Resultado.Empleado_ID);
                          $('#Estado_Remision').val(Resultado.Estado_Remision);

                          Fecha_Entrada = Cambio_Formato_Fecha(1,Resultado.Fecha_Prestamo, Resultado.Fecha_Entrega);
                          $('#Remision_Fecha_Inicio').val(Fecha_Entrada.Fecha_Inicio);
                          $('#Remision_Fecha_Fin').val(Fecha_Entrada.Fecha_Fin);
                          
                           for (i = 0; i < Resultado.Lista_Desglose.length; i++) 
                            {   
                                Arreglo_Listado.push({ID_Instrumento: Resultado.Lista_Desglose[i].ID_Instrumento, Nombre: Resultado.Lista_Desglose[i].Nombre, Observacion_Inicial: Resultado.Lista_Desglose[i].Observacion_Inicial, Observacion_Final: '' });
                                Tabla_Desglose_Remision.row.add
                                ([
                                    Resultado.Lista_Desglose[i].ID_Instrumento,
                                    Resultado.Lista_Desglose[i].Nombre,
                                    Resultado.Lista_Desglose[i].Observacion_Inicial,
                                    Resultado.Lista_Desglose[i].Observacion_Final
                                ]).draw( false );                        
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
                          title: "Error al intentar ver el detalle de la Remision",
                          text: "No se pudo conectar con el servidor.",
                          type: "error",
                    });
                }
            });
        }

        function Eliminar_Remision(ID)
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

                          url: 'http://melbws.azurewebsites.net/api/Remision/'+ID,
                          type: 'DELETE',
                          success: function(Resultado)
                          {
                             swal.closeModal();
                             Resultado = JSON.parse(Resultado);
                             if(Resultado.Codigo == 5)
                             {                                    
                                 swal.closeModal();
                                 swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                                 $('#ADD').html('<span class="btn-label"><i class="ion-clipboard" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Remision');
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
                             Cargar_Remisiones();
                          },
                          error: function(Respuesta)
                          {
                             swal("Error", "Ocurrio un error al borrar la remision", "error");
                          },
                        });
                  } 
                  
            });            
        }
    
/* Funcionalidad de formularios  */

        function Detallar_Datos_Remision(ID)
        {           
            $('#Switch_Editar_Remision').prop('checked',false);
            Habilitar_Deshabilitar_Remision(false);        
            Operacion = 'Actualizar';                
            $('#Remisiones').hide(300);
            $('#Remision_Detalle').show(400);
            $('#ADD').hide('drop',400);
            $('#Busqueda_Form').show(400);
            $('#Busqueda_Form').css('display','inline-flex');
            $('#Contenedor_Panel').show();
            $('#Header_Remision_Texto').text('Descripción de la Remision');
            $('#Actualizar_Remision').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Cerrar Remision');
            Cargar_Remision_Por_ID(ID); 
            $('.FlotarDerecha').show();
            //$('.FlotarDerecha2').show();
        }

        function Habilitar_Deshabilitar_Remision(Cond,Operacion)
        {
          /*TRUE SE OCUPA PARA NUEVA REMISION*/
            if(Cond == true)
            {
                if (Operacion == 'Nuevo') 
                {
                    $('#Añadir_Desglose_Remision').html('<i class="ion-plus-round" data-pack="default" data-tags="menu"></i>');
                    $("#ID_Remision").prop("disabled", false);
                    $("#ID_Estudiante_Remision").prop("disabled", false);
                    $("#ID_Empleado_Remision").prop("disabled", false);
                    $("#Remision_Fecha_Fin").prop("disabled", false);
                    $("#Remision_Fecha_Inicio").prop("disabled", true);
                    $("#Estado_Remision").prop("disabled", false);
                    $('#Actualizar_Remision').prop('disabled',false);
                    $('.selectpicker').selectpicker('refresh');
                }
                else
                {
                    $('#Añadir_Desglose_Remision').html('<i class="ion-compose" data-pack="default" data-tags="menu"></i>');                  
                    $("#ID_Remision").prop("disabled", true);
                    $("#ID_Estudiante_Remision").prop("disabled", true);
                    $("#ID_Empleado_Remision").prop("disabled", true);
                    $("#Remision_Fecha_Fin").prop("disabled", true);
                    $("#Remision_Fecha_Inicio").prop("disabled", true);
                    $("#Estado_Remision").prop("disabled", true);
                    $('#Actualizar_Remision').removeAttr('disabled');
                    $('.selectpicker').selectpicker('refresh');
                }
                
                $('.FlotarDerecha2').show();
            }
            else
            {
                $("#ID_Remision").prop("disabled", true);
                $("#ID_Estudiante_Remision").prop("disabled", true);
                $("#ID_Empleado_Remision").prop("disabled", true);
                $("#Remision_Fecha_Fin").prop("disabled", true);
                $("#Remision_Fecha_Inicio").prop("disabled", true);
                $("#Estado_Remision").prop("disabled", true);
                $('#Actualizar_Remision').prop('disabled',true);
                $('.selectpicker').selectpicker('refresh');
                $('.FlotarDerecha2').hide();
            }
        }

        function Reiniciar_Controles_Remision()
        {
            Tabla_Desglose_Remision.clear().draw();    
            var now = new Date();
            var Dia = ("0" + now.getDate()).slice(-2);
            var Mes = ("0" + (now.getMonth() + 1)).slice(-2);
            var Hora = ("0" + now.getHours()).slice(-2);
            var Minuto = ("0" + now.getMinutes()).slice(-2);
            Fecha_Actual = (Mes)+"/"+(Dia)+"/"+now.getFullYear();
            
            
            $('#ID_Remision').val(1);
            $("#ID_Empleado_Remision").selectpicker('val', '');
            $("#ID_Estudiante_Remision").selectpicker('val', '');
            $('#Estado_Remision').val('Activa');
            $("#Estado_Remision").prop("disabled", true);
            $('#Remision_Fecha_Inicio').val(Fecha_Actual);
            $('#Remision_Fecha_Fin').val(Fecha_Actual);
            $('#Añadir_Desglose_Remision').html('<i class="ion-plus-round" data-pack="default" data-tags="menu"></i>');
            $('.FlotarDerecha2').show();
        }

        function Cambio_Formato_Fecha(Opcion, Fecha_Prestamo, Fecha_Entrega)
        {
          var now = new Date();
          var Hora = ("0" + now.getHours()).slice(-2);
          var Minuto = ("0" + now.getMinutes()).slice(-2);

          if (Opcion == 0)
          {
            var Remision_Fecha_Inicio = $('#Remision_Fecha_Inicio').val();
            var Remision_Fecha_Fin = $('#Remision_Fecha_Fin').val();

            Fecha_Remitido = Remision_Fecha_Inicio.split("/");
            Fecha_Finalizacion = Remision_Fecha_Fin.split("/");

            Fecha_Inicio = Fecha_Remitido[2] + '-' + Fecha_Remitido[0] + '-' + Fecha_Remitido[1] +"T"+(Hora)+":"+(Minuto);
            Fecha_Fin = Fecha_Finalizacion[2] + '-' + Fecha_Finalizacion[0] + '-' + Fecha_Finalizacion[1] +"T"+(Hora)+":"+(Minuto);

            var Fecha_Salida = {Fecha_Inicio: Fecha_Inicio, Fecha_Fin: Fecha_Fin};

            return Fecha_Salida;
          }
          else
          {
            Remision_Fecha_Inicio = Fecha_Prestamo.split("T");
            Remision_Fecha_Fin = Fecha_Entrega.split("T");

            Fecha_Remitido = Remision_Fecha_Inicio[0].split("-");
            Fecha_Finalizacion = Remision_Fecha_Fin[0].split("-");

            Fecha_Inicio = Fecha_Remitido[1] + '/' + Fecha_Remitido[2] + '/' + Fecha_Remitido[0];
            Fecha_Fin = Fecha_Finalizacion[1] + '/' + Fecha_Finalizacion[2] + '/' + Fecha_Finalizacion[0];

            var Fecha_Salida = {Fecha_Inicio: Fecha_Inicio,Fecha_Fin: Fecha_Fin};

            return Fecha_Salida; 
          }  
        }

        function Extaer_Datos_Desglose_Remision(Comando, Cantidad_Registros_Remisiones)
        {
          /*Inicializacion de Variables*/
          Lista_Instrumentos = '';
          Lista_Observaciones_Iniciales = '';
          Lista_Observaciones_Finales = '';

          for (i = 1; i <= Cantidad_Registros_Remisiones; i++)
          {
            if(Comando == 'Nuevo')
            { 
              if ( i == Cantidad_Registros_Remisiones)
                  {
                      var Temporal_Instrumento = document.getElementById("Desglose_Remision_T").rows[i].cells[0].innerHTML;
                      Lista_Instrumentos =  Lista_Instrumentos + Temporal_Instrumento;

                      var Temporal_Observacion_Inicial = document.getElementById("Desglose_Remision_T").rows[i].cells[2].innerHTML;
                      Lista_Observaciones_Iniciales = Lista_Observaciones_Iniciales + Temporal_Observacion_Inicial;
                  }
              else
                  {
                      var Temporal_Instrumento = document.getElementById("Desglose_Remision_T").rows[i].cells[0].innerHTML;
                      Lista_Instrumentos = Lista_Instrumentos + Temporal_Instrumento + ', ';   

                      var Temporal_Observacion_Inicial = document.getElementById("Desglose_Remision_T").rows[i].cells[2].innerHTML;
                      Lista_Observaciones_Iniciales = Lista_Observaciones_Iniciales + Temporal_Observacion_Inicial + ', ';   
                  }
            }
            else
            {
              if ( i == Cantidad_Registros_Remisiones)
                  {
                      var Temporal_Instrumento = document.getElementById("Desglose_Remision_T").rows[i].cells[0].innerHTML;
                      Lista_Instrumentos =  Lista_Instrumentos + Temporal_Instrumento;

                      var Temporal_Observacion_Inicial = document.getElementById("Desglose_Remision_T").rows[i].cells[2].innerHTML;
                      Lista_Observaciones_Iniciales = Lista_Observaciones_Iniciales + Temporal_Observacion_Inicial;
                      
                      var Temporal_Observacion_Final = document.getElementById("Desglose_Remision_T").rows[i].cells[3].innerHTML;
                      Lista_Observaciones_Finales = Lista_Observaciones_Finales + Temporal_Observacion_Final;
                  }
              else
                  {
                      var Temporal_Instrumento = document.getElementById("Desglose_Remision_T").rows[i].cells[0].innerHTML;
                      Lista_Instrumentos = Lista_Instrumentos + Temporal_Instrumento + ', ';   

                      var Temporal_Observacion_Inicial = document.getElementById("Desglose_Remision_T").rows[i].cells[2].innerHTML;
                      Lista_Observaciones_Iniciales = Lista_Observaciones_Iniciales + Temporal_Observacion_Inicial + ', ';   

                      var Temporal_Observacion_Final = document.getElementById("Desglose_Remision_T").rows[i].cells[3].innerHTML;
                      Lista_Observaciones_Finales = Lista_Observaciones_Finales + Temporal_Observacion_Final;
                  } 
            }      
          }
        }


/* Funciones de soporte */

        function Insertar_Actualizar_Remision(Comando)
        {   
          
          var Estado = '';
          var Longitud = document.getElementById("Desglose_Remision_T").rows[1].cells.length;
          
          if($('#ID_Estudiante_Remision').val() != "" && $('#ID_Empleado_Remision').val() != "")
          {
            swal.showLoading();
                
            var Cantidad_Registros_Remisiones = (document.getElementById("Desglose_Remision_T").rows.length)-1;

            if (Cantidad_Registros_Remisiones >= 1 && Longitud > 1)  
            {
              Extaer_Datos_Desglose_Remision(Comando,Cantidad_Registros_Remisiones);
              
              if(Comando == 'Nuevo')
              { 
                Fecha_Salida = Cambio_Formato_Fecha(0);

                var Remision_BBDD = {ID_Remision: $('#ID_Remision').val(), ID_Estudiante: $('#ID_Estudiante_Remision option:selected').text().substring(1,$('#ID_Estudiante_Remision option:selected').text().length), Empleado_ID: $('#ID_Empleado_Remision option:selected').text().substring(1,$('#ID_Empleado_Remision option:selected').text().length), Fecha_Prestamo: Fecha_Salida.Fecha_Inicio, Fecha_Entrega: Fecha_Salida.Fecha_Fin, ID_Instrumentos: Lista_Instrumentos, Observaciones_Iniciales: Lista_Observaciones_Iniciales};

                $.ajax
                ({  
                      url: 'http://melbws.azurewebsites.net/api/Remision',
                      type: 'POST',
                      data: Remision_BBDD,
                      success: function(Resultado)
                      {
                         Resultado = JSON.parse(Resultado);
                         if(Resultado.Codigo == 5)
                         {                                    
                             swal.closeModal();
                             swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");

                             Cargar_Remisiones();
                             $('#Remision_Detalle').hide(500);
                             $('#Remisiones').show(400);
                             $('#ADD').html('<span class="btn-label"><i class="ion-clipboard" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Remision');
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
                         swal("Error", "Ocurrio un error al insertar la Remision", "error");
                      },
                });
                swal.closeModal();
              }
              else
              {
                if ($('#Estado_Remision').val() == 'Activa' || $('#Estado_Remision').val() == 'Expirada'){ Estado = 1}
                else{Estado = 0}

                var Remision_BBDD = {ID_Remision: $('#ID_Remision').val(), ID_Estado_Remision: Estado, ID_Instrumentos: Lista_Instrumentos, Observaciones_Iniciales: Lista_Observaciones_Iniciales, Observaciones_Finales: Lista_Observaciones_Finales};
                  
                $.ajax
                ({
                      url: 'http://melbws.azurewebsites.net/api/Remision',
                      type: 'PUT',
                      data: Remision_BBDD,
                      success: function(Resultado)
                      {
                         Resultado = JSON.parse(Resultado);
                         swal.closeModal();
                         swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                         Cargar_Remisiones();
                         $('#Remision_Detalle').hide(500);
                         $('#Remisiones').show(400);
                         $('#ADD').html('<span class="btn-label"><i class="ion-clipboard" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Remision');
                         $('#ADD').show("drop", 50);
                      },
                      error: function(xhr, status, error)
                      {
                         swal("Error", "Ocurrio un error al insertar la Remision", "error");
                      },
                });
                swal.closeModal();
              }
            }
            else
            {
              swal
              ({
                    title: "Aviso",
                    text: "Debe registrar instrumentos",
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
        }

        function Insertar_Actualizar_Desglose_Remision(Comando)
        {
          var Titulo;
          var Error;
          swal.setDefaults
          ({
                confirmButtonText: 'Siguiente',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
                animation: true,
                allowOutsideClick: false
          });

          if(Comando == 'Nuevo')
          {
              Titulo = 'Añadiendo a Remision';
              Error = 'Ocurrio un inconveniente al añadir el detalle.';
              var Pasos = 
              [
                {
                    title: 'Añadir Instrumento a Remision',
                    text: 'ID Instrumento',
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
                    title: 'Añadir Instrumento a Remision',
                    text: 'Nombre',
                    input : 'text',
                    inputAttributes: 
                    {
                        maxlength : 15
                    },
                    inputClass: 'form-control'
                },
                {
                    title: 'Añadir Instrumento a Remision',
                    text: 'Observacion Inicial',
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
              Titulo = 'Actualizando Observacion final';
              Error = 'Ocurrio un inconveniente al actualizar la Observacion.';

              var Pasos = 
              [  
                {
                    title: 'Actualizar Detalle Remision',
                    text: 'Observacion Final',
                    input : 'text',
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
                if(Modal[0] != '' && Modal[1] != '' && Modal[2] != '')
                {         
                    swal.resetDefaults();
                    swal({title: Titulo,text: 'Espere por favor',type: 'info', allowOutsideClick: false});
                    swal.showLoading();   

                    if(Comando == 'Nuevo')
                    {                
                        Tabla_Desglose_Remision.row.add
                        ([
                                                                  //F O T O
                            Modal[0],                             //ID_Instrumento
                            Modal[1],                             //Nombre
                            Modal[2],                             //Ob. Inicial
                            'El instrumento no ha sido devuelto',  //Ob. Final
                            '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Insertar_Actualizar_Desglose_Remision(Actualizar)"><i class="ion-navicon-round" data-pack="default"></i></button>',
                        ]).draw( false ); 

                        swal.closeModal();
                        swal("Exito","Se añadio el registro exitosamente", "success");
                    }
                    else
                    {
                          Arreglo_Listado[i].Observacion_Final = Modal[0];
                          
                          Arreglo_Listado[i].ID_Instrumento,
                          Arreglo_Listado[i].Nombre,
                          Arreglo_Listado[i].Observacion_Inicial,
                          Arreglo_Listado[i].Observacion_Final,
                          '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Insertar_Actualizar_Desglose_Remision(Actualizar)"><i class="ion-navicon-round" data-pack="default"></i></button>',
                        
                        swal.closeModal();

                        swal("Exito","Se ha actualizado el registro exitosamente", "success");
                    }
                    swal.closeModal();
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