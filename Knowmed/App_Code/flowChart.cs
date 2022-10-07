using DLLFlowchart;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for flowChart
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class flowChart : System.Web.Services.WebService
{

	[WebMethod(EnableSession = true)]
	public string getFlowchartDetails(int pathwayId, string empid)
	{
		//if (HttpContext.Current.Session["empid"] == null)
            if (empid == null)
            {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_FlowChart pobj = new PAL_FlowChart();
		pobj.pathwayId = pathwayId;
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_FlowChart.getFlowchartDetails(pobj);
		string str;
		if (!pobj.isException)
		{
			str = pobj.DS.Tables.Count <= 0 || pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
			{
				responseCode = 0,
				responseValue = pobj.DS,
				responseMessage = "Success"
			}) : JsonConvert.SerializeObject((object)new
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
	public string insertNewNode(string dataValue, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_FlowChart pobj = new PAL_FlowChart();
		pobj.userid = Convert.ToInt32("1");
		BAL_FlowChart.InsertFlowchartDetails(pobj);
		string str;
		if (!pobj.isException)
		{
			str = JsonConvert.SerializeObject((object)new
			{
				responseCode = 1,
				responseValue = pobj.DS.Tables[0],
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
		PAL_FlowChart pobj = new PAL_FlowChart();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        
        BAL_FlowChart.getPathwayList(pobj);
		string str;
		if (!pobj.isException)
		{
			str = pobj.DS.Tables.Count <= 0 || pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
			{
				responseCode = 0,
				responseValue = pobj.DS,
				responseMessage = "Success"
			}) : JsonConvert.SerializeObject((object)new
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
	public string deleteFlowchartDetails(string id, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_FlowChart pobj = new PAL_FlowChart();
		pobj.id = Convert.ToInt32(id);
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_FlowChart.deleteFlowchartDetails(pobj);
		string str;
		if (!pobj.isException)
		{
			str = JsonConvert.SerializeObject((object)new
			{
				responseCode = 1,
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
	public string UpdateFlowchartDetails(string id, string keyId, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_FlowChart pobj = new PAL_FlowChart();
		pobj.id = Convert.ToInt32(id);
		pobj.keyid = Convert.ToInt32(keyId);
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_FlowChart.UpdateFlowchartDetails(pobj);
		string str;
		if (!pobj.isException)
		{
			str = JsonConvert.SerializeObject((object)new
			{
				responseCode = 1,
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
	public string getKeyword(string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_FlowChart pobj = new PAL_FlowChart();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_FlowChart.getKeyword(pobj);
		string str;
		if (!pobj.isException)
		{
			str = JsonConvert.SerializeObject((object)new
			{
				responseCode = 1,
				responseValue = pobj.DS.Tables[0],
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
	public string getNutrient(string id,string pathwayid)
	{
       
		PAL_FlowChart pobj = new PAL_FlowChart();
        pobj.pathwayId= Convert.ToInt32(pathwayid);
        pobj.id =Convert.ToInt32(id); //HttpContext.Current.Session["empid"].ToString();
		BAL_FlowChart.getNutrient(pobj);
		string str;
		if (!pobj.isException)
		{
			str = JsonConvert.SerializeObject((object)new
			{
				responseCode = 1,
				responseValue = pobj.DS.Tables[0],
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
    public string getsampleGraph(string pathwayIds, string empid, string keyId)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowChart pobj = new PAL_FlowChart();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        //pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.pathwayIds = pathwayIds;
        pobj.keyid = Convert.ToInt32(keyId);      
        BAL_MergedPathway.getsampleGraph(pobj);
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
