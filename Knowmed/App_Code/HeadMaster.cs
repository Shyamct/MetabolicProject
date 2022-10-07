using DLLHeadMaster;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for HeadMaster
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class HeadMaster : System.Web.Services.WebService
{

	[WebMethod(EnableSession = true)]
	public string getHeadList(string empid)
	{
		//if (HttpContext.Current.Session["empid"] == null)
		if (empid == null)
		{
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		string str = "";
		PAL_HeadMaster pobj = new PAL_HeadMaster();
		//pobj.who = HttpContext.Current.Session["empid"].ToString();
		pobj.who = empid;
		BAL_HeadMaster.GetHeadList(pobj);
		if (!pobj.isException)
		{
			if (!pobj.isException)
			{
				if (pobj.DS.Tables.Count > 0)
					str = pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
					{
						responseCode = 0,
						responseValue = pobj.DS,
						responseMessage = "Data Not Found"
					}) : JsonConvert.SerializeObject((object)new
					{
						responseCode = 1,
						responseValue = pobj.DS,
						responseMessage = "success"
					});
			}
			else
			{
				HttpContext.Current.Response.StatusCode = 404;
				str = pobj.exceptionMessage;
			}
		}
		return str;
	}
	[WebMethod(EnableSession = true)]
	public string saveSVGImge(string id, string svgImage, string empid)
	{
		//if (HttpContext.Current.Session["empid"] == null)
		if (empid == null)
		{
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_HeadMaster pobj = new PAL_HeadMaster();
		pobj.id = Convert.ToInt32(id);
		pobj.svgImg = svgImage;
		pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_HeadMaster.saveSVGImge(pobj);
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
	public string OpenSvgImage(string id, string empid)
	{
		//if (HttpContext.Current.Session["empid"] == null)
		if (empid == null)
		{
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_HeadMaster pobj = new PAL_HeadMaster();
		pobj.id = Convert.ToInt32(id);
		pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_HeadMaster.OpenSvgImage(pobj);
		string str;
		if (!pobj.isException)
		{
			str = pobj.DS.Tables.Count <= 0 || pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
			{
				responseCode = 0,
				responseValue = pobj.DS.Tables[0],
				responseMessage = "Success"
			}) : JsonConvert.SerializeObject((object)new
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
	public string getKeywordList(string empid)
	{
		//if (HttpContext.Current.Session["empid"] == null)
		if (empid == null)
		{
			HttpContext.Current.Response.StatusCode = 401;
			return "Invalid user";
		}
		PAL_HeadMaster pobj = new PAL_HeadMaster();
		pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
		BAL_HeadMaster.getKeywordList(pobj);
		string str;
		if (!pobj.isException)
		{
			str = pobj.DS.Tables.Count <= 0 || pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
			{
				responseCode = 0,
				responseValue = pobj.DS.Tables[0],
				responseMessage = "Success"
			}) : JsonConvert.SerializeObject((object)new
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
	public string getAllHead()
	{

		PAL_HeadMaster pobj = new PAL_HeadMaster();
		BAL_HeadMaster.getAllHead(pobj);
		string str;
		if (!pobj.isException)
		{
			str = pobj.DS.Tables.Count <= 0 || pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
			{
				responseCode = 0,
				responseValue = pobj.DS.Tables[0],
				responseMessage = "Success"
			}) : JsonConvert.SerializeObject((object)new
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
}
