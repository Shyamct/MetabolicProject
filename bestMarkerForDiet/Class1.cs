using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DAL_scoringSystem
{
    public class PAL_scoringSystem : Utility
    {
        public int pathwayID { get; set; }
        public int userID { get; set; }
        public string processID { get; set; }
    }
    public class DAL_scoringSystem
    {
        public static void returnTable(PAL_scoringSystem pobj)
        {
            SqlCommand selectCommand = new SqlCommand("bestMarker", new Config().con);
            selectCommand.CommandType = CommandType.StoredProcedure;

            selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
            selectCommand.Parameters.AddWithValue("@userID", pobj.userID);
            selectCommand.Parameters.AddWithValue("@pathwayID", pobj.pathwayID);
            selectCommand.Parameters.AddWithValue("@processID", pobj.processID);

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
    public class BAL_scoringSystem
    {
        public static void getHeader(PAL_scoringSystem pobj)
        {
            pobj.opcode = 41;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getAllProcess(PAL_scoringSystem pobj)
        {
            pobj.opcode = 42;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getFinalReport(PAL_scoringSystem pobj)
        {
            pobj.opcode = 43;
            DAL_scoringSystem.returnTable(pobj);
        }
    }
}
