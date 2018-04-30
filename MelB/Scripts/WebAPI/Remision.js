/* Funciones de la API*/
var Fecha_Actual;

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
                              if(Resultado_Empleado.Codigo == null)
                              {
                                  Resultado_Empleado = JSON.parse(Resultado_Empleado);
                                  for (i = 0; i < Resultado_Empleado.length; i++) 
                                  {  
                                    $('#ID_Empleado_Remision').append('<option data-subtext="'+Resultado_Empleado[i].ID_Empleado+'">#'+Resultado_Empleado[i].Nombre+'</option>'); 
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


          /*  $('#ID_Empleado_Remision').append('<option data-subtext="Erick">#2</option>');  */
                
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
                          $('#ID_Estudiante_Remision').selectpicker('val', Resultado.Nombre_Estudiante);
                          $('#ID_Empleado_Remision').selectpicker('val', Resultado.Empleado_Nombre);
                          $('#Fecha_Prestamo_Remision').val(Resultado.Fecha_Prestamo);
                          $('#Fecha_Entrega_Remision').val(Resultado.Fecha_Entrega);
                          $('#Estado_Remision').selectpicker('val', Resultado.Estado_Remision);
             
                           for (i = 0; i < Resultado.Lista_Desglose.length; i++) 
                            {  
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
            $('#Actualizar_Remision').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Remision');
            Cargar_Remision_Por_ID(ID); 
            $('.FlotarDerecha').show();
        }

        function Habilitar_Deshabilitar_Remision(Cond)
        {
            if(Cond == true)
            {
                $("#ID_Remision").prop("disabled", false);
                $("#ID_Estudiante_Remision").prop("disabled", false);
                $("#ID_Empleado_Remision").prop("disabled", false);
                $("#Fecha_Entrega_Remision").prop("disabled", false);
                $("#Fecha_Prestamo_Remision").prop("disabled", false);
                $("#Estado_Remision").prop("disabled", false);
                $('#Actualizar_Remision').removeAttr('disabled');
                $('.selectpicker').selectpicker('refresh');
            }
            else
            {
                $("#ID_Remision").prop("disabled", "true");
                $("#ID_Estudiante_Remision").prop("disabled", 'true');
                $("#ID_Empleado_Remision").prop("disabled", 'true');
                $("#Fecha_Entrega_Remision").prop("disabled", 'true');
                $("#Fecha_Prestamo_Remision").prop("disabled", 'true');
                $("#Estado_Remision").prop("disabled", 'true');
                $('#Actualizar_Remision').removeAttr('disabled','true');
                $('.selectpicker').selectpicker('refresh');
            }
        }

        function Reiniciar_Controles_Remision()
        {
            var now = new Date();
            var Dia = ("0" + now.getDate()).slice(-2);
            var Mes = ("0" + (now.getMonth() + 1)).slice(-2);
            var Hora = ("0" + now.getHours()).slice(-2);
            var Minuto = ("0" + now.getMinutes()).slice(-2);
            Fecha_Actual = now.getFullYear()+"-"+(Mes)+"-"+(Dia)+"T"+(Hora)+":"+(Minuto);
             

            $('#ID_Remision').val(1);
            $("#ID_Empleado_Remision").selectpicker('val', '');
            $("#ID_Estudiante_Remision").selectpicker('val', '');
            $('#Estado_Remision').selectpicker('val', 'Activa');
            $("#Estado_Remision").prop("disabled", true);
            $('#Fecha_Prestamo_Remision').val(Fecha_Actual);
            $('#Fecha_Entrega_Remision').val(Fecha_Actual);
            $('.FlotarDerecha2').show();
        }

/* Funciones de soporte */


        function Insertar_Actualizar_Remision(Comando)
        {   
        var Lista_Instrumentos = '';
        var Lista_Observaciones_Iniciales = '';
        var Lista_Observaciones_Finales = '';  
        var Estado;

            if($('#ID_Estudiante_Remision').val() != "" && $('#ID_Empleado_Remision').val() != "")
            {
                swal.showLoading();
                
                var Cantidad_Registros_Remisiones = (document.getElementById("Desglose_Remision_T").rows.length)-1;

                for (i = 1; i <= Cantidad_Registros_Remisiones; i++)
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
                    
                    if(Comando == 'Nuevo')
                    {                      
                        var Remision_BBDD = {ID_Remision: $('#ID_Remision').val(), ID_Estudiante: $('#ID_Estudiante_Remision option:selected').text().substring(1,$('#ID_Estudiante_Remision option:selected').text().length), Empleado_ID: $('#ID_Empleado_Remision option:selected').text().substring(1,$('#ID_Empleado_Remision option:selected').text().length), Fecha_Prestamo: $('#Fecha_Prestamo_Remision').val(), Fecha_Entrega: $('#Fecha_Entrega_Remision').val(), ID_Instrumentos: Lista_Instrumentos, Observaciones_Iniciales: Lista_Observaciones_Iniciales};
                    }   
                    else
                    {
                        if ($('#Estado_Remision').val() == 'Activa')
                        {
                            Estado = 1;
                        }
                        else if ($('#Estado_Remision').val() == 'Expirada')
                        {
                            Estado = 1;
                        }
                        else
                        {
                            Estado = 0;
                        }
                        var Remision_BBDD = {ID_Remision: $('#ID_Remision').val(), ID_Estado_Remision: Estado, ID_Instrumentos: Lista_Instrumentos, Observaciones_Iniciales: Lista_Observaciones_Iniciales, Observaciones_Finales: Lista_Observaciones_Finales};
                    }

                    if(Comando == 'Nuevo')
                    {                                                
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
                              text: "Algunos campos estan vacios",
                              type: "warning",
                        });
            }
        };

 

function Insertar_Desglose_Remision(ID,Comando,ID_Desglose_Remision,Nombre,Descripcion)
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
            inputValue : Observacion_Final,
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
                    Modal[0],
                    Modal[1],
                    Modal[2],
                    'Aun no se ha entregado el instrumento'
                ]).draw( false );   
                swal.closeModal();
                swal("Exito","Se añadio el registro exitosamente", "success");
            }
            else
            {
             /*P E N D I E N T E*/
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