using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLMarkerRoleMatrix
{
    public class PAL_MarkerRoleMatrix:Utility
    {
        public  int nutrientID { get; set; }
        public int processID { get; set; }

        public string nutrientName { get; set; }


       // public int PhenomenonID { get; set; }
        public string phenomenonName { get; set; }
        public string Disease { get; set; }
        public int problemWeightageID { get; set; }
        public string problemName { get; set; }
        public string statusFor { get; set; }


       // public int status { get; set; }
       // public  string who { get; set; }

    }
    public class DAL_markerRoleMatrix
    {
        public static void returnTable(PAL_MarkerRoleMatrix pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("markerRoleMatrix", con.con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@nutrientID", pobj.nutrientID);
            cmd.Parameters.AddWithValue("@processID", pobj.processID);

            cmd.Parameters.AddWithValue("@nutrientName", pobj.nutrientName);

          //  cmd.Parameters.AddWithValue("@PhenomenonID", pobj.PhenomenonID);
            cmd.Parameters.AddWithValue("@phenomenonName", pobj.phenomenonName);


            cmd.Parameters.AddWithValue("@Disease", pobj.Disease);
            cmd.Parameters.AddWithValue("@problemWeightageID", pobj.problemWeightageID);
            cmd.Parameters.AddWithValue("@problemName", pobj.problemName);
            cmd.Parameters.AddWithValue("@statusFor", pobj.statusFor);


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
    public class BAL_markerRoleMatrix
    {
        public static void getNutrientHeader(PAL_MarkerRoleMatrix pobj)
        {
            pobj.opcode = 41;
            DAL_markerRoleMatrix.returnTable(pobj);
        }
        public static void getMarkerRoleMatrixReport(PAL_MarkerRoleMatrix pobj)
        {
            pobj.opcode = 42;
            DAL_markerRoleMatrix.returnTable(pobj);
        }
        public static void getPhenomenons(PAL_MarkerRoleMatrix pobj)
        {
            pobj.opcode = 43;
            DAL_markerRoleMatrix.returnTable(pobj);
        }
        public static void getPhenomenonRoleMatrixReport(PAL_MarkerRoleMatrix pobj)
        {
            pobj.opcode = 44;
            DAL_markerRoleMatrix.returnTable(pobj);
        }
    }
}
