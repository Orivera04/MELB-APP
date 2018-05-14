/* Funciones de la API*/
var Fecha_Actual;
var Lista_Instrumentos = '';
var Lista_Observaciones_Iniciales = '';
var Lista_Observaciones_Finales = '';  
var Arreglo_Listado = [];
var ID_Estudiante = [];
var Temporal_ID_Instrumento = 0;
var Dropdown_ID_Instrumento = [];
var Dropdown_Nombre_Instrumento = [];
var Funcion_Realizar = 'Actualizar';
var Fila_Seleccionada = 0;

       
        function Cargar_Remisiones() 
        {
            Tabla_Desglose_Remision.clear().draw();
            $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Remision',
                type: 'GET',
                success: function (Resultado) 
                {
                    if(Resultado.Codigo == null)
                    {
                        Tabla_Remision.clear().draw();
                        Resultado = JSON.parse(Resultado);
                        var Estado;
                        for (i = 0; i < Resultado.length; i++) 
                        {  
                            if (Resultado[i].Estado_Remision == 'Expirada')
                            {
                               Estado = '<span class="label label-inverse">Expirada</span>';
                            }
                            else if(Resultado[i].Estado_Remision == 'Activa')
                            {
                                Estado = '<span class="label label-purple">Activa</span>';
                            }
                            else
                            {
                                Estado = '<span class="label label-success">Finalizada</span>';
                            }
                            Tabla_Remision.row.add
                            ([
                                Resultado[i].ID_Remision,
                                Resultado[i].Nombre_Estudiante,
                                Estado,
                                '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Remision('+Resultado[i].ID_Remision+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                '<button type="button" class="btn btn-danger" onclick ="Eliminar_Remision('+Resultado[i].ID_Remision+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                            ]).draw( false );  
                        }
                        $('#CantidadRemisionesDA').text(Tabla_Remision.column(0).data().length);                              

                    /*Carga Dropdown con Estudiantes*/
                    $.ajax
                    ({
                        url: 'http://melbws.azurewebsites.net/api/Estudiante',
                        type: 'GET',
                        success: function (Resultado_Estudiante) 
                        {
                            document.getElementById("ID_Estudiante_Remision").options.length = 0;
                            ID_Estudiante = [];
                            if(Resultado_Estudiante.Codigo == null)
                            {
                                Resultado_Estudiante = JSON.parse(Resultado_Estudiante);
                                for (i = 0; i < Resultado_Estudiante.length; i++) 
                                {  
                                  ID_Estudiante.push({ID:Resultado_Estudiante[i].ID_Estudiante,Nombre:Resultado_Estudiante[i].Nombre+' '+Resultado_Estudiante[i].Apellido});                                                        
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
            Instrumentos_Disponibles();
            $.get( "http://melbws.azurewebsites.net/api/Accesorio", function(Datos ) 
            {
                Datos = JSON.parse(Datos);
                $('#CantidadAccesoriosDA').text(Datos.length);
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
                          $('#ID_Estudiante_Remision').selectpicker('val', '#'+Resultado.ID_Estudiante);
                          $('#ID_Empleado_Remision').selectpicker('val', '#' +Resultado.Empleado_ID);
                          $('#Estado_Remision').val(Resultado.Estado_Remision);

                          Fecha_Entrada = Cambio_Formato_Fecha(1,Resultado.Fecha_Prestamo, Resultado.Fecha_Entrega);
                          $('#Remision_Fecha_Inicio').val(Fecha_Entrada.Fecha_Inicio);
                          $('#Remision_Fecha_Fin').val(Fecha_Entrada.Fecha_Fin);
                          
                          Arreglo_Listado.splice(0,Arreglo_Listado.length);                             
                          
                           if (Resultado.Estado_Remision == 'Cancelada') {
                               $('.FlotarDerecha').hide();

                               for (i = 0; i < Resultado.Lista_Desglose.length; i++) {

                                   Arreglo_Listado.push({ ID_Instrumento: Resultado.Lista_Desglose[i].ID_Instrumento, Nombre: Resultado.Lista_Desglose[i].Nombre, Observacion_Inicial: Resultado.Lista_Desglose[i].Observacion_Inicial, Observacion_Final: Resultado.Lista_Desglose[i].Observacion_Final, Imagen: '' });

                                   $.ajax
                                       ({
                                           url: 'http://melbws.azurewebsites.net/api/Instrumentos/' + Resultado.Lista_Desglose[i].ID_Instrumento,
                                           type: 'GET',
                                           success: function (Resultado_Imagen) {
                                               Resultado_Imagen = JSON.parse(Resultado_Imagen);
                                               if (Resultado_Imagen.Codigo == null) {
                                                   Resultado_Imagen = Resultado_Imagen[0];
                                                   Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "' + Resultado_Imagen.Imagen + '"></img>'

                                                   for (j = 0; j < Arreglo_Listado.length; j++) {
                                                       if (Resultado_Imagen.ID_Instrumento == Arreglo_Listado[j].ID_Instrumento) {
                                                           Arreglo_Listado[j].Imagen = Imagen;

                                                           Tabla_Desglose_Remision.row.add
                                                               ([
                                                                   Arreglo_Listado[j].Imagen,
                                                                   Arreglo_Listado[j].ID_Instrumento,
                                                                   Arreglo_Listado[j].Nombre,
                                                                   Arreglo_Listado[j].Observacion_Inicial,
                                                                   Arreglo_Listado[j].Observacion_Final,
                                                                   '<button type="button" class="btn waves-effect waves-light btn-info btn-color" onclick="Mensaje()" ><i class="ion-compose" data-pack="default"></i></button>'

                                                               ]).draw(false);
                                                       }
                                                   }
                                               }
                                               else {
                                                   swal(Resultado_Imagen.Mensaje_Cabecera, Resultado_Imagen.Mensaje_Usuario, "info");
                                               }



                                           },
                                           error: function (Mensaje) {
                                               swal
                                                   ({
                                                       title: "Error al intentar ver la Imagen del instrumento",
                                                       text: "No se pudo conectar con el servidor.",
                                                       type: "error",
                                                   });
                                           }
                                       });

                               }
                           }
                           else {
                               $('.FlotarDerecha').show();
                               for (i = 0; i < Resultado.Lista_Desglose.length; i++) {

                                   Arreglo_Listado.push({ ID_Instrumento: Resultado.Lista_Desglose[i].ID_Instrumento, Nombre: Resultado.Lista_Desglose[i].Nombre, Observacion_Inicial: Resultado.Lista_Desglose[i].Observacion_Inicial, Observacion_Final: Resultado.Lista_Desglose[i].Observacion_Final, Imagen: '' });

                                   $.ajax
                                       ({
                                           url: 'http://melbws.azurewebsites.net/api/Instrumentos/' + Resultado.Lista_Desglose[i].ID_Instrumento,
                                           type: 'GET',
                                           success: function (Resultado_Imagen) {
                                               Resultado_Imagen = JSON.parse(Resultado_Imagen);
                                               if (Resultado_Imagen.Codigo == null) {
                                                   Resultado_Imagen = Resultado_Imagen[0];
                                                   Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "' + Resultado_Imagen.Imagen + '"></img>'

                                                   for (j = 0; j < Arreglo_Listado.length; j++) {
                                                       if (Resultado_Imagen.ID_Instrumento == Arreglo_Listado[j].ID_Instrumento) {
                                                           Arreglo_Listado[j].Imagen = Imagen;

                                                           Tabla_Desglose_Remision.row.add
                                                               ([
                                                                   Arreglo_Listado[j].Imagen,
                                                                   Arreglo_Listado[j].ID_Instrumento,
                                                                   Arreglo_Listado[j].Nombre,
                                                                   Arreglo_Listado[j].Observacion_Inicial,
                                                                   Arreglo_Listado[j].Observacion_Final,
                                                                   '<button type="button" class="btn waves-effect waves-light btn-info btn-color" onclick="Insertar_Actualizar_Desglose_Remision(\'' + Funcion_Realizar + '\''+',0'+')" ><i class="ion-compose" data-pack="default"></i></button>'

                                                               ]).draw(false);
                                                       }
                                                   }
                                               }
                                               else {
                                                   swal(Resultado_Imagen.Mensaje_Cabecera, Resultado_Imagen.Mensaje_Usuario, "info");
                                               }



                                           },
                                           error: function (Mensaje) {
                                               swal
                                                   ({
                                                       title: "Error al intentar ver la Imagen del instrumento",
                                                       text: "No se pudo conectar con el servidor.",
                                                       type: "error",
                                                   });
                                           }
                                       });

                               }
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
                             Resultado = JSON.parse(Resultado);
                             if(Resultado.Codigo == 5)
                             {                                    
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

        function Filtrar_Remisiones(Tipo_Filtro, ID_Filtro)
        {          
         $.ajax
          ({
              url: 'http://melbws.azurewebsites.net/api/Remision?Filtro='+Tipo_Filtro+'&ID_Filtro='+ID_Filtro,
              type: 'GET',
              success: function (Resultado) 
              {            
                    Tabla_Remision.clear().draw();
                    Resultado = JSON.parse(Resultado);
                    var Estado;
                    for (i = 0; i < Resultado.length; i++) 
                    {                                                        
                          if (Resultado[i].Estado_Remision == 'Expirada')
                          {
                             Estado = '<span class="label label-inverse">Expirada</span>';
                          }
                          else if(Resultado[i].Estado_Remision == 'Activa')
                          {
                              Estado = '<span class="label label-purple">Activa</span>';
                          }
                          else
                          {
                              Estado = '<span class="label label-success">Finalizada</span>';
                          }
                          Tabla_Remision.row.add
                          ([
                                      Resultado[i].ID_Remision,
                                      Resultado[i].Nombre_Estudiante,
                                      Estado,
                                      '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Detallar_Datos_Remision('+Resultado[i].ID_Remision+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                      '<button type="button" class="btn btn-danger" onclick ="Eliminar_Remision('+Resultado[i].ID_Remision+')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                          ]).draw( false );
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
        }

        function Habilitar_Deshabilitar_Remision(Cond,Operacion)
        {
            /*TRUE SE OCUPA PARA NUEVA REMISION Y HABILITACION DE EDICION*/
            if(Cond == true)
            {
                if (Operacion == 'Nuevo') //Nueva Remision
                {
                    $('#Añadir_Desglose_Remision').html('<i class="ion-plus-round" data-pack="default" data-tags="menu"></i>');
                    $("#ID_Remision").prop("disabled", false);
                    $("#ID_Estudiante_Remision").prop("disabled", false);
                    $("#ID_Empleado_Remision").prop("disabled", false);
                    $("#Remision_Fecha_Fin").prop("disabled", false);
                    $("#Remision_Fecha_Inicio").prop("disabled", true);
                    $("#Estado_Remision").prop("disabled", false);
                    $('#Actualizar_Remision').prop('disabled',false);
                    $('#Añadir_Desglose_Remision').removeAttr('disabled');
                    $('.FlotarDerecha2').show();
                }
                else            //Actualizacion de una remision ACTIVA
                {
                    $('#Añadir_Desglose_Remision').html('<i class="ion-compose" data-pack="default" data-tags="menu"></i>');                  
                    $("#ID_Remision").prop("disabled", true);
                    $("#ID_Estudiante_Remision").prop("disabled", true);
                    $("#ID_Empleado_Remision").prop("disabled", true);
                    $("#Remision_Fecha_Fin").removeAttr('disabled');
                    $("#Remision_Fecha_Inicio").prop("disabled", true);
                    $("#Estado_Remision").prop("disabled", true);
                    $('#Instrumentos_Disponibles').removeAttr('disabled');
                    $('#Actualizar_Remision').removeAttr('disabled');
                    $('.FlotarDerecha2').hide();
                }
                
                
                $('.selectpicker').selectpicker('refresh');
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
                $('#Añadir_Desglose_Remision').removeAttr('disabled');
                $('#Instrumentos_Disponibles').removeAttr('disabled');
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
            $('#Instrumentos_Disponibles').removeAttr('disabled');
            $('#Añadir_Desglose_Remision').removeAttr('disabled');
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

              if ( i == Cantidad_Registros_Remisiones)
                  {
                      var Temporal_Instrumento = document.getElementById("Desglose_Remision_T").rows[i].cells[1].innerHTML;
                      Lista_Instrumentos =  Lista_Instrumentos + Temporal_Instrumento;

                      var Temporal_Observacion_Inicial = document.getElementById("Desglose_Remision_T").rows[i].cells[3].innerHTML;
                      Lista_Observaciones_Iniciales = Lista_Observaciones_Iniciales + Temporal_Observacion_Inicial;
                      
                      var Temporal_Observacion_Final = document.getElementById("Desglose_Remision_T").rows[i].cells[4].innerHTML;
                      Lista_Observaciones_Finales = Lista_Observaciones_Finales + Temporal_Observacion_Final;
                  }
              else
                  {
                      var Temporal_Instrumento = document.getElementById("Desglose_Remision_T").rows[i].cells[1].innerHTML;
                      Lista_Instrumentos = Lista_Instrumentos + Temporal_Instrumento + ', ';   

                      var Temporal_Observacion_Inicial = document.getElementById("Desglose_Remision_T").rows[i].cells[3].innerHTML;
                      Lista_Observaciones_Iniciales = Lista_Observaciones_Iniciales + Temporal_Observacion_Inicial + ', ';   

                      var Temporal_Observacion_Final = document.getElementById("Desglose_Remision_T").rows[i].cells[4].innerHTML;
                      Lista_Observaciones_Finales = Lista_Observaciones_Finales + Temporal_Observacion_Final + ', ';   
                  } 
          }
        }
        
        function Instrumentos_Disponibles()
        { 
          //Se carga el Dropdown con los instrumentos que estan disponibles//         
           $.ajax
            ({
                url: 'http://melbws.azurewebsites.net/api/Instrumentos?Filtro=Disponible',
                type: 'GET',
                success: function (Resultado) 
                {       
                	Dropdown_ID_Instrumento.splice(0,Dropdown_ID_Instrumento.length);
                	Dropdown_Nombre_Instrumento.splice(0,Dropdown_Nombre_Instrumento.length);
                    document.getElementById("Instrumentos_Disponibles").options.length = 0;     

                      Resultado = JSON.parse(Resultado);
                      for (i = 0; i < Resultado.length; i++) 
                      { 
                          if (Resultado[i].Estado != 'Extraviado')
                          {
                                Dropdown_ID_Instrumento.push(Resultado[i].ID_Instrumento);
                                Dropdown_Nombre_Instrumento.push(Resultado[i].Nombre);
                                $('#Instrumentos_Disponibles').append('<option data-subtext="' + Dropdown_Nombre_Instrumento[i] + '">#' + Dropdown_ID_Instrumento[i] + '</option>'); 
                          }

                      }                                                        
                },
                error: function (Mensaje) 
                {
                    swal
                    ({
                          title: "Error",
                          text: "No se pudo listar los instrumentos",
                          type: "error",
                    });
                }
            });
        }

        function Mensaje()
        {
            swal('Remision Finalizada', 'No se pueden realizar cambios', 'info');
        }

/* Funciones de soporte */

        function Insertar_Actualizar_Remision(Comando)
        {   
          
          var Estado = '';
          var Longitud = document.getElementById("Desglose_Remision_T").rows[1].cells.length;
          
          if($('#ID_Estudiante_Remision').val() != "" && $('#ID_Empleado_Remision').val() != "")
          {
           
            var Cantidad_Registros_Remisiones = (document.getElementById("Desglose_Remision_T").rows.length)-1;

            if (Cantidad_Registros_Remisiones >= 1 && Longitud > 1)  
            {
              Extaer_Datos_Desglose_Remision(Comando,Cantidad_Registros_Remisiones);
              
              if(Comando == 'Nuevo')
              { 
                swal({ title: 'Espere', text: 'Se esta añadiendo la remisión', type: 'info', allowOutsideClick: false });
                swal.showLoading();
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
              }
              else
              {
                Estado = 0;

                var Remision_BBDD = {ID_Remision: $('#ID_Remision').val(), ID_Estado_Remision: Estado, ID_Instrumentos: Lista_Instrumentos, Observaciones_Iniciales: Lista_Observaciones_Iniciales, Observaciones_Finales: Lista_Observaciones_Finales};
                swal({ title: 'Espere', text: 'Se esta actualizando la remisión', type: 'info', allowOutsideClick: false });
                swal.showLoading();  
                $.ajax
                ({
                      url: 'http://melbws.azurewebsites.net/api/Remision',
                      type: 'PUT',
                      data: Remision_BBDD,
                      success: function(Resultado)
                      {
                         Resultado = JSON.parse(Resultado);
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

        function Insertar_Actualizar_Desglose_Remision(Comando_Desglose, Opcion)
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

          if((Comando_Desglose == 'Nuevo') && ($('#Instrumentos_Disponibles').val().substring(1,$('#Instrumentos_Disponibles').val().length) != "") && Opcion == 0)
          {
              Titulo = 'Añadiendo a Remision';
              Error = 'Ocurrio un inconveniente al añadir el detalle.';
              var Pasos = 
              [
                {
                    title: 'Añadir Instrumento a Remision',
                    text: 'Observacion Inicial',
                    input: 'textarea',
                    inputAttributes: 
                    {
                        maxlength : 50
                    },
                    inputClass: 'form-control'
                }
              ]
          }
            
           else if (Comando_Desglose == "Actualizar" && ($('#Switch_Editar_Remision').prop('checked') == true) && Opcion == 0)
          {
              Titulo = 'Actualizando Observacion final';
              Error = 'Ocurrio un inconveniente al actualizar la Observacion.';

              var Pasos = 
              [  
                {
                    title: 'Actualizar Detalle Remision',
                    text: 'Observacion Final',
                    input : 'textarea',
                    inputAttributes: 
                    {
                        maxlength : 50
                    },
                    inputClass: 'form-control'
                }
              ]
          }

          else if (Comando_Desglose == "Actualizar" && Opcion != 0) {
              Titulo = 'Actualizando Observacion Inicial';
              Error = 'Ocurrio un inconveniente al actualizar la Observacion.';

              var Pasos =
                  [
                      {
                          title: 'Actualizar Detalle Remision',
                          text: 'Observacion Inicial',
                          input: 'textarea',
                          //inputValue: document.getElementById("Desglose_Remision_T").rows[Fila_Seleccionada + 1].cells[3].innerHTML,
                          inputValue: Opcion,
                          inputAttributes:
                          {
                              maxlength: 50
                          },
                          inputClass: 'form-control'
                      }
                  ]
          }

          else if (Comando_Desglose == "Actualizar" &&  ($('#Switch_Editar_Remision').prop('checked') == false) && Opcion == 0)
          {

            swal("Aviso","Habilita la edicion de la remision", "warning");

          }
          else
          {

            swal
            ({
                  title: "Aviso",
                  text: "Selecciona un Instrumento",
                  type: "warning",
            }).catch(swal.noop)
          }

            swal.queue(Pasos).then(function (Modal) 
            {
              var Imagen;

                if(Modal[0] != '')
                {         
                    swal.resetDefaults();
                    swal({title: Titulo,text: 'Espere por favor',type: 'info', allowOutsideClick: false});
                    swal.showLoading();   

                    if(Comando_Desglose == 'Nuevo')
                    {  
                      
                        $.ajax
                          ({
                              url: 'http://melbws.azurewebsites.net/api/Instrumentos/'+ $('#Instrumentos_Disponibles').val().substring(1,$('#Instrumentos_Disponibles').val().length),
                              type: 'GET',
                              success: function (Resultado) 
                              {            
                                    Resultado = JSON.parse(Resultado);                                                        
                                    if(Resultado.Codigo == null)
                                    {       
                                        Resultado = Resultado[0];                  
                                        Imagen = '<img style = "border-radius:3px;" width = "65" height = "65" src= "'+Resultado.Imagen+'"></img>'
                                        Temporal_ID_Instrumento = Resultado.ID_Instrumento;
                                        Tabla_Desglose_Remision.row.add
                                        ([
                                          Imagen,                                //F O T O 
                                          Resultado.ID_Instrumento,              //ID_Instrumento
                                          Resultado.Nombre,                      //Nombre
                                          Modal[0],                              //Ob. Inicial
                                                'El instrumento no ha sido devuelto',  //Ob. Final
                                          '<button type="button" class="btn waves-effect waves-light btn-info btn-color" onclick="Insertar_Actualizar_Desglose_Remision(\'' + Funcion_Realizar + '\'' + ',\'' + Modal[0] + '\')" ><i class="ion-compose" data-pack="default"></i></button>'
                                        ]).draw( false );
                                    }
                                    else
                                    {
                                        swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "info");
                                    }
                                    
                                    document.getElementById("Instrumentos_Disponibles").options.length = 0;

                                    //Removemos Instrumento recien añadido
                                      var Indice = Dropdown_ID_Instrumento.indexOf(Temporal_ID_Instrumento);
                                      
                                      if (Indice > -1)
                                      { 
                                        Dropdown_ID_Instrumento.splice(Indice, 1);
                                        Dropdown_Nombre_Instrumento.splice(Indice, 1);
                                      }

                                      for (i = 0; i < Dropdown_ID_Instrumento.length; i++) 
                                      { 
                                        $('#Instrumentos_Disponibles').append('<option data-subtext="'+Dropdown_Nombre_Instrumento[i]+'">#'+Dropdown_ID_Instrumento[i]+'</option>'); 
                                      }                                                        
                             
                                    $('.selectpicker').selectpicker('refresh');
                                    $('#Instrumentos_Disponibles').selectpicker('val', '');

                                    swal("Exito","Se añadio el registro exitosamente", "success");

                              },
                              error: function (Mensaje) 
                              {
                                  swal
                                  ({
                                        title: "Ha ocurrido un error, intenta nuevamente",
                                        text: "No se pudo conectar con el servidor.",
                                        type: "error",
                                  });
                              }
                          }); 
                    }
                    else if (Opcion != 0)
                    {
                        /*AQUI LA PARTE DE ACTUALIZAR OBSERVACION INICIAL*/
                        document.getElementById("Desglose_Remision_T").rows[Fila_Seleccionada + 1].cells[3].innerHTML = Modal[0];
                        swal("Exito", "Se ha actualizado el registro exitosamente", "success");
                    }
                    else 
                    {
                          /*AQUI LA PARTE DE ACTUALIZAR OBSERVACION FINAL*/
                      document.getElementById("Desglose_Remision_T").rows[Fila_Seleccionada+1].cells[4].innerHTML = Modal[0];
                      swal("Exito","Se ha actualizado el registro exitosamente", "success");
                    }                   
                }
                else
                {
                    swal.resetDefaults();
                    swal
                    ({
                          title: "Aviso",
                          text: "Revise que haya introducido los campos correctamente",
                          type: "warning",
                    });
                }        
            })
        }

        function RemisionesGrafica(Instrumento)
        {
          var ContextoRemision = document.getElementById("RemisionesGrafica").getContext('2d');
          Chart.defaults.global.legend.display = false;

          GraficaRemision = new Chart(ContextoRemision, 
            {
                type: 'bar',
                data: 
                {
                    labels: ["Flauta Dulce", "Flauta Traversa", "Clarinete", "Violin", "Viola", "Cello","Guitarra"],
                    datasets: 
                    [{
                        label: 'Cantidad de veces prestadas',
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
                            'rgba(214, 83, 3, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 125, 173, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(52, 73, 94, 1)',
                            'rgba(0, 172, 172, 1)'
                        ],
                        borderWidth: 2
                    }],                    
                },                
            });
            GraficaRemision.options.scales.yAxes[0].ticks.beginAtZero = true;
            GraficaRemision.update();
        }