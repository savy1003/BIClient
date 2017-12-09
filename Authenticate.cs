using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace bi.Controllers
{
    public class Authenticate : ApiController
    {
        [HttpGet]
        public string Login()
        {
            return "test Api";
        }
    }
}