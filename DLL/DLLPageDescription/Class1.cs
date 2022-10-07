using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DLLPageDescription
{
    public class PAL_pageDescription : Utility
    {
        public int      id      { get; set; }
        public string    heading { get; set; }
        public int        status  { get; set; }
        public string pageName { get; set; }
        public int userID { get; set; }
        public string color { get; set; }
        public string image { get; set; }
        public string description { get; set; }
        public string note { get; set; }

        

    }
    public class DAL_pageDescription
    {
        public static void returnTable(PAL_pageDescription pobj)
        {
            Config con = new Config();

            SqlCommand selectCommand = new SqlCommand("pageDescription", con.con);
            selectCommand.CommandType = CommandType.StoredProcedure;
            selectCommand.Parameters.AddWithValue("@opCode", (object)pobj.opcode);
            selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
            selectCommand.Parameters.AddWithValue("@status", (object)pobj.status);
            selectCommand.Parameters.AddWithValue("@pageName", (object)pobj.pageName);
            selectCommand.Parameters.AddWithValue("@heading", (object)pobj.heading);
            selectCommand.Parameters.AddWithValue("@color", (object)pobj.color);
            selectCommand.Parameters.AddWithValue("@image", (object)pobj.image);
            selectCommand.Parameters.AddWithValue("@details", (object)pobj.description);
            selectCommand.Parameters.AddWithValue("@note", (object)pobj.note);
            selectCommand.Parameters.AddWithValue("@userID", (object)pobj.userID);
            

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
    public class BAL_pageDescription
    {
        public static void insertDescription(PAL_pageDescription pobj)
        {
            pobj.opcode = 11;
            DAL_pageDescription.returnTable(pobj);
        }
        public static void insertNote(PAL_pageDescription pobj)
        {
            pobj.opcode = 12;
            DAL_pageDescription.returnTable(pobj);
        }
        public static void showDetails(PAL_pageDescription pobj)
        {
            pobj.opcode = 41;
            DAL_pageDescription.returnTable(pobj);
        }
        public static void showNote(PAL_pageDescription pobj)
        {
            pobj.opcode = 42;
            DAL_pageDescription.returnTable(pobj);
        }
        public static void updatePageDescription(PAL_pageDescription pobj)
        {
            pobj.opcode = 21;
            DAL_pageDescription.returnTable(pobj);
        }
        public static void deletePageDescription(PAL_pageDescription pobj)
        {
            pobj.opcode = 31;
            DAL_pageDescription.returnTable(pobj);
        }
        public static void getdetailbyid(PAL_pageDescription pobj)
        {
            pobj.opcode = 44;
            DAL_pageDescription.returnTable(pobj);
        }
    }
}
