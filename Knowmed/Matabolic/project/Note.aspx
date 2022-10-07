<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Note</title>
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="assets/jquery-1.10.2.min.js"></script>
      <script src="../../js/cache.js"></script>
    
     <script src="https://cdn.ckeditor.com/4.11.2/full/ckeditor.js"></script>
  <script src="../../script/global.js"></script>
    <style>
      .btn-success 
      {
    margin-right:20px;
    margin-left: 105px;
    float: right;
      }
    </style>

</head>
<body>
    <form id="form1" runat="server">
        <div class="" id="select" style="padding-left: 5px;">
            <%--<select name="select" id="htmlArea2" onchange="InsertHTML();">
                <option value="">Select a Snipplet:</option>
                <option value="1">Simple Text</option>ggggg
                <option value="2">Simple Text External</option>
                <option value="3">All Data</option>
                <option value="4">Next Option</option>
            </select>--%>
        </div>
        <textarea name="editor1"></textarea>
        <script>
            CKEDITOR.replace('editor1');
        </script>
       <div>
            <button type="button" class="btn btn-success" id="saveNote" data-dismiss="modal">Save</button>
       </div>
    </form>
</body>
    <script src="customjs/note.js"></script>
</html>
