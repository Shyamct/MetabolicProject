using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using DAL_nutrientChart;

/// <summary>
/// Summary description for nutrientChart
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class nutrientChart : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string saveChartData(string empid,int pathwayID,string images,string nutrientID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_nutrientChart pobj = new PAL_nutrientChart();
        pobj.who = empid;
        pobj.pathwayID = pathwayID;
        pobj.images = images;
        pobj.nutrientID = nutrientID;


        BAL_nutrientChart.insertChart(pobj);
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
    public string getChartData(string empid,int pathwayID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_nutrientChart pobj = new PAL_nutrientChart();
        pobj.who = empid;
        pobj.pathwayID = pathwayID;


        BAL_nutrientChart.getChart(pobj);
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
