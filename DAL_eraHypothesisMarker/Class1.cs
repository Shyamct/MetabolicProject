using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DAL_eraHypothesisMarker
{
    public class PAL_eraHypothesisMarker:Utility
    {
        public string diseaseID { get; set; }
        public int processID { get; set; }
    }
    public class DAL_eraHypothesisMarker
    {
        public static void returnTable(PAL_eraHypothesisMarker pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("hypothesisMerker", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            
            cmd.Parameters.AddWithValue("@diseaseID", pobj.diseaseID);
            cmd.Parameters.AddWithValue("@processID", pobj.processID);

            
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
    public class BAL_eraHypothesisMarker
    {
        public static void getDiseaseWiseHypothesis(PAL_eraHypothesisMarker pobj)
        {
            pobj.opcode = 41;
            DAL_eraHypothesisMarker.returnTable(pobj);
        }
        public static void getALLDiseaseWiseHypothesis(PAL_eraHypothesisMarker pobj)
        {
            pobj.opcode = 42;
            DAL_eraHypothesisMarker.returnTable(pobj);
        }
    }
}
