using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DAL_nutrientChart
{
    public class PAL_nutrientChart : Utility
    {
        public int pathwayID { get; set; }
        public string images { get; set; }
    }
    public class DAL_nutrientChart
    {
        public static void returnTable(PAL_nutrientChart pobj)
        {
            SqlCommand selectCommand = new SqlCommand("nutrientChart", new Config().con);
            selectCommand.CommandType = CommandType.StoredProcedure;

            selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
            selectCommand.Parameters.AddWithValue("@pathwayID", pobj.pathwayID);
            selectCommand.Parameters.AddWithValue("@images", pobj.images);
            

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
    public class BAL_nutrientChart
    {
      

        public static void insertChart(PAL_nutrientChart pobj)
        {
            pobj.opcode = 11;
            DAL_nutrientChart.returnTable(pobj);
        }
        public static void getChart(PAL_nutrientChart pobj)
        {
            pobj.opcode = 41;
            DAL_nutrientChart.returnTable(pobj);
        }
    }
}
