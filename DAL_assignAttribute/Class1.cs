using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DAL_assignAttribute
{
    public class PAL_assignAttribute : Utility
    {
        public int userID { get; set; }
        public int ID { get; set; }
        public int status { get; set; }
        public int parentID { get; set; }
        public string FinalArray { get; set; }
       
    }
    public class DAL_assignAttribute
    {
        public static void returnTable(PAL_assignAttribute pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("attributeMasterProcedure", con.con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@who", pobj.who);
            cmd.Parameters.AddWithValue("@ID", pobj.ID);
            cmd.Parameters.AddWithValue("@opCode", pobj.opcode);
            cmd.Parameters.AddWithValue("@parentID", pobj.parentID);
            cmd.Parameters.AddWithValue("@userID", pobj.userID);
            cmd.Parameters.AddWithValue("@FinalArray", pobj.FinalArray);


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
    public class BAL_assignAttribute
    {
       
       
        public static void getAttributeList(PAL_assignAttribute pobj)
        {
            pobj.opcode = 41;
            DAL_assignAttribute.returnTable(pobj);
        }
        public static void getAttributeListChild(PAL_assignAttribute pobj)
        {
            pobj.opcode = 42;
            DAL_assignAttribute.returnTable(pobj);
        }
        public static void getAttributeWITHuser(PAL_assignAttribute pobj)
        {
            pobj.opcode = 43;
            DAL_assignAttribute.returnTable(pobj);
        }
        public static void saveAttributeWITHuser(PAL_assignAttribute pobj)
        {
            pobj.opcode = 11;
            DAL_assignAttribute.returnTable(pobj);
        }
        public static void getAttributeAssignList(PAL_assignAttribute pobj)
        {
            pobj.opcode = 44;
            DAL_assignAttribute.returnTable(pobj);
        }
        public static void deleteAssignUser(PAL_assignAttribute pobj)
        {
            pobj.opcode = 31;
            DAL_assignAttribute.returnTable(pobj);
        }
    }
}
