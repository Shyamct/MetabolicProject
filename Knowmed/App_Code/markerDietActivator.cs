using DLLMarkerDietActivator;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Web;
using System.Web.Services;
/// <summary>
/// Summary description for markerDietActivator
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class markerDietActivator : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
  
      public string getNutrientReport(string userID,int foodID,string diseaseIds)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_MarkerDietActivator pobj = new PAL_MarkerDietActivator();

        pobj.who = userID;
        pobj.foodID = foodID;
        pobj.diseaseIds = diseaseIds;
        //pobj.nutrientName = nutrientName;
        //pobj.interactedNutrientName = interactedNutrientName;
        //pobj.nutrientValue = nutrientValue;
        //pobj.effect = effect;
        

        BAL_MarkerDietActivator.getNutrientReport(pobj);
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
    public string getFoodReportToEat(string userID, int foodID, string diseaseIds)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_MarkerDietActivator pobj = new PAL_MarkerDietActivator();
        pobj.who = userID;
        pobj.foodID = foodID;
        pobj.diseaseIds = diseaseIds;
        BAL_MarkerDietActivator.getFoodReportToEat(pobj);
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
    public string getNutrientNotToEat(string userID, string diseaseIds, string interactedNutrientName)
    {

        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_MarkerDietActivator pobj = new PAL_MarkerDietActivator();
        pobj.who = userID;
        pobj.diseaseIds = diseaseIds;
        pobj.interactedNutrientName = interactedNutrientName;
        BAL_MarkerDietActivator.getNutrientNotToEat(pobj);
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

    //----------------------
    [WebMethod(EnableSession = true)]
    public string getNutrientToEat(string userID, string diseaseIds, string interactedNutrientName)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_MarkerDietActivator pobj = new PAL_MarkerDietActivator();
        pobj.who = userID;
        pobj.diseaseIds = diseaseIds;
        pobj.interactedNutrientName = interactedNutrientName;
        BAL_MarkerDietActivator.getNutrientToEat(pobj);
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
