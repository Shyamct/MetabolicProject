/*
 * ext-shapes.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Christian Tzurcanu
 * Copyright(c) 2010 Alexis Deveria
 *
 */

methodDraw.addExtension("shapes", function() {
  

  var current_d, cur_shape_id;
  var canv = methodDraw.canvas;
  var cur_shape;
  var start_x, start_y;
  var svgroot = canv.getRootElem();
  var lastBBox = {};
  
  // This populates the category list
  var categories = {
    basic: 'Basic',
    object: 'Objects',
    symbol: 'Symbols',
    arrow: 'Arrows',
    flowchart: 'Flowchart',
    nature: 'Nature',
    game: 'Cards & Chess',
    dialog_balloon: 'Dialog balloons',
    music: 'Music',
    weather: 'Weather &amp; Time',
    ui: 'User Interface',
    social: 'Social Web'
  };
  
  var library = {
    'basic': {
      data: {
        "star_points_5": "m1,116.58409l113.82668,0l35.17332,-108.13487l35.17334,108.13487l113.82666,0l-92.08755,66.83026l35.17514,108.13487l-92.08759,-66.83208l-92.08757,66.83208l35.17515,-108.13487l-92.08758,-66.83026z",
        'donut': 'm1,150l0,0c0,-82.29042 66.70958,-149 149,-149l0,0c39.51724,0 77.41599,15.69816 105.35889,43.64108c27.94293,27.94293 43.64111,65.84165 43.64111,105.35892l0,0c0,82.29041 -66.70958,149 -149,149l0,0c-82.29041,0 -149,-66.70959 -149,-149zm74.5,0l0,0c0,41.1452 33.35481,74.5 74.5,74.5c41.14522,0 74.5,-33.3548 74.5,-74.5c0,-41.1452 -33.3548,-74.5 -74.5,-74.5l0,0c-41.14519,0 -74.5,33.35481 -74.5,74.5z',
        "triangle": "m1,280.375l149,-260.75l149,260.75z",
        "right_triangle": "m1,299l0,-298l298,298z",
        "diamond": "m1,150l149,-149l149,149l-149,149l-149,-149z",
        "pentagon": "m1.00035,116.97758l148.99963,-108.4053l148.99998,108.4053l-56.91267,175.4042l-184.1741,0l-56.91284,-175.4042z",
        "hexagon": "m1,149.99944l63.85715,-127.71428l170.28572,0l63.85713,127.71428l-63.85713,127.71428l-170.28572,0l-63.85715,-127.71428z",
        "septagon1": "m0.99917,191.06511l29.51249,-127.7108l119.48833,-56.83673l119.48836,56.83673l29.51303,127.7108l-82.69087,102.41679l-132.62103,0l-82.69031,-102.41679z",
        "heptagon": "m1,88.28171l87.28172,-87.28171l123.43653,0l87.28172,87.28171l0,123.43654l-87.28172,87.28172l-123.43653,0l-87.28172,-87.28172l0,-123.43654z",
        "decagon": "m1,150.00093l28.45646,-88.40318l74.49956,-54.63682l92.08794,0l74.50002,54.63682l28.45599,88.40318l-28.45599,88.40318l-74.50002,54.63681l-92.08794,0l-74.49956,-54.63681l-28.45646,-88.40318z",
        "dodecagon": "m1,110.07421l39.92579,-69.14842l69.14842,-39.92579l79.85159,0l69.14842,39.92579l39.92578,69.14842l0,79.85159l-39.92578,69.14842l-69.14842,39.92578l-79.85159,0l-69.14842,-39.92578l-39.92579,-69.14842l0,-79.85159z",
        "trapezoid": "m1,299l55.875,-298l186.25001,0l55.87498,298z",
        "dialog_balloon_1": "m0.99786,35.96579l0,0c0,-19.31077 15.28761,-34.96524 34.14583,-34.96524l15.52084,0l0,0l74.50001,0l139.68748,0c9.05606,0 17.74118,3.68382 24.14478,10.24108c6.40356,6.55726 10.00107,15.45081 10.00107,24.72416l0,87.41311l0,0l0,52.44785l0,0c0,19.31078 -15.2876,34.96524 -34.14584,34.96524l-139.68748,0l-97.32507,88.90848l22.82506,-88.90848l-15.52084,0c-18.85822,0 -34.14583,-15.65446 -34.14583,-34.96524l0,0l0,-52.44785l0,0z",
        'heart': 'm150,73c61,-175 300,0 0,225c-300,-225 -61,-400 0,-225z',
        "cylinder": "m299.0007,83.77844c0,18.28676 -66.70958,33.11111 -149.00002,33.11111m149.00002,-33.11111l0,0c0,18.28676 -66.70958,33.11111 -149.00002,33.11111c-82.29041,0 -148.99997,-14.82432 -148.99997,-33.11111m0,0l0,0c0,-18.28674 66.70956,-33.1111 148.99997,-33.1111c82.29044,0 149.00002,14.82436 149.00002,33.1111l0,132.44449c0,18.28674 -66.70958,33.11105 -149.00002,33.11105c-82.29041,0 -148.99997,-14.82431 -148.99997,-33.11105z",
        "arrow_up": "m1.49805,149.64304l148.50121,-148.00241l148.50121,148.00241l-74.25061,0l0,148.71457l-148.5012,0l0,-148.71457z",
        "arrow_u_turn": "m1.00059,299.00055l0,-167.62497l0,0c0,-72.00411 58.37087,-130.37499 130.375,-130.37499l0,0l0,0c34.57759,0 67.73898,13.7359 92.18906,38.18595c24.45006,24.45005 38.18593,57.61144 38.18593,92.18904l0,18.625l37.24997,0l-74.49995,74.50002l-74.50002,-74.50002l37.25,0l0,-18.625c0,-30.8589 -25.0161,-55.87498 -55.87498,-55.87498l0,0l0,0c-30.85892,0 -55.875,25.01608 -55.875,55.87498l0,167.62497z",
        "arrow_left_up": "m0.99865,224.5l74.50004,-74.5l0,37.25l111.74991,0l0,-111.75l-37.25,0l74.5,-74.5l74.5,74.5l-37.25,0l0,186.25l-186.24989,0l0,37.25l-74.50005,-74.5z",
        "plaque": "m-0.00197,49.94376l0,0c27.5829,0 49.94327,-22.36036 49.94327,-49.94327l199.76709,0l0,0c0,27.5829 22.36037,49.94327 49.94325,49.94327l0,199.7671l0,0c-27.58289,0 -49.94325,22.36034 -49.94325,49.94325l-199.76709,0c0,-27.58292 -22.36037,-49.94325 -49.94327,-49.94325z",
        "page": "m249.3298,298.99744l9.9335,-39.73413l39.73413,-9.93355l-49.66763,49.66768l-248.33237,0l0,-298.00001l298.00001,0l0,248.33234",
        "cross": "m0.99844,99.71339l98.71494,0l0,-98.71495l101.26279,0l0,98.71495l98.71495,0l0,101.2628l-98.71495,0l0,98.71494l-101.26279,0l0,-98.71494l-98.71494,0z",
        "divide": "m150,0.99785l0,0c25.17819,0 45.58916,20.41097 45.58916,45.58916c0,25.17821 -20.41096,45.58916 -45.58916,45.58916c-25.17822,0 -45.58916,-20.41093 -45.58916,-45.58916c0,-25.1782 20.41093,-45.58916 45.58916,-45.58916zm0,296.25203c-25.17822,0 -45.58916,-20.41095 -45.58916,-45.58917c0,-25.17819 20.41093,-45.58916 45.58916,-45.58916c25.17819,0 45.58916,20.41096 45.58916,45.58916c0,25.17822 -20.41096,45.58917 -45.58916,45.58917zm-134.06754,-193.71518l268.13507,0l0,91.17833l-268.13507,0z",
        "minus": "m0.99887,102.39503l297.49445,0l0,95.2112l-297.49445,0z",
        "times": "m1.00089,73.36786l72.36697,-72.36697l76.87431,76.87368l76.87431,-76.87368l72.36765,72.36697l-76.87433,76.87431l76.87433,76.87431l-72.36765,72.36765l-76.87431,-76.87433l-76.87431,76.87433l-72.36697,-72.36765l76.87368,-76.87431l-76.87368,-76.87431z",
        "proportional": "m313.75305,179.37291c-3.7386,-4.42523 -8.41184,-4.42523 -12.15044,-0.88505c-8.41184,7.96542 -19.62763,12.39066 -30.84342,12.39066c-14.01974,0 -27.10482,-7.08038 -36.45131,-19.47103l-29.90877,-38.05702c-3.7386,-4.42523 -3.7386,-11.50561 0,-16.8159l29.90877,-38.05702c10.28114,-12.39066 22.43158,-19.47103 36.45131,-19.47103c11.21579,0 21.49693,4.42523 30.84342,12.39066c3.7386,3.54018 9.34649,3.54018 12.15044,-0.88505l3.7386,-4.42523c3.7386,-5.31029 3.7386,-13.2757 -0.93465,-17.70094c-13.08509,-12.39066 -28.97412,-18.58599 -45.7978,-18.58599c-20.56228,0 -39.25526,9.73552 -53.275,27.43646l-29.90877,38.05702c-3.7386,4.42523 -9.34649,4.42523 -13.08509,0l-29.90877,-38.05702c-14.01974,-17.70094 -32.71272,-27.43646 -53.275,-27.43646s-39.25526,9.73552 -53.275,27.43646s-22.43158,41.59721 -22.43158,67.26356c0,25.66636 7.47719,49.56263 21.49693,67.26356s32.71272,27.43646 53.275,27.43646s39.25526,-9.73552 53.275,-27.43646l29.90877,-38.05702c3.7386,-4.42523 9.34649,-4.42523 13.08509,0l29.90877,38.05702c14.01974,17.70094 32.71272,27.43646 53.275,27.43646c16.82368,0 32.71272,-6.19533 45.7978,-18.58599c4.67325,-4.42523 4.67325,-12.39066 0.93465,-17.70094l-2.80395,-3.54018l0,-0.00001zm-259.83244,-100.89534c10.28114,-12.39066 22.43158,-19.47103 36.45131,-19.47103s27.10482,7.08038 36.45131,19.47103l29.90877,38.05702c3.7386,4.42523 3.7386,11.50561 0,16.8159l-29.90877,38.05702c-10.28114,12.39066 -22.43158,19.47103 -36.45131,19.47103s-27.10482,-7.08038 -36.45131,-19.47103s-15.88903,-28.32151 -15.88903,-46.02244c0.93465,-17.70094 6.54254,-34.51683 15.88903,-46.90748z",
        "inverse_proportional":"m353.49921,191.45077c-2.39826,-3.51835 -5.42463,-3.51835 -7.82289,-0.73022c-5.42463,6.30647 -12.6194,9.82482 -19.87127,9.82482c-9.02202,0 -17.47302,-5.57625 -23.46866,-15.40107l-19.24316,-30.07191c-2.39826,-3.51835 -2.39826,-9.0946 0,-13.27678l19.24316,-30.07191c6.62376,-9.82482 14.44664,-15.40107 23.46866,-15.40107c7.19477,0 13.81853,3.51835 19.87127,9.82482c2.39826,2.78812 5.99564,2.78812 7.82289,-0.73022l2.39826,-3.51835c2.39826,-4.18219 2.39826,-10.48866 -0.62811,-14.00701c-8.451,-9.82482 -18.67215,-14.67084 -29.4643,-14.67084c-13.24752,0 -25.2959,7.70053 -34.31792,21.70754l-19.24316,29.40807c-2.39826,3.51835 -5.99564,3.51835 -8.451,0l-19.24316,-30.07191c-9.02202,-14.00701 -21.0704,-21.70754 -34.31792,-21.70754s-25.2959,7.70053 -34.31792,21.70754s-14.44664,32.86004 -14.44664,53.17351s4.79651,39.16651 13.81853,53.17351c9.02202,14.00701 21.0704,21.70754 34.31792,21.70754s25.2959,-7.70053 34.31792,-21.70754l19.24316,-30.07191c2.39826,-3.51835 5.99564,-3.51835 8.451,0l19.24316,30.07191c9.02202,14.00701 21.0704,21.70754 34.31792,21.70754c10.84926,0 21.0704,-4.91241 29.4643,-14.67084c3.02637,-3.51835 3.02637,-9.82482 0.62811,-14.00701l-1.77014,-2.19067zm-167.24989,-79.72708c6.62376,-9.82482 14.44664,-15.40107 23.46866,-15.40107s17.47302,5.57625 23.46866,15.40107l19.24316,30.07191c2.39826,3.51835 2.39826,9.0946 0,13.27678l-19.24316,30.07191c-6.62376,9.82482 -14.44664,15.40107 -23.46866,15.40107s-17.47302,-5.57625 -23.46866,-15.40107c-5.99564,-9.82482 -9.65013,-23.1016 -9.65013,-37.10861c0,-13.27678 3.59739,-26.55357 9.65013,-36.312zm-145.72268,108.40493l0,-122.21278c0,0 -0.39971,0.46469 -1.25623,0.46469c-0.85652,0 -2.11275,0.46469 -3.36898,0.99576c-1.25623,0.46469 -2.51246,0.46469 -4.2255,0.99576c-1.65594,0.46469 -2.96927,0.99576 -4.62521,0.99576c-1.65594,0.46469 -2.96927,0.46469 -4.2255,0.99576c-1.25623,0.46469 -2.11275,0.46469 -3.36898,0.46469l-1.25623,0.46469l0,-14.67084c13.01911,-3.91665 21.47011,-9.29375 26.09532,-16.13129l12.6194,0l0,147.63782l-16.38809,0zm44.59616,22.37138l48.76456,-211.3l21.0704,0l-49.33558,211.3l-20.49939,0z"
      },
      buttons: []
    }
  };
  
  var cur_lib = library.basic;
  
  var mode_id = 'shapelib';
  
  function loadIcons() {
    $('#shape_buttons').empty();
    
    // Show lib ones
    $('#shape_buttons').append(cur_lib.buttons);
  }
  
  function loadLibrary(cat_id) {
  
    var lib = library[cat_id];
    
    if(!lib) {
      $('#shape_buttons').html('Loading...');
      $.getJSON('extensions/shapelib/' + cat_id + '.json', function(result, textStatus) {
        cur_lib = library[cat_id] = {
          data: result.data,
          size: result.size,
          fill: result.fill
        }
        makeButtons(cat_id, result);
        loadIcons();
      });
      return;
    }
    
    cur_lib = lib;
    if(!lib.buttons.length) makeButtons(cat_id, lib);
    loadIcons();
  }
  
  function makeButtons(cat, shapes) {
    var size = cur_lib.size || 300;
    var fill = cur_lib.fill || false;
    var off = size * .05;
    var vb = [-off, -off, size + off*2, size + off*2].join(' ');
    var stroke = fill ? 0: (size/30);
    
    var shape_icon = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg"><svg viewBox="' + vb + '"><path fill="#333" stroke="transparent" stroke-width="' + stroke + '" /><\/svg><\/svg>',
      'text/xml');

    var width = 40;
    var height = 40;
    shape_icon.documentElement.setAttribute('width', width);
    shape_icon.documentElement.setAttribute('height', height);
    var svg_elem = $(document.importNode(shape_icon.documentElement,true));
  
    var data = shapes.data;
    
    cur_lib.buttons = [];
  
    for(var id in data) {
      var path_d = data[id];
      var icon = svg_elem.clone();
      icon.find('path').attr('d', path_d);
      
      var icon_btn = icon.wrap('<div class="tool_button">').parent().attr({
        id: mode_id + '_' + id,
        title: id
      });
      
      
      // Store for later use
      cur_lib.buttons.push(icon_btn[0]);
    }
    
  }

  
  return {
    svgicons: "extensions/ext-shapes.xml",
    buttons: [{
      id: "tool_shapelib",
      type: "mode_flyout", // _flyout
      position: 6,
      title: "Shape library",
      icon: "extensions/ext-shapes.png",
      events: {
        "click": function() {
          canv.setMode(mode_id);
        }
      }
    }],
    callback: function() {

    
      var btn_div = $('<div id="shape_buttons">');
      $('#tools_shapelib > *').wrapAll(btn_div);
      
      var shower = $('#tools_shapelib_show');

      
      loadLibrary('basic');
      
      // Do mouseup on parent element rather than each button
      $('#shape_buttons').mouseup(function(evt) {
        var btn = $(evt.target).closest('div.tool_button');
        
        if(!btn.length) return;
        
        var copy = btn.children().clone().attr({width: 24, height: 24});
        shower.children(':not(.flyout_arrow_horiz)').remove();
        shower
          .append(copy)
          .attr('data-curopt', '#' + btn[0].id) // This sets the current mode
          .mouseup();
        canv.setMode(mode_id);
        
        cur_shape_id = btn[0].id.substr((mode_id+'_').length);
        current_d = cur_lib.data[cur_shape_id];
        
        $('.tools_flyout').fadeOut();

      });

//      
      var shape_cats = $('<div id="shape_cats">');
      var cat_str = '';
      
      $.each(categories, function(id, label) {
        cat_str += '<div data-cat=' + id + '>' + label + '</div>';
      });
      
      shape_cats.html(cat_str).children().bind('mouseup', function() {
        var catlink = $(this);
        catlink.siblings().removeClass('current');
        catlink.addClass('current');
        
        loadLibrary(catlink.attr('data-cat'));
        // Get stuff
        
        return false;
      });
      
      shape_cats.children().eq(0).addClass('current');
      
      $('#tools_shapelib').prepend(shape_cats);

      shower.mouseup(function() {
        canv.setMode(current_d ? mode_id : 'select');
      });

      
      $('#tool_shapelib').remove();
      
      var h = $('#tools_shapelib').height();
      $('#tools_shapelib').css({
        'margin-top': -(h/2),
        'margin-left': 3
      });

  
    },
    mouseDown: function(opts) {
      var mode = canv.getMode();
      if(mode !== mode_id) return;
      
      var e = opts.event;
      var x = start_x = opts.start_x;
      var y = start_y = opts.start_y;
      var cur_style = canv.getStyle();
      cur_shape = canv.addSvgElementFromJson({
        "element": "path",
        "curStyles": true,
        "attr": {
          "d": current_d,
          "id": canv.getNextId(),
          "opacity": cur_style.opacity / 2,
          "style": "pointer-events:none"
        }
      });
      cur_shape.setAttribute("d", current_d);
      // Make sure shape uses absolute values
      if(/[a-z]/.test(current_d)) {
        current_d = cur_lib.data[cur_shape_id] = canv.pathActions.convertPath(cur_shape);
        cur_shape.setAttribute('d', current_d);
        canv.pathActions.fixEnd(cur_shape);
      }
      
      cur_shape.setAttribute('transform', "translate(" + x + "," + y + ") scale(0.005) translate(" + -x + "," + -y + ")");      
//      console.time('b');
      canv.recalculateDimensions(cur_shape);
      var tlist = canv.getTransformList(cur_shape);
      lastBBox = cur_shape.getBBox();
      totalScale = {
        sx: 1,
        sy: 1
      };
      return {
        started: true
      }
      // current_d
    },
    mouseMove: function(opts) {
      var mode = canv.getMode();
      if(mode !== mode_id) return;
      
      var zoom = canv.getZoom();
      var evt = opts.event
      
      var x = opts.mouse_x/zoom;
      var y = opts.mouse_y/zoom;
      
      var tlist = canv.getTransformList(cur_shape),
        box = cur_shape.getBBox(), 
        left = box.x, top = box.y, width = box.width,
        height = box.height;
      var dx = (x-start_x), dy = (y-start_y);

      var newbox = {
        'x': Math.min(start_x,x),
        'y': Math.min(start_y,y),
        'width': Math.abs(x-start_x),
        'height': Math.abs(y-start_y)
      };

      var ts = null,
        tx = 0, ty = 0,
        sy = height ? (height+dy)/height : 1, 
        sx = width ? (width+dx)/width : 1;

      var sx = newbox.width / lastBBox.width;
      var sy = newbox.height / lastBBox.height;
      
      sx = sx || 1;
      sy = sy || 1;
      
      // Not perfect, but mostly works...
      
      if(x < start_x) {
        tx = lastBBox.width;
      }
      if(y < start_y) ty = lastBBox.height;
      
      // update the transform list with translate,scale,translate
      var translateOrigin = svgroot.createSVGTransform(),
        scale = svgroot.createSVGTransform(),
        translateBack = svgroot.createSVGTransform();
        
      translateOrigin.setTranslate(-(left+tx), -(top+ty));
      if(evt.shiftKey) {
        replaced = true
        var max = Math.min(Math.abs(sx), Math.abs(sy));
        sx = max * (sx < 0 ? -1 : 1);
        sy = max * (sy < 0 ? -1 : 1);
        if (totalScale.sx != totalScale.sy) {
          var multiplierX = (totalScale.sx > totalScale.sy) ? 1 : totalScale.sx/totalScale.sy;
          var multiplierY = (totalScale.sy > totalScale.sx) ? 1 : totalScale.sy/totalScale.sx;
          sx *= multiplierY
          sy *= multiplierX
        }
      }
      totalScale.sx *= sx;
      totalScale.sy *= sy;
      scale.setScale(sx,sy);
      translateBack.setTranslate(left+tx, top+ty);
      var N = tlist.numberOfItems;
      tlist.appendItem(translateBack);
      tlist.appendItem(scale);
      tlist.appendItem(translateOrigin);

      canv.recalculateDimensions(cur_shape);
      lastBBox = cur_shape.getBBox();
    },
    mouseUp: function(opts) {
      var mode = canv.getMode();
      if(mode !== mode_id) return;
      
      if(opts.mouse_x == start_x && opts.mouse_y == start_y) {
        return {
          keep: false,
          element: cur_shape,
          started: false
        }
      }
      canv.setMode("select")
      return {
        keep: true,
        element: cur_shape,
        started: false
      }
    }   
  }
});
