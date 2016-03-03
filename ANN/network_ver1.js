// var activationLimit = 0.5;  // Limit is determined by ...
// var gradientLimit = 0.05; // Limit is determined by ...

// var neurons = [];
// var connections = [];

// // Used for running different tests. Not used for timing.
// var currentTick = 0;

// // Neuron
// function Neuron(nId, nLayer) {
//     return {
//         id: nId,
//         activatedVal: 0,
//         gradientVal: 0,
//         timeLastActive: Date.now(),
//         numConnectionsInUsed: 0,
//         numConnectionsOutUsed: 0,
        
//         layer: nLayer,
        
//         connectionsIn: [],
//         connectionsOut: [],
        
//         activate: function(input) { // Currently not used
// 		this.activatedVal = sigmoid(this.activatedVal);
//         },
//         backProp: function(input) { // Currently not used
//             this.gradientVal = dsigmoid(this.gradientVal);
//         },
//         resetConnectionsUsed: function() {
//             this.numConnectionsInUsed = 0;
//             this.numConnectionsOutUsed = 0;
//         },	
//         updateTick: function(input) {
//             this.numConnectionsInUsed = 0;
//             this.numConnectionsOutUsed = 0;
//             this.gradientVal = 0;
//             this.activatedVal = 0;
            
//             this.activatedPct = 0; // Reset the neuron so it can fire again // Don't know if I should do this here
//         },
//         toString: function() {
//             return "Neuron: " + this.id;
//         }
        
//     }
// }

// // Connection
// function Connection(node1, node2, weight) {
//     return {
//         nodeA: node1,
//         nodeB: node2,
//         weight: weight || 0,
//         activatedPct: 0, // Activated percent refers to the percent of activation volts at nodeB
//         timeLastActive: Date.now() // This is used to calculate if there is enough electricity to fire
//     }
// }

// function sigmoid(val) {
//     return 1 / (1 + Math.pow(2.718, -val));
// };

// function dsigmoid(val) {
// 	return 1.0 - Math.pow(val, 2);
// }

// // Connects two Neurons // Returns true if successful and false if not
// function project(n1, n2) {
	
//     // Creates a new connection where n1 is nodeA and n2 is nodeB
// 	var c = Connection(n1, n2, 0.5); //Math.random());
	
//     // connection is added to each Neuron's list of output or input connections (resp. nodeA, nodeB)
// 	n1.connectionsOut.push(c);
// 	n2.connectionsIn.push(c);
    
    
//     if(connectionWrongWay(c)) {
//         // Removes connections
//         n1.connectionsOut.pop();
//         n2.connectionsOut.pop();
//         return false;
      
//     } else {
	
//         // Adds connection to list of all connections
//         connections.push(c);
        
//         return true;
//     }
// }

// // Check if connection is sending signal backward or into itself return true if it is
// function connectionWrongWay(connection) {
//     var front = connection.nodeA; // Beginning node of the possible backwards connection
    
//     return falseActivate(connection, front);
    
// }

// function falseActivate(connection, front) {
// 	var curNeuron = connection.nodeB;
    
//     if(curNeuron == front) {
//         return true;
//     } else {
  
//         // Activate outputs	
//         while(curNeuron.numConnectionsOutUsed < curNeuron.connectionsOut.length) {
            
//             //console.log(curNeuron);
            
//             if(falseActivate(curNeuron.connectionsOut[curNeuron.numConnectionsOutUsed], front)) {
//                 console.log("I'm supposed to break!!");
//                 return true;
//             }
            
//             // Increase connections used
//             curNeuron.numConnectionsOutUsed++;
            
//         }
//         console.log("I am returning false!")
//     return false;
//     }
             
// }

//  function init() {
	
// 	for(var i = 0; i < 8; i++) {
// 		neurons.push(Neuron(i));
// 	}	
    
//     project(neurons[0], neurons[6]);
// 	project(neurons[0], neurons[7]);
    
//     project(neurons[1], neurons[6]);
// 	project(neurons[1], neurons[7]);
//     // console.log("connectionWrongWay: ", !project(neurons[1], neurons[1]));
    
	
// 	// project(neurons[0], neurons[3]);
// 	// project(neurons[0], neurons[4]);
// 	// project(neurons[0], neurons[5]);
	
// 	// project(neurons[1], neurons[3]);
// 	// project(neurons[1], neurons[4]);
// 	// project(neurons[1], neurons[5]);
	
// 	// project(neurons[2], neurons[3]);
// 	// project(neurons[2], neurons[4]);
// 	// project(neurons[2], neurons[5]);
	
// 	// project(neurons[3], neurons[6]);
// 	// project(neurons[4], neurons[6]);
// 	// project(neurons[5], neurons[6]);
    
//     // project(neurons[3], neurons[7]);
// 	// project(neurons[4], neurons[7]);
// 	// project(neurons[5], neurons[7]);
	
// 	//console.log(neurons);
	
// }

// function beginningNeuronActivation(neuronsIn, val) {
//     // Activate all input Neurons to the system
// 	for(var i = 0; i < neuronsIn.length; i++) {

// 		neuronsIn[i].activatedVal = val[i];
		
// 		neuronsIn[i].connectionsOut.forEach(function(element) {
			
// 			activate(element, neurons[i].activatedVal)
				
// 		}, this);
// 	}
// }

// function beginningNeuronBackProp(neuronsOut, error) {
//     // Backprop all output Neurons from the system
//     for(var i = 0; i < neuronsOut.length; i++) {
//         neuronsOut[i].gradientVal = dsigmoid(neuronsOut[i].activatedVal) * error[i];
        
//         neuronsOut[i].connectionsIn.forEach(function(element) {
            
//             backProp(element, neuronsOut[i].gradientVal)
                
//         }, this);
//     }
// }

// function activate(connection, val) {
// 	var curNeuron = connection.nodeB;
	
// 	// This connection has been used so add one to input connections used
// 	curNeuron.numConnectionsInUsed++;
	
// 	// console.log("id: " + curNeuron.id);
// 	// console.log("conInUsed: " + curNeuron.numConnectionsInUsed);
// 	// console.log("conInLen: " + curNeuron.connectionsIn.length);
	
// 	//Do value*weight calc and add to activated val //Should be the neuron's function
// 	curNeuron.activatedVal += val * connection.weight;
// 	// console.log(curNeuron.id + ", " + curNeuron.activatedVal);
	
	
// 	// If the neurons inputs have all been activated it is allowed to active its outputs
// 	if(curNeuron.numConnectionsInUsed >= curNeuron.connectionsIn.length) {
		
// 		curNeuron.activatedVal = sigmoid(curNeuron.activatedVal);
		
// 		var outVal = curNeuron.activatedVal;
// 		//console.log("outVal: " + outVal);
		
// 		// Activate outputs	
// 		while(curNeuron.numConnectionsOutUsed < curNeuron.connectionsOut.length) {
			
// 			// console.log("conOutUsed: " + curNeuron.numConnectionsOutUsed);
// 			// console.log("conOutLen: " + (curNeuron.connectionsOut.length) );
			
// 			activate(curNeuron.connectionsOut[curNeuron.numConnectionsOutUsed], outVal);
			
// 			// Increase connections used
// 			curNeuron.numConnectionsOutUsed++;
			
// 		}
		
// 	}
 
// }

// function backProp(connection, val) {
// 	var curNeuron = connection.nodeA;
	
// 	// This connection has been used so add one to input connections used
// 	curNeuron.numConnectionsOutUsed++;
	
// 	// console.log("id: " + curNeuron.id);
// 	// console.log("conInUsed: " + curNeuron.numConnectionsInUsed);
// 	// console.log("conInLen: " + curNeuron.connectionsIn.length);
	
// 	//Takes NodeB's gradient val * weight of connection and adds it to its gradient val
// 	curNeuron.gradientVal += val * connection.weight;	
	
// 	// If the neurons outputs have all been activated it is allowed to backprop its inputs
// 	if(curNeuron.numConnectionsOutUsed >= curNeuron.connectionsOut.length) {
		
// 		// Takes the sum of errors from output nodes * dsigmoid of its own activated value
// 		curNeuron.gradientVal *= dsigmoid(curNeuron.activatedVal);
		
// 		// Update output weights
// 		curNeuron.connectionsOut.forEach(function(element) {
// 			element.weight += 0.3 * element.nodeB.gradientVal * curNeuron.activatedVal;
// 		}, this);
		
// 		// Activate inputs
// 		while(curNeuron.numConnectionsInUsed < curNeuron.connectionsIn.length) {
			
// 			// console.log("conOutUsed: " + curNeuron.numConnectionsOutUsed);
// 			// console.log("conOutLen: " + (curNeuron.connectionsOut.length) );
			
// 			backProp(curNeuron.connectionsIn[curNeuron.numConnectionsInUsed], curNeuron.gradientVal);
			
// 			// Increase connections used
// 			curNeuron.numConnectionsInUsed++;
			
// 		}
		
// 	}
// }

// function trainNodes(input, target) {
		
// 		// Reset
// 		neurons.forEach(function(element) {
// 			element.updateTick();
// 		}, this);
		
// 		// Run forward prop
// 		beginningNeuronActivation([neurons[0], neurons[1], neurons[2]], input);
		
// 		if(currentTick % 1000000 === 0) {
// 			// console.log("Neuron7: " + neurons[6].activatedVal);
// 			// console.log(neurons);
// 			// console.log(connections[3]);
// 		}
		
// 		// Reset connections
// 		neurons.forEach(function(element) {
// 			element.resetConnectionsUsed();
// 		}, this);
		
// 		var error = [target[0] - neurons[6].activatedVal, target[1] - neurons[7].activatedVal];
		
// 		// Run back prop
// 		beginningNeuronBackProp([neurons[6], neurons[7]], error);
		
// 		drawSystem();
        
//         // dataArr.push(neurons[6].activatedVal);
//         // dataArr2.push(connections[1].weight);
        
//         if(currentTick % 1000000 === 0) {
//             console.log(currentTick)
//             console.log(connections[0].weight + " & " + connections[1].weight)
//             console.log(neurons[6].activatedVal + " & " + neurons[6].gradientVal)
//            // console.log("---------------------------")
//             console.log("")
// 		}
	
// }

// function startRunning() {
// 	init();
	
// 	initCanvas();
	
// 	makeAllNodesAndConnections();
	
//     // Start drawing
// 	keepDrawing();
//     // Nothing should happen in this function after you start training
// }

// function test(input, expectedVal) {
	
// 	// If training is complete
// 	if(currentTick >= 2000) {
// 		// Reset
// 		neurons.forEach(function(element) {
// 			element.updateTick();
// 		}, this);
		
// 		// Run forward prop
// 		beginningNeuronActivation([neurons[0], neurons[1], neurons[2]], input);
// 		console.log(input + ": " + neurons[6].activatedVal + " <- should = " + expectedVal);
		
		
// 		drawSystem();	
		
// 		document.getElementById('output').innerText = neurons[6].activatedVal.toString();	
// 	}	
		
// }

// //----------- Canvas -----------------
// var canvas;
// var ctx;
// var raf;

// var circles = [];
// var lines = [];

// function Circle(x,y,r,color) {
// 	this.x = x || 250;
// 	this.y = y || 250;
// 	this.r = r || 25;
// 	this.color = color || 'grey',
// 	this.draw = function () {
// 		ctx.beginPath();
// 		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
// 		ctx.closePath();
// 		ctx.fillStyle = this.color;
// 		ctx.fill();
// 		ctx.lineWidth = 2;
// 		ctx.strokeStyle = 'green';
// 		ctx.stroke();
// 	}
// }

// function Line(x1,y1,x2,y2,color,thickness) {
// 	this.x1 = x1 || 250;
// 	this.x2 = x2 || 350;
// 	this.y1 = y1 || 250;
// 	this.y2 = y2 || 350;
// 	this.color = color || 'black';
// 	this.thickness = thickness || 2,
// 	this.draw = function () {
// 		ctx.lineWidth = this.thickness;
// 		ctx.beginPath();
// 		ctx.moveTo(this.x1, this.y1);
// 		ctx.lineTo(this.x2, this.y2);
// 		ctx.closePath();
// 		ctx.strokeStyle = this.color;
// 		ctx.stroke();
// 	}
// }

// function initCanvas() {
// 	canvas = document.getElementById('canvas');
// 	ctx = canvas.getContext('2d');
	
	
// }

// function makeAllNodesAndConnections() {	
	
// 	circles.push(new Circle(100, 100, 25, 'grey'));
// 	circles.push(new Circle(100, 200, 25, 'grey'));
// 	circles.push(new Circle(100, 300, 25, 'grey'));
// 	circles.push(new Circle(250, 100, 25, 'grey'));
// 	circles.push(new Circle(250, 200, 25, 'grey'));
// 	circles.push(new Circle(250, 300, 25, 'grey'));
// 	circles.push(new Circle(400, 150, 25, 'grey'));
//     circles.push(new Circle(400, 250, 25, 'grey'));
	
	
// 	for(var i = 0; i < connections.length; i++) {
		
// 		lines.push(new Line(circles[connections[i].nodeA.id].x,
// 		circles[connections[i].nodeA.id].y,
// 		circles[connections[i].nodeB.id].x,
// 		circles[connections[i].nodeB.id].y,
// 		'grey',
// 		3
// 		));
		
// 	}
// }

// function clear() {
// 	ctx.fillStyle = 'rgba(255,255,255,1)';
// 	ctx.fillRect(0,0,canvas.width,canvas.height);
// }

// function updateSystem() {
// 	var hue;
// 	for(var i = 0; i < circles.length; i++) {
		
// 		hue = Math.round(neurons[i].activatedVal * 255);
		
// 		circles[i].color = "rgb(" + hue + "," + hue + "," + hue + ")";
// 	}
	
// 	for(var i = 0; i < lines.length; i++) {
		
// 		lines[i].thickness = connections[i].weight * 2;
		
//         // There is a weird problem where if thickness is 0 the line gets some unknown value
//         if(connections[i].weight === 0) {
//             lines[i].thickness = 0.1; // This thickness is visible but not large
//         }
// 	}
// }

// function drawSystem() {
// 	clear();
	
// 	updateSystem();
	
// 	lines.forEach(function(element) {
// 		element.draw();
// 	}, this);
	
// 	circles.forEach(function(element) {
// 		element.draw();
// 	}, this);
	
	
// 	raf = window.requestAnimationFrame(delayedDraw);	
	
// }

// var timeoutID;

// function delayedDraw() {
//   timeoutID = window.setTimeout(keepDrawing, 0);
// }


// //Function that runs the ai
// function keepDrawing() {
// 	currentTick++;
    
// 	if(currentTick < 2000) {
// 		if(currentTick % 1 == 0) {  // % 2
// 			trainNodes([1,0,0], [1, 0]);
// 		} else {
// 			trainNodes([0,1,0], [0, 1]);
// 		}
// 	} else if(currentTick == 2000) {
// 		document.getElementById("status").innerHTML = "You can now test it"
//         // document.getElementById("dataArr").innerHTML = dataArr.toString();
//         // document.getElementById("dataArr2").innerHTML = dataArr2.toString();
// 	}
// }