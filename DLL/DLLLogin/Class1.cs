using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLLogin
{
	public class PAL_Login : Utility
	{
		public int id { get; set; }
		public string mobileNo { get; set; }
		public string password { get; set; }
	}
	public class DAL_Login
	{
		public static void returnTable(PAL_Login pobj)
		{
			SqlCommand selectCommand = new SqlCommand("proc_login", new Config().con);
			selectCommand.CommandType = CommandType.StoredProcedure;
			selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
			selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
			selectCommand.Parameters.AddWithValue("@mobileNo", (object)pobj.mobileNo);
			selectCommand.Parameters.AddWithValue("@password", (object)pobj.password);
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
	public class BAL_Login
	{
		public static void checkLogin(PAL_Login pobj)
		{
			pobj.opcode = 41;
			DAL_Login.returnTable(pobj);
		}
	}
}
