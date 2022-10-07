using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLDiseaseNutrientCascade
{
    public class PAL_DiseaseNutrientCascadeReport : Utility
    {
        public int diseaseID { get; set; }
        public int nutrientID { get; set; }
        public int foodID { get; set; }
        public int phenomenonID { get; set; }
        public string roleType { get; set; }
        public int interactionPresent { get; set; }
        public int interactionTypeID { get; set; }
        public string interactionType { get; set; }
        public string rankNo { get; set; }
        public int pid { get; set; }
        public string cascadeNutrient { get; set; }
        public string process { get; set; }
        public string diseaseIDs { get; set; }
        public string pathwayIds { get; set; }
        public string receptorIds { get; set; }

        public int interactedNutrientID { get; set; }

        public DateTime intakeDate { get; set; }
    }
    public class DAL_DiseaseNutrientCascadeReport
    {
        public static void returnTable(PAL_DiseaseNutrientCascadeReport pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_diseaseNutrientCascadeReport", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.CommandTimeout = 100000000;
                selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
                selectCommand.Parameters.AddWithValue("@diseaseID", (object)pobj.diseaseID);
                selectCommand.Parameters.AddWithValue("@nutrientID", (object)pobj.nutrientID);
                selectCommand.Parameters.AddWithValue("@foodID", (object)pobj.foodID);
                selectCommand.Parameters.AddWithValue("@phenomenonID", (object)pobj.phenomenonID);
                selectCommand.Parameters.AddWithValue("@roleType", (object)pobj.roleType);
                selectCommand.Parameters.AddWithValue("@interactionPresent", (object)pobj.interactionPresent);
                selectCommand.Parameters.AddWithValue("@interactionTypeID", (object)pobj.interactionTypeID);
                selectCommand.Parameters.AddWithValue("@interactionType", (object)pobj.interactionType);
                selectCommand.Parameters.AddWithValue("@rankNo", (object)pobj.rankNo);
                selectCommand.Parameters.AddWithValue("@pid", (object)pobj.pid);
                selectCommand.Parameters.AddWithValue("@cascadeNutrient", (object)pobj.cascadeNutrient);
                selectCommand.Parameters.AddWithValue("@process", (object)pobj.process);
                selectCommand.Parameters.AddWithValue("@diseaseIDs", (object)pobj.diseaseIDs);

                //selectCommand.Parameters.AddWithValue("@interactedNutrientID", (object)pobj.interactedNutrientID);

                if (pobj.intakeDate > DateTime.MinValue)
                    selectCommand.Parameters.AddWithValue("@intakeDate", pobj.intakeDate);

                //
                selectCommand.Parameters.AddWithValue("@receptorIds", (object)pobj.receptorIds);
                selectCommand.Parameters.AddWithValue("@who", (object)pobj.who);
                selectCommand.Parameters.Add("@isException", SqlDbType.Bit);
                selectCommand.Parameters["@isException"].Direction = ParameterDirection.Output;
                selectCommand.Parameters.Add("@exceptionMessage", SqlDbType.VarChar, 500);
                selectCommand.Parameters["@exceptionMessage"].Direction = ParameterDirection.Output;
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(selectCommand);
                pobj.DS = new DataSet();
                DataSet ds = pobj.DS;
                sqlDataAdapter.Fill(ds);
                pobj.isException = Convert.ToBoolean(selectCommand.Parameters["@isException"].Value.ToString());
                pobj.exceptionMessage = selectCommand.Parameters["@exceptionMessage"].Value.ToString();
            }
            catch (Exception ex)
            {
            }
        }
    }
    public class BAL_DiseaseNutrientCascadeReport
    {
        public static void getDisease(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 41;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getNutrient(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 42;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getNutrientFunctionReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 43;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getNutrientDetail(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 44;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getFood(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 45;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getNutrientAndFoodReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 46;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getPathwayList(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 47;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getPhenomenonList(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 48;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getPathwayFAQReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 49;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getCascadeReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 410;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getInteractedNutreintReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 411;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getMedication(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 412;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getDiseaseList(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 413;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getProcessList(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 414;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getCentralMoleculeList(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 415;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getCentralMoleculeReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 416;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getMarkerDietReport(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 417;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getMarkerDiet(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 418;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getMarkerDietGraph(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 419;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getRdaGraph(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 420;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getEndResult(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 421;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getPhenomenon(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 422;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getPageInfo(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 423;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void moleculeDietActivatorInitControls(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 424;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getAllFood(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 425;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
        public static void getMarkerData(PAL_DiseaseNutrientCascadeReport pobj)
        {
            pobj.opcode = 426;
            DAL_DiseaseNutrientCascadeReport.returnTable(pobj);
        }
    }
}
