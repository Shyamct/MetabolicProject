using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLFlowchart
{
    public class PAL_FlowChart : Utility
    {
        public int id { get; set; }
        public int parentid { get; set; }
        public int keyid { get; set; }
        public string role { get; set; }
        public string display_side { get; set; }
        public int userid { get; set; }
        public int pathwayId { get; set; }
        public string pathwayIds { get; set; }
        public string receptorIds { get; set; }
    }

    public class DAL_FlowChart
    {
        public static void returnTable(PAL_FlowChart pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_flowChart", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
                selectCommand.Parameters.AddWithValue("@id", pobj.id);
                selectCommand.Parameters.AddWithValue("@parentid", pobj.parentid);
                selectCommand.Parameters.AddWithValue("@keyid", pobj.keyid);
                selectCommand.Parameters.AddWithValue("@role", pobj.role);
                selectCommand.Parameters.AddWithValue("@display_side", pobj.display_side);
                selectCommand.Parameters.AddWithValue("@userid", pobj.userid);
                selectCommand.Parameters.AddWithValue("@who", pobj.who);
                selectCommand.Parameters.AddWithValue("@pathwayId", pobj.pathwayId);
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
            catch(Exception ex) { 
            
            }
        }
    }

    public class DAL_MergedPathway
    {
        public static void returnTable(PAL_FlowChart pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_MergedPathwayRelation", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
                selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
                selectCommand.Parameters.AddWithValue("@pathwayId", pobj.pathwayId);
                selectCommand.Parameters.AddWithValue("@keyid", pobj.keyid);
                selectCommand.Parameters.AddWithValue("@who", (object)pobj.who);
                selectCommand.Parameters.AddWithValue("@pathwayIds", (object)pobj.pathwayIds);
                selectCommand.Parameters.AddWithValue("@receptorIds", (object)pobj.receptorIds);
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

    public class BAL_FlowChart
    {
        public static void InsertFlowchartDetails(PAL_FlowChart pobj)
        {
            pobj.opcode = 11;
            DAL_FlowChart.returnTable(pobj);
        }

        public static void UpdateFlowchartDetails(PAL_FlowChart pobj)
        {
            pobj.opcode = 21;
            DAL_FlowChart.returnTable(pobj);
        }

        public static void deleteFlowchartDetails(PAL_FlowChart pobj)
        {
            pobj.opcode = 31;
            DAL_FlowChart.returnTable(pobj);
        }

        public static void getFlowchartDetails(PAL_FlowChart pobj)
        {
            pobj.opcode = 41;
            DAL_FlowChart.returnTable(pobj);
        }

        public static void getPathwayList(PAL_FlowChart pobj)
        {
            pobj.opcode = 42;
            DAL_FlowChart.returnTable(pobj);
        }

        public static void getKeyword(PAL_FlowChart pobj)
        {
            pobj.opcode = 43;
            DAL_FlowChart.returnTable(pobj);
        }
        public static void getNutrient(PAL_FlowChart pobj)
        {
            pobj.opcode = 44;
            DAL_FlowChart.returnTable(pobj);
        }
    }

    public class BAL_MergedPathway
    {
        public static void getsampleGraph(PAL_FlowChart pobj)
        {
            pobj.opcode = 41;
            DAL_MergedPathway.returnTable(pobj);
        }
    }
}
