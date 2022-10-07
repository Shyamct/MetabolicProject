<%@ WebHandler Language="C#" Class="FileUploadHandler" %>

using System;
using System.Web;
using System.IO;
using Newtonsoft.Json;
public class FileUploadHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        string timeStamp = context.Request.QueryString["timestamp"].ToString();
        string[] sam = new string[context.Request.Files.Count];
        if (context.Request.Files.Count > 0)
        {

            HttpFileCollection files = context.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile file = files[i];
                string fname;
                string sname;
                if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                {
                    string[] testfiles = file.FileName.Split(new char[] { '\\' });
                    fname = testfiles[testfiles.Length - 1];
                    sname = testfiles[testfiles.Length - 1];
                }
                else
                {
                    fname = file.FileName;
                    sname = file.FileName;
                }
                fname = timeStamp + "_" + fname;
                sname = timeStamp + "_" + sname;
                fname = Path.Combine(context.Server.MapPath("GraphPDF/"), fname);
                file.SaveAs(fname);
                sam[i] = sname;
            }
        }
        context.Response.ContentType = "application/json";
        context.Response.Write(JsonConvert.SerializeObject(sam));
    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}