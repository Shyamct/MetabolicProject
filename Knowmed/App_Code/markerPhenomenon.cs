using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DLL_MarkerPhenomenon;
using Newtonsoft.Json;

/// <summary>
/// Summary description for markerPhenomenon
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class markerPhenomenon : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string getMarker(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_markerPhenomenon pobj = new PAL_markerPhenomenon();
        pobj.who = empid;


        BAL_markerPhenomenon.getMarker(pobj);
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
    public string getPathway(string empid,int markerID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_markerPhenomenon pobj = new PAL_markerPhenomenon();
        pobj.who = empid;
       pobj.markerID = markerID;

        BAL_markerPhenomenon.getPathway(pobj);
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
    public string getPhenomenonReport(string empid, int markerID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_markerPhenomenon pobj = new PAL_markerPhenomenon();
        pobj.who = empid;
        pobj.markerID = markerID;

        BAL_markerPhenomenon.getPhenomenonReport(pobj);
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
