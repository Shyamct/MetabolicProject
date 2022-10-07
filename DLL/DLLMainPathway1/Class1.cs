using DLLUtility;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DLLMainPathway1
{
    public class PAL_PathwayMain1 : Utility
    {
        public int id { get; set; }
        public DataTable DT_PathwayRelation { get; set; }
        public int pathwayId { get; set; }
        public int keyid { get; set; }
       // public string meaning { get; set; }
        public string keyword { get; set; }
        public string prefix { get; set; }
		public string dietRequired { get; set; }
		public string nutrientCategory { get; set; }
        public int age { get; set; }
        public int weight { get; set; }
        public int gender { get; set; }
        public int pid { get; set; }
        public int parameterID { get; set; }
        public int groupID { get; set; }
        public int rankNo { get; set; }
        public string pathwayIds { get; set; }
        public string receptorIds { get; set; }
        public string processIds { get; set; }
        public int isCenterMolecule { get; set; }

        public string fromKey { get; set; }
        public string toKey { get; set; }
        public string relation { get; set; }
        public string relationNames { get; set; }

        public string nutrientName { get; set; }
        public int PID { get; set; }
        public string intakeDate { get; set; }
        public string DateDemo { get; set; }
        public int DiseaseID { get; set; }





    }
    public class DAL_PathwayMain1
    {
        public static void returnTable(PAL_PathwayMain1 pobj)
        {
            try
            {
                SqlCommand selectCommand = new SqlCommand("proc_pathwayRelation1", new Config().con);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Parameters.AddWithValue("@opcode", (object)pobj.opcode);
                selectCommand.Parameters.AddWithValue("@id", (object)pobj.id);
                selectCommand.Parameters.AddWithValue("@DT_PathwayRelation", (object)pobj.DT_PathwayRelation);
                selectCommand.Parameters.AddWithValue("@pathwayId", pobj.pathwayId);
                selectCommand.Parameters.AddWithValue("@keyid", pobj.keyid);
                selectCommand.Parameters.AddWithValue("@keyword", (object)pobj.keyword);
                //selectCommand.Parameters.AddWithValue("@keyword", (object)pobj.meaning);
                selectCommand.Parameters.AddWithValue("@prefix", (object)pobj.prefix);
                selectCommand.Parameters.AddWithValue("@age", (object)pobj.age);
                selectCommand.Parameters.AddWithValue("@gender", (object)pobj.gender);
                selectCommand.Parameters.AddWithValue("@weight", (object)pobj.weight);
                selectCommand.Parameters.AddWithValue("@who", (object)pobj.who);
				selectCommand.Parameters.AddWithValue("@dietRequired", (object)pobj.dietRequired);
				selectCommand.Parameters.AddWithValue("@nutrientCategory", (object)pobj.nutrientCategory);
				selectCommand.Parameters.AddWithValue("@pid", (object)pobj.pid);
				selectCommand.Parameters.AddWithValue("@parameterID", (object)pobj.parameterID);
				selectCommand.Parameters.AddWithValue("@groupID", (object)pobj.groupID);
				selectCommand.Parameters.AddWithValue("@rankNo", (object)pobj.rankNo);
				selectCommand.Parameters.AddWithValue("@pathwayIds", (object)pobj.pathwayIds);
				selectCommand.Parameters.AddWithValue("@receptorIds", (object)pobj.receptorIds);
				selectCommand.Parameters.AddWithValue("@processIds", (object)pobj.processIds);
				selectCommand.Parameters.AddWithValue("@isCenterMolecule", (object)pobj.isCenterMolecule);

                selectCommand.Parameters.AddWithValue("@fromKey", pobj.fromKey);
                selectCommand.Parameters.AddWithValue("@tokey", pobj.toKey);
                selectCommand.Parameters.AddWithValue("@relation", pobj.relation);
                selectCommand.Parameters.AddWithValue("@relationNames", pobj.relationNames);

                selectCommand.Parameters.AddWithValue("@nutrintName", pobj.nutrientName);
                selectCommand.Parameters.AddWithValue("@PIDs", pobj.PID);
                selectCommand.Parameters.AddWithValue("@intakeDate", pobj.intakeDate);
                selectCommand.Parameters.AddWithValue("@DateDemo", pobj.DateDemo);
                selectCommand.Parameters.AddWithValue("@DiseaseID", pobj.DiseaseID);




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
    public class BAL_PathwayMain1
    {
        public static void InsertKey(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 11;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void SetCenterMolecule(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 12;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void SetDietRequired(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 13;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void SetEnzyme(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 14;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void saveSymbole(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 21;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void deleteRankName(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 22;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getKeyword(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 41;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getExistingKeyword(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 42;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getPathwayGraph(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 43;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void pathwaySelecter(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 44;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getEat(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 45;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getsampleGraph(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 46;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getMedication(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 47;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getNotsigned(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 48;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getMoleculeCountReport(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 49;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getDisease(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 410;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getProcess(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 411;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getprocessWiseData(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 412;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getkeywordRelation(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 413;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getWriteUpById(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 414;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getWriteUpModalData(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 415;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getFAQ(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 416;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getToDoNotToDo(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 417;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getClinicalFeatures(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 418;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getEnzyme(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 419;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getMedicine(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 420;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void deleteEnzymeMolecule(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 421;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getNutrientFromCategory(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 422;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getMedicineInteractionReport(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 423;
            DAL_PathwayMain1.returnTable(pobj);
        }   
        public static void getMoleculeColorList(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 424;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getItemStock(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 425;
            DAL_PathwayMain1.returnTable(pobj);
        }   
        public static void getMyGraphData(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 426;
            DAL_PathwayMain1.returnTable(pobj);
        }    
        public static void getProcessReceptor(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 427;
            DAL_PathwayMain1.returnTable(pobj);
        }      
        public static void getTotal(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 428;
            DAL_PathwayMain1.returnTable(pobj);
        }       
        public static void getTestMachineDetail(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 429;
            DAL_PathwayMain1.returnTable(pobj);
        }  
        public static void getCoFactors(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 430;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void getPathWayName(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 431;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void saveMolecule(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 15;
            DAL_PathwayMain1.returnTable(pobj);
        }
        //public static void getMeaning(PAL_PathwayMain1 pobj)
        //{
        //    pobj.opcode = 432;
        //    DAL_PathwayMain1.returnTable(pobj);
        //}
        public static void updateTokey(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 23;
            DAL_PathwayMain1.returnTable(pobj);
        }

        public static void saveRowID(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 16;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void aboutPatientAchivement(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 434;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void pIDInteckNutrient(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 435;
            DAL_PathwayMain1.returnTable(pobj);
        }

        public static void givenDrugPID(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 436;
            DAL_PathwayMain1.returnTable(pobj);
        }
        public static void gatdateWiseDrug(PAL_PathwayMain1 pobj)
        {
            pobj.opcode = 437;
            DAL_PathwayMain1.returnTable(pobj);
        }
    }
}
