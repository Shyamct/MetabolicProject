using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLUtility
{
	public class Utility
	{
		public int opcode { get; set; }

		public bool isException { get; set; }

		public string exceptionMessage { get; set; }

		public DataSet DS { get; set; }

		public string who { get; set; }
	}
	public class Config     
	{
		public SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["dbConnect"].ToString());
	}
}
