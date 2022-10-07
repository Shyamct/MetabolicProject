using DLLCascade;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;


/// <summary>
/// Summary description for cascade
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class cascade : System.Web.Services.WebService
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
        PAL_Cascade pobj = new PAL_Cascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_Cascade.getDisease(pobj);
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
    public string getSignalingCascade(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_Cascade pobj = new PAL_Cascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.process = Convert.ToInt32(jdv["process"]);
        pobj.receptorID = Convert.ToInt32(jdv["receptorID"]);
        pobj.cascadeNutrient = jdv["cascadeNutrient"];
        pobj.interactedNutrient = jdv["interactedNutrient"];
        pobj.foodFamily = jdv["foodFamily"];
        BAL_Cascade.getSignalingCascade(pobj);
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
    public string getNutrientFunction(string nutrientID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_Cascade pobj = new PAL_Cascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.nutrientID = Convert.ToInt32(nutrientID);
        BAL_Cascade.getNutrientFunction(pobj);
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
    public string getFood(string foodFamilyID, string nutrientID, string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_Cascade pobj = new PAL_Cascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodFamilyID = Convert.ToInt32(foodFamilyID);
        pobj.nutrientID = Convert.ToInt32(nutrientID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        BAL_Cascade.getFood(pobj);
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
    public string getFoodDetails(string foodID, string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_Cascade pobj = new PAL_Cascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodID = Convert.ToInt32(foodID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        BAL_Cascade.getFoodDetails(pobj);
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
    public string getFoodFamilyDetails(string foodFamilyID, string diseaseID, string cascadeNutrient, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_Cascade pobj = new PAL_Cascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodFamilyID = Convert.ToInt32(foodFamilyID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.cascadeNutrient = cascadeNutrient;
        BAL_Cascade.getFoodFamilyDetails(pobj);
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
