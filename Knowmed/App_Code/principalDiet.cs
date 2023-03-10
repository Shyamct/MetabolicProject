using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using DLL_principalDiet;
using Newtonsoft.Json;


/// <summary>
/// Summary description for principalDiet
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class principalDiet : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string getNutrientList(string empid,int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_principalDiet pobj = new PAL_principalDiet();
        pobj.who = empid;
        pobj.pathwayID = pathwayID;
        

        BAL_principalDiet.getNutrientList(pobj);
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
    public string getDiet(string empid, string nutrientName, int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_principalDiet pobj = new PAL_principalDiet();
        pobj.who = empid;
        pobj.nutrientName = nutrientName;
        pobj.pathwayID = pathwayID;

        BAL_principalDiet.getDiet(pobj);
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
    public string getPIDDiet(string empid, int nutrientID, int PID,int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_principalDiet pobj = new PAL_principalDiet();
        pobj.who = empid;
        pobj.nutrientID = nutrientID;
        pobj.PID = PID;
        pobj.pathwayID = pathwayID;

        BAL_principalDiet.getDietByPID(pobj);
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
    public string getProcessList(string empid, int pathwayID,string nutrientName,int intractedNutrientID,string statusFor,string roleType)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_principalDiet pobj = new PAL_principalDiet();
        pobj.who = empid;
        pobj.pathwayID = pathwayID;
        pobj.nutrientName = nutrientName;
        pobj.intractedNutrientID = intractedNutrientID;
        pobj.statusFor = statusFor;
        pobj.roleType = roleType;



        BAL_principalDiet.getProcess(pobj);
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
    public string getOnlyProcessName(string empid, int nutrientID, int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_principalDiet pobj = new PAL_principalDiet();
        pobj.who = empid;
        pobj.nutrientID = nutrientID;
        pobj.pathwayID = pathwayID;

        BAL_principalDiet.getOnlyProcessName(pobj);
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
