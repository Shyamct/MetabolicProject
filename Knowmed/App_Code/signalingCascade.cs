using DLLSignalingCascade;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;


/// <summary>
/// Summary description for signalingCascade
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class signalingCascade : System.Web.Services.WebService
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
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_SignalingCascade.getDisease(pobj);
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
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.process = Convert.ToInt32(jdv["process"]);
        pobj.receptorID = Convert.ToInt32(jdv["receptorID"]);
        pobj.cascadeNutrient = jdv["cascadeNutrient"];
        pobj.interactedNutrient = jdv["interactedNutrient"];
        pobj.foodFamily = jdv["foodFamily"];
        pobj.pathwayId = Convert.ToInt32(jdv["pathwayId"]);
        pobj.cascadeName = jdv["cascadeName"];
        BAL_SignalingCascade.getSignalingCascade(pobj);
         
        string str;
       
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
                responseMessage = "Success"
            });
            //StringBuilder sb = new StringBuilder();
            //StringWriter sw = new StringWriter(sb);
            //using (JsonWriter writer = new JsonTextWriter(sw))

            //{
            //  //  var serializer = new JsonSerializer();
            //    str  = JsonConvert.SerializeObject((object)new
            //    {
            //        responseCode = 1,
            //        responseValue = pobj.DS,
            //        responseMessage = "Success"
            //    });
            //}
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
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.nutrientID = Convert.ToInt32(nutrientID);
        BAL_SignalingCascade.getNutrientFunction(pobj);
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
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodFamilyID = Convert.ToInt32(foodFamilyID);
        pobj.nutrientID = Convert.ToInt32(nutrientID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        BAL_SignalingCascade.getFood(pobj);
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
    public string getFoodDetails(string foodID, string diseaseID, string cascadeNutrient, string isFiltered, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.foodID = Convert.ToInt32(foodID);
        pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.cascadeNutrient = cascadeNutrient;
        pobj.isFiltered = Convert.ToInt32(isFiltered);
        BAL_SignalingCascade.getFoodDetails(pobj);
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
    public string getFoodFamilyDetails(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.foodFamilyID = Convert.ToInt32(jdv["foodFamilyID"]);        
        pobj.process = Convert.ToInt32(jdv["process"]);
        pobj.receptorID = Convert.ToInt32(jdv["receptorID"]);
        pobj.cascadeNutrient = jdv["cascadeNutrient"];
        pobj.isFiltered = Convert.ToInt32(jdv["isFiltered"]);
        BAL_SignalingCascade.getFoodFamilyDetails(pobj);
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
    public string getFoods(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.foodGroupID = Convert.ToInt32(jdv["foodGroupID"]);
        BAL_SignalingCascade.getFoods(pobj);
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
    public string getFoodReport(string dataArray, string empid) 
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.foodFamily = jdv["foodFamily"];
        BAL_SignalingCascade.getFoodReport(pobj);
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
    public string getFoodNutrientList(string diseaseID, string empid) 
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();        
        pobj.diseaseID = Convert.ToInt32(diseaseID);
       
        BAL_SignalingCascade.getFoodNutrientList(pobj);
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
    public string getMarkerDetail(string cascadeName, string empid) 
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();        
        pobj.cascadeName = cascadeName;
        BAL_SignalingCascade.getMarkerDetail(pobj);
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

    //[WebMethod(EnableSession = true)]
    //public string getResearchPaper(string cascadeName, string pathwayId, string empid) 
    //{
    //    //if (HttpContext.Current.Session["empid"] == null)
    //    if (empid == null)
    //    {
    //        HttpContext.Current.Response.StatusCode = 401;
    //        return "Invalid user";
    //    }
    //    PAL_SignalingCascade pobj = new PAL_SignalingCascade();
    //    pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();        
    //    pobj.cascadeName = cascadeName;
    //    pobj.pathwayId = Convert.ToInt32(pathwayId);
    //    BAL_SignalingCascade.getResearchPaper(pobj);
    //    string str;
    //    if (!pobj.isException)
    //    {
    //        str = JsonConvert.SerializeObject((object)new
    //        {
    //            responseCode = 1,
    //            responseValue = pobj.DS,
    //            responseMessage = "Success"
    //        });
    //    }
    //    else
    //    {
    //        HttpContext.Current.Response.StatusCode = 404;
    //        str = pobj.exceptionMessage;
    //    }
    //    return str;
    //}
    [WebMethod(EnableSession = true)]
    public string getDocking(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.process = Convert.ToInt32(jdv["process"]);
        pobj.receptorID = Convert.ToInt32(jdv["receptorID"]);
        pobj.cascadeNutrient = jdv["cascadeNutrient"];
        pobj.interactedNutrient = jdv["interactedNutrient"];
        pobj.foodFamily = jdv["foodFamily"];
        pobj.pathwayId = Convert.ToInt32(jdv["pathwayId"]);
        pobj.cascadeName = jdv["cascadeName"];
        BAL_SignalingCascade.getDocking(pobj);

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
    public string getNutrientListFood(string empid, int foodIDS)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();        
                          // pobj.diseaseID = Convert.ToInt32(diseaseID);
        pobj.foodIDS = foodIDS;

        BAL_SignalingCascade.getNutrientListFood(pobj);
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
    public string getOilSignalingCascade(string dataArray, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SignalingCascade pobj = new PAL_SignalingCascade();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataArray);
        pobj.diseaseID = Convert.ToInt32(jdv["diseaseID"]);
        pobj.process = Convert.ToInt32(jdv["process"]);
        pobj.receptorID = Convert.ToInt32(jdv["receptorID"]);
        pobj.cascadeNutrient = jdv["cascadeNutrient"];
        pobj.interactedNutrient = jdv["interactedNutrient"];
        pobj.foodFamily = jdv["foodFamily"];
        pobj.pathwayId = Convert.ToInt32(jdv["pathwayId"]);
        pobj.cascadeName = jdv["cascadeName"];
        BAL_SignalingCascade.getOilSignalingCascade(pobj);

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
