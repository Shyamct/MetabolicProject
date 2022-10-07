<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Data;
using System.Net;
using System.Configuration;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Web.Script.Serialization;

public class Handler : IHttpHandler {
	public class systemDetails
	{
		public string IP { get; set; }
		public string userName { get; set; }
	}

	public void ProcessRequest(HttpContext context)
	{
		var sys = new systemDetails();
		sys.IP = context.Request.UserHostAddress; //myIP;
		sys.userName = Dns.GetHostEntry(context.Request.ServerVariables["REMOTE_ADDR"]).HostName;
		JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
		string serEmployee = javaScriptSerializer.Serialize(sys);
		context.Response.ContentType = "text/html";
		context.Response.Write(serEmployee);
	}

	public bool IsReusable {
		get {
			return false;
		}
	}

}