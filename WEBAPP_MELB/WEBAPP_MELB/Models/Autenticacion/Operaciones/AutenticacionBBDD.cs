using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using WEBAPP_MELB.Models.BBDD;

namespace WEBAPP_MELB.Models.Autenticacion
{
    public class AutenticacionBBDD
    {
        private ConexionBBDD Instancia_BBDD;
        private SqlCommand CMD;

        public AutenticacionBBDD()
        {
            Instancia_BBDD = new ConexionBBDD();
        }

        public int AutenticarUsuario(string Usuario, string Contraseña, string Modulo)
        {
            int ModuloBBDD = (Modulo == "Inventario") ? 1 : (Modulo == "Estudiante") ? 2 : 3;
            if (Instancia_BBDD.Abrir_Conexion_BBDD() == true)
            {
                CMD = new SqlCommand("Autenticacion", Instancia_BBDD.Conexion);
                CMD.CommandType = CommandType.StoredProcedure;
                CMD.Parameters.Add("@Modulo", SqlDbType.Int).Value = ModuloBBDD;
                CMD.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = Usuario;
                CMD.Parameters.Add("@Contraseña", SqlDbType.VarChar).Value = Contraseña;
                SqlParameter Existe = new SqlParameter("@ID", SqlDbType.Int);
                Existe.Direction = ParameterDirection.Output;
                CMD.Parameters.Add(Existe);
                CMD.ExecuteNonQuery();
                Instancia_BBDD.Cerrar_Conexion();
                if (CMD.Parameters["@ID"].Value != DBNull.Value)
                {
                    return Convert.ToInt16(CMD.Parameters["@ID"].Value);
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return -1;
            }
        }

    }
}