using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using DLL_DiseaseTimeline;
using Newtonsoft.Json;


/// <summary>
/// Summary description for diseaseTimeline
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class diseaseTimeline : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string getDropdownHeader(string empid)
    {
        if (empid == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_diseaseTimeline pobj = new PAL_diseaseTimeline();
        pobj.who = empid;
        BAL_diseaseTimeline.getDropdownHeader(pobj);
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
    public string getPROCESS(string empid, string pathwayIdList)
    {
        if (empid == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_diseaseTimeline pobj = new PAL_diseaseTimeline();
        pobj.who = empid;
        pobj.pathwayIdList = pathwayIdList;
        BAL_diseaseTimeline.getPROCESS(pobj);
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
    public string getReport(string pathwayIdList, string rankList, string gender, string age, string ageUnit, string empid )
    {
        if (empid == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_diseaseTimeline pobj = new PAL_diseaseTimeline();
        pobj.who = empid;
        pobj.pathwayIdList = pathwayIdList;
        pobj.rankList = rankList;
        pobj.gender = Convert.ToInt32(gender);
        pobj.age = Convert.ToInt32(age);
        pobj.ageUnit = ageUnit;
      //  pobj.process = process;

        BAL_diseaseTimeline.getReport(pobj);
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
    public string getFoodName(int interactedNutrientID, string empid)
    {
        if (empid == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_diseaseTimeline pobj = new PAL_diseaseTimeline();
        pobj.who = empid;
        pobj.interactedNutrientID = interactedNutrientID;
       
        BAL_diseaseTimeline.getFoodName(pobj);
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
