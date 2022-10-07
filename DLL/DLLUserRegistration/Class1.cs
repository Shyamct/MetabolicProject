using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using DLLUtility;

namespace DLLUserRegistration
{
    public class PAL_UserRegistration : Utility
    {
        public string userName { get; set; }
        public string mobileNo { get; set; }
        public string password { get; set; }
        public string emailID { get; set; }
        public int countryID { get; set; }
        public int cityID { get; set; }
        public string ipAddress { get; set; }
        public string address { get; set; }
        public string profession { get; set; }
        public string remark { get; set; }
        public string pathwayList { get; set; }
        public int userId { get; set; }
    }
    public class DAL_UserRegistration
    {
        public static void returnTable(PAL_UserRegistration pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_Registration", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
                selectCommand.Parameters.AddWithValue("@userName", pobj.userName);
                selectCommand.Parameters.AddWithValue("@mobileNo", pobj.mobileNo);
                selectCommand.Parameters.AddWithValue("@password", pobj.password);
                selectCommand.Parameters.AddWithValue("@emailID", pobj.emailID);
                selectCommand.Parameters.AddWithValue("@countryID", pobj.countryID);
                selectCommand.Parameters.AddWithValue("@cityID", pobj.cityID);
                selectCommand.Parameters.AddWithValue("@ipAddress", pobj.ipAddress);
                selectCommand.Parameters.AddWithValue("@address", pobj.address);
                selectCommand.Parameters.AddWithValue("@profession", pobj.profession);
                selectCommand.Parameters.AddWithValue("@remark", pobj.remark);
                selectCommand.Parameters.AddWithValue("@pathwayList", pobj.pathwayList);
                selectCommand.Parameters.AddWithValue("@userId", pobj.userId);
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
    public class BAL_UserRegistration
    {
        public static void insertUserRegistration(PAL_UserRegistration pobj)
        {
            pobj.opcode = 11;
            DAL_UserRegistration.returnTable(pobj);
        }
        public static void assignPathwayUser(PAL_UserRegistration pobj)
        {
            pobj.opcode = 12;
            DAL_UserRegistration.returnTable(pobj);
        }
        public static void checkLogin(PAL_UserRegistration pobj)
        {
            pobj.opcode = 41;
            DAL_UserRegistration.returnTable(pobj);
        }
    }
}
