using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DAL_eraHypothesisMarker;
using Newtonsoft.Json;

/// <summary>
/// Summary description for eraHypothesisMarker
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class eraHypothesisMarker : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string getDiseaseWiseHypothesisReport(string empid,string diseaseID,int processID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_eraHypothesisMarker pobj = new PAL_eraHypothesisMarker();
        pobj.who = empid;
        pobj.diseaseID = diseaseID;
        pobj.processID = processID;


        BAL_eraHypothesisMarker.getDiseaseWiseHypothesis(pobj);
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
    public string getALLDiseaseWiseHypothesisReport(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_eraHypothesisMarker pobj = new PAL_eraHypothesisMarker();
        pobj.who = empid;
       


        BAL_eraHypothesisMarker.getALLDiseaseWiseHypothesis(pobj);
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
