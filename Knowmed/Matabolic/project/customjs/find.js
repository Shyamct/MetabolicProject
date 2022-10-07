
$(document).ready(function () {
 
    var $input = $("input[type='search']"),
       
        $content = $(".content"),
      
        $results,
   
        currentClass = "current",
       
        offsetTop = 10,
       
        currentIndex = 0;
    
    /**
     * Jumps to the element matching the current Index
     */
    function jumpTo() {
        if ($results.length) {
            var position,
                $current = $results.eq(currentIndex);
            $results.removeClass(currentClass);
            
            if ($current.length) {
                $current.addClass(currentClass);
                // console.log($current.offset());
                // console.log($current.offset().top);
                // console.log(offsetTop);
                var modalScrollPos = $(".widget-content").scrollTop();
                position = (modalScrollPos + $(".current").position().top) - offsetTop;

               
                window.scrollTo(0, position);
                $(".widget-content").scrollTop(position);
                console.log(position);
                scrollErrorMessageToTop();
            }
        }
    }

    /**
     * Searches for the entered keyword in the
     * specified context on input
     */
    $input.on("input", function () {
        var searchVal = this.value;
        $content.unmark({
            done: function () {
                $content.mark(searchVal, {
                    separateWordSearch: true,
                    done: function () {
                        $results = $content.find("mark");
                        console.log($results);
                        currentIndex = 0;
                        jumpTo();
                    }
                });
            }
        });
    });

    /**
     * Clears the search
     */
    $("#clear").click(function () {
        $content.unmark();
        $input.val("").focus();
    });

    /**
     * Next and previous search jump to
     */
    $("#next").click(function () {
        event.preventDefault();
       // alert();
        if ($results.length) {
            currentIndex += $(this).is($("#prev")) ? -1 : 1;
            if (currentIndex < 0) {
                currentIndex = $results.length - 1;
            }
            if (currentIndex > $results.length - 1) {
                currentIndex = 0;
            }
            jumpTo();
        }
    });
    $("#prev").click(function () {
        event.preventDefault();
        if ($results.length) {
            currentIndex += $(this).is($("#prev")) ? -1 : 1;
            if (currentIndex < 0) {
                currentIndex = $results.length - 1;
            }
            if (currentIndex > $results.length - 1) {
                currentIndex = 0;
            }
            jumpTo();
        }
    });

});




//position fix scrolling
function scrollErrorMessageToTop() {
    var flash_error = jQuery('#myModall');
    var flash_position = flash_error.position();

    function lockErrorMessageToTop() {
        var place_holder = jQuery("#place_holder");
        if (jQuery(this).scrollTop() > flash_position.top && flash_error.attr("position") != "fixed") {
            flash_error.css({
                'position': 'fixed',
                'top': "0px",
                "width": flash_error.width(),
                "z-index": "1",
                
            });
            place_holder.css("display", "");
        } else {
            flash_error.css('position', '');
            place_holder.css("display", "none");
        }

    }
    if (flash_error.length > 0) {
        lockErrorMessageToTop();

        jQuery("#myModall").after(jQuery("<div id='place_holder'>"));
        var place_holder = jQuery("#place_holder");
        place_holder.css({
            "height": flash_error.height(),
            "display": "none",
             
        });
        jQuery(window).scroll(function (e) {
            lockErrorMessageToTop();
        });
    }
}