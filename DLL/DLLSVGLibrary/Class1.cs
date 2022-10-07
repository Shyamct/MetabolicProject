using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLSVGLibrary
{
    public class PAL_SVGLibrary : Utility
    {
        public int id { get; set; }
        public string sectionName { get; set; }
        public string startPoint { get; set; }
        public string endPoint { get; set; }
        public string subSectionName { get; set; }
        public int pathwayId { get; set; }
        public int sectionId { get; set; }
        public int subSectionId { get; set; }
        public int startPointId { get; set; }
        public int endPointId { get; set; }
        public string markerList { get; set; }
        public string markerName { get; set; }
        public string startRole { get; set; }
        public string endRole { get; set; }
        public string leadName { get; set; }
        public string markerGroupURL { get; set; }
        public int pid { get; set; }
        public int nutrientId { get; set; }
        public string foodName { get; set; }
        public int userID { get; set; }
    }
    public class DAL_SVGLibrary
    {
        public static void returnTable(PAL_SVGLibrary pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_SVGMasters", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Parameters.AddWithValue("@opcode", pobj.opcode);
                selectCommand.Parameters.AddWithValue("@id", pobj.id);
                selectCommand.Parameters.AddWithValue("@sectionName", pobj.sectionName);
                selectCommand.Parameters.AddWithValue("@startPoint", pobj.startPoint);
                selectCommand.Parameters.AddWithValue("@endPoint", pobj.endPoint);
                selectCommand.Parameters.AddWithValue("@subSectionName", pobj.subSectionName);
                selectCommand.Parameters.AddWithValue("@pathwayId", pobj.pathwayId);
                selectCommand.Parameters.AddWithValue("@sectionId", pobj.sectionId);
                selectCommand.Parameters.AddWithValue("@subSectionId", pobj.subSectionId);
                selectCommand.Parameters.AddWithValue("@startPointId", pobj.startPointId);
                selectCommand.Parameters.AddWithValue("@endPointId", pobj.endPointId);
                selectCommand.Parameters.AddWithValue("@markerList", pobj.markerList);
                selectCommand.Parameters.AddWithValue("@markerName", pobj.markerName);
                selectCommand.Parameters.AddWithValue("@startRole", pobj.startRole);
                selectCommand.Parameters.AddWithValue("@endRole", pobj.endRole);
                selectCommand.Parameters.AddWithValue("@leadName", pobj.leadName);
                selectCommand.Parameters.AddWithValue("@markerGroupURL", pobj.markerGroupURL);
                selectCommand.Parameters.AddWithValue("@pid", pobj.pid);
                selectCommand.Parameters.AddWithValue("@nutrientId", pobj.nutrientId);
                selectCommand.Parameters.AddWithValue("@foodName", pobj.foodName);
                selectCommand.Parameters.AddWithValue("@userID", pobj.userID);
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

    public class BAL_SVGLibrary
    {
        #region Section Master
        public static void saveSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 11;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void updateSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 21;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void deleteSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 31;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 41;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region Start Point Master
        public static void saveStartPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 12;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void updateStartPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 22;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void deleteStartPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 32;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getStartPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 42;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region End Point Master
        public static void saveEndPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 13;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void updateEndPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 23;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void deleteEndPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 33;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getEndPoint(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 43;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region Start End Mapping
        public static void saveStartEndMapping(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 14;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void updateStartEndMapping(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 24;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void deleteStartEndMapping(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 34;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void initControls(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 44;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getStartEndMapping(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 45;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region Marker Relation Fro SVG
        public static void getMarkerRelation(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 46;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region Sub Section Master
        public static void saveSubSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 15;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void updateSubSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 25;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void deleteSubSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 35;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getSubSection(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 47;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion
        
        public static void getMarkerReport(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 49;
            DAL_SVGLibrary.returnTable(pobj);
        }

        #region PDF Events 
        public static void getMarkerDetails(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 410;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getECGComparison(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 411;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region Marker Group Research URL
        public static void saveMarkerGroupResearchURL(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 16;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void updateMarkerGroupResearchURL(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 26;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void deleteMarkerGroupResearchURL(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 36;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getMarkerGroupResearchURL(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 412;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

        #region SVG Events 
        public static void getPatientInvestigation(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 413;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getEndResult(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 414;
            DAL_SVGLibrary.returnTable(pobj);
        }
      
        public static void getMarkerGlossaryDetail(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 415;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void getTempratureDetails(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 416;
            DAL_SVGLibrary.returnTable(pobj);
        }
        public static void showMachineName(PAL_SVGLibrary pobj)
        {
            pobj.opcode = 417;
            DAL_SVGLibrary.returnTable(pobj);
        }
        #endregion

    }
}
