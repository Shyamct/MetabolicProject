using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Services;
using System.Web.Script.Serialization;
using DLLPageDescription;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class pageDescription : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string insertDescription(string pageName, string userID,string heading,string color,string image,string description)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
       // pobj.id = Convert.ToInt32(id);
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.pageName = pageName;
        pobj.heading = heading;
        pobj.userID = Convert.ToInt32(userID);
        pobj.color = color;
        pobj.image = image;
        pobj.description = description;
        BAL_pageDescription.insertDescription(pobj);
        string str;
        if (!pobj.isException)
        {
            str = pobj.DS.Tables.Count <= 0 || pobj.DS.Tables[0].Rows.Count <= 0 ? JsonConvert.SerializeObject((object)new
            {
                responseCode = 0,
                responseMessage = "Success"
            }) : JsonConvert.SerializeObject((object)new
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
    public string insertNote(string pageName, string userID, string note)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
        // pobj.id = Convert.ToInt32(id);
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.pageName = pageName;
        pobj.note = note;
        pobj.userID = Convert.ToInt32(userID);
        BAL_pageDescription.insertNote(pobj);
        string str;
        if (!pobj.isException)
        {
            str =  JsonConvert.SerializeObject((object)new
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
    public string showDescription(string userID,string pageName)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
        // pobj.id = Convert.ToInt32(id);
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.userID = Convert.ToInt32(userID);
        pobj.pageName = pageName;
        BAL_pageDescription.showDetails(pobj);
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
    public string showNote(string userID, string pageName)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
        // pobj.id = Convert.ToInt32(id);
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.userID = Convert.ToInt32(userID);
        pobj.pageName = pageName;
        BAL_pageDescription.showNote(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
                responseMessage = "Success Update"
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
    public string updatePageDescription(string userID, int id,string heading,  string color, string image, string description)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid User";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.userID = Convert.ToInt32(userID);
        pobj.id = id;
        pobj.heading = heading;
        pobj.color = color;

       pobj.image = image;
        pobj.description = description;
        BAL_pageDescription.updatePageDescription(pobj);
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
    public string deletePageDescription(string userID, int id)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid User";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.userID = Convert.ToInt32(userID);
       
        pobj.id = id;
        BAL_pageDescription.deletePageDescription(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
                responseMessage = "Success Delete"
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
    public string getdetailbyid (string userID, int id)
    {
       
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_pageDescription pobj = new PAL_pageDescription();
       
        pobj.who = userID; //HttpContext.Current.Session["empid"].ToString();
        pobj.userID = Convert.ToInt32(userID);
        pobj.id = id;
        BAL_pageDescription.getdetailbyid(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS,
               
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
