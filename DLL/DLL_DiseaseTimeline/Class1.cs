using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLL_DiseaseTimeline
{
    public class PAL_diseaseTimeline:Utility
    {
        public string pathwayIdList { get; set; }

        public string rankList { get; set; }
        public int interactedNutrientID { get; set; }

        public int gender { get; set; }
        public int age { get; set; }
        public string ageUnit { get; set; }
    }
    public class DAL_diseaseTimeLine
    { 
    public static void returnTable(PAL_diseaseTimeline pobj)
    {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("proc_diseaseTimeline", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 200000000;
            cmd.Parameters.AddWithValue("@who", pobj.who);
            cmd.Parameters.AddWithValue("@opcode", pobj.opcode);
            cmd.Parameters.AddWithValue("@pathwayIdList", pobj.pathwayIdList);
         
            cmd.Parameters.AddWithValue("@rankList", pobj.rankList);
            cmd.Parameters.AddWithValue("@interactedNutrientID", pobj.interactedNutrientID);
            cmd.Parameters.AddWithValue("@gender", pobj.gender);
            cmd.Parameters.AddWithValue("@age", pobj.age);
            cmd.Parameters.AddWithValue("@ageUnit", pobj.ageUnit);
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
    public class BAL_diseaseTimeline
    {
        public static void getDropdownHeader(PAL_diseaseTimeline pobj)
        {
            pobj.opcode = 41;
            DAL_diseaseTimeLine.returnTable(pobj);
        }
        public static void getReport(PAL_diseaseTimeline pobj)
        {
            pobj.opcode = 42;
            DAL_diseaseTimeLine.returnTable(pobj);
        }
        public static void getFoodName(PAL_diseaseTimeline pobj)
        {
            pobj.opcode = 43;
            DAL_diseaseTimeLine.returnTable(pobj);
        }
        public static void getPROCESS(PAL_diseaseTimeline pobj)
        {
            pobj.opcode = 45;
            DAL_diseaseTimeLine.returnTable(pobj);
        }
    }
}
