using DLLUserRegistration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for userRegistration
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class userRegistration : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string registerUser(string userName, string mobileNo, string password, string emailID, string address, string cityID, string countryID, string profession)
    {
        PAL_UserRegistration pobj = new PAL_UserRegistration();
        pobj.userName = userName;
        pobj.mobileNo = mobileNo;
        pobj.password = password;
        pobj.emailID = emailID;
        pobj.address = address;
        pobj.cityID = Convert.ToInt32(cityID);
        pobj.countryID = Convert.ToInt32(countryID);
        pobj.profession = profession;
        BAL_UserRegistration.insertUserRegistration(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseMessage = "Success"
            });
        }
        else
        {
            HttpContext.Current.Response.StatusCode = 404;
            str = pobj.exceptionMessage;
        }
        return str;
    }

    [WebMethod(EnableSession = true)]
    public string assignPathwayUser(PAL_UserRegistration pobj)
    {
        BAL_UserRegistration.assignPathwayUser(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseMessage = "Success"
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
