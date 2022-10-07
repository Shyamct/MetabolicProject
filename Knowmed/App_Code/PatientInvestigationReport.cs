using DLLPatientInvestigationReport;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for PatientInvestigationReport
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PatientInvestigationReport : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string getPatientInvestigationReport(string pid, string fromDate, string toDate, string categoryID, string empid)
    {
        PAL_PatientInvestigationReport pobj = new PAL_PatientInvestigationReport();
        pobj.who = empid; 
        pobj.pid = pid;
        pobj.fromDate = fromDate;
        pobj.toDate = toDate;
        pobj.categoryID = Convert.ToInt32(categoryID);
        BAL_PatientInvestigationReport.getPatientInvestigationReport(pobj);
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
    public string getAllCategory(string empid)
    {
        PAL_PatientInvestigationReport pobj = new PAL_PatientInvestigationReport();
        pobj.who = empid;      
        BAL_PatientInvestigationReport.getAllCategory(pobj);
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
    public string getDiet(string keyword, string pathwayid, string empid)
    {
        PAL_PatientInvestigationReport pobj = new PAL_PatientInvestigationReport();
        pobj.who = empid;
        pobj.nutrientName = keyword;
        pobj.diseaseID = Convert.ToInt32(pathwayid);
        BAL_PatientInvestigationReport.getDiet(pobj);
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
