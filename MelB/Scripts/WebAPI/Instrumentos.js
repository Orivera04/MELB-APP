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
                      $('#Tipo_Instrumento').selectpicker('val', Resultado.Nombre);
                      $('#Color_Instrumento').selectpicker('val', Resultado.Color);
                      $('#Marca_Instrumento').val(Resultado.Marca);
                      $('#Tipo_Instrumento').selectpicker('val', Resultado.Nombre);
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
            Cargar_Instrumentos_Por_ID(ID);         
        }