using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLActivitiesApproval
{
    public class PAL_ActivitiesApproval : Utility
    {
        public int id { get; set; }
        public int pathwayId { get; set; }
        public int approveStatus { get; set; }
        public string activityName { get; set; }
        public string keyword { get; set; }
        public int phenomenonId { get; set; }
        public string fileName { get; set; }
        public int userID { get; set; }
        public int referenceID { get; set; }
    }
    public class DAL_ActivitiesApproval
    {
        public static void returnTable(PAL_ActivitiesApproval pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_ActivitiesApproval", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
                selectCommand.Parameters.AddWithValue("@id", pobj.id);
                selectCommand.Parameters.AddWithValue("@pathwayId", pobj.pathwayId);
                selectCommand.Parameters.AddWithValue("@phenomenonId", pobj.phenomenonId);
                selectCommand.Parameters.AddWithValue("@keyword", pobj.keyword);
                selectCommand.Parameters.AddWithValue("@approveStatus", pobj.approveStatus);
                selectCommand.Parameters.AddWithValue("@activityName", pobj.activityName);
                selectCommand.Parameters.AddWithValue("@userID", pobj.userID);
                selectCommand.Parameters.AddWithValue("@referenceID", pobj.referenceID);
                selectCommand.Parameters.AddWithValue("@resourceURL", pobj.fileName);
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
    public class BAL_ActivitiesApproval
    {
        public static void allowPathwayComponent(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 11;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void approveActivity(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 21;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void savePDF(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 22;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void funBreakLoop(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 23;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void getDiseasePathway(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 41;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void getActivitiesForApproval(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 42;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void getPathwayCompnents(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 43;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
        public static void getAllPDF(PAL_ActivitiesApproval pobj)
        {
            pobj.opcode = 44;
            DAL_ActivitiesApproval.returnTable(pobj);
        }
    }
}