<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="https://rawgit.com/Codecademy/textarea-helper/master/textarea-helper.js"></script>
    <link href="js/jquery.highlight-within-textarea.css" rel="stylesheet" />
    <script src="js/jquery.highlight-within-textarea.js"></script>
      <link rel="stylesheet" href="customCSS/writeUpMaster.css" />
    
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

    <%--<div id="sidebar">
        <ul>
            <li><a href="javscript:;" class="pathwayName"></a></li>
        </ul>
    </div>--%>
    <div id="content">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <div class="widget-box">
                        <div class="widget-title">
                            <span class="icon"><i class="icon-info-sign"></i></span>
                            <h5>Select phenomenon</h5>
                            <select id="ddlReceptor" class="topMargin3px">
                                <option value="0">--Select phenomenon--</option>
                            </select>
                            <span class="iconI" id="moreInfo" data-toggle="tooltip" data-placement="left" title="Show Legend"><i class="icon-info-sign"></i></span>
                            <label class="plusSymbol" id="addInfo" data-toggle="tooltip" data-placement="left" title="Add Legend"></label>
                                
                        </div>
                        <div class="widget-content">
                            <div class="">
                                <ul class='custom-menu'>
                                    <li data-action="Keyword">Set Keyword</li>
                                    <li data-action="Relation">Set Relation</li>
                                </ul>
                                <div class="row-fluid">
                                    <div class="span10">
                                        <textarea class="form-control" id="mytextarea" rows="6" style="width: 100% !important"></textarea>
                                    </div>
                                    <div class="span2" style="margin-left: 25px !important">
                                        <div class="row-fluid">
                                            <input type="button" value="Save" onclick="save()" class="btn btn-success span12 pull-right" style="margin-bottom: 5px" />
                                            <input type="button" value="check" onclick="checkKey()" class="btn btn-info span12 pull-right" style="margin-bottom: 5px" />
                                            <%--<input type="button" value="Assign Rank Name" onclick="getRank()" class="btn btn-warning span12" style="margin-bottom: 5px" />--%>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="widget-box">
                    <div class="widget-title">
                        <span class="icon"><i class="icon-th"></i></span>
                        <h5>Static table</h5>
                    </div>
                    <div class="widget-content nopadding">
                        <table class="table table-bordered table-striped" id="tblWriteUp">
                            <thead>
                                <tr>
                                    <td class="td_WriteUp">WriteUp</td>
                                    <td class="td_Receptor">phenomenon</td>
                                    <td class="td_orginal" style="display:none"></td>
                                    <td class="td_action">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="modal fade" id="rankModel" style="width: 60%; left: 35%; display: none;" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add Rank Name</h4>
                </div>
                <div class="modal-body">
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
       <!-- Modal Description popup-->
     <div class="modal bd-example-modal-lg" id="modalDescription" role="dialog" >
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnClosed" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Description</h4>
                </div>
                <div class="modal-body popup-decreption" style="color: black">
                   
                        <table class="table table-hover fixed_header" id="tblVechileDetails">
                <thead>
                    <tr>
                         <th class="td_SrNo">Sr. No.</th> 
                        <th class="td_heading">Heading</th>
                        
                        <th class="td_color">Color</th>
                        <th class="td_image">Image</th>
                        <th class="td_description">Description</th>
                       <%-- <th class="td_location">Location <i class="fa fa-map-marker" aria-hidden="true"></i></th>--%>
                       <%-- <th class="td_mobileNo">Mobile No. <i class="fa fa-phone" aria-hidden="true"></i></th>--%>
                        <!-- <th class="td_Action">Action</th>            -->
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

     <!-- Button trigger modal Input -->
    <div class="modal" id="addInfoModel" role="dialog">
        <div class="modal-dialog"; style="width:max-content;">
            <!-- Modal content-->
            <div class="modal-content" style="width:max-content">
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
                            <label>Upload Image </label>
                            <input type="file" id="txtImage" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label>Add Color </label>
                            <input type="color" id="txtColor" class="form-control" />
                        </div>
                      <div class="form-group col-md-3"> 
                            <label>Description </label>
                           <textarea id="txtDescription" rows="6" cols="32"></textarea>
                        </div>
                        <div class="form-group">
                          <%-- <button type="button" class="btn btn-dark" id="btnAddNew" style="font-size: 15px;margin-left: 90%;">Add New <i class="fa fa-plus"></i></button>--%>
                      </div>
                        </div>
                        </div>
                  </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSave" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-success" id="btnCancel" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
    </div>
    <div class="modal bd-example-modal-xl" id="showNote" role="dialog" >
        <div class="modal-dialog modal-xl">
            <!-- Modal content-->
            <div class="modal-content ">
                <div class="modal-header">
                    <button type="button" class="close" id="btnNotecross" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"> Page Note</h4>
                </div>
                <div class="modal-body popup-Note" style="color: black">
                            <table class="table table-hover fixed_header" id="tblShowNote">
                <thead>
                    <tr>
                        
                        <th class="td_Note">Note</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnNoteCancel" class="btn btn-default">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="mySidenav" class="sidenav">
     <a href="#" id="btnNote">Add Note</a>
     <a href="#" id="btnNoteShow">Show Note</a>
   </div>
    <script src="customjs/writeUPMaster.js"></script>
</asp:Content>

