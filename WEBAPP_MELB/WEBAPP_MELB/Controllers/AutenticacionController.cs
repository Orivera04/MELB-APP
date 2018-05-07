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
            return View();
        }

        [HttpPost]          
        public ActionResult VerificarUsuario(string Usuario, string Contraseña,string Modulo)
        {
            int ID = Instancia.AutenticarUsuario(Usuario, Contraseña, Modulo);
            if (ID >= 1)
            {
                Session["ID"] = ID;
                Session["Usuario"] = Usuario;
                Session["EstaLogeado"] = true;

                return RedirectToAction(Modulo,"Sistema");
            }
            else if (ID == 0)
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