using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLL_principalDiet
{
    public class PAL_principalDiet : Utility
    {
        public int pathwayID { get; set; }
        public int intractedNutrientID { get; set; }
        public int PID { get; set; }

        public string nutrientName  {get;set;}
        public int nutrientID { get;set;}
        public string statusFor { get;set;}
        public string roleType { get;set;}
        //public string diseaseID { get;set;}
       
    }
    public class DAL_principalDiet
    {
        public static void returnTable(PAL_principalDiet pobj)
        {
             Config con = new Config();
            SqlCommand cmd = new SqlCommand("principalDiet", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 240;
            cmd.Parameters.AddWithValue("@pathwayID", pobj.pathwayID);
            cmd.Parameters.AddWithValue("@PID", pobj.PID);
            cmd.Parameters.AddWithValue("@nutrientID", pobj.nutrientID);
            cmd.Parameters.AddWithValue("@statusFor", pobj.statusFor);
            cmd.Parameters.AddWithValue("@roleType", pobj.roleType);
            cmd.Parameters.AddWithValue("@IntractedNutrientID", pobj.intractedNutrientID);
            cmd.Parameters.AddWithValue("@nutrientName", pobj.nutrientName);
            cmd.Parameters.AddWithValue("@who", pobj.who);
            cmd.Parameters.AddWithValue("@opCode", pobj.opcode);

            cmd.Parameters.Add("@isException", SqlDbType.Bit);
            cmd.Parameters["@isException"].Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@exceptionMessage", SqlDbType.VarChar, 500);
            cmd.Parameters["@exceptionMessage"].Direction = ParameterDirection.Output;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(cmd);
            pobj.DS = new DataSet();
            DataSet ds = pobj.DS;
            sqlDataAdapter.Fill(ds);
            pobj.isException = Convert.ToBoolean(cmd.Parameters["@isException"].Value);
            pobj.exceptionMessage = cmd.Parameters["@exceptionMessage"].Value.ToString();
        }
    }
    public class BAL_principalDiet
    {
        public static void getNutrientList(PAL_principalDiet pobj)
        {
            pobj.opcode = 41;
            DAL_principalDiet.returnTable(pobj);
        }
        public static void getDiet(PAL_principalDiet pobj)
        {
            pobj.opcode = 42;
            DAL_principalDiet.returnTable(pobj);
        }
        public static void getDietByPID(PAL_principalDiet pobj)
        {
            pobj.opcode = 43;
            DAL_principalDiet.returnTable(pobj);
        }
        public static void getProcess(PAL_principalDiet pobj)
        {
            pobj.opcode = 44;
            DAL_principalDiet.returnTable(pobj);
        }
        public static void getOnlyProcessName(PAL_principalDiet pobj)
        {
            pobj.opcode = 45;
            DAL_principalDiet.returnTable(pobj);
        }
    }
}
