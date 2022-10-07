using DLLLogin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for Login
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Login : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string checkLogin(string mobileNo, string password)
    {
        PAL_Login pobj = new PAL_Login();
        pobj.mobileNo = mobileNo;
        pobj.password = password;
        BAL_Login.checkLogin(pobj);
        string str;
        if (!pobj.isException)
        {
            if (pobj.DS.Tables.Count > 0 && pobj.DS.Tables[0].Rows.Count > 0)
            {
                HttpContext.Current.Session["accessToken"] = (object)pobj.DS.Tables[0].Rows[0]["Token"].ToString();
                HttpContext.Current.Session["userID"] = (object)pobj.DS.Tables[1].Rows[0]["userID"].ToString();
                HttpContext.Current.Session["userName"] = (object)pobj.DS.Tables[1].Rows[0]["userName"].ToString();
                
                str = JsonConvert.SerializeObject((object)new
                {
                    responseCode = 1,
                    responseMessage = "Success"
                });
            }
            else
                str = JsonConvert.SerializeObject((object)new
                {



                    responseCode = 0,
                    responseMessage = "Invalid username or password."
                });
        }
        else
        {
            HttpContext.Current.Response.StatusCode = 404;
            str = pobj.exceptionMessage;
        }
        return str;
    }
}
