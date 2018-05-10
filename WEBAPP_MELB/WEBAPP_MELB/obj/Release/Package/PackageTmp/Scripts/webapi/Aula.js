var ID_Aula = [];
var Aula_Seleccionada = 0;

 function Cargar_Aulas()  
 {        
     Tabla_Aula.clear().draw();
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
                       $('#Aula_Clase').append('<option data-subtext="Aula:#' + Resultado[i].Numero + ' Piso:#' + Resultado[i].Piso + '">#' + Resultado[i].ID_Aula + '</option>');                                                                                                     

                       Tabla_Aula.row.add
                           ([
                               Resultado[i].ID_Aula,
                               Resultado[i].Numero,
                               Resultado[i].Piso,
                               '<button type="button" class="btn waves-effect waves-light btn-primary btn-color" onclick ="Insertar_Actualizar_Aula(\'' + Funcion_Realizar +'\')"><i class="ion-compose" data-pack="default"></i></button>',
                               '<button type="button" class="btn btn-danger" onclick ="Eliminar_Aula(' + Resultado[i].ID_Aula + ')"><i class="ion-close-round" data-pack="default" data-tags="delete, trash, kill, x"></li></button>'
                           ]).draw(false);  
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

function Eliminar_Aula(ID)
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

                    url: 'http://melbws.azurewebsites.net/api/Aula/'+ID,
                    type: 'DELETE',
                    success: function(Resultado)
                    {
                        swal.closeModal();
                        Resultado = JSON.parse(Resultado);
                        if(Resultado.Codigo == 5)
                        {                                    
                            swal.closeModal();
                            swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
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
                        Cargar_Aulas();
                    },
                    error: function(Respuesta)
                    {
                        swal("Error", "No es posible eliminar el aula", "error");
                    },
                });
            }    
    });            
 }

function Insertar_Actualizar_Aula(Comando)
{
    var Aula_BBDD = { ID_Estuche: parseInt(document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[0].innerHTML), Numero: parseInt(document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[1].innerHTML), Piso: parseInt(document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[2].innerHTML)};
                                       
    if(Comando == 'Nuevo')
            {                                                
                $.ajax
                ({

                        //url: 'http://melbws.azurewebsites.net/api/Aula/',
                        url: 'http://localhost:53603/api/Aula',
                      type: 'POST',
                      data: Aula_BBDD,
                      success: function(Resultado)
                      {
                         Resultado = JSON.parse(Resultado);
                         if(Resultado.Codigo == 5)
                         {                                    
                             swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
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
                        Cargar_Aulas();
                      },
                      error: function(Respuesta)
                      {
                         swal("Error", "Ocurrio un error al insertar el Estuche", "error");
                      },
                });
            }
    else if (Comando == "Actualizar")
            {
                $.ajax
                ({
                      url: 'http://melbws.azurewebsites.net/api/Aula/',
                      type: 'PUT',
                      data: Aula_BBDD,
                      success: function(Resultado)
                      {
                         Cargar_Aulas();
                         Resultado = JSON.parse(Resultado);
                         swal(Resultado.Mensaje_Cabecera,Resultado.Mensaje_Usuario, "success");
                      },
                      error: function(Error)
                      {
                         swal("Error", "Ocurrio un error al insertar el Estuche", "error");
                      },
                });
            }
}

function Proceso_Insercion_Aula(Comando) {
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

    if (Comando == 'Nuevo') {
        Titulo = 'Añadiendo Aula';
        Error = 'Ocurrio un inconveniente al añadir el Aula.';
        var Pasos =
            [
                {
                    title: 'Añadir Aula',
                    text: 'Identificador del Aula',
                    input: 'number',
                    inputClass: 'form-control'
                },
                {
                    title: 'Añadir Aula',
                    text: 'Numero de Aula',
                    input: 'number',
                    inputClass: 'form-control'
                },
                {
                    title: 'Añadir Aula',
                    text: 'Piso del Aula',
                    input: 'number',
                    inputClass: 'form-control'
                }
            ]
    }
    else if (Comando == "Actualizar") {
        Titulo = 'Actualizando Aula';
        Error = 'Ocurrio un inconveniente al actualizar el aula.';

        var Pasos =
            [
                {
                    title: 'Actualizar Aula',
                    text: 'Identificador del Aula',
                    input: 'number',
                    inputValue: (document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[0].innerHTML),
                    inputClass: 'form-control'
                },
                {
                    title: 'Actualizar Aula',
                    text: 'Numero de Aula',
                    input: 'number',
                    inputValue: (document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[1].innerHTML),
                    inputClass: 'form-control'
                },
                {
                    title: 'Actualizar Aula',
                    text: 'Piso del Aula',
                    input: 'number',
                    inputValue: (document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[2].innerHTML),
                    inputClass: 'form-control'
                }
            ]
    }
    else {

        swal
            ({
                title: "Aviso",
                text: "Selecciona un Aula",
                type: "warning",
            }).catch(swal.noop)
    }

    swal.queue(Pasos).then(function (Modal) {

        if (Modal[0] != '' && Modal[1] != '' && Modal[2] != '')  {
            swal.resetDefaults();
            swal({ title: Titulo, text: 'Espere por favor', type: 'info', allowOutsideClick: false });
            swal.showLoading();

            if (Comando == 'Nuevo') {

                document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[0].innerHTML = Modal[0];
                document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[1].innerHTML = Modal[1];
                document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[2].innerHTML = Modal[2];

                Insertar_Actualizar_Aula(Comando);

                //swal("Exito", "Se ha añadido el registro exitosamente", "success");
            }
            else
            {
                document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[0].innerHTML = Modal[0];
                document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[1].innerHTML = Modal[1];
                document.getElementById("Aula_T").rows[Aula_Seleccionada + 1].cells[2].innerHTML = Modal[2];

                Insertar_Actualizar_Aula(Comando);

                //swal("Exito", "Se ha actualizado el registro exitosamente", "success");
            }
        }
        else {
            swal.resetDefaults();
            swal.closeModal();
            swal
                ({
                    title: "Aviso",
                    text: "Revise que haya introducido los campos correctamente",
                    type: "warning",
                });
        }
    })
}