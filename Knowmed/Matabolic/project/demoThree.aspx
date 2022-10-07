<%@ Page Title="" Language="C#" MasterPageFile="~/Matabolic/project/MasterPage.master" AutoEventWireup="true"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <style>
    #zoom {
width: 100%;
height: 100%;
transform-origin: 0px 0px;
transform: scale(1) translate(0px, 0px);
cursor: pointer;
}
div#zoom > img {
width: 100%;
height: auto;
}
#zooma {
width: 100%;
height: 100%;
transform-origin: 0px 0px;
transform: scale(1) translate(0px, 0px);
cursor: pointer;
}
div#zooma > img {
width: 100%;
height: auto;
}
#zoomb {
 width: 100%; 
height: 100%;
transform-origin: 0px 0px;
 transform: scale(1) translate(0px, 0px); 
cursor: pointer;


}
div#zoomb > img {
width: 100%;
height: auto;
}
/* //////////////////////////////// */
#zoomc {
width: 100%;
height: 100%;
transform-origin: 0px 0px;
transform: scale(1) translate(0px, 0px);
cursor: pointer;
}
div#zoomc > img {
width: 100%;
height: auto;
}
#zoomd {
width: 100%;
height: 100%;
transform-origin: 0px 0px;
transform: scale(1) translate(0px, 0px);
cursor: pointer;
}
div#zoomd > img {
width: 100%;
height: auto;
}
#zoome {
width: 100%;
height: 100%;
transform-origin: 0px 0px;
transform: scale(1) translate(0px, 0px);
cursor: pointer;
}
div#zoome > img {
width: 100%;
height: auto;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div >

         <button type="button" onclick="zoomMinusFunction()" style="position: fixed; margin-left: 10px; margin-top: 17px; z-index: 1055; font: bold; font-size: large;">- </button>
    <button type="button" onclick="zoomPlusFunction()" style="position: fixed; margin-left: 65px; margin-top: 17px; z-index: 1055; font: bold; font-size: large;">+</button>

        <%--<img src="DEMOIMAGE/layerImage/fist.png" />--%>

     <img src="DEMOIMAGE/newImage/image1.jpg"  id="zoom"/>
    <img src="DEMOIMAGE/newImage/image2.jpg" id="zooma" style="display: none;"/>
    <img src="DEMOIMAGE/newImage/image3.jpg"  id="zoomb" style="display: none;"/>

        
    <img src="DEMOIMAGE/newImage/image4.jpg"  id="zoomc"style="display: none;"/>
    <img src="DEMOIMAGE/newImage/image5.jpg" id="zoomd" style="display: none;"/>
    <img src="DEMOIMAGE/newImage/image6.jpg"  id="zoome" style="display: none;"/>
    
   
  </div>
<script>

    var scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },

        zoom = document.getElementById("zoom");
    zooma = document.getElementById("zooma");
    zoomb = document.getElementById("zoomb");

    zoomc = document.getElementById("zoomc");
    zoomd = document.getElementById("zoomd");
    zoome = document.getElementById("zoome");


    function setTransform() {
        zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
    function setTransform1() {
        zooma.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
    function setTransform2() {
        zoomb.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }


    function setTransform3() {
        zoomc.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
    function setTransform4() {
        zoomd.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }
    function setTransform5() {
        zoome.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
    }


    $(document).ready(function () {
        onmousedown1();
        onmouseup1();
        onmousemove1();
        onwheel1();



        onmousedown2();
        onmouseup2();
        onmousemove2();
        onwheel2();



        onmousedown3();
        onmouseup3();
        onmousemove3();
        onwheel3();
        //////////////
        onmousedown4();
        onmouseup4();
        onmousemove4();
        onwheel4();


        onmousedown5();
        onmouseup5();
        onmousemove5();
        onwheel5();

        onmousedown6();
        onmouseup6();
        onmousemove6();
        onwheel6();
    });

    function onmousedown1() {
        zoom.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup1() {
        zoom.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove1() {
        zoom.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform();
        }
    }

    function onwheel1() {
        zoom.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;

            //   if (scale > 1.44) {
            //       $("#zooma").show();
            //       $("#zoom").hide();
            //       $("#zoomb").hide();
            //   }
            //   else {

            //   }

            if (scale > 1.2) {
                $("#zooma").show();
                $("#zoom").hide();
                $("#zoomb").hide();
                $("#zoomc").hide();
                $("#zoomd").hide();
                $("#zoome").hide();
            }
            else {

            }

            setTransform();

            console.log("ddddddd", scale);
        }
    }


    /////////2222222222222222222222222222222222222222222222222222
    function onmousedown2() {
        zooma.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup2() {
        zooma.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove2() {
        zooma.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform1();

        }
    }

    function onwheel2() {
        zooma.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;


            //   if (scale > 2.48832) {
            //       $("#zooma").hide();
            //       $("#zoom").hide();
            //       $("#zoomb").show();

            //   }
            //   else {
            //       if (scale < 1.44) {
            //           $("#zooma").hide();
            //           $("#zoom").show();
            //           $("#zoomb").hide();
            //       }
            //   }
            if (scale > 1.44) {
                $("#zooma").hide();
                $("#zoom").hide();
                $("#zoomb").show();
                $("#zoomc").hide();
                $("#zoomd").hide();
                $("#zoome").hide();

            }
            else {
                if (scale < 1.44) {
                    $("#zooma").hide();
                    $("#zoom").show();
                    $("#zoomb").hide();
                    $("#zoomc").hide();
                    $("#zoomd").hide();
                    $("#zoome").hide();
                }

            }
            console.log("rrrrrrrrrrr", scale);

            setTransform1();

        }
    }



    /////////3333333333333333333333333333333333333333333
    function onmousedown3() {
        zoomb.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup3() {
        zoomb.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove3() {
        zoomb.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform2();
        }
    }

    function onwheel3() {
        zoomb.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;
            console.log(scale);


            if (scale > 1.728) {
                $("#zoomc").show();
                $("#zooma").hide();
                $("#zoom").hide();
                $("#zoomb").hide();
                $("#zoomd").hide();
                $("#zoome").hide();
            }
            else
                if (scale < 1.728) {
                    $("#zooma").show();

                    $("#zoomb").hide();

                    $("#zoomc").hide();
                    $("#zoom").hide();
                    $("#zoomd").hide();
                    $("#zoome").hide();
                }
            setTransform2();

        }
    }
    //////////////4
    function onmousedown4() {
        zoomc.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup4() {
        zoomc.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove4() {
        zoomc.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform3();
        }
    }

    function onwheel4() {
        zoomc.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;
            console.log(scale);


            if (scale > 2.0736) {
                $("#zoomd").show();
                $("#zooma").hide();
                $("#zoom").hide();
                $("#zoomb").hide();
                $("#zoomc").hide();
                $("#zoome").hide();
            }
            else
                if (scale < 2.0736) {
                    $("#zoomb").show();

                    $("#zooma").hide();
                    $("#zoomc").hide();
                    $("#zoom").hide();
                    $("#zoomd").hide();
                    $("#zoome").hide();
                }
            setTransform3();

        }
    }
    /////////////////////////////////5
    function onmousedown5() {
        zoomd.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup5() {
        zoomd.onmouseup = function (e) {
            panning = false;
        }
    }



    function onmousemove5() {
        zoomd.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform4();
        }
    }

    function onwheel5() {
        zoomd.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;
            console.log(scale);


            if (scale > 2.48832) {
                $("#zoome").show();

                $("#zoomd").hide();
                $("#zooma").hide();
                $("#zoom").hide();
                $("#zoomb").hide();
                $("#zoomc").hide();
            }
            else {
                if (scale < 2.48832) {
                    $("#zoomc").show();

                    $("#zoomb").hide();
                    $("#zooma").hide();
                    $("#zoom").hide();
                    $("#zoomd").hide();
                    $("#zoome").hide();
                }
            }
            setTransform4();

        }
    }
    ///////////////////////6
    function onmousedown6() {
        zoome.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }
    }

    function onmouseup6() {
        zoome.onmouseup = function (e) {
            panning = false;
        }
    }

    function onmousemove6() {
        zoome.onmousemove = function (e) {
            e.preventDefault();
            if (!panning) {
                return;
            }
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform5();
        }
    }

    function onwheel6() {
        zoome.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;


            if (scale < 2.9859839999999997) {
                $("#zoomd").show();
                $("#zoomb").hide();
                $("#zooma").hide();
                $("#zoom").hide();
                $("#zoomc").hide();
                $("#zoome").hide();
            }
            console.log(scale);
            setTransform5();

        }
    }


    var Count = 0;
    function renderZoom() {
        if (Count > 0 && Count <= 1.44) {
            $("#zooma").show();
            $("#zoom").hide();
            $("#zoomb").hide();
            $("#zoomc").hide();
            $("#zoomd").hide();
            $("#zoome").hide();
            console.log(Count);
        }
        else if (Count > 1.44 && Count <= 2) {
            $("#zooma").hide();
            $("#zoom").hide();
            $("#zoomb").show();
            $("#zoomc").hide();
            $("#zoomd").hide();
            $("#zoome").hide();
            console.log(Count);

        }
        else if (Count > 2 && Count <= 3) {
            $("#zoomc").show();
            $("#zooma").hide();
            $("#zoom").hide();
            $("#zoomb").hide();
            $("#zoomd").hide();
            $("#zoome").hide();
            console.log(Count);

        }
        else if (Count > 3 && Count <= 4) {
            $("#zoomd").show();
            $("#zooma").hide();
            $("#zoom").hide();
            $("#zoomb").hide();
            $("#zoomc").hide();
            $("#zoome").hide();
            console.log(Count);

        }
        else if (Count > 4 && Count <= 5) {
            $("#zoome").show();

            $("#zoomd").hide();
            $("#zooma").hide();
            $("#zoom").hide();
            $("#zoomb").hide();
            $("#zoomc").hide();
            console.log(Count);

        }
        else {
            alert("Maximum Zoom");
            return;
        }
    }
    function zoomPlusFunction() {
        Count = Count + 1;
        renderZoom();
    }
    function zoomMinusFunction() {
        Count = Count - 1;
        renderZoom();
    }
</script>
</asp:Content>

