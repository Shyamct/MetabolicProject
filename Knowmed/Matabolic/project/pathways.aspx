<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">
</script>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="../../script/global.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="https://rawgit.com/Codecademy/textarea-helper/master/textarea-helper.js"></script>
    <link href="js/jquery.highlight-within-textarea.css" rel="stylesheet" />
    <script src="js/jquery.highlight-within-textarea.js"></script>

     <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    
    <script src="js/bootstrap-multiselect.js"></script>  
    <style>
        #btndeleted{
             
    text-align: right;
    float: right;
    margin: 5px 5px;
        }
        .custom-menu {
            display: none;
            z-index: 1000;
            position: absolute;
            overflow: hidden;
            border: 1px solid #CCC;
            white-space: nowrap;
            font-family: sans-serif;
            background: #FFF;
            color: #333;
            border-radius: 5px;
            list-style-type: none;
            padding: 0;
        }

            .custom-menu li {
                padding: 8px 12px;
                cursor: pointer;
                border-bottom: 1px solid #ccc;
            }

                .custom-menu li:hover {
                    background-color: #DEF;
                }

        textarea {
            width: auto !important;
        }

        .red {
            background-color: #fd6300 !important;
        }

        .green {
            background-color: #20fb11 !important;
        }

        .white {
            background-color: #fff !important;
        }

        .span10 {
            width: 83% !important;
        }

        .ui-autocomplete {
            height: 55%;
            overflow: auto;
            top: 27%;
            left: 14%;
        }

        .row-highlight {
            color: red;
        }

        .icon-info-sign:before {
            content: "\f05a";
            position: absolute;
            font-size: 20px;
            text-align: right;
            right: 5px;
            top: 7px;
            color:red;
        }

        .plusSymbol:after {
            position: absolute;
            content: '\2719';
            font-size: 20px;
            text-align: right;
            right: 35px;
            top: 3px;
        }

        .h5, h5 {
            font-size: 14px;
            line-break: anywhere;
        }

        .modal-body.popup-decreption {
            position: relative;
            height: 40vh !important;
            max-height: 650px;
            padding: 15px;
            /* overflow-y: auto; */
            overflow: auto;
            text-align: center;
        }


        .modal-xl {
            width: 1190px;
            margin: 83px auto;
        }

        .ft-big {
            font-size: 16px !important;
        }

        .multiselect-native-select {
            float: left;
            width: 35rem;
        }
        .nopadding {
    max-height: 64vh;
    overflow-y: scroll;
}
        .nopadding table thead tr td {
    position: sticky;
    top: 0;
    z-index: 1111;
}


    </style>
  
    <script>
        function ShowSelectionInsideTextarea(replacementText, eleID) {
            //var textComponent = document.getElementById(eleID);
            if (document.getElementById(eleID).selectionStart != undefined) {
                var mainStr = document.getElementById(eleID).value;
                var startPos = document.getElementById(eleID).selectionStart;
                var endPos = document.getElementById(eleID).selectionEnd;
                selectedText = document.getElementById(eleID).value.substring(startPos, endPos);
                var mainStr = mainStr.substring(0, startPos) + selectedText + "" + mainStr.substring(endPos, mainStr.length);
                document.getElementById(eleID).value = mainStr;
            }
            if (replacementText == '@') {
                var aa = "\\b" + selectedText + "\\b";
                highlight.push({
                    highlight: new RegExp(aa, 'g'),
                    className: 'red',
                    original: selectedText
                });
            }
            if (replacementText == '*') {
                var aa = "\\b" + selectedText + "\\b";
                highlight.push({
                    highlight: new RegExp(aa, 'g'),
                    className: 'green',
                    original: selectedText
                });
            }

            $('.custom-menu').hide();
            $('textarea').highlightWithinTextarea({
                highlight: highlight
            });
        };

        $(function () {

            $('#mytextarea').bind("contextmenu", function (event) {
                event.preventDefault();
                $(".custom-menu").finish().toggle(100).css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
            });

            $('#mytextarea').bind("mousedown", function (e) {
                if (!$(e.target).parents(".custom-menu").length > 0) {
                    $(".custom-menu").hide(100);
                }
            });
            $(".custom-menu li").click(function () {
                switch ($(this).attr("data-action")) {
                    case "Keyword": ShowSelectionInsideTextarea('@', 'mytextarea'); break;
                    case "Relation": ShowSelectionInsideTextarea('*', 'mytextarea'); break;
                }
                $(".custom-menu").hide(100);
            });
            $('mytextarea').val('');
        });

    </script>
    <div id="sidebar">
        <ul style="overflow-y: auto; height: 926px;">
            <li><a href="javascript:;" class="pathwayName"></a></li>
        </ul>
    </div>
    <div id="content">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <%---------------------- Disease------------------------%>
                                <%--<div style="float: left;">--%>
                                <h5>Select Disease</h5>
                                 <select id="ddlDisease" class="topMargin3px" name="ddl_Disease"> 
                                     <option value="0" style="width:100% !important;">Select All</option>
                                </select>
                           <%-- </div>   --%>
<%--  <input type="button" value="Test Id" id="btnTestId" />--%>
                            <%-------------------------Disease------------------------------------%>
                            <div style="float: left;">
                                <h5>Select Phenomenon</h5>
                               <%-- <select id="ddlReceptor" class="topMargin3px" onchange="getMaster()">--%>
                                 <select id="ddlReceptor" class="topMargin3px">
                                    <option value="0">--Select phenomenon--</option>
                                </select>
                            </div>
                           
                            <div style="float: left; margin-left: 2%">
                                <div style="display: none;">
                                    <h5>Select Parameter</h5>
                                <select id="ddlParameter" class="topMargin3px">
                                    <option value="0" >--Select Parameter--</option>                                  
                                </select>
                                </div>
                                

                                <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                                   <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title=" Show Legend"><i class="icon-info-sign"></i></span>

                            </div>
                        </div>
                        <div class="widget-content">
                            <div class="">
                                <ul class='custom-menu'>
                                    <li data-action="Keyword">Set Keyword</li>
                                    <li data-action="Relation">Set Relation</li>
                                </ul>
                                <div class="row-fluid">
                                    <div class="span10">
                                        <textarea id="mytextarea" rows="6" style="width: 100% !important" class="form-control"></textarea>
                                    </div>
                                    <div class="span2" style="margin-left: 25px !important">
                                        <div class="row-fluid">
                                            <input type="button" value="Save" onclick="save()" class="btn btn-success span12 pull-right" style="margin-bottom: 5px" />
                                            <input type="button" value="check" onclick="checkKey()" class="btn btn-info span12 pull-right" style="margin-bottom: 5px" />
                                            <input type="button" value="Assign Rank Name" onclick="getRank()" class="btn btn-warning span12 pull-right" style="margin-bottom: 5px" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="widget-box" id="dd"> 
                    <div class="widget-title">
                        <span class="icon"><i class="icon-th"></i></span>
                        <h5>Static table</h5>
                        <input type="button" id="btndeleted" value="DELETE" onclick="DeleteMULTIPLE()"/>
                    </div>
                    <div class="widget-content nopadding">
                        <table class="table table-bordered table-striped" id="tblWriteUp">
                            <thead>
                                <tr>
                                    <td class="td_goTo">Go To Proprtion</td>
                                   <%-- <td class="td_DiseaseName">DiseaseName</td>--%>
                                    <td class="td_WriteUp">WriteUp</td>
                                    <td class="td_Receptor">Phenomenon</td>
                                    <td class="td_Parameter">Parameter</td>
                                    <td class="td_check"></td>
                                    <td class="td_rank">Rank</td>
                                    <td class="td_sno">S.No.</td>
                                    <td class="td_action">Action</td>
                                     <%--<td class="td_CopyWriteUp">Copy</td>--%>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                  <%--<div class="widget-box">
                    <div class="widget-title">
                        <span class="icon"><i class="icon-th"></i></span>
                        <h5>Static table</h5>
                    </div>
                    <div class="widget-content nopadding">
                        <table class="table table-bordered table-striped" id="tblTestWriteUp">
                            <thead>
                                <tr>
                                    <td class="td_goTo">Go To Proprtion</td>
                                    <td class="td_WriteUp">WriteUp</td>
                                    <td class="td_Receptor">Phenomenon</td>
                                    <td class="td_Parameter">Parameter</td>
                                    <td class="td_check"></td>
                                    <td class="td_rank">Rank</td>
                                    <td class="td_sno">S.No.</td>
                                    <td class="td_action">Action</td>
                                     <td class="td_CopyWriteUp">Overwrite</td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div--%>
                </div>
            </div>
        </div>
    <div class="modal fade" id="rankModel" style="width: 50%; left: 26%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100%;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Rank Name <button type="button" onclick="getPreviousRank()">Previous Rank</button></h4>
                </div>
                <div class="modal-body" style="overflow-y:auto; max-height:60rem;">
                    <table class="table table-bordered" id="tblRank">
                        <thead>
                            <tr>
                                <td class="td_rank">Rank</td>
                                <td class="td_rankName">Rank Name</td>
                                <td class="td_save">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
   
     <!-- Modal Description popup SHOW-->
     <div class="modal bd-example-modal-lg" id="modalDescription" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClosed" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Description</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                        <table class="table table-hover fixed_header" id="tblVechileDetails">
                <thead style="font-size:22px">
                    <tr>
                         <th class="td_SrNo ft-big" >Sr. No.</th> 
                        <th class="td_ID ft-big" style="display:none">ID</th> 
                        <th class="td_heading ft-big">Heading</th>
                        <th class="td_color ft-big">Color</th>
                        <th class="td_image ft-big">Image</th>
                        <th class="td_description ft-big">Description</th>
                       <th class="td_ActionEdit ft-big ">Action</th>       
                     
                        
                    </tr>
                    
                </thead>
                <tbody>
                    
                </tbody>
            </table>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnClose" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
         
    </div>

     <!-- Button trigger modal Input SAVE -->
    <div class="modal" id="addInfoModel" role="dialog">
        <div class="modal-dialog"; style="width: max-content;">
            <!-- Modal content-->
            <div class="modal-content" style="width: max-content;">
                <div class="modal-header">
                    <button type="button" class="close" id="btnCross" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Description</h4>
                </div>
                <div class="modal-body" id="modelBody">
                    <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="form-group col-md-3">
                            <label>Add Heading </label>
                            <input type="text" id="txtHeading" class="form-control" />
                        </div>

                        <div class="form-group col-md-3">
                            <label>Add Color </label>
                            <input type="color" id="txtColor" class="form-control" />
                        </div>
                          <div class="form-group col-md-3">
                            <label>Upload Image </label>
                            <input type="file" id="txtImage" alt="Not Image" class="form-control" />
                              <input type="text" id="txtOldImage" name="name"   style="display:none"/>
                          </div>
                      <div class="form-group col-md-3">
                            <label>Description </label>
                           <textarea id="txtDescription" rows="6" cols="32"></textarea>
                        </div>
                        <div class="form-group col-md-3">
                            
                           <input type="text" id="txtId" rows="6" cols="32"  style="display:none"/>
                        </div>
                        <div class="form-group">
                          <%-- <button type="button" class="btn btn-dark" id="btnAddNew" style="font-size: 15px;margin-left: 90%;">Add New <i class="fa fa-plus"></i></button>--%>
                      </div>
                        </div>
                        </div>
                  </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnUpdate" data-dismiss="modal">Update</button>
                <button type="button" class="btn btn-primary" id="btnSave" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-success" id="btnCancel" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>
 


     <!-- Copy Multiple diesease -->
    <div class="modal bd-example-modal-lg" id="copyMultipleDieseaseForWriteUp" role="dialog">
        <div class="modal-dialog modal-xl">
               <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close btnCloseCopy"  data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> All disease</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                        <table class="table table-hover fixed_header" id="tblMultipleDisease">
                <thead>
                    <tr>
                     <th class="td_lblPhenomenon"><label id="lblPhenomenon">Phenomenon</label></th>

                       </tr>
                    <tr>
                       
                       <th class="td_WriteUp">WriteUp </th>       
                        <th class="td_Disease">WriteUp </th> 
                        <th class="td_WriteUpDisease"> </th> 
                        <th class="td_WriteUp">WriteUp </th> 
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
                </div>
                <div class="modal-footer">
                    <button type="button"  class="btn btn-default btnCloseCopy">Close</button>
                </div>
            </div>
            
    </div>
    </div>

     <!-- Modal Description popup SHOW-->
     <div class="modal bd-example-modal-lg" id="modalOverwrite" role="dialog" >
        <div class="modal-dialog modal-xl ">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClos" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Description</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black;">
                   
                       
                   
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnClosee" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
         
    </div>


    <div class="modal" id="previousRankModel" style="width: 50%; left: 26%; display: none;" role="dialog">
        <div class="modal-dialog" style="width: 100%;">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Previous Rank Name </h4>
                </div>
                <div class="modal-body" style="overflow-y:auto; max-height:60rem;">
                    <table class="table table-bordered" id="previousRank">
                        <thead>
                            <tr>
                                <td class="SrNo">SR NO</td>
                                <td class="td_rankNo">Rank NOo</td>
                                <td class="td_rankName">Rank Rank</td>
                                <td class="td_ddd">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default close" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>



    <script src="customjs/flowDiagram2.js"></script>
      <script src="customjs/pageDescription.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#tblWriteUp").hide();
            $("#btn1").click(function () {
                $("#modalOverwrite").show();
            });
            $("#btn1").click(function () {
                $("#modalOverwrite").show();
            });
            $("#btnclos").click(function () {
                $("#modalOverwrite").hide();
            });
            $("#btnclosee").click(function () {
                $("#modalOverwrite").hide();
            });
        });
    </script>
</asp:Content>

