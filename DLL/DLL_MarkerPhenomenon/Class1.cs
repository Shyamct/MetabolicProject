using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;


namespace DLL_MarkerPhenomenon
{
    public class PAL_markerPhenomenon : Utility
    {
        public int markerID { get; set; }
        public string markerName { get; set; }
      public string PathwayName { get; set; }
       //  public int phenomenonID { get; set; }
        public string PhenomenonName { get; set; }
    }
    public class DAL_markerPhenomenon
    {
        public static void returnTable(PAL_markerPhenomenon pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("markerPhenomenon", con.con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@markerID", pobj.markerID);
            cmd.Parameters.AddWithValue("@markerName", pobj.markerName);
            cmd.Parameters.AddWithValue("@PathwayName", pobj.PathwayName);
            //cmd.Parameters.AddWithValue("@phenomenonID", pobj.phenomenonID);
            cmd.Parameters.AddWithValue("@PhenomenonName", pobj.PhenomenonName);

            cmd.Parameters.AddWithValue("@who", pobj.who);
            cmd.Parameters.AddWithValue("@opcode", pobj.opcode);

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
    public class BAL_markerPhenomenon
    {
        public static void getMarker(PAL_markerPhenomenon pobj)
        {
            pobj.opcode = 41;
            DAL_markerPhenomenon.returnTable(pobj);
        }
        public static void getPathway(PAL_markerPhenomenon pobj)
        {
            pobj.opcode = 42;
            DAL_markerPhenomenon.returnTable(pobj);
        }
        public static void getPhenomenonReport(PAL_markerPhenomenon pobj)
        {
            pobj.opcode = 43;
            DAL_markerPhenomenon.returnTable(pobj);
        }
    }
}