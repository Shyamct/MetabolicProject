using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLFlowDiagram
{

	public class PAL_FlowDiagram : Utility
	{
		public int id { get; set; }
		public string fromKey { get; set; }
		public string tokey { get; set; }
		public string relation { get; set; }
		public string type { get; set; }
		public string cause { get; set; }
		public int userId { get; set; }
		public int pathwayId { get; set; }
		public string keyword { get; set; }
		public string prefix { get; set; }
		public int sno { get; set; }
		public int rank { get; set; }
		public int receptorId { get; set; }
		public DataTable DT_flowDiagram { get; set; }
		public string writeUp { get; set; }
		public string orginalWriteUp { get; set; }
		public string ids { get; set; } 
		public int status { get; set; }
		public DataTable DT_nutrientList { get; set; }
		public string rankName { get; set; }
		public int rankID { get; set; }
		public string parameterID { get; set; }
		public string questionText { get; set; }
		public string count_length { get; set; }
		public string pathwayid_array { get; set; }
		public string Status { get; set; }
		


	}
	public class DAL_FlowDiagram
	{
		public static void returnTable(PAL_FlowDiagram pobj)
		{
			try
			{
				SqlCommand selectCommand = new SqlCommand("proc_flowDiagram", new Config().con);
				selectCommand.CommandType = CommandType.StoredProcedure;
				selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
				selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
				selectCommand.Parameters.AddWithValue("@ids", (object)pobj.ids);
				selectCommand.Parameters.AddWithValue("@fromKey", (object)pobj.fromKey);
				selectCommand.Parameters.AddWithValue("@tokey", (object)pobj.tokey);
				selectCommand.Parameters.AddWithValue("@relation", (object)pobj.relation);
				selectCommand.Parameters.AddWithValue("@type", (object)pobj.type);
				selectCommand.Parameters.AddWithValue("@cause", (object)pobj.cause);
				selectCommand.Parameters.AddWithValue("@userId", (object)pobj.userId);
				selectCommand.Parameters.AddWithValue("@pathwayId", (object)pobj.pathwayId);
				selectCommand.Parameters.AddWithValue("@pathway_array", pobj.pathwayid_array);//--
				selectCommand.Parameters.AddWithValue("@keyword", (object)pobj.keyword);
				selectCommand.Parameters.AddWithValue("@prefix", (object)pobj.prefix);
				selectCommand.Parameters.AddWithValue("@sno", (object)pobj.sno);
				selectCommand.Parameters.AddWithValue("@rank", (object)pobj.rank);
				selectCommand.Parameters.AddWithValue("@status", (object)pobj.status);
				selectCommand.Parameters.AddWithValue("@receptorId", (object)pobj.receptorId);
				selectCommand.Parameters.AddWithValue("@writeUp", (object)pobj.writeUp);
				selectCommand.Parameters.AddWithValue("@orginalWriteUp", (object)pobj.orginalWriteUp);
				selectCommand.Parameters.AddWithValue("@DT_flowDiagram", (object)pobj.DT_flowDiagram);
				selectCommand.Parameters.AddWithValue("@DT_nutrientList", (object)pobj.DT_nutrientList);
				selectCommand.Parameters.AddWithValue("@rankID", (object)pobj.rankID);
				selectCommand.Parameters.AddWithValue("@parameterID", (object)pobj.parameterID);
				selectCommand.Parameters.AddWithValue("@who", (object)pobj.who);
				selectCommand.Parameters.AddWithValue("@rankName", (object)pobj.rankName);
				selectCommand.Parameters.AddWithValue("@questionText", (object)pobj.questionText);

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
			catch(Exception ex)
            {

            }
		}
		
		public static void returnTable3(PAL_FlowDiagram pobj)
		{
			SqlCommand selectCommand = new SqlCommand("proc_testflowdiagram", new Config().con);
			selectCommand.CommandType = CommandType.StoredProcedure;
			selectCommand.Parameters.AddWithValue("@userId", (object)pobj.userId);
			//selectCommand.Parameters.AddWithValue("@pathwayId", (object)pobj.pathwayId);
			selectCommand.Parameters.AddWithValue("@pathwayid_array", pobj.pathwayid_array);//--
																							//selectCommand.Parameters.AddWithValue("@keyword", (object)pobj.keyword);
			selectCommand.Parameters.AddWithValue("@sno", (object)pobj.sno);
			selectCommand.Parameters.AddWithValue("@rank", (object)pobj.rank);
			selectCommand.Parameters.AddWithValue("@receptorId", (object)pobj.receptorId);
			selectCommand.Parameters.AddWithValue("@writeUp", (object)pobj.writeUp);
			selectCommand.Parameters.AddWithValue("@orginalWriteUp", (object)pobj.orginalWriteUp);
			selectCommand.Parameters.AddWithValue("@DT_flowDiagram", (object)pobj.DT_flowDiagram);
			selectCommand.Parameters.AddWithValue("@DT_nutrientList", (object)pobj.DT_nutrientList);
			selectCommand.Parameters.AddWithValue("@who", (object)pobj.who);
			//selectCommand.Parameters.AddWithValue("@rankName", (object)pobj.rankName);
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

	public class BAL_FlowDiagram
	{
		public static void Insert(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 11;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void saveRankName(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 12;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void saveResearchBasedQuestion(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 13;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void updateSNO(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 21;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void updateRank(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 22;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void updateStatus(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 23;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void updateResearchBasedQuestion(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 24;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void Delete(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 31;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void deleteRank(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 32;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void DeleteResearchBasedQuestion(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 33;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void pathwaySelecter(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 41;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void getWriteUp(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 42;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void getRank(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 43;
			DAL_FlowDiagram.returnTable(pobj);
		}
        
		public static void getMaster(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 45;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void getResearchBasedQuestionList(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 46;
			DAL_FlowDiagram.returnTable(pobj);
		}
		public static void getDisease(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 47;
			DAL_FlowDiagram.returnTable(pobj);
		}

		public static void deleteMultipleWriteUp(PAL_FlowDiagram pobj)
		{
			pobj.opcode = 34;
			DAL_FlowDiagram.returnTable(pobj);
		}

	}
}