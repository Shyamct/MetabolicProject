using DLLSVGLibrary;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for SVGWebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SVGWebService : System.Web.Services.WebService
{
    #region Section Master
    [WebMethod(EnableSession = true)]
    public string saveSection(string id, string sectionName, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.id = Convert.ToInt32(id);
        pobj.sectionName = sectionName;
        pobj.userID = Convert.ToInt32(userID);

        if (pobj.id > 0)
        {
            BAL_SVGLibrary.updateSection(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_SVGLibrary.saveSection(pobj);
        }
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
    public string deleteSection(string id, string userID)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.deleteSection(pobj);
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
    public string getSection(string id, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.getSection(pobj);
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
    #endregion

    #region Start Point Master
    [WebMethod(EnableSession = true)]
    public string saveStartPoint(string id, string startPoint, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.id = Convert.ToInt32(id);
        pobj.startPoint = startPoint;
        pobj.userID = Convert.ToInt32(userID);

        if (pobj.id > 0)
        {
            BAL_SVGLibrary.updateStartPoint(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_SVGLibrary.saveStartPoint(pobj);
        }
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
    public string deleteStartPoint(string id, string userID)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.deleteStartPoint(pobj);
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
    public string getStartPoint(string id, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.getStartPoint(pobj);
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
    #endregion

    #region End Point Master
    [WebMethod(EnableSession = true)]
    public string saveEndPoint(string id, string endPoint, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.id = Convert.ToInt32(id);
        pobj.endPoint = endPoint;
        pobj.userID = Convert.ToInt32(userID);

        if (pobj.id > 0)
        {
            BAL_SVGLibrary.updateEndPoint(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_SVGLibrary.saveEndPoint(pobj);
        }
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
    public string deleteEndPoint(string id, string userID)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.deleteEndPoint(pobj);
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
    public string getEndPoint(string id, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.getEndPoint(pobj);
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
    #endregion

    #region Marker Start End Mapping
    [WebMethod(EnableSession = true)]
    public string initControls(string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        BAL_SVGLibrary.initControls(pobj);
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
    public string saveMarkerStartEndMapping(string id, string pathwayId, string sectionId, string subSectionId, string startPointId, string endPointId, string markerList, string startRole, string endRole, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.id = Convert.ToInt32(id);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.sectionId = Convert.ToInt32(sectionId);
        pobj.subSectionId = Convert.ToInt32(subSectionId);
        pobj.startPointId = Convert.ToInt32(startPointId);
        pobj.endPointId = Convert.ToInt32(endPointId);
        pobj.startRole = startRole;
        pobj.endRole = endRole;
        pobj.markerList = markerList;
        pobj.userID = Convert.ToInt32(userID);

        if (pobj.id > 0)
        {
            BAL_SVGLibrary.updateStartEndMapping(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_SVGLibrary.saveStartEndMapping(pobj);
        }
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
    public string deleteStartEndMapping(string id, string userID)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);     
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.deleteStartEndMapping(pobj);
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
    public string getMarkerStartEndMapping(string id, string pathwayId, string sectionId, string subSectionId, string startPointId, string endPointId, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.sectionId = Convert.ToInt32(sectionId);
        pobj.subSectionId = Convert.ToInt32(subSectionId);
        pobj.startPointId = Convert.ToInt32(startPointId);
        pobj.endPointId = Convert.ToInt32(endPointId);
        BAL_SVGLibrary.getStartEndMapping(pobj);
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
    #endregion

    #region Marker Relation Fro SVG
    [WebMethod(EnableSession = true)]
    public string getMarkerRelation(string pathwayId, string sectionId, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.sectionId = Convert.ToInt32(sectionId);
        BAL_SVGLibrary.getMarkerRelation(pobj);
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
    public string getMarkerReport(string markerName, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.markerName = markerName;
        BAL_SVGLibrary.getMarkerReport(pobj);
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
    #endregion

    #region Sub Section Master
    [WebMethod(EnableSession = true)]
    public string saveSubSection(string id, string subSectionName, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.id = Convert.ToInt32(id);
        pobj.subSectionName = subSectionName;
        pobj.userID = Convert.ToInt32(userID);

        if (pobj.id > 0)
        {
            BAL_SVGLibrary.updateSubSection(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_SVGLibrary.saveSubSection(pobj);
        }
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
    public string deleteSubSection(string id, string userID)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.deleteSubSection(pobj);
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
    public string getSubSection(string pathwayId, string foodName, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.foodName = foodName;
        BAL_SVGLibrary.getSubSection(pobj);
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
    #endregion

    #region PDF & SVG Events 
    [WebMethod(EnableSession = true)]
    public string getMarkerDetails(string pathwayId, string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        //pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pathwayId = Convert.ToInt32(pathwayId); 
        pobj.markerName = markerName;
        BAL_SVGLibrary.getMarkerDetails(pobj);
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
    public string getECGComparison(string markerName, string leadName, string pid, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        //pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.markerName = markerName;
        pobj.leadName = leadName;
        pobj.pid = Convert.ToInt32(pid);
        BAL_SVGLibrary.getECGComparison(pobj);
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
    public string getPatientInvestigation(string pid, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        //pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pid = Convert.ToInt32(pid);
        BAL_SVGLibrary.getPatientInvestigation(pobj);
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
    public string getEndResult(string pid, string nutrientId, string pathwayId, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        //pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pid = Convert.ToInt32(pid);
        pobj.nutrientId = Convert.ToInt32(nutrientId);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        BAL_SVGLibrary.getEndResult(pobj);
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
    public string getMarkerGlossaryDetail(string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        //pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.markerName = markerName;
        BAL_SVGLibrary.getMarkerGlossaryDetail(pobj);
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
    public string getTempratureDetails(string markerName, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        //pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.markerName = markerName;
        BAL_SVGLibrary.getTempratureDetails(pobj);
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
    #endregion

    #region Master Group Research URL
    [WebMethod(EnableSession = true)]
    public string saveMarkerGroupResearchURL(string id, string pathwayId, string sectionId, string markerGroup, string markerGroupURL, string userID)
    {
        if (userID == null)
        //if (!CheckToken.CheckAccessToken())
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.id = Convert.ToInt32(id);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.sectionId = Convert.ToInt32(sectionId);
        pobj.markerList = markerGroup;
        pobj.markerGroupURL = markerGroupURL;
        pobj.userID = Convert.ToInt32(userID);

        if (pobj.id > 0)
        {
            BAL_SVGLibrary.updateMarkerGroupResearchURL(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_SVGLibrary.saveMarkerGroupResearchURL(pobj);
        }
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
    public string deleteMarkerGroupResearchURL(string id, string userID)
    {
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.deleteMarkerGroupResearchURL(pobj);
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
    public string getMarkerGroupResearchURL(string id, string userID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (userID == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_SVGLibrary pobj = new PAL_SVGLibrary();
        pobj.userID = Convert.ToInt32(userID); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id);
        BAL_SVGLibrary.getMarkerGroupResearchURL(pobj);
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
    #endregion

}
