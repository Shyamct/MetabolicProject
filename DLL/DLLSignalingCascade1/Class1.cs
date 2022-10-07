using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLSignalingCascade1
{
    public class PAL_SignalingCascade1 : Utility
    {
        public int diseaseID { get; set; }
        public int processID { get; set; }
        public int signalingID { get; set; }
        public string foodFamily { get; set; }
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        public int foodID { get; set; }
        public int nutrientID { get; set; }
        public int foodFamilyID { get; set; }
        public string interactedNutrient { get; set; }
        public string cascadeNutrient { get; set; }
        public string status { get; set; }

    }
    public class DAL_SignalingCascade1
    {
        public static void returnTable(PAL_SignalingCascade1 pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_SignalingCascadeNew", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.CommandTimeout = 100000000;
                selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
                selectCommand.Parameters.AddWithValue("@diseaseID", (object)pobj.diseaseID);
                selectCommand.Parameters.AddWithValue("@signalingID", (object)pobj.signalingID);
                selectCommand.Parameters.AddWithValue("@processID", (object)pobj.processID);
                selectCommand.Parameters.AddWithValue("@foodFamily", (object)pobj.foodFamily);
                selectCommand.Parameters.AddWithValue("@foodID", (object)pobj.foodID);
                selectCommand.Parameters.AddWithValue("@status", (object)pobj.status);
                selectCommand.Parameters.AddWithValue("@pageIndex", (object)pobj.pageIndex);
                selectCommand.Parameters.AddWithValue("@pageSize", (object)pobj.pageSize);
                selectCommand.Parameters.AddWithValue("@effectNutrientID", (object)pobj.nutrientID);
                selectCommand.Parameters.AddWithValue("@foodFamilyID", (object)pobj.foodFamilyID);
                selectCommand.Parameters.AddWithValue("@interactedNutrient", (object)pobj.interactedNutrient);
                selectCommand.Parameters.AddWithValue("@cascadeNutrient", (object)pobj.cascadeNutrient);
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
    public class BAL_SignalingCascade1
    {
        public static void getDisease(PAL_SignalingCascade1 pobj)
        {
            pobj.opcode = 41;
            DAL_SignalingCascade1.returnTable(pobj);
        }
        public static void getSignalingCascade(PAL_SignalingCascade1 pobj)
        {
            //pobj.opcode = 42;
            pobj.opcode = 47;
            DAL_SignalingCascade1.returnTable(pobj);
        }
        public static void getNutrientFunction(PAL_SignalingCascade1 pobj)
        {
            pobj.opcode = 43;
            DAL_SignalingCascade1.returnTable(pobj);
        }
        public static void getFood(PAL_SignalingCascade1 pobj)
        {
            pobj.opcode = 44;
            DAL_SignalingCascade1.returnTable(pobj);
        }
        public static void getFoodDetails(PAL_SignalingCascade1 pobj)
        {
            pobj.opcode = 45;
            DAL_SignalingCascade1.returnTable(pobj);
        }
        public static void getFoodFamilyDetails(PAL_SignalingCascade1 pobj)
        {
            pobj.opcode = 46;
            DAL_SignalingCascade1.returnTable(pobj);
        }
    }
}
