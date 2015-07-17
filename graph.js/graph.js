$(document).ready(function() {
    var canvas = new Canvas('canvas', $(window).width() - 20, $(window).height() * 0.8);
});

function Graph () {
    var self = this;
    this.nodes = [];

    this.addNode = function(x, y) {
        var node = new Node(x, y, self.nodes.length);
        self.nodes.push(node);
    };
}

function Node (x, y, number) {
    this.x = x;
    this.y = y;
    this.background = "#FFFFFF";
    this.color = "#000066";
    this.radius = 20;
    this.number = number;
}

function Edge () {

}

function Canvas (id, width, height) {
    var ACTIONS = {
        DEFAULT : "1",
        CONNECT_NODES : "2"
    };
    var self = this;
    this.width = width;
    this.height = height;
    this.object = document.getElementById(id);
    this.context = this.object.getContext("2d");
    this.graph = new Graph();
    this.currentAction = ACTIONS.DEFAULT;

    $('canvas').attr('width', this.width);
    $('canvas').attr('height', this.height);
    $('canvas').css('border', '1px solid #000000');

    mouseDown = function (event) {
        var mouse = getMousePos(event);

        if (!mouse.clickedOnNode) {
            self.graph.addNode(mouse.x, mouse.y);
        } else {
            var node = mouse.clickedNode;
            switch(self.currentAction) {
                case ACTIONS.DEFAULT:
                    self.currentAction = ACTIONS.CONNECT_NODES;

                    break;
                case ACTIONS.CONNECT_NODES:
                    self.currentAction = ACTIONS.DEFAULT;

                    break;
            }
        }
        redraw();
    };

    this.object.addEventListener("mousedown", mouseDown, false);

    redraw = function() {
        var context = self.context;
        context.clearRect(0, 0, self.width, self.height);
        drawNodes();
    };

    drawNodes = function() {
        var context = self.context;
        var nodes = self.graph.nodes;
        for (var i in nodes) {
            var node = nodes[i];
            context.beginPath();
            context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            context.fillStyle = node.background;
            context.font = "20px Arial";
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = node.color;
            context.stroke();

            context.fillStyle = node.color;
            context.font = "20px Arial";
        	context.textAlign = "center";
	        context.textBaseline = "middle";
	        context.fillText(node.number, node.x, node.y);
	        context.restore();
        }
    };

    findNode = function(x, y) {
        var nodes = self.graph.nodes;
        for (var i in nodes) {
            var node = nodes[i];
            var distancesquared = Math.pow((x - node.x ), 2) + Math.pow((y - node.y), 2) ;
             if(distancesquared <= Math.pow(node.radius, 2)) {
                return node;
             }
        }
    };

    getMousePos = function (event) {
        if (event.x !== undefined && event.y !== undefined) {
            x = event.x;
            y = event.y;
        } else {
            // Firefox method to get the position
            x = event.clientX + document.body.scrollLeft;
            y = event.clientY + document.body.scrollTop;
        }

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

        var clickedNode = findNode(x, y);
        var clickedOnNode = clickedNode !== undefined;
        return {x : x, y : y, clickedNode : clickedNode, clickedOnNode : clickedOnNode};
            
    };

}
