<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <meta charset="UTF-8" />
    <title>On point zoom with Scrollwheel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
   
    <style>
      * {
  padding: 0;
  margin: 0;
  outline: 0;
  overflow: hidden;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.zoom {
  width: 100%;
  height: 100%;
  transform-origin: 0px 0px;
  transform: scale(1) translate(0px, 0px);
  cursor: grab;
}
div.zoom > img {
  width: 100%;
  height: auto;
}
.zoom_outer{
   background-color:white;
}
#zoom1{
  margin-top: -750px;
}
#zoom2{
  margin-top: -850px;
  margin-left: -200px;
}
#zoom3{
  margin-top: -780px;
  margin-left: -300px;
}
#zoom4{
  margin-top: -780px;
  margin-left: -330px;
}
#zoom5{
  margin-top: -780px;
  margin-left: -280px;
}
#zoom6{
  margin-top: -880px;
  margin-left: -350px;
}
#zoom7{
  margin-top: -780px;
  margin-left: -380px;
}
#zoom8{
  margin-top: -780px;
  margin-left: -680px;
}

#zoom9{
  margin-top: -780px;
  margin-left: -880px;
}
#zoom10{
  margin-top: -780px;
  margin-left: -780px;
}
#zoom11{
  margin-top: -780px;
  margin-left: -1080px;
}




    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
   
    <div class="zoom_outer">

        <img src="DEMOIMAGE/layerImage/image1-min.jpg" id="zoom1" class="zoom target" alt="zoom">
        <img src="DEMOIMAGE/layerImage/image2-min.jpg" id="zoom2" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image3-min.jpg" id="zoom3" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image4-min.jpg" id="zoom4" class="zoom target" alt="zoom" style="display: none;">

        <img src="DEMOIMAGE/layerImage/image5-min.jpg" id="zoom5" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image6-min.jpg" id="zoom6" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image7-min.jpg" id="zoom7" class="zoom target" alt="zoom" style="display: none;">

         <img src="DEMOIMAGE/layerImage/image8-min.jpg" id="zoom8" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image9-min.jpg" id="zoom9" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image10-min.jpg" id="zoom10" class="zoom target" alt="zoom" style="display: none;">
        <img src="DEMOIMAGE/layerImage/image11-min.jpg" id="zoom11" class="zoom target" alt="zoom" style="display: none;">

      
   
  </div>
<script>
    var count = 0;

    var samZoom = 1;

    $(document).ready(function () {
        $('.zoom_outer').on('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) {

                count = count + (e.originalEvent.wheelDelta / 120);
                console.log("Plus", count);
                if (count > 0) {
                    samZoom += 0.1;
                    $('.target').css('transform', 'scale(' + samZoom + ')');
                }
                else {
                    samZoom -= 0.1;
                    $('.target').css('transform', 'scale(' + samZoom + ')');
                }
   
                if (count == 1) {
                  
                    $("#zoom1").hide();
                    $("#zoom2").show();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();

                }
                else if (count == 2) {
                    
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").show();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                else if (count == 3) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").show();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                else if (count == 4) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").show();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                else if (count == 5) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").show();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                else if (count == 6) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").show();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
               ////////////////////////////////////

                else if (count == 7) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").show();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                else if (count == 8) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").show();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                else if (count == 9) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").show();
                    $("#zoom11").hide();
                }
                else if (count == 10) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").show();
                }
                
            }
            else {
                count += (e.originalEvent.wheelDelta / 120);
                if (count < 0) {
                    samZoom += 0.1;
                    $('.target').css('transform', 'scale(' + samZoom + ')');
                }
                else {
                    samZoom -= 0.1;
                    $('.target').css('transform', 'scale(' + samZoom + ')');
                }
                console.log("MINUS", count);
                if (count == 9) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").show();
                    $("#zoom11").hide();
                }
                if (count == 8) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").hide();
                    $("#zoom9").show();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 7) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();
                    $("#zoom8").show();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 6) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").show();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                //////

                if (count == 5) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").show();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 4) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").show();
                    $("#zoom6").hide();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 3) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").show();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 2) {
                    $("#zoom1").hide();
                    $("#zoom2").hide();
                    $("#zoom3").show();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 1) {
                    $("#zoom1").hide();
                    $("#zoom2").show();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
                if (count == 0) {
                    $("#zoom1").show();
                    $("#zoom2").hide();
                    $("#zoom3").hide();
                    $("#zoom4").hide();
                    $("#zoom5").hide();
                    $("#zoom6").hide();
                    $("#zoom7").hide();

                    $("#zoom8").hide();
                    $("#zoom9").hide();
                    $("#zoom10").hide();
                    $("#zoom11").hide();
                }
            }
        });

    });
   
    $(document).ready(function () {

        onmousedown1();
        onmouseup1();
        onmousemove1();

        onmousedown2();
        onmouseup2();
        onmousemove2();


        onmousedown3();
        onmouseup3();
        onmousemove3();

        onmousedown4();
        onmouseup4();
        onmousemove4();



        onmousedown5();
        onmouseup5();
        onmousemove5();


        onmousedown6();
        onmouseup6();
        onmousemove6();

        onmousedown7();
        onmouseup7();
        onmousemove7();



        onmousedown8();
        onmouseup8();
        onmousemove8();




        onmousedown9();
        onmouseup9();
        onmousemove9();



        onmousedown10();
        onmouseup10();
        onmousemove10();


        onmousedown11();
        onmouseup11();
        onmousemove11();

    });



    var scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },

        zoom1 = document.getElementById("zoom1");
    zooma = document.getElementById("zooma");
    zoom3 = document.getElementById("zoom3");

    zoom4 = document.getElementById("zoom4");
    zoom5 = document.getElementById("zoom5");
    zoom6 = document.getElementById("zoom6");
    zoom7 = document.getElementById("zoom7");



    zoom8 = document.getElementById("zoom8");
    zoom9 = document.getElementById("zoom9");
    zoom10 = document.getElementById("zoom10");
    zoom10 = document.getElementById("zoom11");

    
    function setTransform() {
        zoom1.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform1() {
        zoom2.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform2() {
        zoom3.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform3() {
        zoom4.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform4() {
        zoom5.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform5() {
        zoom6.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform6() {
        zoom7.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }

    function setTransform7() {
        zoom8.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform8() {
        zoom9.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform9() {
        zoom10.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }
    function setTransform10() {
        zoom11.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + samZoom + ")";
    }


    function onmousedown1() {
        zoom1.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup1() {
        zoom1.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove1() {
        zoom1.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform();
        }
    }


    /////////2222222222222222222222222222222222222222222222222222
    function onmousedown2() {
        zoom2.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;

        }
    }

    function onmouseup2() {
        zoom2.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove2() {
        zoom2.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform1();

        }
    }





    /////////3333333333333333333333333333333333333333333
    function onmousedown3() {
        zoom3.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup3() {
        zoom3.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove3() {
        zoom3.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform2();
        }
    }


    //////////////4
    function onmousedown4() {
        zoom4.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup4() {
        zoom4.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove4() {
        zoom4.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform3();
        }
    }


    /////////////////////////////////5
    function onmousedown5() {
        zoom5.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup5() {
        zoom5.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove5() {
        zoom5.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform4();
        }
    }


    ///////////////////////6
    function onmousedown6() {
        zoom6.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup6() {
        zoom6.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove6() {
        zoom6.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform5();
        }
    }

    ///////////////////////    7
    function onmousedown7() {
        zoom7.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup7() {
        zoom7.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove7() {
        zoom7.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform6();
        }
    }

    //=============8

    function onmousedown8() {
        zoom8.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup8() {
        zoom8.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove8() {
        zoom8.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform7();
        }
    }
    //
    function onmousedown9() {
        zoom9.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup9() {
        zoom9.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove9() {
        zoom9.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform8();
        }
    }
    // 10
    function onmousedown10() {
        zoom10.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup10() {
        zoom10.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove10() {
        zoom10.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform9();
        }
    }
    //         11
    function onmousedown11() {
        zoom11.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup11() {
        zoom11.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove11() {
        zoom11.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform10();
        }
    }
    
</script>
</asp:Content>

