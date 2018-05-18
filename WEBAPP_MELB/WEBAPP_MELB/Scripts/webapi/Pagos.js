/* Funciones de la API */

function Cargar_Pagos() {
    Tabla_Pagos.clear().draw();
    $.ajax({
        url: 'http://melbws.azurewebsites.net/api/PagosxMatricula?ID_Matricula=' + ID_Matricula + '&Semestre=' + $('#Num_Semestre').val() + '&Año=' + $('#Matricula_Año').val(),
        type: 'GET',
        success: function (Resultado) {
            Resultado = JSON.parse(Resultado);
            if (Resultado.Codigo == null) {
                for (I = 0; I < Resultado.length; I++) {
                    var Estado = (Resultado[I].Estado_Pago == 'Cancelado') ? '<span class="label label-success">Cancelado</span>' : '<span class="label label-purple">Pendiente</span>'
                    Tabla_Pagos.row.add
                        ([
                            '#' + Resultado[I].ID_Pago,
                            Resultado[I].Mensualidad+'°',
                            Resultado[I].FechaRealizacion.substring(0, 10),
                            Resultado[I].Monto+'$',
                            Estado
                        ]).draw(false);                  
                }
            }
            Cargar_Horario_Estudiante();
        },

        error: function (Mensaje) {

            swal
                ({
                    title: "Error listando inscripciones del estudiante",
                    text: "No se pudo conectar con el servidor.",
                    type: "error",
                });
        }

    });
}