var nodeId = 0;		
(function ($) {
    $.fn.orgChart = function(options) {
        var opts = $.extend({}, $.fn.orgChart.defaults, options);
        return new OrgChart($(this), opts);        
    }

    $.fn.orgChart.defaults = {
        data: [{id:1, name:'Root', parent: 0}],
        showControls: false,
        allowEdit: false,
        onAddNode: null,
        onDeleteNode: null,
        onClickNode: null,
        newNodeText: 'Add Child'
    };
    var updateId = 0;
    function OrgChart($container, opts){
        var data = opts.data;
        var nodes = {};
        var rootNodes = [];
        this.opts = opts;
        this.$container = $container;
        var self = this;

        this.draw = function(){
            $container.empty().append(rootNodes[0].render(opts));
            $container.find('.node').click(function(){
                if(self.opts.onClickNode !== null){
                    self.opts.onClickNode(nodes[$(this).attr('node-id')]);
                }
            });

            if(opts.allowEdit){
                $container.find('.node h2').click(function(e){
                    var thisId = $(this).parent().attr('node-id');
                    self.startEdit(thisId);
                    e.stopPropagation();
                }); 
            }

            // add "add button" listener
            $container.find('.org-add-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');
                if ($(this).prev().text() != '-Select-') {
                    if (self.opts.onAddNode !== null) {
                        self.opts.onAddNode(nodes[thisId]);
                    }
                    else {
                        self.newNode(thisId);
                    }
                    e.stopPropagation();
                } else {
                    alert('Please select keyword');
                }

            });

            $container.find('.org-del-button').click(function(e){
                var thisId = $(this).parent().attr('node-id');

                if(self.opts.onDeleteNode !== null){
                    self.opts.onDeleteNode(nodes[thisId]);
                }
                else{
                    self.deleteNode(thisId);
                }
                e.stopPropagation();
            });
        }

        this.startEdit = function (id) {
            if (id != 1) {
                updateId = id;
                if (window.localStorage.getItem('result')) {
                    var getData = JSON.parse(window.localStorage.getItem('result'));
                    var str = "<option value='0'>-Select-</option>";
                    $.each(getData, function () {
                        str += '<option value="' + this.id + '">' + this.keyword + '</option>';
                    });
                }
                // alert(nodes[id].data.name);
                var inputElement = $('<select  class="org-input" id="ddlOpt_' + id + '" onchange="getText(this,' + updateId+')">' + str + '</select>');
                //var inputElement = $('<input class="org-input" onchange="getText(this)" type="text" value="'+nodes[id].data.name+'"/>');
                $container.find('div[node-id=' + id + '] h2').replaceWith(inputElement);               
                if (nodes[id].data.keyid && nodes[id].data.keyid != null) {                          
                    $('#ddlOpt_' + id).val(nodes[id].data.keyid);
                }

                var commitChange = function () {
                    nodes[id].data.keyid = $('#ddlOpt_' + id + ' option:selected').val()
                    nodes[id].data.name = $('#ddlOpt_' + id + ' option:selected').text();
                    var h2Element = $('<h2  style="white-space: nowrap; overflow: hidden;text-overflow: clip;" title="' + nodes[id].data.name+'">' + nodes[id].data.name + '</h2>');
                    if (opts.allowEdit) {
                        h2Element.click(function () {
                            self.startEdit(id);
                        })
                    }
                    inputElement.replaceWith(h2Element);
                }
                inputElement.focus();
                inputElement.keyup(function (event) {
                    if (event.which == 13) {
                        commitChange();
                    }
                    else {
                        nodes[id].data.name = inputElement.val();
                    }
                });
                inputElement.blur(function (event) {
                    commitChange();
                }); 
            }
           
          
        }

        this.newNode = function(parentId){
            var nextId = Object.keys(nodes).length;
            while(nextId in nodes){
                nextId++;
            }

            self.addNode({id: nextId, name: '', parent: parentId});
        }

        this.addNode = function(data){
            var newNode = new Node(data);
            nodes[data.id] = newNode;
            nodes[data.parent].addChild(newNode);
            self.draw();
            self.startEdit(data.id);
        }

        this.deleteNode = function (id) {
            var node_id = id;
            for(var i=0;i<nodes[id].children.length;i++){
                self.deleteNode(nodes[id].children[i].data.id);
               // node_id += nodes[id].children[i].data.id + ',';
            }
            nodes[nodes[id].data.parent].removeChild(id);
            delete nodes[id];
            self.draw();
            deleteNode(node_id);

        }

        this.getData = function () {
            var outData = [];
            for (var i in nodes) {               
                outData.push(nodes[i].data);
            }
            return outData;
        }

        // constructor
        for(var i in data){
            var node = new Node(data[i]);
            nodes[data[i].id] = node;           
        }

        // generate parent child tree
        for (var i in nodes) {           
            if(nodes[i].data.parent == 0){
                rootNodes.push(nodes[i]);
            }
            else{
                nodes[nodes[i].data.parent].addChild(nodes[i]);
            }
        }

        // draw org chart
        $container.addClass('orgChart');
        self.draw();
    }

    function Node(data){
        this.data = data;
        this.children = [];
        var self = this;

        this.addChild = function(childNode){
            this.children.push(childNode);
        }

        this.removeChild = function(id){
            for(var i=0;i<self.children.length;i++){
                if(self.children[i].data.id == id){
                    self.children.splice(i,1);
                    return;
                }
            }
        }

        this.render = function (opts) {           
            var arr = ["#f00", "#0f0", "#00f"];
            var childLength = self.children.length,
                mainTable;

            mainTable = "<table cellpadding='0' cellspacing='0' border='0'>";
            var nodeColspan = childLength>0?2*childLength:2;
            mainTable += "<tr><td colspan='" + nodeColspan +"'>"+self.formatNode(opts)+"</td></tr>";

            if(childLength > 0){
                var downLineTable = "<table cellpadding='0' cellspacing='0' border='0' ><tr class='lines x'><td class='line left half'></td><td class='line right half'></td></table>";
                mainTable += "<tr class='lines'><td colspan='"+childLength*2+"'>"+downLineTable+'</td></tr>';

                var linesCols = '';
                for(var i=0;i<childLength;i++){
                    if(childLength==1){
                        linesCols += "<td class='line left half' ></td>";    // keep vertical lines aligned if there's only 1 child
                    }
                    else if(i==0){
                        linesCols += "<td class='line left'></td>";     // the first cell doesn't have a line in the top
                    }
                    else{
                        linesCols += "<td class='line left top'></td>";
                    }
                    if(childLength==1){
                        linesCols += "<td class='line right half'></td>";
                    }
                    else if(i==childLength-1){
                        linesCols += "<td class='line right'></td>";
                    }
                    else{
                        linesCols += "<td class='line right top'></td>";
                    }
                }
                mainTable += "<tr class='lines v'>"+linesCols+"</tr>";

                mainTable += "<tr>";
               
                for(var i in self.children){
                    mainTable += "<td colspan='2'>"+self.children[i].render(opts)+"</td>";
                }
                mainTable += "</tr>";
            }
            mainTable += '</table>';
            return mainTable;
        }

        this.formatNode = function(opts){
            var nameString = '',
                descString = '';
            if(typeof data.name !== 'undefined'){
                nameString = '<h2 style="white-space: nowrap; overflow: hidden;text-overflow: clip;" title="' + self.data.name +'">'+self.data.name+'</h2>';
            }
            if(typeof data.description !== 'undefined'){
                descString = '<p>'+self.data.description+'</p>';
            }
            if(opts.showControls){
                var buttonsHtml = "<div class='org-add-button'>"+opts.newNodeText+"</div><div class='org-del-button'></div>";
            }
            else{
                buttonsHtml = '';
            }
            return "<div class='node' node-id='"+this.data.id+"'>"+nameString+descString+buttonsHtml+"</div>";
        }
    }

   

})(jQuery);

var deleteNode = function (id) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/deleteFlowchartDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + id + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            maketoast('success', 'Success', 'Delete Successfully.');            
        }, error: function () {

        }
    });
}

var UpdateFlowchartDetails = function (id, keyId) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/flowChart.asmx/UpdateFlowchartDetails",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'id':'" + id + "','keyId':'" + keyId + "','empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            updateId = 0;
            maketoast('success', 'Success', 'Update Successfully.');            
        }, error: function () {

        }
    });
}

function getText(e, updateId) {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    if ($(e).val() != '0') {
        var obj = {
            keyId: $(e).val(),
            parentid: nodeId,
            id: updateId,
            pathwayId: pathwayId
        }

        $.ajax({
            type: "POST",
            url: "WebService/flowChart.asmx/insertNewNode",
            data: "{'dataValue':'" + JSON.stringify(obj) + "','empid': '" + Number(UtilsCache.getSession('USERDETAILS').userid) + "' }",
            contentType: 'application/json',
            dataType: 'json',
            statusCode: {
                401: function (xhr) {
                    window.location.href = "../../index.html";
                }
            },
            success: function (data) {
                maketoast('success', 'Success', 'Save Successfully.');
                getflowChart();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

} 
