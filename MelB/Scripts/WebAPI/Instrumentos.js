var IDEstuche = []; 
var IDProveedor = [];


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
                            var Imagen = '<img width = "65" height = "65" src= "https://k62.kn3.net/C5E61EEF4.png" ></img>'
                            Tabla_Instrumento.row.add
                            ([
                                    Resultado[i].ID_Instrumento,
                                    Imagen,
                                    Resultado[i].Nombre,
                                    Resultado[i].Marca,                    
                                    Resultado[i].Tipo_Ubicacion,
                                    '<button type="button" class="btn btn-success" onclick ="Detallar_Datos_Instrumento('+Resultado[i].ID_Instrumento+')"><i class="ion-navicon-round" data-pack="default"></i></button>',
                                    '<button type="button" class="btn btn-danger"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                            ] ).draw( false );
                    }
                    Cargar_Estuches();                   
                },
                error: function (Mensaje) 
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
                      $('#Imagen_Instrumento').attr("src","https://k62.kn3.net/C5E61EEF4.png");

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
                      $('.selectpicker').selectpicker('refresh');               
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

/* Funcionalidad de formularios  */

        function Detallar_Datos_Instrumento(ID)
        {                         
            $('#Instrumentos').hide(300);
            $('#Instrumento_Detalle').show(400);
            $('#ADD').hide('drop',400);
            $('#Busqueda_Form').show(400);
            $('#Busqueda_Form').css('display','inline-flex');
            $('#Contenedor_Panel').show();
            $('#Header_Instrumento_Texto').text('Descripción del instrumento');
            $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Actualizar Instrumento');
            Cargar_Instrumentos_Por_ID(ID); 
        }

        function Habilitar_Deshabilitar_Instrumentos(Cond)
        {
            if(Cond == true)
            {
                $("#ID_Instrumento").prop("disabled", true);
                $("#Tipo_Instrumento").prop("disabled", false);
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
                $("#ID_Instrumento").prop("disabled", false);
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