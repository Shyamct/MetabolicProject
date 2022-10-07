using DLLDiseaseNutrientCascade;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for diseaseNutrientCascadeReport
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class diseaseNutrientCascadeReport : System.Web.Services.WebService
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
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_DiseaseNutrientCascadeReport.getDisease(pobj);
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
    public string getNutrient(string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        //pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.diseaseIDs = diseaseID;
        BAL_DiseaseNutrientCascadeReport.getNutrient(pobj);
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
    public string getNutrientFunctionReport(string diseaseID, string rankNo, string nutrientID, string phenomenonID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();        
        pobj.diseaseIDs = diseaseID;
        pobj.rankNo = rankNo;
        pobj.nutrientID = Convert.ToInt32(nutrientID);
        pobj.phenomenonID = Convert.ToInt32(phenomenonID);
        BAL_DiseaseNutrientCascadeReport.getNutrientFunctionReport(pobj);
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
    public string getNutrientDetail(string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        BAL_DiseaseNutrientCascadeReport.getNutrientDetail(pobj);
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
    public string getFood(string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        BAL_DiseaseNutrientCascadeReport.getFood(pobj);
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
    public string getNutrientAndFoodReport(string diseaseID, string foodID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.foodID = Convert.ToInt32(foodID);
        BAL_DiseaseNutrientCascadeReport.getNutrientAndFoodReport(pobj);
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
    public string getPathwayList(string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();       
        BAL_DiseaseNutrientCascadeReport.getPathwayList(pobj);
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
    public string getPhenomenonList(string diseaseID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        BAL_DiseaseNutrientCascadeReport.getPhenomenonList(pobj);
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
    public string getPathwayFAQReport(string diseaseID, string phenomenonID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.phenomenonID = Convert.ToInt32(phenomenonID);
        BAL_DiseaseNutrientCascadeReport.getPathwayFAQReport(pobj);
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
    public string getCascadeReport(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.roleType = jdv["roleType"];
        pobj.interactionPresent = Convert.ToInt32(jdv["interactionPresent"]);
        pobj.interactionTypeID = Convert.ToInt32(jdv["interactionTypeID"]);
        pobj.rankNo = jdv["rankNo"];
        BAL_DiseaseNutrientCascadeReport.getCascadeReport(pobj);
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
    public string getInteractedNutreintReport(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.interactionType = jdv["interactionType"];
        pobj.interactionTypeID = Convert.ToInt32(jdv["interactionTypeID"]);
        BAL_DiseaseNutrientCascadeReport.getInteractedNutreintReport(pobj);
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
    public string getMedication(string PID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pid = Convert.ToInt32(PID);
        BAL_DiseaseNutrientCascadeReport.getMedication(pobj);
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
    public string getDiseaseList(string pid, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pid = Convert.ToInt32(pid);
        BAL_DiseaseNutrientCascadeReport.getDiseaseList(pobj);
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
    public string getProcessList(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseIDs = jdv["diseaseIDs"];
        BAL_DiseaseNutrientCascadeReport.getProcessList(pobj);
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
    public string getCentralMoleculeList(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseIDs = jdv["diseaseIDs"];
        pobj.process = jdv["process"];
        BAL_DiseaseNutrientCascadeReport.getCentralMoleculeList(pobj);
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
    public string getCentralMoleculeReport(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();


        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseIDs = jdv["diseaseIDs"];
        pobj.process = jdv["process"];
        pobj.cascadeNutrient = jdv["cascadeNutrient"];
        BAL_DiseaseNutrientCascadeReport.getCentralMoleculeReport(pobj);
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
    public string getMarkerDietReport(string pid, string diseaseIDs, string process, string receptorIds, string intakeDate, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();

       
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pid = Convert.ToInt32(pid);
        pobj.diseaseIDs = diseaseIDs;
        pobj.receptorIds = receptorIds;
        pobj.process = process;
        pobj.intakeDate = Convert.ToDateTime(intakeDate);
       // pobj.interactedNutrientID = interactedNutrientID;
        BAL_DiseaseNutrientCascadeReport.getMarkerDietReport(pobj);
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
    public string getMarkerDiet(string diseaseIDs, string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.cascadeNutrient = markerName;
        pobj.diseaseIDs = diseaseIDs;
        BAL_DiseaseNutrientCascadeReport.getMarkerDiet(pobj);
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
    public string getMarkerDietGraph(string pid, string intakeDate, string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pid = Convert.ToInt32(pid);
        pobj.cascadeNutrient = markerName;
        pobj.intakeDate = Convert.ToDateTime(intakeDate);
        BAL_DiseaseNutrientCascadeReport.getMarkerDietGraph(pobj);
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
    public string getRdaGraph(string pid, string intakeDate, string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pid = Convert.ToInt32(pid);
        pobj.cascadeNutrient = markerName;
        pobj.intakeDate = Convert.ToDateTime(intakeDate);
        BAL_DiseaseNutrientCascadeReport.getRdaGraph(pobj);
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
    public string getEndResult(string diseaseIDs, string receptorIds, string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseIDs = diseaseIDs;
        pobj.receptorIds = receptorIds;
        pobj.cascadeNutrient = markerName;
        BAL_DiseaseNutrientCascadeReport.getEndResult(pobj);
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
    public string getPhenomenon(string diseaseIDs, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.diseaseIDs = diseaseIDs;
        BAL_DiseaseNutrientCascadeReport.getPhenomenon(pobj);
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
    public string getPageInfo(string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_DiseaseNutrientCascadeReport.getPageInfo(pobj);
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
    public string moleculeDietActivatorInitControls(string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_DiseaseNutrientCascadeReport.moleculeDietActivatorInitControls(pobj);
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
    public string getAllFood(string pid, string cascadeNutrient, string intakeDate, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pid = Convert.ToInt32(pid);
        pobj.cascadeNutrient = cascadeNutrient;
        pobj.intakeDate = Convert.ToDateTime(intakeDate);
        BAL_DiseaseNutrientCascadeReport.getAllFood(pobj);
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
    public string getMarkerData(string diseaseIDs, string cascadeNutrient, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_DiseaseNutrientCascadeReport pobj = new PAL_DiseaseNutrientCascadeReport();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.cascadeNutrient = cascadeNutrient;
        pobj.diseaseIDs = diseaseIDs;
        BAL_DiseaseNutrientCascadeReport.getMarkerData(pobj);
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
