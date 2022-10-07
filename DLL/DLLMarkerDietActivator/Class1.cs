using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLMarkerDietActivator
{
    public class PAL_MarkerDietActivator : Utility
    {
        public int id { get; set; }
        public int nutrientID { get; set; }
        public string problemName { get; set; }
        public string nutrientName { get; set; }
        public int nutrientValue { get; set; }
        public string nutrientFunction { get; set; }
        public int foodID { get; set; }
        public string diseaseIds { get; set; }
        public int status { get; set; }
        public int userID { get; set; }
        public int foodName { get; set; }
        public string interactedNutrientName { get; set; }
        public string effect { get; set; }
        public int InteractedNutrientID { get; set; }
    }
    public class DAL_MarkerDietActivator
    {
        public static void returnTable(PAL_MarkerDietActivator pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("markerDietActivator", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@userID", pobj.userID);
            cmd.Parameters.AddWithValue("@foodName", pobj.foodName);
            cmd.Parameters.AddWithValue("@foodID", pobj.foodID);
            cmd.Parameters.AddWithValue("@diseaseIds", pobj.diseaseIds);
            cmd.Parameters.AddWithValue("@nutrientName", pobj.nutrientName);
            cmd.Parameters.AddWithValue("@interactedNutrientName", pobj.interactedNutrientName);
            cmd.Parameters.AddWithValue("@nutrientValue", pobj.nutrientValue);
            cmd.Parameters.AddWithValue("@effect", pobj.effect);
            cmd.Parameters.AddWithValue("@InteractedNutrientID", pobj.InteractedNutrientID);
            cmd.Parameters.AddWithValue("@opcode", pobj.opcode);
            cmd.Parameters.Add("@isException", SqlDbType.Bit);
            cmd.Parameters["@isException"].Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@exceptionMessage", SqlDbType.VarChar, 500);
            cmd.Parameters["@exceptionMessage"].Direction = ParameterDirection.Output;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(cmd);
            pobj.DS = new DataSet();
            DataSet ds = pobj.DS;
            sqlDataAdapter.Fill(ds);
            pobj.isException = Convert.ToBoolean(cmd.Parameters["@isException"].Value.ToString());
            pobj.exceptionMessage = cmd.Parameters["@exceptionMessage"].Value.ToString();
        }
    }
    public class BAL_MarkerDietActivator
    {
        public static void getNutrientReport(PAL_MarkerDietActivator pobj)
        {
            pobj.opcode = 41;
            DAL_MarkerDietActivator.returnTable(pobj);
        }
        public static void getFoodReportToEat(PAL_MarkerDietActivator pobj)
        {
            pobj.opcode = 42;
            DAL_MarkerDietActivator.returnTable(pobj);
        }
        public static void getNutrientNotToEat(PAL_MarkerDietActivator pobj)
        {
            pobj.opcode = 43;
            DAL_MarkerDietActivator.returnTable(pobj);
        }
        public static void getNutrientToEat(PAL_MarkerDietActivator pobj)
        {
            pobj.opcode = 44;
            DAL_MarkerDietActivator.returnTable(pobj);
        }
    }
}
