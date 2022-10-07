using DLLActivitiesApproval;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for ActivitiesApproval
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ActivitiesApproval : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string getDiseasePathway(string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();
        pobj.userID = Convert.ToInt32(userID);
        BAL_ActivitiesApproval.getDiseasePathway(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS.Tables[0],
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
    public string getActivitiesForApproval(string pathwayId, string approveStatus, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();
        pobj.userID = Convert.ToInt32(userID);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.approveStatus = Convert.ToInt32(approveStatus);
        BAL_ActivitiesApproval.getActivitiesForApproval(pobj);
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
    public string getPathwayCompnents(string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();
        pobj.userID = Convert.ToInt32(userID);
        
        BAL_ActivitiesApproval.getPathwayCompnents(pobj);
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
    public string allowPathwayComponent(string arrObj, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(arrObj);        
        pobj.id = Convert.ToInt32(jdv["id"]);
        pobj.referenceID = Convert.ToInt32(jdv["referenceID"]);        
        pobj.approveStatus = Convert.ToInt32(jdv["approveStatus"]);
        pobj.activityName = jdv["activityName"];
        pobj.userID = Convert.ToInt32(userID);
        BAL_ActivitiesApproval.allowPathwayComponent(pobj);
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
    public string savePDF(string pathwayId, string fileName, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.fileName = fileName;
        pobj.userID = Convert.ToInt32(userID);
        BAL_ActivitiesApproval.savePDF(pobj);
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
    public string getAllPDF(string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();     
        pobj.userID = Convert.ToInt32(userID);
        BAL_ActivitiesApproval.getAllPDF(pobj);
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
    //'keyword': '" + nodedata.text + "','pathwayId':'" + pathwayId + "','phenomenonId':'" + nodedata.group + "','empid':'" + userLoginID + 
    public string funBreakLoop(string pathwayId, string fileName, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_ActivitiesApproval pobj = new PAL_ActivitiesApproval();
        pobj.pathwayId = Convert.ToInt32(pathwayId);
      
        pobj.userID = Convert.ToInt32(userID);
        BAL_ActivitiesApproval.funBreakLoop(pobj);
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
