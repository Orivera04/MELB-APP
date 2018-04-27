var Formulario_Activo;
var Operacion;
var Tabla_Instrumento;
var Tabla_Proveedor;
var Tabla_Remision;
var Tabla_Estuche;
var Tabla_Accesorios;

$(document).ready(function ()
{   
    swal({title:'Cargando',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
    swal.showLoading();

    
    // Construcción de los formularios de la pagina //
       Inicializacion_Eventos();
       Inicializacion_Tablas();
       Inicializacion_Controles(); 


    // Peticiones Ajax //
    Cargar_Instrumentos();

});



function Inicializacion_Controles()
{

    /* Inicialziación de los controles de los formularios */
    $('.selectpicker').selectpicker({noneResultsText: 'No se encontraron resultados'});
    $("input[name='ID_Instrumento']").TouchSpin({});
    $("input[name='ID_Estuche']").TouchSpin({});
    $("input[name='ID_Proveedor']").TouchSpin({});
    $("input[name='Estante']").TouchSpin({});
    $("input[name='Gaveta']").TouchSpin({});

    $('#Marca_Instrumento').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Descripcion_Inst').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Marca_Estuche').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Telefono1_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Telefono2_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Correo_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Direccion_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });

    $('#Nombre_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 25
    });
}

function Actualizar()
{
    swal({title:'Refrescando',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
    Tabla_Instrumento.clear().draw();
    Tabla_Estuche.clear().draw();
    Tabla_Proveedor.clear().draw();
    Tabla_Remision.clear().draw();
    Tabla_Accesorios.clear().draw();
    swal.showLoading();
    Cargar_Instrumentos();    
}


function Inicializacion_Tablas()
{
    /* Inicialización de las tablas de inventario */

    Tabla_Instrumento = $('#Instrumento_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}],
            "responsive": true,
            "search": {
                "caseInsensitive": false
            }
        }
    });


    Tabla_Proveedor = $('#Proveedor_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]
        }
    });


     Tabla_Remision = $('#Remision_T').DataTable
     ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]
        }
    });


    Tabla_Estuche = $('#Estuche_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]        
        }
    });

    /* Tablas de Instrumento */

    Tabla_Accesorios = $('#Accesorios_T').DataTable
    ({
        "language": 
        {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se encontraron datos",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "La busqueda no devolvio resultados",
            "infoFiltered": "(Se busco en _MAX_ registros )",
            "sSearch": "Buscar",
            "paginate": 
            {        
                "next":       "Siguiente pagina",
                "previous":   "Pagina anterior"
            },
            "columnDefs": [ {"className": "dt-center", "targets": "_all"}]        
        }
    });
}


function Inicializacion_Eventos()
{
    /* Eventos : Zona Menu*/
        $('#menuinicio').click(function (event) 
        {
            document.getElementById('Inicio').style.display = 'block';        
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';   
            document.getElementById('Instrumento_Detalle').style.display = 'none'; 
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';
        });
       

        $('#instrumentossubmenu').click(function (event) 
        {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'block';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';     
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';

            Formulario_Activo = 'Instrumento';                       
            $('#ADD').html('<span class="btn-label"><i class="ion-music-note" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Instrumento');
            $('#ADD').show("drop", 50);
            $('#Busqueda_Form').hide("drop",50);
        });

        $('#proveedoressubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';        
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'block';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';

            Formulario_Activo = 'Proveedor';
            $('#ADD').html('<span class="btn-label"><i class="ion-person" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop",50);
        });

        $('#remisionessubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'block';
            document.getElementById('Estuches').style.display = 'none';         
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';

            Formulario_Activo = 'Remision';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Remisiones');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop",50);
        });

        $('#accesoriossubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';   
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';

            Formulario_Activo = 'Accesorio';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Accesorios');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop",50); 
        });

        $('#estuchessubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'block';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';

            Formulario_Activo = 'Estuche';
            $('#ADD').html('<span class="btn-label"><i class="ion-nuclear" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop",50);
        });

    /* Eventos : uso en formularios de forma global */


         $('#sidebarCollapse').on('click', function () 
         {
             $('#sidebar').toggleClass('active');
             if($('#sidebar').attr('class') == '')
             {
                $('#content').css("margin-left", "253px");
             }
             else
             {
                $('#content').css("margin-left","110px");
             }
        });

    
    /*Boton AÑADIR dependiendo del Formulario que se encuentre ACTIVO*/     

        $('#ADD').click(function(event)
        { 
            $('.FlotarDerecha').hide();
            if(Formulario_Activo == 'Instrumento')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Instrumento_Texto').text('Añadir Instrumento');
                 Reiniciar_Controles_Instrumento();
                 Habilitar_Deshabilitar_Instrumentos(true);
                 $('#ID_Instrumento').removeAttr('disabled');
                 $('#Instrumentos').hide(300);
                 $('#Instrumento_Detalle').show(400);   
                 $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#Imagen_Instrumento').attr("src","https://i.imgur.com/0oN2F22.png");
                 Base64Imagen($('#Imagen_Instrumento').attr('src'));     
                 $('#Panel_Accesorios').hide();                            
            }
            else if(Formulario_Activo == 'Estuche')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Estuche_Texto').text('Añadir Estuche');
                 Reiniciar_Controles_Estuche();
                 Habilitar_Deshabilitar_Estuche(true);
                 $('#ID_Estuche').removeAttr('disabled');
                 $('#Estuches').hide(300);
                 $('#Estuche_Detalle').show(400);   
                 $('#Actualizar_Estuche').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#Imagen_Estuche').attr("src","https://i.imgur.com/0oN2F22.png");
                 Base64Imagen($('#Imagen_Estuche').attr('src'));                                 
            }
            else if(Formulario_Activo == 'Proveedor')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Proveedor_Texto').text('Añadir Proveedor');
                 Reiniciar_Controles_Proveedor();
                 Habilitar_Deshabilitar_Proveedor(true);
                 $('#ID_Proveedor').removeAttr('disabled');
                 $('#Proveedores').hide(300);
                 $('#Proveedor_Detalle').show(400);   
                 $('#Actualizar_Proveedor').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#Imagen_Proveedor').attr("src","https://i.imgur.com/0oN2F22.png");
                 Base64Imagen($('#Imagen_Proveedor').attr('src'));                                 
            }                
            
            $('#ADD').hide('drop',100);
            $('#Busqueda_Form').hide(400);
            $('#Contenedor_Panel').hide(); 
        });   

    /*Boton BUSCAR, busca ID en el formulario ACTIVO */
        $('#Buscar_Boton').click(function(event)
        {
            if(Formulario_Activo == 'Instrumento')
            {   
                if($('#Descripcion_Instrumento').val() != "")
                {

                    Detallar_Datos_Instrumento($('#Descripcion_Instrumento').val());
                }
                else
                {
                     swal
                     ({
                          title: "Aviso",
                          text: "Debe introducir el identificador del instrumento",
                          type: "warning",
                     });
                }
            }

            else  if(Formulario_Activo == 'Estuche')
            {   
                if($('#Descripcion_Instrumento').val() != "")
                {

                    Detallar_Datos_Estuche($('#Descripcion_Instrumento').val());
                }
                else
                {
                     swal
                     ({
                          title: "Aviso",
                          text: "Debe introducir el identificador del estuche",
                          type: "warning",
                     });
                }
            }

            else  if(Formulario_Activo == 'Proveedor')
            {   
                if($('#Descripcion_Instrumento').val() != "")
                {

                    Detallar_Datos_Proveedor($('#Descripcion_Instrumento').val());
                }
                else
                {
                     swal
                     ({
                          title: "Aviso",
                          text: "Debe introducir el identificador del proveedor",
                          type: "warning",
                     });
                }
            }
        });


    /*Detona el click del boton BUSCAR*/    

        $('#Descripcion_Instrumento').keypress(function (e) 
        {             
             if(e.which == 13)  
              {                    
                    $( "#Buscar_Boton" ).trigger( "click" );
                    e.preventDefault();
              }
        }); 


    /*ACTUALIZA los datos de las tablas*/

        $('#Actualizar').click(function(event)
        {
             Actualizar();    
        });


         /* Eventos : Formulario Instrumento */

        $('#Switch_Editar').change(function()
        {
            if( $('#Switch_Editar').prop('checked') == true)
            {
                Habilitar_Deshabilitar_Instrumentos(true);
                $('#Busqueda_Form').hide();
            }
            else
            {
                Habilitar_Deshabilitar_Instrumentos(false);
                $('#Busqueda_Form').show();
            }
        });

        $('#Añadir_Accesorio').click(function(event)
        {
             Insertar_Actualizar_Accesorio($('#ID_Instrumento').val(),'Nuevo',null);   
        });

        $('#Cambiar_Imagen_Instrumento').click(function(event)
        {
              document.getElementById('Imagen_Archivo').click();
        });

        $('#Actualizar_Instrumento').click(function(event)
        {              
              Insertar_Actualizar_Instrumento(Operacion);
        });

        $('#Ubicacion_Instrumento').change(function(event)
        {
            if($('#Ubicacion_Instrumento').val() == 'Bodega')
            {                 
                $('#Campo_Aula').hide();
                $('#Estante_Campo').show();
                $('#Form_gaveta').show();
            }
            else
            {
                $('#Campo_Aula').show();
                $('#Estante_Campo').hide();
                $('#Form_gaveta').hide()
            }
        }); 


        /* Eventos : Formulario Estuche */

        $('#Switch_Editar_Estuche').change(function()
        {
            if( $('#Switch_Editar_Estuche').prop('checked') == true)
            {
                Habilitar_Deshabilitar_Estuche(true);
                $('#Busqueda_Form').hide();
            }
            else
            {
                Habilitar_Deshabilitar_Estuche(false);
                $('#Busqueda_Form').show();
            }
        });

        $('#Cambiar_Imagen_Estuche').click(function(event)
        {
              document.getElementById('Imagen_Archivo_Estuche').click();
        });

        $('#Actualizar_Estuche').click(function(event)
        {              
              Insertar_Actualizar_Estuche(Operacion);
        });


        /* Eventos : Formulario Proveedor */

         $('#Switch_Editar_Proveedor').change(function()
        {
            if( $('#Switch_Editar_Proveedor').prop('checked') == true)
            {
                Habilitar_Deshabilitar_Proveedor(true);
                $('#Busqueda_Form').hide();
            }
            else
            {
                Habilitar_Deshabilitar_Proveedor(false);
                $('#Busqueda_Form').show();
            }
        });

        $('#Cambiar_Imagen_Proveedor').click(function(event)
        {
              document.getElementById('Imagen_Archivo_Proveedor').click();
        });   

        $('#Actualizar_Proveedor').click(function(event)
        {              
              Insertar_Actualizar_Proveedor(Operacion);
        });
}

