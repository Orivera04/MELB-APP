var Formulario_Activo;
var Operacion;

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
            responsive: true
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
        });
       

        $('#instrumentossubmenu').click(function (event) 
        {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'block';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';     
            document.getElementById('Instrumento_Detalle').style.display = 'none';


            Formulario_Activo = 'Instrumento';                       
            $('#ADD').html('<span class="btn-label"><i class="ion-music-note" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Instrumento');
            $('#ADD').show("drop", 400);               
        });

        $('#proveedoressubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';        
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'block';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
        });

        $('#remisionessubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'block';
            document.getElementById('Estuches').style.display = 'none';         
            document.getElementById('Instrumento_Detalle').style.display = 'none';

        });

        $('#accesoriossubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';   
        });

        $('#estuchessubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'block';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
            $('#ADD').show("drop", 400);  

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

        $('#ADD').click(function(event)
        { 
            if(Formulario_Activo == 'Instrumento')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Instrumento_Texto').text('Añadir Instrumento')           
                 Reiniciar_Controles_Instrumento()
                 Habilitar_Deshabilitar_Instrumentos(true);
                 $('#ID_Instrumento').removeAttr('disabled');
                 $('#Instrumentos').hide(300);
                 $('#Instrumento_Detalle').show(400);   
                 $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
            }    $('#Imagen_Instrumento').attr("src","https://i.imgur.com/0oN2F22.png");
            Base64Imagen($('#Imagen_Instrumento').attr('src'));                                 
            $('#ADD').hide('drop',400);
            $('#Busqueda_Form').hide(400);
            $('#Contenedor_Panel').hide(); 
        });   

    /* Eventos : Formulario Instrumento */

        $('#Switch_Editar').change(function()
        {
            if( $('#Switch_Editar').prop('checked') == true)
            {
                Habilitar_Deshabilitar_Instrumentos(true);
            }
            else
            {
                Habilitar_Deshabilitar_Instrumentos(false);
            }
        });

        $('#Cambiar_Imagen_Instrumento').click(function(event)
        {
              document.getElementById('Imagen_Archivo').click();
        });

        $('#Actualizar_Instrumento').click(function(event)
        {              
              Insertar_Actualizar_Instrumento(Operacion);
        });
}

