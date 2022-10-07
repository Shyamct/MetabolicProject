using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DLL_AssignUser;
using  Newtonsoft.Json;

/// <summary>
/// Summary description for assignUser
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class assignUser : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string getUserDisease(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_UserDisease pobj = new PAL_UserDisease();
        pobj.who = empid;

        BAL_UserDisease.getUserVDisease(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
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
    public string seveDisease(string empid,int userID, string FinalArray)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_UserDisease pobj = new PAL_UserDisease();
        pobj.who = empid;
        pobj.UserID = userID;
        pobj.FinalArray = FinalArray;


        BAL_UserDisease.seveUserDisease(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
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
    public string showUserDiseaseList(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_UserDisease pobj = new PAL_UserDisease();
        pobj.who = empid;

        BAL_UserDisease.showUserDiseaseList(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
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
    public string deleteUserAssignDisease(string empid, int UserID, int diseaseID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_UserDisease pobj = new PAL_UserDisease();
        pobj.who = empid;
        //pobj.status = status;
        pobj.UserID = UserID;
        pobj.diseaseID = diseaseID;

        BAL_UserDisease.deleteUserDisease(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
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
