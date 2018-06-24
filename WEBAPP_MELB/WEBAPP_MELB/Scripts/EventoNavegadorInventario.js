var Formulario_Activo;
var Operacion;
var Tabla_Instrumento;
var Tabla_Proveedor;
var Tabla_Remision;
var Tabla_Estuche;
var Tabla_Accesorios;
var Tabla_Desglose_Remision;
var Tabla_Aula;
var EsTelefono = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var AnimacionSideBar = false;

$(document).ready(function ()
{
    swal({ title: 'Cargando', text: 'Espere por favor', type: 'info', allowOutsideClick: false });
    swal.showLoading();
    if (EsTelefono == true)
    {
        $('#content').css('margin-left', '0px');
        $('#sidebar').css('z-index', '2000');
        $('.selectpicker').selectpicker('mobile');
        AnimacionSideBar = true;
    }

    // Construcción de los formularios de la pagina //
       Inicializacion_Eventos();
       Inicializacion_Tablas();
       Inicializacion_Controles(); 


    // Peticiones Ajax //
    Cargar_Instrumentos(); 

    // Carga de imagenes para los reportes //
    CargarImagenes();

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
    $("input[name='ID_Remision']").TouchSpin({});
    $("input[name='Estado_Remision']").TouchSpin({});
    

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

    $('#Telefono1_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 8
    });

    $('#Telefono2_Proveedor').maxlength
    ({
        alwaysShow: true,
        threshold: 8
    });

    $('#Descripcion_Estuche').maxlength
        ({
            alwaysShow: true,
            threshold: 50
    });

    $('#Remision_Fecha_Inicio').dateDropper
    ({
          "data-format": 'd/m/Y',          
    });

    $('#Remision_Fecha_Fin').dateDropper
    ({
          "data-format": 'd/m/Y',          
    });

    $('#Remision_Fecha_Inicio_Filtro').dateDropper
    ({
            "data-format": 'd/m/Y',
    });

    $('#Remision_Fecha_Terminal_Filtro').dateDropper
    ({
            "data-format": 'd/m/Y',
    });

    /* Tooltips */
    $('[data-toggle="tooltip"]').tooltip();  
}

function Actualizar_Todo()
{
    swal({title:'Refrescando',text: 'Espere por favor',type: 'info', allowOutsideClick: false});
    Tabla_Instrumento.clear().draw();
    Tabla_Estuche.clear().draw();
    Tabla_Proveedor.clear().draw();
    Tabla_Remision.clear().draw();
    Tabla_Accesorios.clear().draw();
    Tabla_Desglose_Remision.clear().draw();
    Tabla_Aula.clear().draw();
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


    Tabla_Desglose_Remision = $('#Desglose_Remision_T').DataTable
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

   Tabla_Aula = $('#Aula_T').DataTable
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
                   "next": "Siguiente pagina",
                   "previous": "Pagina anterior"
               },
               "columnDefs": [{ "className": "dt-center", "targets": "_all" }]
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
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'none';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            $('#ADD').hide();
            $('#Reporte').hide();
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
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'none';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            Formulario_Activo = 'Instrumento';                       
            $('#ADD').html('<span class="btn-label"><i class="ion-music-note" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Instrumento');
            $('#ADD').show("drop", 50);
            $('#Busqueda_Form').hide("drop", 50);
            $('#Reporte').show();
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
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'none';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            Formulario_Activo = 'Proveedor';
            $('#ADD').html('<span class="btn-label"><i class="ion-person" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Proveedor');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop", 50);
            $('#Reporte').show();
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
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'none';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            Formulario_Activo = 'Remision';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Remisiones');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop", 50);
            $('#Reporte').show();
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
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'none';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            Formulario_Activo = 'Accesorio';
            $('#ADD').html('<span class="btn-label"><i class="ion-briefcase" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Accesorios');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop", 50); 
            $('#Reporte').show();
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
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'none';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            Formulario_Activo = 'Estuche';
            $('#ADD').html('<span class="btn-label"><i class="ion-bag" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Estuche');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop", 50);
            $('#Reporte').show();
        });

        $('#aulasubmenu').click(function (event) {
            document.getElementById('Inicio').style.display = 'none';
            document.getElementById('Instrumentos').style.display = 'none';
            document.getElementById('Proveedores').style.display = 'none';
            document.getElementById('Remisiones').style.display = 'none';
            document.getElementById('Estuches').style.display = 'none';
            document.getElementById('Instrumento_Detalle').style.display = 'none';
            document.getElementById('Estuche_Detalle').style.display = 'none';
            document.getElementById('Proveedor_Detalle').style.display = 'none';
            document.getElementById('Remision_Detalle').style.display = 'none';
            document.getElementById('Aulas').style.display = 'block';
            if (EsTelefono) { $('#sidebar').css('margin-left', '-110px'); AnimacionSideBar = true; }
            Formulario_Activo = 'Aulas';
            $('#ADD').html('<span class="btn-label"><i class="ion-android-pin" data-pack="default" data-tags="add, include, new, invite, +"></i></span>   Añadir Aula');
            $('#ADD').show("drop", 50);  
            $('#Busqueda_Form').hide("drop", 50);
            $('#Reporte').hide();
        });

    /* Eventos : uso en formularios de forma global */
    $('#sidebarCollapse').click(function (event) 
    {
        $('#sidebar').show();
        if (AnimacionSideBar == false) {
            $('#sidebar').css('margin-left', '-110px');
            if (EsTelefono === false) { $('#content').css('margin-left', '0px'); }
            AnimacionSideBar = true;
        }
        else {
            if (EsTelefono == false) { $('#content').css('margin-left', '110px'); }
            $('#sidebar').css('margin-left', '0px');
            AnimacionSideBar = false;
        }
    });

    $('#Reporte').click(function (Event)
    {
        if (Formulario_Activo == "Instrumento") {
            Cargar_Instrumentos(1);
        }
        else if (Formulario_Activo == "Estuche") {
            Cargar_Estuches(1);
        }
        else if (Formulario_Activo == "Proveedor") {
            Cargar_Proveedores("", 2);
        }
        else if (Formulario_Activo == "Remision") {
            Cargar_Remisiones(2);
        }
        else if (Formulario_Activo == "RemisionNueva")
        {
            GenerarDocumentoRemisionNueva();
        }

    });

    /*Boton AÑADIR dependiendo del Formulario que se encuentre ACTIVO*/     

        $('#ADD').click(function(event)
        { 
            $('.FlotarDerecha').hide();

            if (Formulario_Activo == 'Instrumento')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Instrumento_Texto').text('Añadir Instrumento');
                 Reiniciar_Controles_Instrumento();
                 Habilitar_Deshabilitar_Instrumentos(true);
                 $('#ID_Instrumento').removeAttr('disabled');
                 $('#Instrumentos').hide();
                 $('#Instrumento_Detalle').show();   
                 $('#Actualizar_Instrumento').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#Imagen_Instrumento').attr("src","https://i.imgur.com/0oN2F22.png");
                 Base64Imagen($('#Imagen_Instrumento').attr('src'));             
                 Cargar_Estuches_No_Usados('Guitarra');                   
                 $('#Estuche_Instrumento').selectpicker({title: 'Seleccione un estuche'}).selectpicker('render');
                 $('#Campo_Aula').hide();
                 $('#Estante_Campo').show();
                 $('#Form_gaveta').show();
                 $('#Panel_Accesorios').hide();

                 $('#ADD').hide();
                 $('#Busqueda_Form').hide();
                 $('#Contenedor_Panel').hide(); 
                 $('#Reporte').hide();

            }
            else if(Formulario_Activo == 'Estuche')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Estuche_Texto').text('Añadir Estuche');
                 Reiniciar_Controles_Estuche();
                 Habilitar_Deshabilitar_Estuche(true);
                 $('#ID_Estuche').removeAttr('disabled');
                 $('#Estuches').hide();
                 $('#Estuche_Detalle').show();   
                 $('#Actualizar_Estuche').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#Imagen_Estuche').attr("src","https://i.imgur.com/0oN2F22.png");
                 Base64Imagen($('#Imagen_Estuche').attr('src'));   
                 $('#InstrumentoEstuche').hide();
                 $('#ADD').hide();
                 $('#Busqueda_Form').hide();
                 $('#Contenedor_Panel').hide(); 
                 $('#Reporte').hide();

            }
            else if(Formulario_Activo == 'Proveedor')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Proveedor_Texto').text('Añadir Proveedor');
                 Reiniciar_Controles_Proveedor();
                 Habilitar_Deshabilitar_Proveedor(true);
                 $('#ID_Proveedor').removeAttr('disabled');
                 $('#Proveedores').hide();
                 $('#Proveedor_Detalle').show();   
                 $('#Actualizar_Proveedor').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');
                 $('#Imagen_Proveedor').attr("src","https://i.imgur.com/0oN2F22.png");
                 Base64Imagen($('#Imagen_Proveedor').attr('src'));       

                 $('#ADD').hide();
                 $('#Busqueda_Form').hide();
                 $('#Contenedor_Panel').hide(); 
                 $('#Reporte').hide();

            }  
            else if(Formulario_Activo == 'Remision')
            {       
                 Operacion = 'Nuevo';
                 $('#Header_Remision_Texto').text('Añadir Remision');
                 Reiniciar_Controles_Remision();
                 Habilitar_Deshabilitar_Remision(true,Operacion);
                 $('#ID_Remision').removeAttr('disabled');
                 $('#Añadir_Desglose_Remision').removeAttr('disabled');
                 $('#Remisiones').hide();
                 $('#Remision_Detalle').show();   
                 $("#Estado_Remision").prop("disabled","true");
                 $('#Actualizar_Remision').html('<span class="btn-label"><i class="ion-upload" data-pack="default" data-tags="storage, cloud"></i></span>Añadir');

                 $('#ADD').hide();
                 $('#Busqueda_Form').hide();
                 $('#Contenedor_Panel').hide(); 
                 $('#Reporte').hide();
            }
            else if (Formulario_Activo == 'Aulas')
            {
                Operacion = 'Nuevo';
                $('#Header_Remision_Texto').text('Añadir Aula');
                Proceso_Insercion_Aula(Operacion);
            }
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

            else  if(Formulario_Activo == 'Remision')
            {   
                if($('#Descripcion_Instrumento').val() != "")
                {

                    Detallar_Datos_Remision($('#Descripcion_Instrumento').val());
                }
                else
                {
                     swal
                     ({
                          title: "Aviso",
                          text: "Debe introducir el identificador de la remision",
                          type: "warning",
                     });
                }
            }
        });

        $('input[type="number"]').keypress(function(event)
        {
                if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57)) 
                {
                    return false;
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
             Actualizar_Todo();    
        });


        /* Eventos Tabla : Tabla Instrumento */

        $('#Filtro_Instrumento').change(function(event)
        {
            var Filtro = $('#Filtro_Instrumento').val();
            $('#ID_Filtro_Instrumento').html('');
            if(Filtro == 'Proveedor')
            {
                $('#Label_ID').text('ID Proveedor');
                $('#Col_Select').css('visibility','visible');
                $('#ID_Filtro_Instrumento').html();
                ID_Proveedor.forEach(function(Elemento) 
                {
                    $('#ID_Filtro_Instrumento').append('<option data-subtext="'+ Elemento.Nombre+'">#'+Elemento.ID+'</option>');                                                   
                });
                $('.selectpicker').selectpicker('refresh');   
            }  
            else if(Filtro == 'Estuche')
            {
                $('#Label_ID').text('ID Estuche');
                $('#Col_Select').css('visibility','visible');
                ID_Estuche.forEach(function(Elemento) 
                {
                    $('#ID_Filtro_Instrumento').append('<option data-subtext="'+ Elemento.Nombre+'">#'+Elemento.ID+'</option>');                                                   
                });
                $('.selectpicker').selectpicker('refresh');   
            }   
            else if (Filtro == 'Aula')
            {            
                $('#Label_ID').text('ID Aula');
                $('#Col_Select').css('visibility','visible');
                ID_Aula.forEach(function(Elemento) 
                {
                    $('#ID_Filtro_Instrumento').append('<option data-subtext="Aula:#'+Elemento.Numero+' Piso:#'+Elemento.Piso+'">#'+Elemento.ID+'</option>');                                                                                                                  
                });
                $('.selectpicker').selectpicker('refresh');   
            }   
            else
            {                
                $('#Col_Select').css('visibility','hidden');
            }     
        }); 

        $('#Filtro_Buscar_Boton').click(function(event)
        {
            try
            {
                Filtrar_Instrumentos($('#Filtro_Instrumento').val(), $('#ID_Filtro_Instrumento').val().substring(1, $('#ID_Filtro_Instrumento').val().length));
            }
            catch(err)
            {
                Filtrar_Instrumentos($('#Filtro_Instrumento').val(), -1);
            }
        });

        /* Eventos Tabla : Tabla Remisiones */

        $('#Filtro_Remision').change(function(event)
        {
            var Filtro = $('#Filtro_Remision').val();
            $('#ID_Filtro_Remisiones').html('');
            if (Filtro == 'Instrumento')
            {              
                $('#ID_ContenedorRemision').show();
                $('#FiltroConteendor').attr('class', 'col-md-4');
                $('#ContenedorBotonRemision').attr('class', 'col-md-4');
                $('#ContenedorFechaFin').hide();
                $('#ContenedorFechaInicio').hide();
                ID_Instrumento.forEach(function (Elemento)
                {
                    $('#ID_Filtro_Remisiones').append('<option data-subtext="' + Elemento.Nombre + '">#' + Elemento.ID + '</option>');
                });
                $('.selectpicker').selectpicker('refresh');
            }
            else if (Filtro == 'Estudiante')
            {
                $('#ID_ContenedorRemision').show();
                $('#FiltroConteendor').attr('class', 'col-md-4');
                $('#ContenedorBotonRemision').attr('class', 'col-md-4');
                $('#ContenedorFechaFin').hide();
                $('#ContenedorFechaInicio').hide();
                ID_Estudiante.forEach(function (Elemento)
                {
                    $('#ID_Filtro_Remisiones').append('<option data-subtext="' + Elemento.Nombre + '">#' + Elemento.ID + '</option>');
                });
                $('.selectpicker').selectpicker('refresh');
            }
            else if (Filtro == 'Fecha')
            {                
                $('#ID_ContenedorRemision').hide();
                $('#FiltroConteendor').attr('class', 'col-md-3');
                $('#ContenedorBotonRemision').attr('class', 'col-md-3');
                $('#ContenedorFechaFin').show();
                $('#ContenedorFechaInicio').show();
            }
        }); 

        $('#Filtro_Buscar_Boton_Remisiones').click(function(event)
        {
            if ($('#Filtro_Remision').val() != "Fecha")
            {
                Fecha_Salida = Cambio_Formato_Fecha(3);
                Filtrar_Remisiones($('#Filtro_Remision').val(), $('#ID_Filtro_Remisiones').val().substring(1, $('#ID_Filtro_Instrumento').val().length), Fecha_Salida.Fecha_Inicio, Fecha_Salida.Fecha_Fin);
            }
            else
            {
                Fecha_Salida = Cambio_Formato_Fecha(3);
                Filtrar_Remisiones($('#Filtro_Remision').val(),0, Fecha_Salida.Fecha_Inicio, Fecha_Salida.Fecha_Fin);
            }
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

        $('#Tipo_Instrumento').change(function(event)
        {
            $('#Estuche_Instrumento').selectpicker({title: 'Selecciona un estuche'}).selectpicker('render');
            $('#Estuche_Instrumento').html('html');
            Cargar_Estuches_No_Usados($('#Tipo_Instrumento').val());
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

         $('#Telefono1_Proveedor').keypress(function(event)
         {
                if(!isNumber(event.key) )
                {                    
                    event.preventDefault();
                }                           
         });

         $('#Telefono2_Proveedor').keypress(function(event)
         {
                if(!isNumber(event.key) )
                {                    
                    event.preventDefault();
                }                           
         });

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


        /* Eventos : Formulario Remision */

        $('#Switch_Editar_Remision').change(function()
        {
            if( $('#Switch_Editar_Remision').prop('checked') == true)
            {
                Habilitar_Deshabilitar_Remision(true);
                $('#Busqueda_Form').hide();
            }
            else
            {
                Habilitar_Deshabilitar_Remision(false);
                $('#Busqueda_Form').show();
            }
        });

        $('#Actualizar_Remision').click(function(event)
        {     
            var FechaRemisionFinal = new Date($('#Remision_Fecha_Fin').val());
            if (new Date() <= FechaRemisionFinal) {
                Insertar_Actualizar_Remision(Operacion);
            }
            else
            {
                swal
                    ({
                        title: "Precaución",
                        text: "La fecha de fin de la remisión no puede ser igual o menor que la del dia de hoy",
                        type: "warning",
                    });
            }
        });

         $('#Añadir_Desglose_Remision').click(function(event)
         {
             if (Tabla_Desglose_Remision.column(0).data().length < 3) {
                 Insertar_Actualizar_Desglose_Remision(Operacion, 0);
             }
             else
             {
                 swal
                     ({
                         title: "Atención",
                         text: "El maximo de instrumentos permitidos son 3",
                         type: "warning",
                     });
             }
        });

         //DETECTANDO CLIC EN DESGLOSE REMISION//         

        $('#Desglose_Remision_T tbody').on( 'click', 'tr', function () 
        {
            Fila_Seleccionada = Tabla_Desglose_Remision.row( this ).index() ;
        });

         //DETECTANDO CLIC AULA//         
        $('#Aula_T tbody').on('click', 'tr', function () {
            Aula_Seleccionada = Tabla_Aula.row(this).index();
        });
}


function isNumber(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}