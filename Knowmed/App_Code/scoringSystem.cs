using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Services;
using System.Web.Script.Serialization;
using DAL_scoringSystem;





/// <summary>
/// Summary description for bestMarkerForDiet
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class bestMarkerForDiet : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string getPathway(int empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_scoringSystem pobj = new PAL_scoringSystem();
        pobj.userID = empid;

        BAL_scoringSystem.getHeader(pobj);
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
    public string getProcess(int empid, int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_scoringSystem pobj = new PAL_scoringSystem();

        pobj.userID = empid;
        pobj.pathwayID = pathwayID;

        BAL_scoringSystem.getAllProcess(pobj);
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
    public string getReport(int empid,int pathwayID,string processID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_scoringSystem pobj = new PAL_scoringSystem();
       
        pobj.userID = empid;
        pobj.pathwayID = pathwayID;
        pobj.processID = processID;

        BAL_scoringSystem.getFinalReport(pobj);
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
    public string getNurientIntruction(int empid, int nutrientID,int processIDINT,int pathwayID,int finalMarkerScore)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_scoringSystem pobj = new PAL_scoringSystem();
        pobj.userID = empid;
        pobj.nutrientID = nutrientID;
        pobj.processIDINT = processIDINT;
        pobj.pathwayID = pathwayID;
        pobj.finalMarkerScore = finalMarkerScore;

        BAL_scoringSystem.getIntructionNutrient(pobj);
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
    public string getFoodlist(int empid, int interactedNutrientID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_scoringSystem pobj = new PAL_scoringSystem();
        pobj.userID = empid;
        pobj.interactedNutrientID = interactedNutrientID;
        

        BAL_scoringSystem.getFood(pobj);
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
    public string getOnlyScore(int empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_scoringSystem pobj = new PAL_scoringSystem();
        pobj.userID = empid;

        BAL_scoringSystem.getOnlyScore(pobj);
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
    public string updateScore(int empid,string rankName, int score,int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_scoringSystem pobj = new PAL_scoringSystem();
        pobj.userID = empid;
        pobj.rankName = rankName;
        pobj.score = score;
        pobj.pathwayID = pathwayID;

        BAL_scoringSystem.updateScore(pobj);
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
