using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLSignalingCascade
{
    public class PAL_SignalingCascade : Utility
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
        public int isFiltered { get; set; }
        public int foodGroupID { get; set; }
        public string cascadeName { get; set; }
        public int pathwayId { get; set; }
        public int foodIDS { get; set; }
        public int nutrientId { get; set; }


    }
    public class DAL_SignalingCascade
    {
        public static void returnTable(PAL_SignalingCascade pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_signalingCascadeNew", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.CommandTimeout = 200000000;
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
                selectCommand.Parameters.AddWithValue("@isFiltered", (object)pobj.isFiltered);
                
                selectCommand.Parameters.AddWithValue("@foodGroupID", (object)pobj.foodGroupID);
                selectCommand.Parameters.AddWithValue("@cascadeName", (object)pobj.cascadeName);
                selectCommand.Parameters.AddWithValue("@pathwayId", (object)pobj.pathwayId);

                selectCommand.Parameters.AddWithValue("@foodIDS", (object)pobj.foodIDS);

                selectCommand.Parameters.AddWithValue("@nutrientId", (object)pobj.nutrientId);



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
                Console.WriteLine(ex);
            }
        }
    }
    public class BAL_SignalingCascade
    {
        public static void getDisease(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 41;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getSignalingCascade(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 42;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getNutrientFunction(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 43;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getFood(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 44;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getFoodDetails(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 45;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getFoodFamilyDetails(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 46;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getFoods(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 47;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getFoodReport(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 48;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getFoodNutrientList(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 49;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getMarkerDetail(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 410;
            DAL_SignalingCascade.returnTable(pobj);
        }
        //public static void getResearchPaper(PAL_SignalingCascade pobj)
        //{
        //    pobj.opcode = 411;
        //    DAL_SignalingCascade.returnTable(pobj);
        //}
        public static void getDocking(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 412;
            DAL_SignalingCascade.returnTable(pobj);
        }

        public static void getNutrientListFood(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 413;
            DAL_SignalingCascade.returnTable(pobj);
        }
        public static void getOilSignalingCascade(PAL_SignalingCascade pobj)
        {
            pobj.opcode = 414;
            DAL_SignalingCascade.returnTable(pobj);
        }
        
    }
}
