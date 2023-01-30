using DLLFlowDiagram;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for flowDiagram
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class flowDiagram : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string pathwaySelecter(string keyword, string prefix, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.keyword = keyword;
        pobj.prefix = prefix;
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();

        BAL_FlowDiagram.pathwaySelecter(pobj);
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
    public string insert(string dataValue, string arrObj, string arrNutrientList, string empid, string pathway_array)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataValue);
        pobj.pathwayId = 1;//Convert.ToInt32(jdv["pathwayId"]);
        pobj.receptorId = Convert.ToInt32(jdv["receptorId"]);
        pobj.writeUp = jdv["writeUp"];
        pobj.orginalWriteUp = jdv["orginalWriteUp"];
        pobj.parameterID = jdv["parameterID"];
        pobj.pathwayid_array = pathway_array;

        DataTable dataTable2 = JsonConvert.DeserializeObject<DataTable>(arrObj);
        if (dataTable2.Rows.Count > 0)
            pobj.DT_flowDiagram = dataTable2;
        DataTable dataTable3 = JsonConvert.DeserializeObject<DataTable>(arrNutrientList);
        if (dataTable3.Rows.Count > 0)
            pobj.DT_nutrientList = dataTable3;
        BAL_FlowDiagram.Insert(pobj);
        //BAL_FlowDiagram.Insert(pobj);
        string str3;
        if (!pobj.isException)
        {
            if (pobj.status == 1)
            {
                str3 = JsonConvert.SerializeObject((object)new
                {
                    responseCode = 2,
                    responseMessage = "Data Already Exist"
                });
            }
            else
            {
                str3 = JsonConvert.SerializeObject((object)new
                {
                    responseCode = 1,
                    responseMessage = "Success"
                });
            }

        }
        else


        {
            HttpContext.Current.Response.StatusCode = 404;
            str3 = pobj.exceptionMessage;
        }
        return str3;
    }


    [WebMethod(EnableSession = true)]
    public string getWriteUp(string id, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pathwayId = Convert.ToInt32(id)
;
        //pobj.pathwayid_array = id;

        BAL_FlowDiagram.getWriteUp(pobj);
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
    public string Delete(string id, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id)
;
        BAL_FlowDiagram.Delete(pobj);
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
    public string updateSNO(string id, string sno, string pathwayId, string rank, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id)
;
        pobj.sno = Convert.ToInt32(sno);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.rank = Convert.ToInt32(rank);
        BAL_FlowDiagram.updateSNO(pobj);
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
    public string updateRank(string id, string rank, string pathwayId, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);   
        pobj.ids = id;
        pobj.rank = Convert.ToInt32(rank);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        BAL_FlowDiagram.updateRank(pobj);
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
    public string updateStatus(string id, string status, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);   
        pobj.id = Convert.ToInt32(id)
;
        pobj.status = Convert.ToInt32(status);
        BAL_FlowDiagram.updateStatus(pobj);
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
    public string getRank(string pathwayId, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        BAL_FlowDiagram.getRank(pobj);
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
    public string saveRank(string rankID, string rank, string rankName, string pathwayId, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);   
        pobj.rankName = rankName;
        pobj.rank = Convert.ToInt32(rank);
        pobj.rankID = Convert.ToInt32(rankID);
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        BAL_FlowDiagram.saveRankName(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS.Tables.Count > 0 ? pobj.DS.Tables[0] : null,
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
    public string DeleteRank(string rankID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);   
        pobj.rankID = Convert.ToInt32(rankID);
        BAL_FlowDiagram.deleteRank(pobj);
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
    public string getMaster(string id, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.id = Convert.ToInt32(id)
;
        BAL_FlowDiagram.getMaster(pobj);
        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS.Tables.Count > 0 ? pobj.DS.Tables[0] : null,
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
    public string getResearchBasedQuestionList(string id, string diseaseID, string phenomenonID, string process, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id)
;
        pobj.pathwayId = Convert.ToInt32(diseaseID);
        pobj.receptorId = Convert.ToInt32(phenomenonID);
        pobj.rank = Convert.ToInt32(process);
        BAL_FlowDiagram.getResearchBasedQuestionList(pobj);
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
    public string saveResearchBasedQuestion(string id, string diseaseID, string phenomenonID, string process, string questionText, string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id)
;
        pobj.pathwayId = Convert.ToInt32(diseaseID);
        pobj.receptorId = Convert.ToInt32(phenomenonID);
        pobj.rank = Convert.ToInt32(process);
        pobj.questionText = questionText;
        if (pobj.id > 0)
        {
            BAL_FlowDiagram.updateResearchBasedQuestion(pobj);
        }
        else if (pobj.id == 0)
        {
            BAL_FlowDiagram.saveResearchBasedQuestion(pobj);
        }
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
    public string deleteResearchBasedQuestion(string id, string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);      
        pobj.id = Convert.ToInt32(id)
;
        BAL_FlowDiagram.DeleteResearchBasedQuestion(pobj);
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
    public string getDisease(string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_FlowDiagram.getDisease(pobj);
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
    public string deleteMultipleWriteUp(string empid, string ids)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }

        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.who = empid;
        pobj.ids = ids;


        BAL_FlowDiagram.deleteMultipleWriteUp(pobj);
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
    public string getPreviousRank(string empid,int pathwayID)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.who = empid; 
        pobj.pathwayId = pathwayID; 

        //HttpContext.Current.Session["empid"].ToString();
        BAL_FlowDiagram.getPreviousRank(pobj);
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
    public string deletePreviousRank(string empid, int id)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_FlowDiagram pobj = new PAL_FlowDiagram();
        pobj.who = empid;
        pobj.id = id;

        BAL_FlowDiagram.deletePreviousRank(pobj);
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