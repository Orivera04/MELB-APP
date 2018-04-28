/* Funciones de la API*/
var Fecha_Actual;

function Cargar_Remisiones() 
{
    Tabla_Remision.clear().draw();
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
                    $('#ID_Estudiante_Remision').append('<option>'+Resultado[i].Nombre_Estudiante+'</option>'); 
                    $('#ID_Empleado_Remision').append('<option>'+Resultado[i].Empleado_Nombre+'</option>'); 
                }
                Cargar_Aulas() 
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

        function Insertar_Actualizar_Remision(Comando)
        {     
            if($('#ID_Estudiante_Remision').val() != "" && $('#ID_Empleado_Remision').val() != "")
            {
                swal.showLoading();
                Insertar_Remision(Comando);
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
            $('#Actualizar_Remision').html('<span class="btn-label"><i class="ion-cube" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Remision');
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
            $('#Fecha_Prestamo_Remision').val(Fecha_Actual);
            $('#Fecha_Entrega_Remision').val(Fecha_Actual);
            
        }

/* Funciones de soporte */
        
        function Insertar_Remision(Comando)
        {
        
         var Remision_BBDD = {ID_Remision: $('#ID_Remision').val(), ID_Estudiante: $('#ID_Estudiante_Remision').val(), Empleado_ID: $('#ID_Empleado_Remision').val(), Fecha_Prestamo: $('#Fecha_Inicio_Remision').val(), Fecha_Entrega: $('#Fecha_Entrega_Remision').val(), ID_Estado_Remision: $('#Estado_Remision').val(), ID_Instrumentos: $('#').val(), Observaciones_Iniciales: $('#').val(), Observaciones_finales: $('#').val()};

                    if(Comando == 'Nuevo')
                    {                                                
                        $.ajax
                        ({
                              url: 'http://melbws.azurewebsites.net/api/Remision/',
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
                              url: 'http://melbws.azurewebsites.net/api/Remision/',
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
                                 swal("Error", "Ocurrio un error al insertar el proveedor", "error");
                              },
                        });
                        swal.closeModal();
                    }
        }


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
        progressSteps: ['1', '2'],
        allowOutsideClick: false
  });

  if(Comando == 'Nuevo')
  {
      Titulo = 'Añadiendo un nuevo detalle';
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
        if(Modal[0] != '' && Modal[1] != '')
        {         
            swal.resetDefaults();
            swal({title: Titulo,text: 'Espere por favor',type: 'info', allowOutsideClick: false});
            swal.showLoading();   

            if(Comando == 'Nuevo')
            {                
              $.ajax({

                  url: 'http://melbws.azurewebsites.net/api/Remision/',

                  type: 'POST',

                  data: {ID_Remision: $('#ID_Remision').val(), ID_Estudiante: $('#ID_Estudiante_Remision').val(), Empleado_ID: $('#ID_Empleado_Remision').val(), Fecha_Prestamo: $('#Fecha_Inicio_Remision').val(), Fecha_Entrega: $('#Fecha_Entrega_Remision').val(), ID_Estado_Remision: $('#Estado_Remision').val(), ID_Instrumentos: Modal[0], Observaciones_Iniciales: Modal[1]},
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
                   Cargar_Remision_Por_ID($('#ID_Remision').val());                                     
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

                  url: 'http://melbws.azurewebsites.net/api/Remision/',

                  type: 'PUT',
                  
                  data: {ID_Remision: $('#ID_Remision').val(), ID_Estudiante: $('#ID_Estudiante_Remision').val(), Empleado_ID: $('#ID_Empleado_Remision').val(), Fecha_Prestamo: $('#Fecha_Inicio_Remision').val(), Fecha_Entrega: $('#Fecha_Entrega_Remision').val(), ID_Estado_Remision: $('#Estado_Remision').val(), ID_Instrumentos: Modal[0], Observaciones_Iniciales: Modal[1], Observaciones_Finales:[2]},

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
                     Cargar_Remision_Por_ID($('#ID_Remision').val());                                     
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