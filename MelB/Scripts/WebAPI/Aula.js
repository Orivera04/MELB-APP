 function Cargar_Aulas(Bandera_Filtro)  
 {        
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Aula/',

            type: 'GET',

            success: function (Resultado) 
            {    
                if(Bandera_Filtro == null) { $('#Aula_Clase').html('');} else { $('#ID_Filtro_Instrumento').html('');} 
                if(Resultado.Codigo == null)
                {                                
                    Resultado = JSON.parse(Resultado);
                    if(Resultado.Codigo == null)
                    {                                                      
                        for (i = 0; i < Resultado.length; i++) 
                        { 
                           if(Bandera_Filtro == null)
                           {
                              $('#Aula_Clase').append('<option data-subtext="Aula:#'+Resultado[i].Numero+' Piso:#'+Resultado[i].Piso+'">#'+Resultado[i].ID_Aula+'</option>');                 
                           }     
                           else
                           {
                              $('#ID_Filtro_Instrumento').append('<option data-subtext="Aula:#'+Resultado[i].Numero+' Piso:#'+Resultado[i].Piso+'">#'+Resultado[i].ID_Aula+'</option>');                 
                           }                                            
                        }
                    } 
                }

                $('.selectpicker').selectpicker('refresh');   
                swal.closeModal();               
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