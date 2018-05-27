using System.Web.Mvc;
using WEBAPP_MELB.Models.Autenticacion;
namespace WEBAPP_MELB.Controllers
{
    public class AutenticacionController : Controller
    {

        AutenticacionBBDD Instancia = new AutenticacionBBDD();
        
        public ActionResult Login(int Estado = 1)
        {
            ViewBag.Exito = Estado;
            Session.Abandon();
            return View();
        }

        [HttpPost]          
        public ActionResult VerificarUsuario(string Usuario, string Contraseña,string Modulo)
        {
            var UsuarioBBDD = Instancia.AutenticarUsuario(Usuario, Contraseña, Modulo);
            if (UsuarioBBDD[0] >= 1)
            {
                Session["ID"] = UsuarioBBDD[0];
                Session["Usuario"] = Usuario;
                Session["Nombre"] = UsuarioBBDD[1];
                Session["EstaLogeado"] = true;
                Session["Permiso"] = UsuarioBBDD[2];

                return RedirectToAction(Modulo,"Sistema");
            }
            else if (UsuarioBBDD[0] == 0)
            {
                return RedirectToAction("Login",new {Estado = 0 });
            }
            else
            {
                return RedirectToAction("Login", new {Estado = -1 });
            }
        }
    }
}