using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLMainPathway
{
	public class PAL_PathwayMain : Utility
	{
		public int id { get; set; }

		public DataTable DT_PathwayRelation { get; set; }

		public int pathwayId { get; set; }

		public int keyid { get; set; }

		public string keyword { get; set; }

		public string prefix { get; set; }
        
    }
	public class DAL_PathwayMain
	{
		public static void returnTable(PAL_PathwayMain pobj)
		{
			try
			{
				SqlCommand selectCommand = new SqlCommand("proc_pathwayRelation", new Config().con);
				selectCommand.CommandType = CommandType.StoredProcedure;
				selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
				selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
                selectCommand.Parameters.AddWithValue("@DT_PathwayRelation", (object)pobj.DT_PathwayRelation);
				selectCommand.Parameters.AddWithValue("@pathwayId", (object)pobj.pathwayId);
				selectCommand.Parameters.AddWithValue("@keyid", (object)pobj.keyid);
				selectCommand.Parameters.AddWithValue("@keyword", (object)pobj.keyword);
				selectCommand.Parameters.AddWithValue("@prefix", (object)pobj.prefix);
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
	public class BAL_PathwayMain
	{
		public static void InsertKey(PAL_PathwayMain pobj)
		{
			pobj.opcode = 11;
			DAL_PathwayMain.returnTable(pobj);
		}

		public static void getKeyword(PAL_PathwayMain pobj)
		{
			pobj.opcode = 41;
			DAL_PathwayMain.returnTable(pobj);
		}

		public static void getExistingKeyword(PAL_PathwayMain pobj)
		{
			pobj.opcode = 42;
			DAL_PathwayMain.returnTable(pobj);
		}

		public static void getPathwayGraph(PAL_PathwayMain pobj)
		{
			pobj.opcode = 43;
			DAL_PathwayMain.returnTable(pobj);
		}

		public static void pathwaySelecter(PAL_PathwayMain pobj)
		{
			pobj.opcode = 44;
			DAL_PathwayMain.returnTable(pobj);
		}

		public static void getEat(PAL_PathwayMain pobj)
		{
			pobj.opcode = 45;
			DAL_PathwayMain.returnTable(pobj);
		}
        public static void regroupingLayoutData(PAL_PathwayMain pobj)
        {
            pobj.opcode = 46;
            DAL_PathwayMain.returnTable(pobj);
        }
    }
}
