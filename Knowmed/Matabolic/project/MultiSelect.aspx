<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MultiSelect.aspx.cs" Inherits="Matabolic_project_MultiSelect" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <link href="css/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="js/bootstrap-multiselect.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div>

            <script type="text/javascript">
                $(document).ready(function () {
                    $('#example-enableFiltering-includeSelectAllOption').multiselect({
                        includeSelectAllOption: true,
                        enableFiltering: true
                    });
                });
            </script>

            <select id="example-enableFiltering-includeSelectAllOption" multiple="multiple">
                <option value="a">Option 1</option>
                <option value="b">Option 2</option>
                <option value="c">Option 3</option>
                <option value="d">Option 4</option>
                <option value="e">Option 5</option>
                <option value="f">Option 6</option>
                <option value="g">Option 7</option>
                <option value="h">Option 8</option>
                <option value="i">Option 9</option>
                <option value="j">Option 10</option>
                <option value="k">Option 11</option>
                <option value="l">Option 12</option>
                <option value="m">Option 13</option>
                <option value="n">Option 14</option>
            </select>

            <%--  <select id="ddlCascadeNutrient" multiple="multiple">
                <option value="">select</option>
            </select>
            <input type="button" onclick="add()" value="click" />--%>
        </div>
    </form>
</body>
</html>


