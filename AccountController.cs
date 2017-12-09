using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using bi.Util;

namespace bi.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Login()
        {
            return View();
        }


        Utilities util = new Utilities();
        // GET: Account
        public JsonResult setCookie(string id, string code, string userFirstName, string userLastName, string roleId, string siteCode, string deptCode, string isFirst)
        {
            try
            {
                HttpCookie cookie = new HttpCookie("_214");
                cookie["id"] = id;
                cookie["code"] = code;
                cookie["sissionId"] = util.GenerateSissionCode();
                cookie["userFirstName"] = userFirstName;
                cookie["userLastName"] = userLastName;
                Response.Cookies.Add(cookie);
                return Json(new { hasError = false }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { hasError = true, errorMessage = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Logout()
        {
            Session.RemoveAll();
            HttpCookie cookie = new HttpCookie("_214");
            cookie.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Add(cookie);

            return RedirectToAction("Login");
        }
    }
}