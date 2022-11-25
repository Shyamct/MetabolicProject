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
        public int status { get; set; }
       
    }
    public class DAL_assignAttribute
    {
        public static void returnTable(PAL_assignAttribute pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("attributeMasterProcedure", con.con);
            cmd.CommandType = CommandType.StoredProcedure;

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
    public class BAL_assignAttribute
    {
       
        public static void getAttributeWITHuser(PAL_assignAttribute pobj)
        {
            pobj.opcode = 43;
            DAL_assignAttribute.returnTable(pobj);
        }
        
    }
}
