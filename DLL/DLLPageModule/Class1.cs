using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLPageModule
{
    public class PAL_pageModule : Utility
    {
        public int id { get; set; }
        public string userName { get; set; }

    }
    public class DAL_pageModule
    {
        public static void returnTable(PAL_pageModule pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("module", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", pobj.id);
            cmd.Parameters.AddWithValue("@userName", pobj.userName);
            cmd.Parameters.AddWithValue("@opcode", pobj.opcode);
            cmd.Parameters.AddWithValue("@who", (object)pobj.who);
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
    public class BAL_pageModule
    {
        public static void getUserName(PAL_pageModule pobj)
        {
            pobj.opcode = 41;
            DAL_pageModule.returnTable(pobj);
        }
    }
}
