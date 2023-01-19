using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DLLUtility;
using System.Data;
using System.Data.SqlClient;



namespace DAL_processColor
{
    public class PAL_processColor : Utility
    {
        public int processID { get; set; }
        public string colors { get; set; }
    }
    public class DAL_processColor
    {
        public static void returnTable(PAL_processColor pobj)
        {
            SqlCommand selectCommand = new SqlCommand("colorProcess", new Config().con);
            selectCommand.CommandType = CommandType.StoredProcedure;

            selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
            selectCommand.Parameters.AddWithValue("@processID", pobj.processID);
            selectCommand.Parameters.AddWithValue("@colors", pobj.colors);


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
    }
    public class BAL_processColor
    {


        public static void updateProcessColor(PAL_processColor pobj)
        {
            pobj.opcode = 21;
            DAL_processColor.returnTable(pobj);
        }
        public static void getallProcessColor(PAL_processColor pobj)
        {
            pobj.opcode = 41;
            DAL_processColor.returnTable(pobj);
        }
    }
}
