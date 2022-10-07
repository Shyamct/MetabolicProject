<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" %>

<script runat="server">

</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        #htmltoimage {
            width: 65%;
            margin: auto;
        }
    </style>

    <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>

    <script type="text/javascript">
        function downloadimage() {
            //var container = document.getElementById("image-wrap"); //specific element on page
            var container = document.getElementById("htmltoimage");; // full page
            html2canvas(container, { allowTaint: true }).then(function (canvas) {

                var link = document.createElement("a");
                document.body.appendChild(link);
                link.download = "html_image.jpg";
                link.href = canvas.toDataURL();
                link.target = '_blank';
                link.click();
            });
        }

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

 
    <div id="content" style="margin-left: 0px;">

        <div id="htmltoimage">
            <div class="imgbg">
                <img src="https://freakyjolly.com/wp-content/uploads/2017/08/cropped-fjlogo2.png" alt="" srcset="">
            </div>
            <h1>Demo page to show example of "How to Create and Download Image of HTML content in webpage Using html2canvas
            library". Find tutorial page here <a
                href="http://www.freakyjolly.com/convert-html-document-into-image-jpg-png-from-canvas/"
                target="_blank">Here</a></h1>
            . Just click on button below to download Image of this HTML content which
        is wrapped in an ID named "htmltoimage". Now I am typing some randome stuff, so that image downloaded will have
        some content to show blah blah blah :P :D
        <br>
            <button onclick="downloadimage()" class="clickbtn">Click To Download Image</button>
        </div>

    </div>

</asp:Content>




