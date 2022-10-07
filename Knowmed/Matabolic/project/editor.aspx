<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">    

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script>

</script>
    <iframe src="editor/index.html" style="width: 100%;" id="svgedit"></iframe>
    <script src="editor/src/embedapi.js"></script>
    <script src="customjs/editor.js"></script>


    <script>
        $(function () {
            var height1 = ($(window).height() - $('#header').height() - 10);
            $("#svgedit").height(height1);
        });
    </script>
</asp:Content>

