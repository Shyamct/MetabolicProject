using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DAL_bestMarkerForDiet
{
    public class PAL_bestMarkerForDiet: Utility
    {
        public int pathwayID { get; set; }
    }
    public class DAL_bestMarkerForDiet
    {
        public static void returnTable(PAL_bestMarkerForDiet pobj)
        {
            SqlCommand selectCommand = new SqlCommand("bestMarker", new Config().con);
            selectCommand.CommandType = CommandType.StoredProcedure;

            selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);

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
    public class BAL_bestMarkerForDiet 
    {
        public static void getHeader(PAL_bestMarkerForDiet pobj)
        {
            pobj.opcode = 41;
            DAL_bestMarkerForDiet.returnTable(pobj);
        }
        public static void getFinalReport(PAL_bestMarkerForDiet pobj)
        {
            pobj.opcode = 42;
            DAL_bestMarkerForDiet.returnTable(pobj);
        }
    }
}
