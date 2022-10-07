using DLLMainPathway;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for pathwayMain
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class pathwayMain : System.Web.Services.WebService
{

	[WebMethod(EnableSession = true)]
	public string insert(string mainid, string arrobj, string pathwayId, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_PathwayMain pobj = new PAL_PathwayMain();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayId);
		pobj.keyid = Convert.ToInt32(mainid);
		DataTable dataTable1 = new DataTable();
		DataTable dataTable2 = JsonConvert.DeserializeObject<DataTable>(arrobj);
		if (dataTable2.Rows.Count > 0)
			pobj.DT_PathwayRelation = dataTable2;
		BAL_PathwayMain.InsertKey(pobj);
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
		PAL_PathwayMain pobj = new PAL_PathwayMain();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        BAL_PathwayMain.getKeyword(pobj);
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
	public string getExistingKeyword(string keyId, string pathwayid, string empid)
	{
		//if (HttpContext.Current.Session["empid"] == null)
            if (empid == null)
            {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_PathwayMain pobj = new PAL_PathwayMain();
		pobj.keyid = Convert.ToInt32(keyId);
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
		BAL_PathwayMain.getExistingKeyword(pobj);
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
	public string getPathwayGraph(string pathwayid, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_PathwayMain pobj = new PAL_PathwayMain();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
		BAL_PathwayMain.getPathwayGraph(pobj);
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
	public string pathwaySelecter(string keyword, string prefix, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_PathwayMain pobj = new PAL_PathwayMain();
		pobj.keyword = keyword;
		pobj.prefix = prefix;
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_PathwayMain.pathwaySelecter(pobj);
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
	public string getEat(string keyword, string pathwayid, string empid)
	{
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_PathwayMain pobj = new PAL_PathwayMain();
		pobj.keyword = keyword;
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		pobj.pathwayId = Convert.ToInt32(pathwayid);
		BAL_PathwayMain.getEat(pobj);
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
    public string regroupingLayoutData(string pathwayid)
    {
        PAL_PathwayMain pobj = new PAL_PathwayMain();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        BAL_PathwayMain.regroupingLayoutData(pobj);
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
