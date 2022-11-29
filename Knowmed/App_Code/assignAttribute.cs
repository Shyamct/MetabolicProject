using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using DAL_assignAttribute;
using Newtonsoft.Json;

/// <summary>
/// Summary description for assignAttribute
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class assignAttribute : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string getAttributeList(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_assignAttribute pobj = new PAL_assignAttribute();
        pobj.who = empid;

        BAL_assignAttribute.getAttributeList(pobj);
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
    public string getAttributeChild(string empid, int parentID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_assignAttribute pobj = new PAL_assignAttribute();
        pobj.who = empid;
        pobj.parentID = parentID;

        BAL_assignAttribute.getAttributeListChild(pobj);
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
    public string getAttributeWITHuser(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_assignAttribute pobj = new PAL_assignAttribute();
        pobj.who = empid;

        BAL_assignAttribute.getAttributeWITHuser(pobj);
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
    public string saveAttributeWITHuser(string empid, int userID, int parentID,string FinalArray)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_assignAttribute pobj = new PAL_assignAttribute();
        pobj.who = empid;
        pobj.userID = userID;
        pobj.parentID = parentID;
        pobj.FinalArray = FinalArray;

        BAL_assignAttribute.saveAttributeWITHuser(pobj);
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
    public string getAssignList(string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_assignAttribute pobj = new PAL_assignAttribute();
        pobj.who = empid;

        BAL_assignAttribute.getAttributeAssignList(pobj);
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
    public string deleteAssignUser(string empid,int ID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_assignAttribute pobj = new PAL_assignAttribute();
        pobj.who = empid;
        pobj.ID = ID;

        BAL_assignAttribute.deleteAssignUser(pobj);
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
