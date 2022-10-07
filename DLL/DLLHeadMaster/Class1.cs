using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLHeadMaster
{
	public class PAL_HeadMaster : Utility
	{
		public int id { get; set; }

		public string headName { get; set; }

		public int parentId { get; set; }

		public string svgImg { get; set; }

		public int status { get; set; }
	}
	public class DAL_HeadMaster
	{
		public static void returnTable(PAL_HeadMaster pobj)
		{
			SqlCommand selectCommand = new SqlCommand("proc_headerMaster", new Config().con);
			selectCommand.CommandType = CommandType.StoredProcedure;
			selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
			selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
			selectCommand.Parameters.AddWithValue("@headName", (object)pobj.headName);
			selectCommand.Parameters.AddWithValue("@parentId", (object)pobj.parentId);
			selectCommand.Parameters.AddWithValue("@svgImg", (object)pobj.svgImg);
			selectCommand.Parameters.AddWithValue("@status", pobj.status);
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
	}
	public class BAL_HeadMaster
	{
		public static void InsertNewHead(PAL_HeadMaster pobj)
		{
			pobj.opcode = 11;
			DAL_HeadMaster.returnTable(pobj);
		}

		public static void saveSVGImge(PAL_HeadMaster pobj)
		{
			pobj.opcode = 12;
			DAL_HeadMaster.returnTable(pobj);
		}

		public static void GetHeadList(PAL_HeadMaster pobj)
		{
			pobj.opcode = 41;
			DAL_HeadMaster.returnTable(pobj);
		}

		public static void OpenSvgImage(PAL_HeadMaster pobj)
		{
			pobj.opcode = 42;
			DAL_HeadMaster.returnTable(pobj);
		}

		public static void getKeywordList(PAL_HeadMaster pobj)
		{
			pobj.opcode = 43;
			DAL_HeadMaster.returnTable(pobj);
		}
		public static void getAllHead(PAL_HeadMaster pobj)
		{
			pobj.opcode = 44;
			DAL_HeadMaster.returnTable(pobj);
		}
	}
}
