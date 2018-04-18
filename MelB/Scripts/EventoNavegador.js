var Tabla_Instrumento;
$(document).ready(function ()
{

    $('.selectpicker').selectpicker();
    $('#Color_Instrumento').colorpicker();

    $('#menuinicio').click(function (event) 
    {
        document.getElementById('Inicio').style.display = 'block';        
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Accesorios').style.display = 'none';
        document.getElementById('Estuches').style.display = 'none';
       
    });
   

    $('#instrumentossubmenu').click(function (event) 
    {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Instrumentos').style.display = 'block';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Accesorios').style.display = 'none';
        document.getElementById('Estuches').style.display = 'none';        
    });

    $('#proveedoressubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';        
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'block';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Accesorios').style.display = 'none';
        document.getElementById('Estuches').style.display = 'none';
    });

    $('#remisionessubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'block';
        document.getElementById('Accesorios').style.display = 'none';
        document.getElementById('Estuches').style.display = 'none';         
    });

    $('#accesoriossubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Accesorios').style.display = 'block';
        document.getElementById('Estuches').style.display = 'none';        
    });

    $('#estuchessubmenu').click(function (event) {
        document.getElementById('Inicio').style.display = 'none';
        document.getElementById('Instrumentos').style.display = 'none';
        document.getElementById('Proveedores').style.display = 'none';
        document.getElementById('Remisiones').style.display = 'none';
        document.getElementById('Accesorios').style.display = 'none';
        document.getElementById('Estuches').style.display = 'block';

    });
     $('#sidebarCollapse').on('click', function () 
     {
         $('#sidebar').toggleClass('active');
     });
    

    Tabla_Instrumento = $('#Instrumento_T').DataTable
    (   
    {
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
    }
    );


    Tabla_Proveedor = $('#Proveedor_T').DataTable
    (   
    {
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
    }
    );


     Tabla_Remision = $('#Remision_T').DataTable
    (   
    {
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
    }
    );

    Tabla_Accesorios = $('#Accesorios_T').DataTable
    (   
    {
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
    }
    );

    Tabla_Estuche = $('#Estuche_T').DataTable
    (   
    {
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
    }
    );

});

