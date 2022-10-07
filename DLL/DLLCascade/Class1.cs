using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLCascade
{
    public class PAL_Cascade : Utility
    {
        public int diseaseID { get; set; }
        public int nutrientID { get; set; }
        public int foodFamilyID { get; set; }
        public int cascadeID { get; set; }
        public int foodID { get; set; }
        public int receptorID { get; set; }
        public int process { get; set; }
        public string cascadeNutrient { get; set; }
        public string interactedNutrient { get; set; }
        public string foodFamily { get; set; }
    }
    public class DAL_Cascade
    {
        public static void returnTable(PAL_Cascade pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_cascade", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.CommandTimeout = 100000000;
                selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
                selectCommand.Parameters.AddWithValue("@diseaseID", (object)pobj.diseaseID);
                selectCommand.Parameters.AddWithValue("@effectNutrientID", (object)pobj.nutrientID);
                selectCommand.Parameters.AddWithValue("@foodFamilyID", (object)pobj.foodFamilyID);
                selectCommand.Parameters.AddWithValue("@cascadeID", (object)pobj.cascadeID);
                selectCommand.Parameters.AddWithValue("@foodID", (object)pobj.foodID);
                selectCommand.Parameters.AddWithValue("@receptorID", (object)pobj.receptorID);
                selectCommand.Parameters.AddWithValue("@process", (object)pobj.process);
                selectCommand.Parameters.AddWithValue("@cascadeNutrient", (object)pobj.cascadeNutrient);
                selectCommand.Parameters.AddWithValue("@interactedNutrient", (object)pobj.interactedNutrient);
                selectCommand.Parameters.AddWithValue("@foodFamily", (object)pobj.foodFamily);
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
    public class BAL_Cascade
    {
        public static void getDisease(PAL_Cascade pobj)
        {
            pobj.opcode = 41;
            DAL_Cascade.returnTable(pobj);
        }
        public static void getSignalingCascade(PAL_Cascade pobj)
        {
            pobj.opcode = 42;
            DAL_Cascade.returnTable(pobj);
        }
        public static void getNutrientFunction(PAL_Cascade pobj)
        {
            pobj.opcode = 43;
            DAL_Cascade.returnTable(pobj);
        }
        public static void getFood(PAL_Cascade pobj)
        {
            pobj.opcode = 44;
            DAL_Cascade.returnTable(pobj);
        }
        public static void getFoodDetails(PAL_Cascade pobj)
        {
            pobj.opcode = 45;
            DAL_Cascade.returnTable(pobj);
        }
        public static void getFoodFamilyDetails(PAL_Cascade pobj)
        {
            pobj.opcode = 46;
            DAL_Cascade.returnTable(pobj);
        }
    }
}
