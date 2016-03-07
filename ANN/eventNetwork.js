var activationLimit = 0.4;  // Limit is determined by ...
var gradientLimit = 0.0005; // Limit is determined by ...
//var neuronPctLimit = 0.5; // Limit is determined by ...
var startTime = Date.now();
var runtime = 300; // in milliseconds
//var timeReduxConst = 10000; // in milliseconds



// Used for running different tests. Not used for timing.
var currentTick = 0;

// Array to track values
var dataArr = [];
var dataArr2 = [];
var dataArr3 = [];

// Neuron
function Neuron(id) {
    this.id = id; //For debugging
    this.activatedVal = 0;
    this.sigmoidedVal = 0;
    this.gradientVal = 0;
    this.dsigmoidedVal = 0;
    this.timeLastActive = 0; //Date.now(); // This is used to calculate if there is enough electricity to fire
    this.numConnectionsInUsed = 0;
    this.numConnectionsOutUsed = 0;

    this.connectionsIn = [];
    this.connectionsOut = [];

    this.activatedPct = 0; // This is used to make sure neuron does not fire multiple times per tick

}

Neuron.prototype = {
    activate: function (input) { // Currently not used
        this.activatedVal = sigmoid(this.activatedVal);
    },
    backProp: function (input) { // Currently not used
        this.gradientVal = dsigmoid(this.gradientVal);
    },
    resetConnectionsUsed: function () {
        this.numConnectionsInUsed = 0;
        this.numConnectionsOutUsed = 0;
    },
    updateTick: function (input) {
        this.numConnectionsInUsed = 0;
        this.numConnectionsOutUsed = 0;
        this.gradientVal = 0;
        this.activatedVal = 0;

        this.activatedPct = 0; // Reset the neuron so it can fire again // Don't know if I should do this here
    },
    toString: function () {
        return "Neuron: " + this.id;
    }
}

// Connection
function Connection(node1, node2, weight) {
    this.nodeA = node1,
    this.nodeB = node2,
    this.weight = weight || 0;
    this.activatedPct = 0; // Activated percent refers to the percent of activation volts at nodeB
    this.timeLastActive = Date.now(); // This is used to calculate if there is enough electricity to fire
    this.toAddWeight = 0;
}


function sigmoid(val) {

    var retVal = 1 / (1 + Math.pow(Math.E, -val));

    if (retVal < 0 || retVal > 1) {
        console.log("sig is negative: ", retVal);
        debugger
    }

    return retVal;
    
    //return 1 / (1 + Math.pow(2.718, -val));
};

function dsigmoid(val) {
    var retVal;

    if (val < -1 || retVal > 1) {
        var ethreex = Math.pow(Math.E, 3 * val);
        retVal = 4 * ethreex / (Math.pow(ethreex + 1, 2));

    } else {

        retVal = 1.0 - Math.pow(val, 2);
    }
    
    // if(retVal < 0) {
    //     console.log("RetVal is negative: ", retVal);
    //     debugger
    // }
    
    return retVal;
    
    //return 1.0 - Math.pow(val, 2);
}

function sigmoidNeg(val) {

    if (val < -1) {
        return -1;
    } else if (val > 1) {
        return 1;
    } else {
        return val;
    }
    
    //return 2 / (1 + Math.pow(2.718, -val)) - 1;
}

// Returns a value between 0 & 1 for a value of timeReduxConst
function timeReduce(time) {
    // If it has been X miliseconds all charge is reset // Returns a linear reduction
    // var returnval = 1 - (Date.now() - time)/timeReduxConst;
    
    // if(returnval < 0) {
    //     returnval = 0;
    // }
    
    // console.log("returnval: " + returnval);
    return 1; //returnval;
}

var neurons = [];
var connections = [];

// Connects two Neurons // Returns true if successful and false if not
function project(n1, n2) {
	
    // Creates a new connection where n1 is nodeA and n2 is nodeB
    var c = new Connection(n1, n2, (Math.random() + 0.5) / 2); //Math.random());
	
    // connection is added to each Neuron's list of output or input connections (resp. nodeA, nodeB)
    n1.connectionsOut.push(c);
    n2.connectionsIn.push(c);


    if (connectionWrongWay(c)) {
        // Removes connections
        n1.connectionsOut.pop();
        n2.connectionsOut.pop();
        return false;

    } else {
	
        // Adds connection to list of all connections
        connections.push(c);

        return true;
    }
}

// Check if connection is sending signal backward or into itself return true if it is
function connectionWrongWay(connection) {
    var front = connection.nodeA; // Beginning node of the possible backwards connection
    
    return falseActivate(connection, front);

}

function falseActivate(connection, front) {
    var curNeuron = connection.nodeB;

    if (curNeuron == front) {
        return true;
    } else {
  
        // Activate outputs	
        while (curNeuron.numConnectionsOutUsed < curNeuron.connectionsOut.length) {
            
            //console.log(curNeuron);
            
            if (falseActivate(curNeuron.connectionsOut[curNeuron.numConnectionsOutUsed], front)) {
                // console.log("I'm supposed to break!!");
                return true;
            }
            
            // Increase connections used
            curNeuron.numConnectionsOutUsed++;

        }
        // console.log("I am returning false!")
        return false;
    }

}

function init() {

    for (var i = 0; i < 13; i++) {
        neurons.push(new Neuron(i));
    }	
    
    // project(neurons[0], neurons[3]);
    // project(neurons[0], neurons[4]);
    
    // project(neurons[1], neurons[3]);
    // project(neurons[1], neurons[4]);
    // console.log("connectionWrongWay: ", !project(neurons[1], neurons[1]));
    
    // --- Test 2 -----
    project(neurons[0], neurons[3]);
    project(neurons[0], neurons[4]);
    project(neurons[0], neurons[5]);

    project(neurons[1], neurons[3]);
    project(neurons[1], neurons[4]);
    project(neurons[1], neurons[5]);

    project(neurons[2], neurons[3]);
    project(neurons[2], neurons[4]);
    project(neurons[2], neurons[5]);

    project(neurons[3], neurons[7]);
    project(neurons[3], neurons[8]);

    project(neurons[4], neurons[7]);
    project(neurons[4], neurons[8]);

    project(neurons[5], neurons[7]);
    project(neurons[5], neurons[8]);
    
    
    
    // //----Input----
    // project(neurons[0], neurons[3]);
    // project(neurons[0], neurons[4]);
    // project(neurons[0], neurons[5]);
    // project(neurons[0], neurons[6]);
	
    // project(neurons[1], neurons[3]);
    // project(neurons[1], neurons[4]);
    // project(neurons[1], neurons[5]);
    // project(neurons[1], neurons[6]);
    
    // project(neurons[2], neurons[3]);
    // project(neurons[2], neurons[4]);
    // project(neurons[2], neurons[5]);
    // project(neurons[2], neurons[6]);
	
    // //----Layer1----
    // project(neurons[3], neurons[10]);
    // project(neurons[3], neurons[7]);
    // project(neurons[3], neurons[8]);
    // project(neurons[3], neurons[9]);
    
    // project(neurons[4], neurons[10]);
    // project(neurons[4], neurons[7]);
    // project(neurons[4], neurons[8]);
    // project(neurons[4], neurons[9]);
    
    // project(neurons[5], neurons[10]);
    // project(neurons[5], neurons[7]);
    // project(neurons[5], neurons[8]);
    // project(neurons[5], neurons[9]);
    
    // project(neurons[6], neurons[10]);
    // project(neurons[6], neurons[7]);
    // project(neurons[6], neurons[8]);
    // project(neurons[6], neurons[9]);
    
    // //----Layer2----
    // project(neurons[7], neurons[11]);
    // project(neurons[8], neurons[11]);
    // project(neurons[9], neurons[11]);
    // project(neurons[10], neurons[11]);
    
    // project(neurons[7], neurons[12]);
    // project(neurons[8], neurons[12]);
    // project(neurons[9], neurons[12]);
    // project(neurons[10], neurons[12]);
	
    // console.log(neurons);
    
    connections.forEach(function (element) {
        console.log(element.weight);
    }, this);


}



function beginningNeuronActivation(neuronsIn, val) {
    // Activate all input Neurons to the system
    for (var i = 0; i < neuronsIn.length; i++) {

        neuronsIn[i].activatedVal = val[i];

        if (neuronsIn[i].activatedVal > activationLimit) {
            
            //neuronsIn[i].activatedVal = sigmoid(neuronsIn[i].activatedVal);
            
            neuronsIn[i].connectionsOut.forEach(function (element) {

                activate(element, neurons[i].activatedVal)

            }, this);
        }
    }
}

function activate(connection, val) {

    var curNeuron = connection.nodeB;
    
    // If the neuron has activated recently(~within the tick) then it is not allowed to do anything
    // if(curNeuron.activatedPct <= neuronPctLimit) {
        
    // Reduce activatedVal based on time last used and connection's time last used
    // add value*weight calc and * by activated val //Should be the neuron's function
    curNeuron.activatedVal += val * connection.weight * (1 - connection.activatedPct); 
    // console.log( curNeuron.id, curNeuron.activatedVal);
        
        
    // If the neuron's inputs have exceeded the activation value the neuron is allowed to active its outputs
    if (curNeuron.activatedVal >= activationLimit) {
            
        // This reduces the activated value to 0 - 1
        curNeuron.sigmoidedVal = sigmoid(curNeuron.activatedVal);
          
            
        // Activate outputs	
        while (curNeuron.numConnectionsOutUsed < curNeuron.connectionsOut.length) {
                
            // console.log("conOutUsed: " + curNeuron.numConnectionsOutUsed);
            // console.log("conOutLen: " + (curNeuron.connectionsOut.length) );
                
            activate(curNeuron.connectionsOut[curNeuron.numConnectionsOutUsed], curNeuron.sigmoidedVal);
                
            // Increase connections used
            curNeuron.numConnectionsOutUsed++;

        }
            
        // Set the neuron's activatedPct because electrons were sent to connections
        //curNeuron.activatedPct = 1;
        // curNeuron.activatedVal = 0;
            
    }
    // }
    
    // Connection has been activated so it is now full
    connection.activatedPct = 1; //val
    connection.timeLastActive = Date.now();

}

function beginningNeuronBackProp(neuronsOut, error) {
    // Backprop all output Neurons from the system
    for (var i = 0; i < neuronsOut.length; i++) {
        
        //if(neuronsOut[i].gradientVal > gradientLimit) {
                        
        // I don't really know what dsigmoid does
        //neuronsOut[i].gradientVal = dsigmoid(neuronsOut[i].sigmoidedVal) * error[i];
            
        // Makes sure the gradient is not outside -1 to 1
        //neuronsOut[i].gradientVal = sigmoidNeg(neuronsOut[i].sigmoidedVal);
            
        // Testing without dsigmoid
        neuronsOut[i].gradientVal = error[i];

        console.log(currentTick + ":", neuronsOut[i].id, neuronsOut[i].gradientVal);
            
            
        // For all the outputs send their errors
        neuronsOut[i].connectionsIn.forEach(function (element) {

            backProp(element, neuronsOut[i].gradientVal)

        }, this);
        //}
    }
}

function backProp(connection, val) {
    // Update activatedPct
    //connection.activatedPct *= timeReduce(connection.timeLastActive);
    
    var curNeuron = connection.nodeA;
	
    // If the connection has been activated recently it is given the error and will backprop its inputs
    if (connection.activatedPct >= 0) { // > 0.01
        
        // console.log(curNeuron.id + " & " + connection.nodeB.id);
        // console.log(connection.nodeB.gradientVal, "+", curNeuron.activatedVal, "=", connection.nodeB.gradientVal * curNeuron.activatedVal);
        // console.log("weight", connection.weight);
        // console.log("");
        
        // Update output weight // current weight + Momentum * nodeB.gradVal * nodeA.activatedVal
        connection.toAddWeight = val * connection.activatedPct; // activatedPct? // * connection.weight 
             
        // if(connection.weight > 10 && connection.toAddWeight > 0) {
        //     connection.toAddWeight = 0;
            
            
        //     dataArr.push(connection.weight);
        //     dataArr2.push(neurons[7].activatedVal);
        //     dataArr3.push(neurons[8].activatedVal);
        // }
        
        
        //Takes NodeB's gradient val * weight of connection and adds it to its gradient val
        curNeuron.gradientVal += val * curNeuron.sigmoidedVal; //* connection.weight 
		
        
        // If the current neuron's gradient has been given a large change the neuron propogates it
        if (Math.abs(curNeuron.gradientVal) > gradientLimit) {
            
            // Takes the sum of errors from output nodes * dsigmoid of its own activated value
            // curNeuron.dsigmoidedVal *= dsigmoid(curNeuron.activatedVal);
            
            // Constrains the value to -1 to 1
            curNeuron.dsigmoidedVal = sigmoidNeg(curNeuron.gradientVal);

            var weightsOActiveCons = 0; // Total weights of activated input connections
            
            // Sums all activated input connections's weights
            curNeuron.connectionsIn.forEach(function (con) {
                if (con.activatedPct > 0) {
                    weightsOActiveCons += con.weight;
                }
            }, this);
            
            
            // Backprop inputs
            while (curNeuron.numConnectionsInUsed < curNeuron.connectionsIn.length) {
                
                // console.log("conOutUsed: " + curNeuron.numConnectionsOutUsed);
                // console.log("conOutLen: " + (curNeuron.connectionsOut.length) );
                if (connection.activatedPct >= 0) {
                    backProp(curNeuron.connectionsIn[curNeuron.numConnectionsInUsed], curNeuron.dsigmoidedVal / weightsOActiveCons);
                }
                // Increase connections used
                curNeuron.numConnectionsInUsed++;

            }
        }
        
        // Reset connection so it can be used again
        connection.activatedPct = 0;

    }
}

// Propogates inputs forward and back-propogates error
function trainNodes(input, target) {

    if (currentTick % 500 === 0) {
        //debugger
    }
        
    // Reset
    neurons.forEach(function (element) {
        element.updateTick();
    }, this);
		
    // Run forward prop
    beginningNeuronActivation([neurons[0], neurons[1], neurons[2]], input);

    if (currentTick % 1000000 === 0) {
        // console.log("Neuron7: " + neurons[6].activatedVal);
        // console.log(neurons);
        // console.log(connections[3]);
    }
		
    // Reset connections
    neurons.forEach(function (element) {
        element.resetConnectionsUsed();
    }, this);

    var error = [target[0] - neurons[7].sigmoidedVal, target[1] - neurons[8].sigmoidedVal];
        
    // Run back prop
    beginningNeuronBackProp([neurons[7], neurons[8]], error);
        
    // Update connection weights
    connections.forEach(function (element) {
        element.weight += element.toAddWeight;
        // element.weight = sigmoid(element.weight);
        element.toAddWeight = 0;
    })
		
    // KeepLooping or updatedrawing
      
        
    // dataArr.push(neurons[6].activatedVal);
    // dataArr2.push(neurons[7].activatedVal);
    // dataArr3.push(neurons[8].activatedVal);
        
    // console.log(currentTick);
        
    if (currentTick % 1 == 0 && currentTick < 15) {
        console.log(currentTick)
        console.log(connections[0].weight + " & " + connections[1].weight)
        console.log(neurons[7].sigmoidedVal + " & " + neurons[7].dsigmoidedVal)
        console.log(connections[9].weight + " & " + connections[10].weight)
        console.log(neurons[8].sigmoidedVal + " & " + neurons[8].dsigmoidedVal)
        // console.log("---------------------------")
        console.log("")
    }

}

// Propogates input values
function test(input, expectedVal) {
	
    // If training is complete
    if (currentTick >= runtime) {
        
        // Reset
        neurons.forEach(function (element) {
            element.updateTick();
        }, this);
		
        // Run forward prop
        beginningNeuronActivation([neurons[0], neurons[1], neurons[2]], input);
        console.log(input + ": ", neurons[7].sigmoidedVal, neurons[8].sigmoidedVal, " <- should = " + expectedVal);


        drawSystem();

        document.getElementById('output').innerText = neurons[8].sigmoidedVal.toString();
        
        // Update connection weights
        connections.forEach(function (element) {
            element.activatedPct = 0;
        })
    }

}

// This is the main loop for the program
function startRunning() {
    init();

    initCanvas();

    makeAllNodesAndConnections();

    window.requestAnimationFrame(mainLoop);

}

// Trains the AI and draws the system
function mainLoop() {
    currentTick++;
    
    // Runs main loop until 
    if (currentTick < runtime) {
        if (currentTick % 2 == 0) {  // % 2
            trainNodes([1, 0, 0], [1, 0]);
        } else {
            trainNodes([0, 1, 0], [1, 1]);
        }

        // Draws the system
        if (currentTick % 1 == 0 && currentTick < 8) {
            window.setTimeout(drawSystem, 0); // change the 2nd param to slow/speed up looping
        }
    
        // Loops this function
        if (currentTick % 1 == 0 && currentTick < 8 || currentTick % 100 == 0) {
            window.requestAnimationFrame(mainLoop);
        } else {
            mainLoop();
        }

    } else {
        drawSystem();
        document.getElementById("status").innerHTML = "You can now test it"
        console.log(currentTick, connections);
        // debugger
        // document.getElementById("dataArr").innerHTML = dataArr.toString();
        // document.getElementById("dataArr2").innerHTML = dataArr2.toString();
    }

}


//------------------------------------ Canvas -----------------------------------
var canvas;
var ctx;
var raf;

var circles = [];
var lines = [];

function Circle(x, y, r, color) {
    this.x = x || 250;
    this.y = y || 250;
    this.r = r || 25;
    this.color = color || 'grey',
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }
}

function Line(x1, y1, x2, y2, color, thickness) {
    this.x1 = x1 || 250;
    this.x2 = x2 || 350;
    this.y1 = y1 || 250;
    this.y2 = y2 || 350;
    this.color = color || 'black';
    this.thickness = thickness || 2,
    this.draw = function () {
        ctx.lineWidth = this.thickness;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


}

function makeAllNodesAndConnections() {

    circles.push(new Circle(100, 100, 25, 'grey'));
    circles.push(new Circle(100, 200, 25, 'grey'));
    circles.push(new Circle(100, 300, 25, 'grey'));
    circles.push(new Circle(250, 100, 25, 'grey'));
    circles.push(new Circle(250, 200, 25, 'grey'));
    circles.push(new Circle(250, 300, 25, 'grey'));
    circles.push(new Circle(250, 400, 25, 'grey'));
    circles.push(new Circle(400, 100, 25, 'grey'));
    circles.push(new Circle(400, 200, 25, 'grey'));
    circles.push(new Circle(400, 300, 25, 'grey'));
    circles.push(new Circle(400, 400, 25, 'grey'));
    circles.push(new Circle(550, 150, 25, 'grey'));
    circles.push(new Circle(550, 250, 25, 'grey'));


    for (var i = 0; i < connections.length; i++) {

        lines.push(new Line(circles[connections[i].nodeA.id].x,
            circles[connections[i].nodeA.id].y,
            circles[connections[i].nodeB.id].x,
            circles[connections[i].nodeB.id].y,
            'grey',
            3
            ));

    }



}

function clear() {
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateSystem() {
    var hue;
    for (var i = 0; i < circles.length; i++) {

        hue = Math.round(neurons[i].sigmoidedVal * 255);

        circles[i].color = "rgb(" + hue + "," + hue + "," + hue + ")";
    }

    for (var i = 0; i < lines.length; i++) {

        lines[i].thickness = connections[i].weight * 2;

        lines[i].color = "rgb(0, " + Math.round(255 * sigmoid(connections[i].weight)) + ", 0)"
		
        // There is a weird problem where if thickness is 0 the line gets some unknown value
        if (connections[i].weight === 0) {
            lines[i].thickness = 0.1; // This thickness is visible but not large
        }
    }
}

function drawSystem() {
    clear();

    updateSystem();

    lines.forEach(function (element) {
        element.draw();
    }, this);

    circles.forEach(function (element) {
        element.draw();
    }, this);

}