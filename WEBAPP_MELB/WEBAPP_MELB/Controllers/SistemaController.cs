using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WEBAPP_MELB.Controllers
{
    public class SistemaController : Controller
    {
        public ActionResult Inventario()
        {
            if (Session["EstaLogeado"] != null)
            {                
                return View();
            }
            else
            {
                return RedirectToAction("Login","Autenticacion", new { Estado = -2 });
            }
        }
       
        public void MatarCookieSesion()
        {
            Session.Abandon();
        }

    }
}