using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DLLMarkerRoleMatrix;
using Newtonsoft.Json;


/// <summary>
/// Summary description for markerRoleMatrix
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class markerRoleMatrix : System.Web.Services.WebService {


    [WebMethod(EnableSession = true)]
    public string getNutrientHeader(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_MarkerRoleMatrix pobj = new PAL_MarkerRoleMatrix();
        pobj.who = empid;
        

        BAL_markerRoleMatrix.getNutrientHeader(pobj);
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
    public string getPhenomenons(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_MarkerRoleMatrix pobj = new PAL_MarkerRoleMatrix();
        pobj.who = empid;
       // pobj.PhenomenonID = PhenomenonID; 

        BAL_markerRoleMatrix.getPhenomenons(pobj);
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
    public string getMarkerRoleMatrixReport(string empid, int nutrientID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_MarkerRoleMatrix pobj = new PAL_MarkerRoleMatrix();
        pobj.who = empid;
        pobj.nutrientID = nutrientID;


        BAL_markerRoleMatrix.getMarkerRoleMatrixReport(pobj);
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
    public string getPhenomenonRoleMatrixReport(string empid, int processID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_MarkerRoleMatrix pobj = new PAL_MarkerRoleMatrix();
        pobj.who = empid;
        pobj.processID = processID;


        BAL_markerRoleMatrix.getPhenomenonRoleMatrixReport(pobj);
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
