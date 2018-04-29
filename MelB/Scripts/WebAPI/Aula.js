 function Cargar_Aulas()  
 {        
        $.ajax({

            url: 'http://melbws.azurewebsites.net/api/Aula/',

            type: 'GET',

            success: function (Resultado) 
            {    
                $('#Aula_Clase').html('');
                if(Resultado.Codigo == null)
                {            
                    Resultado = JSON.parse(Resultado);
                    if(Resultado.Codigo == null)
                    {                 
                        for (i = 0; i < Resultado.length; i++) 
                        {      
                            $('#Aula_Clase').append('<option data-subtext="Aula:#'+Resultado[i].Numero+' Piso:#'+Resultado[i].Piso+'">#'+Resultado[i].ID_Aula+'</option>');                 
                        }
                    }
                } 
                $('.selectpicker').selectpicker('render');
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