 var ID_Aula = [];
 function Cargar_Aulas()  
 {        
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Aula',

            type: 'GET',

            success: function (Resultado) 
            {    
                ID_Aula = [];
                $('#Aula_Clase').html(''); 
                if(Resultado.Codigo == null)
                {                                
                    Resultado = JSON.parse(Resultado);                                                                        
                    for (i = 0; i < Resultado.length; i++) 
                    {  
                       ID_Aula.push({ID:Resultado[i].ID_Aula , Numero:Resultado[i].Numero, Piso:Resultado[i].Piso});                                                                               
                       $('#Aula_Clase').append('<option data-subtext="Aula:#'+Resultado[i].Numero+' Piso:#'+Resultado[i].Piso+'">#'+Resultado[i].ID_Aula+'</option>');                                                                                                     
                    }                     
                }
                
                ID_Proveedor.forEach(function(Elemento) 
                {
                    $('#ID_Filtro_Instrumento').append('<option data-subtext="'+ Elemento.Nombre+'">#'+Elemento.ID+'</option>');                                                   
                });                
                $('.selectpicker').selectpicker('refresh');
                EstadisticasInstrumentos("1");
                EstadisticasInstrumentos("0");      
            },

            error: function (Mensaje) 
            {

                swal
                ({
                      title: "Error listando aulas",
                      text: "No se pudo conectar con el servidor.",
                      type: "error",
                });
        }

        });
}