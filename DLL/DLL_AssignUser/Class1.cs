using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLL_AssignUser
{
    public class PAL_UserDisease : Utility
    {
        public int userID { get; set; }
        public int status { get; set; }
        public int UserID { get; set; }
        public int diseaseID { get; set; }
        public string FinalArray { get; set; }
        public string pathwayID { get; set; }
       // public string pathwayid_array { get; set; }

    }
    public class DAL_assignUser
    {
        public static void returnTable(PAL_UserDisease pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("assignDisease", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Parameters.AddWithValue("@userID", pobj.userID);
            //cmd.Parameters.AddWithValue("@status", pobj.status);
            cmd.Parameters.AddWithValue("@UserID", pobj.UserID);
            cmd.Parameters.AddWithValue("@diseaseID", pobj.diseaseID);
            cmd.Parameters.AddWithValue("@FinalArray", pobj.FinalArray);


            //cmd.Parameters.AddWithValue("@pathwayID", pobj.pathwayID);

            //cmd.Parameters.AddWithValue("@pathway_array", pobj.pathwayid_array);


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
            pobj.isException = Convert.ToBoolean(cmd.Parameters["@isException"].Value.ToString());
            pobj.exceptionMessage = cmd.Parameters["@exceptionMessage"].Value.ToString();
         }

    }
    public class BAL_UserDisease
    {
        public static void seveUserDisease(PAL_UserDisease pobj)
        {
            pobj.opcode = 11;
            DAL_assignUser.returnTable(pobj);
        }
        public static void getUserVDisease(PAL_UserDisease pobj)
        {
            pobj.opcode = 41;
            DAL_assignUser.returnTable(pobj);
        }

        public static void showUserDiseaseList(PAL_UserDisease pobj)
        {
            pobj.opcode = 42;
            DAL_assignUser.returnTable(pobj);
        }
        public static void deleteUserDisease(PAL_UserDisease pobj)
        {
            pobj.opcode = 31;
            DAL_assignUser.returnTable(pobj);
        }
    }
}
