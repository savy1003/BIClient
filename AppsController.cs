using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using bi.Models;
using bi.Util;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;

namespace bi.Controllers
{
    [OutputCacheAttribute(VaryByParam = "*", Duration = 0, NoStore = true)]
    public class AppsController : Controller
    {
        // GET: Apps
        public ActionResult Index(string id)
        {
            Utilities util = new Utilities();
            HttpCookie cookie2 = Request.Cookies["_214"];
            if (cookie2 != null)
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(util.getApi() + "Menu/getMenu/" + cookie2["Id"].ToString());
                request.Method = "GET";
                request.ContentType = "application/json; charset=utf-8";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream responseStream = response.GetResponseStream();
                string jsonString = string.Empty;

                using (StreamReader reader = new StreamReader(responseStream))
                {
                    jsonString = reader.ReadToEnd();
                    reader.Close();
                }

                dynamic str = JsonConvert.DeserializeObject(jsonString);
                List<Menu> results = JsonConvert.DeserializeObject<List<Menu>>(str.ToString());
                List<Menu> menuList = new List<Menu>();

                foreach (var oRest in results)
                {
                    if (oRest.ParentId == 0)
                    {
                        Menu m = new Menu();
                        m.Id = oRest.Id;
                        m.Name = oRest.Name;
                        m.LevelNo = oRest.LevelNo;
                        m.ParentId = oRest.ParentId;
                        m.Icon = oRest.Icon;
                        m.Url = oRest.Url;
                        m.Code = oRest.Code;

                        List<MenuChild> lMC = new List<MenuChild>();
                        foreach (var oRestDetail in results)
                        {
                            if (oRestDetail.ParentId == m.Code)
                            {
                                MenuChild mc = new MenuChild();
                                mc.Id = oRestDetail.Id;
                                mc.Name = oRestDetail.Name;
                                mc.LevelNo = oRestDetail.LevelNo;
                                mc.ParentId = oRestDetail.ParentId;
                                mc.Icon = oRestDetail.Icon;
                                mc.Url = oRestDetail.Url;
                                lMC.Add(mc);
                            }
                        }
                        m.Child = lMC;
                        menuList.Add(m);
                    }
                }
                return View(menuList);
            }
            else
            {
                return RedirectToAction("Login", "Account");
            }
        }

        public ActionResult Landing()
        {
            return View();
        }

        public ActionResult Store()
        {
            return View();
        }

        public ActionResult Forecast()
        {
            return View();
        }
        public ActionResult Target()
        {
            return View();
        }
        public ActionResult Plan()
        {
            return View();
        }
        public ActionResult PriceBand()
        {
            return View();
        }
        public ActionResult StockAgeBand()
        {
            return View();
        }
        public ActionResult Footfall()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Footfall(HttpPostedFileBase postedFile)
        {
            string filePath = string.Empty;
            if (postedFile != null)
            {
                string path = Server.MapPath("~/Uploads/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                filePath = path + Path.GetFileName(postedFile.FileName);
                string extension = Path.GetExtension(postedFile.FileName);
                postedFile.SaveAs(filePath);

                string conString = string.Empty;
                switch (extension)
                {
                    case ".xls": //Excel 97-03.
                        conString = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
                        break;
                    case ".xlsx": //Excel 07 and above.
                        conString = ConfigurationManager.ConnectionStrings["Excel07ConString"].ConnectionString;
                        break;
                }

                DataTable dt = new DataTable();
                conString = string.Format(conString, filePath);

                using (OleDbConnection connExcel = new OleDbConnection(conString))
                {
                    using (OleDbCommand cmdExcel = new OleDbCommand())
                    {
                        using (OleDbDataAdapter odaExcel = new OleDbDataAdapter())
                        {
                            cmdExcel.Connection = connExcel;

                            //Get the name of First Sheet.
                            connExcel.Open();
                            DataTable dtExcelSchema;
                            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                            //string sheetName = dtExcelSchema.Rows[0]["Sheet1$"].ToString();
                            connExcel.Close();

                            //Read Data from First Sheet.
                            connExcel.Open();
                            cmdExcel.CommandText = "SELECT * From [Sheet1$]";
                            odaExcel.SelectCommand = cmdExcel;
                            odaExcel.Fill(dt);
                            connExcel.Close();
                        }
                    }
                }

                conString = ConfigurationManager.ConnectionStrings["Constring"].ConnectionString;
                using (SqlConnection con = new SqlConnection(conString))
                {
                    using (SqlBulkCopy sqlBulkCopy = new SqlBulkCopy(con))
                    {
                        //Set the database table name.
                        sqlBulkCopy.DestinationTableName = "dbo.STG_STR_FOOTFALL";

                        //[OPTIONAL]: Map the Excel columns with that of the database table
                        //sqlBulkCopy.ColumnMappings.Add("Id", "CustomerId");
                        //sqlBulkCopy.ColumnMappings.Add("Name", "Name");
                        //sqlBulkCopy.ColumnMappings.Add("Country", "Country");

                        con.Open();
                        sqlBulkCopy.WriteToServer(dt);
                        con.Close();
                        ViewData["message"] = "Record successfully Inserted";
                        
                    }
                }
            }
            
           // return Redirect("/Apps/Index/footfall");
            return View();


        }
        public ActionResult UserMenu() {
            return View();
        }

        public  ActionResult User()
        {
            return View();
        }

        public ActionResult StoreMerchant()
        {
            return View();
        }
        public ActionResult StoreMerch()
        {
            return View();
        }
    }
}