using System;
using DLLUtility;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace DAL_AssignMenu
{

    public class PAL_assignMenu : Utility
    {
       public int parentID { get; set; }
        public int userID { get; set; }
        public int subMenuID { get; set; }
        public string FinalArray { get; set; }
     
    }
    public class DAL_assignMenu
    {
        public static void returnTable(PAL_assignMenu pobj)
        {
            Config con = new Config();
            SqlCommand cmd = new SqlCommand("assignMenu", con.con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@parentID", pobj.parentID);
            cmd.Parameters.AddWithValue("@userID", pobj.userID);
            cmd.Parameters.AddWithValue("@subMenuID", pobj.subMenuID);
            cmd.Parameters.AddWithValue("@FinalArray", pobj.FinalArray);

            //cmd.Parameters.AddWithValue("@userID", pobj.userID);
            //cmd.Parameters.AddWithValue("@menuID", pobj.menuID);            
            //cmd.Parameters.AddWithValue("@id", pobj.id);
            cmd.Parameters.AddWithValue("@who", pobj.who);
            cmd.Parameters.AddWithValue("@opCode", pobj.opcode);
            cmd.Parameters.Add("@isException", SqlDbType.Bit);
            cmd.Parameters["@isException"].Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@exceptionMessage", SqlDbType.VarChar, 500);
            cmd.Parameters["@exceptionMessage"].Direction = ParameterDirection.Output;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(cmd);
            pobj.DS = new DataSet();
            DataSet ds = pobj.DS;
            sqlDataAdapter.Fill(ds);
            pobj.isException = Convert.ToBoolean(cmd.Parameters["@isException"].Value.ToString());
            pobj.exceptionMessage = cmd.Parameters["@exceptionMessage"].Value.ToString();
        }

    }
    public class BAL_assignMenu
    {
     
      
        public static void getUserVMenu(PAL_assignMenu pobj)
        {
            pobj.opcode = 41;
            DAL_assignMenu.returnTable(pobj);
        }
        public static void getSubMenu(PAL_assignMenu pobj)
        {
            pobj.opcode = 42;
            DAL_assignMenu.returnTable(pobj);
        }
        public static void getUserMenuList(PAL_assignMenu pobj)
        {
            pobj.opcode = 43;
            DAL_assignMenu.returnTable(pobj);
        }
        public static void forBindMenu(PAL_assignMenu pobj)
        {
            pobj.opcode = 44;
            DAL_assignMenu.returnTable(pobj);
        }
        public static void assignMenuDate(PAL_assignMenu pobj)
        {
            pobj.opcode = 11;
            DAL_assignMenu.returnTable(pobj);
        }
        public static void deleteUserAssignMenu(PAL_assignMenu pobj)
        {
            pobj.opcode = 31;
            DAL_assignMenu.returnTable(pobj);
        }

    }
}
