using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLPatientInvestigationReport
{
    public class PAL_PatientInvestigationReport : Utility
    {
        public string pid { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public int categoryID { get; set; }
        public string nutrientName { get; set; }
        public int diseaseID { get; set; }
    }
    public class DAL_PatientInvestigationReport
    {
        public static void returnTable(PAL_PatientInvestigationReport pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_patientIvestigationReport", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.CommandTimeout = 100000000;
                selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
                selectCommand.Parameters.AddWithValue("@pid", (object)pobj.pid);
                selectCommand.Parameters.AddWithValue("@fromDate", (object)pobj.fromDate);
                selectCommand.Parameters.AddWithValue("@toDate", (object)pobj.toDate);
                selectCommand.Parameters.AddWithValue("@categoryID", (object)pobj.categoryID);
                selectCommand.Parameters.AddWithValue("@nutrientName", (object)pobj.nutrientName);
                selectCommand.Parameters.AddWithValue("@diseaseID", (object)pobj.diseaseID);
                selectCommand.Parameters.AddWithValue("@who", (object)pobj.who);
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
            catch (Exception ex)
            {
            }
        }
    }
    public class BAL_PatientInvestigationReport
    {
        public static void getPatientInvestigationReport(PAL_PatientInvestigationReport pobj)
        {
            pobj.opcode = 41;
            DAL_PatientInvestigationReport.returnTable(pobj);
        }
        public static void getAllCategory(PAL_PatientInvestigationReport pobj)
        {
            pobj.opcode = 42;
            DAL_PatientInvestigationReport.returnTable(pobj);
        }
        public static void getDiet(PAL_PatientInvestigationReport pobj)
        {
            pobj.opcode = 43;
            DAL_PatientInvestigationReport.returnTable(pobj);
        }
    }
}
