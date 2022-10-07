using DLLSignalingCascade1;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;


/// <summary>
/// Summary description for signalingCascade1
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class signalingCascade1 : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string getDisease(string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade1 pobj = new PAL_SignalingCascade1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_SignalingCascade1.getDisease(pobj);
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
    public string getsignalingCascade(string diseaseID, string pageIndex, string pageSize, string processID, string signalingID, string foodFamily, string interactedNutrient, string cascadeNutrient, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade1 pobj = new PAL_SignalingCascade1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.pageIndex = Convert.ToInt32(pageIndex);
        pobj.pageSize = Convert.ToInt32(pageSize);
        pobj.processID = Convert.ToInt32(processID);
        pobj.signalingID = Convert.ToInt32(signalingID);
        pobj.foodFamily = foodFamily;
        pobj.interactedNutrient = interactedNutrient;
        pobj.cascadeNutrient = cascadeNutrient;
        BAL_SignalingCascade1.getSignalingCascade(pobj);
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
    public string getFood(string foodFamilyID, string nutrientID, string status, string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade1 pobj = new PAL_SignalingCascade1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodFamilyID = Convert.ToInt32(foodFamilyID);
        pobj.nutrientID = Convert.ToInt32(nutrientID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.status = status;
        BAL_SignalingCascade1.getFood(pobj);
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
    public string getFoodDetails(string foodID, string diseaseID, string processID, string signalingID, string foodFamily, string interactedNutrient, string cascadeNutrient, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade1 pobj = new PAL_SignalingCascade1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodID = Convert.ToInt32(foodID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.processID = Convert.ToInt32(processID);
        pobj.signalingID = Convert.ToInt32(signalingID);
        pobj.foodFamily = foodFamily;
        pobj.interactedNutrient = interactedNutrient;
        pobj.cascadeNutrient = cascadeNutrient;
        BAL_SignalingCascade1.getFoodDetails(pobj);
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
    public string getFoodFamilyDetails(string foodFamilyID, string diseaseID, string processID, string signalingID, string foodFamily, string interactedNutrient, string cascadeNutrient, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade1 pobj = new PAL_SignalingCascade1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodFamilyID = Convert.ToInt32(foodFamilyID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.processID = Convert.ToInt32(processID);
        pobj.signalingID = Convert.ToInt32(signalingID);
        pobj.foodFamily = foodFamily;
        pobj.interactedNutrient = interactedNutrient;
        pobj.cascadeNutrient = cascadeNutrient;
        BAL_SignalingCascade1.getFoodFamilyDetails(pobj);
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
