using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DAL_scoringSystem
{
    public class PAL_scoringSystem : Utility
    {
        public string pathwayID { get; set; }
        public int userID { get; set; }
        public int nutrientID { get; set; }
        public string processID { get; set; }
        public int processIDINT { get; set; }
        public int score { get; set; }
        public int finalMarkerScore { get; set; }
        public int interactedNutrientID { get; set; }
        public string rankName { get; set; }
        public int PID { get; set; }

    }
    public class DAL_scoringSystem
    {
        public static void returnTable(PAL_scoringSystem pobj)
        {
            SqlCommand selectCommand = new SqlCommand("scoringSystem", new Config().con);
            selectCommand.CommandType = CommandType.StoredProcedure;

            selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
            selectCommand.Parameters.AddWithValue("@userID", pobj.userID);
            selectCommand.Parameters.AddWithValue("@pathwayID", pobj.pathwayID);
            selectCommand.Parameters.AddWithValue("@processID", pobj.processID);
            selectCommand.Parameters.AddWithValue("@processIDINT", pobj.processIDINT);
            selectCommand.Parameters.AddWithValue("@score", pobj.score);
            selectCommand.Parameters.AddWithValue("@nutrientID", pobj.nutrientID);
            selectCommand.Parameters.AddWithValue("@markerScore", pobj.finalMarkerScore);
            selectCommand.Parameters.AddWithValue("@interactedNutrientID", pobj.interactedNutrientID);
            selectCommand.Parameters.AddWithValue("@rankName", pobj.rankName);
            selectCommand.Parameters.AddWithValue("@PID", pobj.PID);

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
    public class BAL_scoringSystem
    {
        public static void getHeader(PAL_scoringSystem pobj)
        {
            pobj.opcode = 41;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getAllProcess(PAL_scoringSystem pobj)
        {
            pobj.opcode = 42;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getFinalReport(PAL_scoringSystem pobj)
        {
            pobj.opcode = 43;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getIntructionNutrient(PAL_scoringSystem pobj)
        {
            pobj.opcode = 44;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getFood(PAL_scoringSystem pobj)
        {
            pobj.opcode = 45;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getOnlyScore(PAL_scoringSystem pobj)
        {
            pobj.opcode = 46;
            DAL_scoringSystem.returnTable(pobj);
        }

        public static void updateScore(PAL_scoringSystem pobj)
        {
            pobj.opcode = 21;
            DAL_scoringSystem.returnTable(pobj);
        }
        public static void getVitalScore(PAL_scoringSystem pobj)
        {
            pobj.opcode = 47;
            DAL_scoringSystem.returnTable(pobj);
        }
       
    }
}
