var myGamePiece;
var myObstacles = [];
var myScore;
var x11,flag=0;

 var Mscore;

var bol=false;

var crr=[ 
    "#2E2E3A",
    "#E55934",
    "#20B6DB",
    "#FFC857",
    "#EB5E55",
];


function startGame() {
    
    myGamePiece = new component(20, 20, "tomato", 350, 220,0,"obj");
    myGamePiece.gravity = 0.15;
    
    myScore = new component("30px", "Roboto", "black", 80, 40, "text","score");
    x11 = document.getElementById("myAudio");
    Mscore= document.getElementById("s1").innerHTML;
    
    console.log(Mscore);
    
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js')
             .then(function() { console.log('Service Worker Registered'); });
    }
    
    myGameArea.st();
    
}
var speed=3;
var myGameArea = {
    
    canvas : document.createElement("canvas"),
    st : function() {
        
        this.canvas.width = window.innerWidth-30;
        this.canvas.height = window.innerHeight-230;
        
        this.context = this.canvas.getContext("2d");
        //bol=true;    
        
       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
   
    },
     
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


window.addEventListener('keydown', function (e) {
            console.log("helo");
            accelerate(-0.2);     
        });
             
        
window.addEventListener('keyup', function (e) {
            console.log("bye");
            accelerate(0.05);    
        }); 



function component(width, height, color, x, y, type,objType) {
    
    var radius=10;
    
    
    this.isObject=objType;
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    
    
    this.update = function() {
        
        ctx = myGameArea.context;
        
        if (this.isObject == "score") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        else if(this.isObject == "obj"){
            
            ctx.fillStyle=color;
            
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
        }
        else{
            
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    
    
    this.newPos = function() {
        
        this.x += this.speedX;
        
        if(this.y<=this.height){ 
            
         
            this.gravitySpeed=3.8;
            
            this.y+=this.gravitySpeed;
        }
        else{
            this.gravitySpeed += this.gravity;
        
            this.y += this.speedY + this.gravitySpeed;
        }
        this.hitBottom();
       // this.hitTop();
    }
    
    
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -4.8;
        }
    }
    
//    this.hitTop = function() {
//        var rockTop =0;    
//        if (this.y < rockTop) {
//            this.y = rocTop;  
//        
//            console.log(this.y);
//            
//        }
//    }
    
    
    
    
    this.crashWith = function(otherobj) {
        
        
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        
        
        if(crash==true){
            x11.play();
            
            if(Mscore<(myObstacles.length/2)){
             
                document.getElementById("s1").innerHTML=(myObstacles.length/2);

            }
           
        }
        
        
        return crash;
    }
    
    
}


function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            let m=confirm("restart game  ?");
    // Crashed.....................................................................
     //       .......................>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //_____________________________________________________________________________        
                
                if(m){
                myGamePiece=[];
                myObstacles = [];
                //myGameArea.frameNo=0;
                //myGameArea.interval=0;
                speed=3;
                 //myGameArea.canvas=[];
               //myGameArea.canvas.remove(0);
                     console.log("gazab bhai");
                myGameArea.clear();
                    clearInterval(myGameArea.interval);    
                //     startGame();
               
                    
                
            }
            else{
                alert("thank you!!!");
                
                
            }
            
            break;
            
        } 
    }
    
    
    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    if (myGameArea.frameNo == 1 || everyinterval(200) ) {
        x = myGameArea.canvas.width;
        minHeight = myGameArea.canvas.height-300;
        maxHeight = myGameArea.canvas.height;
        
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        
        minGap = 50;
        maxGap = 50;
        
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        
        var col= crr[Math.floor(Math.random()*crr.length)];
        
        myObstacles.push(new component(10, height,col , x, 0,0,"obs"));
        
        myObstacles.push(new component(10, x - height - gap, col, x, height + gap,0,"obs"));
        
        
        if(myObstacles.length%5==0){
            speed+=2
        }
        console.log(speed);
    }
    
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -speed;
        myObstacles[i].update();
    }

    myScore.text="SCORE: " + myObstacles.length/2;
    myScore.update();
    
    myGamePiece.newPos();
    myGamePiece.update();

}


function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


function accelerate(n) {
    
    myGamePiece.gravity = n;
} 




