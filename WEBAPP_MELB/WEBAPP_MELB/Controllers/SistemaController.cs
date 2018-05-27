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
                if (Session["Permiso"].ToString() == "2" || Session["Permiso"].ToString() == "5")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("Login", "Autenticacion", new { Estado = -3 });
                }
            }
            else
            {
                return RedirectToAction("Login","Autenticacion", new { Estado = -2 });
            }
        }

        public ActionResult Estudiante()
        {
            if (Session["EstaLogeado"] != null)
            {
                if (Session["Permiso"].ToString() == "1")
                {
                    return View();
                }
                else
                {
                    return RedirectToAction("Login", "Autenticacion", new { Estado = -3 });
                }
            }
            else
            {
                return RedirectToAction("Login", "Autenticacion", new { Estado = -2 });
            }
        }      

    }
}