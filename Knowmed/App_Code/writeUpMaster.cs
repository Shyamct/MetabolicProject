using DLLWriteUpMaster;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

/// <summary>
/// Summary description for writeUpMaster
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class writeUpMaster : System.Web.Services.WebService
{

    public writeUpMaster()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public string insert(string dataValue, string arrObj, string arrNutrientList, string empid, string orginalWriteUp)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        //if (empid == null)
        //{
        //    HttpContext.Current.Response.StatusCode = 401;
        //    return "Invalid user";
        //}
        PAL_WriteUpMaster pobj = new PAL_WriteUpMaster();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        JavaScriptSerializer js = new JavaScriptSerializer();
        var jdv = js.Deserialize<dynamic>(dataValue);
        //pobj.pathwayId = Convert.ToInt32(jdv["pathwayId"]);
        pobj.receptorId = Convert.ToInt32(jdv["receptorId"]);
        pobj.writeUp = jdv["writeUp"];
        pobj.orginalWriteUp = orginalWriteUp;
        DataTable dataTable2 = JsonConvert.DeserializeObject<DataTable>(arrObj);
        if (dataTable2.Rows.Count > 0)
            pobj.DT_flowDiagram = dataTable2;
        DataTable dataTable3 = JsonConvert.DeserializeObject<DataTable>(arrNutrientList);
        if (dataTable3.Rows.Count > 0)
            pobj.DT_nutrientList = dataTable3;
        BAL_WriteUpMaster.Insert(pobj);
        string str3;
        if (!pobj.isException)
        {
            str3 = JsonConvert.SerializeObject((object)new
            {
                responseCode = 1,
                responseMessage = "Success"
            });
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
        PAL_WriteUpMaster pobj = new PAL_WriteUpMaster();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.pathwayId = Convert.ToInt32(id);
        BAL_WriteUpMaster.getWriteUp(pobj);
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
        PAL_WriteUpMaster pobj = new PAL_WriteUpMaster();
        pobj.userId = Convert.ToInt32(empid); //Convert.ToInt32(HttpContext.Current.Session["empid"]);
        pobj.id = Convert.ToInt32(id);
        BAL_WriteUpMaster.Delete(pobj);
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
    public string getsampleGraph()
    {       
        PAL_WriteUpMaster pobj = new PAL_WriteUpMaster();     
        BAL_WriteUpMaster.getProportion(pobj);
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
    public string getNotsigned(string empid)
    {
        //if (HttpContext.Current.Session["empid"] == null)
        if (empid == null)
        {
            HttpContext.Current.Response.StatusCode = 401;
            return "Invalid user";
        }
        PAL_WriteUpMaster pobj = new PAL_WriteUpMaster();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        BAL_WriteUpMaster.getNotsigned(pobj);
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
        PAL_WriteUpMaster pobj = new PAL_WriteUpMaster();
        pobj.who = empid; //HttpContext.Current.Session["empid"].ToString();
        pobj.keyword = keyword;
        pobj.id = Convert.ToInt32(id);
        BAL_WriteUpMaster.saveSymbole(pobj);
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
