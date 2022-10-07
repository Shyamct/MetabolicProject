using DLLMainPathway1;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for PathwayMain1
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PathwayMain1 : System.Web.Services.WebService
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
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.keyid = Convert.ToInt32(mainid);
        DataTable dataTable1 = new DataTable();
        DataTable dataTable2 = JsonConvert.DeserializeObject<DataTable>(arrobj);
        if (dataTable2.Rows.Count > 0)
            pobj.DT_PathwayRelation = dataTable2;
        BAL_PathwayMain1.InsertKey(pobj);
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
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        BAL_PathwayMain1.getKeyword(pobj);
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
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyid = Convert.ToInt32(keyId);
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        BAL_PathwayMain1.getExistingKeyword(pobj);
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
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        BAL_PathwayMain1.getPathwayGraph(pobj);
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
    public string getsampleGraph(string pathwayid, string empid, string keyId, string receptorIds, string groupID, string parameterID, string rankNo)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        //pobj.who = HttpContext.Current.Session["empid"].ToString();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        //pobj.pathwayIds = pathwayIds;
        pobj.keyid = Convert.ToInt32(keyId);
        pobj.receptorIds = receptorIds;
        pobj.groupID = Convert.ToInt32(groupID);
        pobj.parameterID = Convert.ToInt32(parameterID);
        pobj.rankNo = Convert.ToInt32(rankNo);
        BAL_PathwayMain1.getsampleGraph(pobj);

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
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyword = keyword;
        pobj.prefix = prefix;
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_PathwayMain1.pathwaySelecter(pobj);
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
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyword = keyword;
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        BAL_PathwayMain1.getEat(pobj);
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
    public string getMedication(string PID, string pathwayid, string id, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyid = Convert.ToInt32(PID);
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.id = Convert.ToInt32(id);
        BAL_PathwayMain1.getMedication(pobj);
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
    public string getNotsigned(string pathwayid, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        BAL_PathwayMain1.getNotsigned(pobj);
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
    public string saveSymbole(string id, string keyword, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.keyword = keyword;
        pobj.id = Convert.ToInt32(id);
        BAL_PathwayMain1.saveSymbole(pobj);
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
    public string SetCenterMolecule(string keyword, string groupId, string pathwayid, string empid, string prefix)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.keyword = keyword;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.keyid = Convert.ToInt32(groupId);
        pobj.prefix = prefix;

        BAL_PathwayMain1.SetCenterMolecule(pobj);
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
    public string setDietRequired(string keyword, string groupId, string pathwayid, string dietRequired, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.keyword = keyword;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.dietRequired = dietRequired;
        pobj.keyid = Convert.ToInt32(groupId);
        BAL_PathwayMain1.SetDietRequired(pobj);
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
    public string getMoleculeCountReport(string ids, string processIds, string receptorIds, string empid, string age, string weight, string gender)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid;
        //pobj.pathwayId = Convert.ToInt32(id);
        pobj.pathwayIds = ids;
        pobj.receptorIds = receptorIds;
        pobj.processIds = processIds;
        pobj.age = Convert.ToInt32(age);
        pobj.weight = Convert.ToInt32(weight);
        pobj.gender = Convert.ToInt32(gender);
        BAL_PathwayMain1.getMoleculeCountReport(pobj);
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
    public string getDisease()
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        BAL_PathwayMain1.getDisease(pobj);
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
    public string getProcess(int id)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.id = id;
        BAL_PathwayMain1.getProcess(pobj);
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
    public string getprocessWiseData(int id, int pathwayId)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.id = id;
        pobj.pathwayId = pathwayId;
        BAL_PathwayMain1.getprocessWiseData(pobj);
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
    public string getkeywordRelation(string pathwayid, string keyword)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.keyword = keyword;
        BAL_PathwayMain1.getkeywordRelation(pobj);

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
    public string getWriteUpById(string pathwayid, string empid, string id)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.id = Convert.ToInt32(id);
        pobj.who = empid;
        BAL_PathwayMain1.getWriteUpById(pobj);

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
    public string getWriteUpModalData(string pathwayId, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        BAL_PathwayMain1.getWriteUpModalData(pobj);

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
    public string getFAQ(string pathwayid, string empid, string id)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.id = Convert.ToInt32(id);
        pobj.who = empid;
        BAL_PathwayMain1.getFAQ(pobj);

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
    public string getToDoNotToDo(string pathwayid, string empid, string id)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.id = Convert.ToInt32(id);
        pobj.who = empid;
        BAL_PathwayMain1.getToDoNotToDo(pobj);

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
    public string getClinicalFeatures(string keyword, string pathwayid, string id, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.keyword = keyword;
        pobj.id = Convert.ToInt32(id);
        pobj.who = empid;
        BAL_PathwayMain1.getClinicalFeatures(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string SetEnzyme(string keyword, string groupId, string pathwayid, string empid, string prefix)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.keyword = keyword;
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.keyid = Convert.ToInt32(groupId);
        pobj.prefix = prefix;

        BAL_PathwayMain1.SetEnzyme(pobj);
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
    public string getEnzyme(string pathwayid, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.who = empid;
        BAL_PathwayMain1.getEnzyme(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getMedicine(string keyword, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyword = keyword;
        //pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.who = empid;
        BAL_PathwayMain1.getMedicine(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string deleteEnzyme(int id)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        //pobj.keyword = keyword;
        //pobj.pathwayId = Convert.ToInt32(pathwayid);
        //pobj.who = empid;
        pobj.id = id;
        BAL_PathwayMain1.deleteEnzymeMolecule(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getNutrientFromCategory(string pathwayid, string nutrientCategory, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();      
        pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.nutrientCategory = nutrientCategory;
        pobj.who = empid;
        BAL_PathwayMain1.getNutrientFromCategory(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS.Tables[0],
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
    public string getMoleculeColorList(string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();  
        pobj.who = empid;
        BAL_PathwayMain1.getMoleculeColorList(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getItemStock(string keyword, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyword = keyword;
        //pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.who = empid;
        BAL_PathwayMain1.getItemStock(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getTestMachineDetail(string keyword, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.keyword = keyword;
        //pobj.pathwayId = Convert.ToInt32(pathwayid);
        pobj.who = empid;
        BAL_PathwayMain1.getTestMachineDetail(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getMyGraphData(string pathwayId, string keyword, string keyId, string rankNo, string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();      
        pobj.who = empid;
        pobj.keyword = keyword;
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        pobj.keyid = Convert.ToInt32(keyId);
        pobj.rankNo = Convert.ToInt32(rankNo);
        BAL_PathwayMain1.getMyGraphData(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getProcessReceptor(string pathwayIds, string processIds, string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid;
        pobj.pathwayIds = pathwayIds;
        pobj.processIds = processIds;
        BAL_PathwayMain1.getProcessReceptor(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getTotal(string pathwayId, string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid;
        pobj.pathwayId = Convert.ToInt32(pathwayId);
        BAL_PathwayMain1.getTotal(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
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
    public string getCoFactors(string keyword, string empid)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid;
        pobj.keyword = keyword;
        BAL_PathwayMain1.getCoFactors(pobj);

        string str;
        if (!pobj.isException)
        {
            str = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseValue = pobj.DS
            });
        }
        else
        {
            HttpContext.Current.Response.StatusCode = 404;
            str = pobj.exceptionMessage;
        }
        return str;
    }
    //public string getPathWay(string pathwayIds, string keyid, string empid)
    //{
    //    PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
    //    pobj.pathwayIds = pathwayIds;
    //    pobj.keyid = Convert.ToInt32(keyid);
    //    pobj.who = empid;
    //    BAL_PathwayMain1.getPathWayName(pobj);

    //    string str;
    //    if (!pobj.isException)
    //    {
    //        str = JsonConvert.SerializeObject((object)new
    //        {
    //            responseCode = 1,
    //            responseValue = pobj.DS,
    //            responseMessage = "Success"
    //        });
    //    }
    //    else
    //    {
    //        HttpContext.Current.Response.StatusCode = 404;
    //        str = pobj.exceptionMessage;
    //    }
    //    return str;
    //}
    public string getPathWay(string pathwayIds, string keyid, string empid)
    {
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.pathwayIds = pathwayIds;
        pobj.keyid = Convert.ToInt32(keyid);
        pobj.who = empid;
        BAL_PathwayMain1.getPathWayName(pobj);

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
    public string saveMolecule(string fromkey, string toKey, string pathwayid, string relation, string relationNames, string receptorIds, string groupID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.fromKey = fromkey;
        pobj.toKey = toKey;
        pobj.relation = relation;
        pobj.relationNames = relationNames;


        pobj.receptorIds = receptorIds;
        pobj.groupID = Convert.ToInt32(groupID);

        pobj.pathwayId = Convert.ToInt32(pathwayid);

        BAL_PathwayMain1.saveMolecule(pobj);
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
    //public string getMeaning(string keyword,  string keyid, int id ,string empid)
    //{
    //    PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
    //    pobj.keyword = keyword;
    //  //  pobj.pathwayIds = pathwayIds;
    //    pobj.keyid = Convert.ToInt32(keyid);
    //    pobj.id = id;
    //    pobj.who = empid;
    //    BAL_PathwayMain1.getMeaning(pobj);

    //    string str;
    //    if (!pobj.isException)
    //    {
    //        str = JsonConvert.SerializeObject((object)new
    //        {
    //            responseCode = 1,
    //            responseValue = pobj.DS,
    //            responseMessage = "Success"
    //        });
    //    }
    //    else
    //    {
    //        HttpContext.Current.Response.StatusCode = 404;
    //        str = pobj.exceptionMessage;
    //    }
    //    return str;
    //}



    [WebMethod(EnableSession = true)]
    public string updateTokey(string id, string tokey, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.id = Convert.ToInt32(id);
        pobj.toKey = tokey;

        BAL_PathwayMain1.updateTokey(pobj);
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
    public string saveRowId( string rowID, string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        //pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.id = Convert.ToInt32(rowID);

        BAL_PathwayMain1.saveRowID(pobj);
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
    public string aboutPatientAchivement(string empid,string nutrientName, int PID,string intakeDate)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();

        pobj.nutrientName = nutrientName;
        pobj.PID = PID;
        pobj.intakeDate = intakeDate;

        BAL_PathwayMain1.aboutPatientAchivement(pobj);
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
    public string pIDInteckNutrient(string empid,int DiseaseID,int PID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.PID = PID;
        pobj.DiseaseID = DiseaseID;

        BAL_PathwayMain1.pIDInteckNutrient(pobj);
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
    public string givenDrugPID(string empid, int PID)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.PID = PID;

        BAL_PathwayMain1.givenDrugPID(pobj);
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
    public string getDate(string empid, int PID, string DateDemo)
    {
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_PathwayMain1 pobj = new PAL_PathwayMain1();
        pobj.PID = PID;
        pobj.DateDemo = DateDemo;

        BAL_PathwayMain1.gatdateWiseDrug(pobj);
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
