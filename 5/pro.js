window.onload = function(){

var canvas = document.createElement("canvas");
var affichage = document.createElement("div");
var pieds = document.createElement("div");
var tige = document.createElement("div");
pieds.id="pieds";
tige.id="tige";

affichage.id = "affichage";
affichage.height=80;
canvas.width=900;
canvas.height=600;

document.addEventListener("keydown",interaction);

document.body.appendChild(affichage);

document.body.appendChild(canvas);
document.body.appendChild(pieds);
document.body.appendChild(tige);
pieds.innerHTML="GAME-TV";


var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");
var colorser="yellow"
var tailleser=25;
var xserp = canvasWidth/2;
var yserp = canvasHeight/2;
var deplx =0;
var deply=0;
var taillbody=5;
var bodyserp=[];
var nomblowid =canvasWidth/tailleser;
var nomblohi =canvasHeight/tailleser;
var collision = false;
//la pomme
var colorpomme = "red";
var xpom = Math.trunc(Math.random()*nomblowid)*tailleser;
var ypom = Math.trunc(Math.random()*nomblohi)*tailleser;
var ray = tailleser/2;
var temp=0;
var tempmax=70;
var scorre=0;
var vie=3;
var niveau=0;
var codtouch=0;
//bonus
var colorbon="green";
var tempbon=0;
var affichbon =false;
var xbonus= Math.trunc(Math.random()*nomblowid)*tailleser;
var ybonus= Math.trunc(Math.random()*nomblohi)*tailleser;
var pause=false;
score();
var intervalID = setInterval(game,100); 

function game() {
	dessinerserpent();
	dessinerpomme();
	over();

	mang();
	viee ();
	affibonus();

}

function gestion (){
		xserp = xserp + deplx*tailleser;
	    yserp = yserp + deply*tailleser;
        bodyserp.push({x:xserp,y:yserp})
		while (bodyserp.length>taillbody)
		{
			
			bodyserp.shift();
		}
	
    }

function dessinerpomme(){
	ctx.beginPath();
	ctx.arc(xpom+ray,ypom+ray,ray,0,2*Math.PI);
	ctx.fillStyle=colorpomme;
	ctx.fill();
	ctx.font="15px arial";
    ctx.fillStyle = "green";

	ctx.fillText("v",xpom+3,ypom+3);

	ctx.closePath();
	
}

function dessinerserpent()
{
      ctx.clearRect(0,0,canvasWidth,canvasHeight);
     gestion ();

	ctx.fillStyle=colorser;
	for(var i=0;i<bodyserp.length;i++){
	ctx.fillRect(bodyserp[i].x,bodyserp[i].y,tailleser-1,tailleser-1);
	}
}

function bonus()
{   ctx.font= "15px arila"
	ctx.fillStyle=colorbon;
	ctx.fillText("💚",xbonus+1,ybonus+14);	
}
function affibonus()
{ 
if (tempbon++>40)
{
	if (Math.random()> 0.9)
	{ 	if (Math.random()> 0.9)
		{
		tempbon=0;
		initialbon();
		affichbon=true;
		}
	}else {
	xbonus=1000;
    ybonus=800;
    affichbon=false;
     }
}
if (affichbon==true)
{
  bonus();
}
if (xserp==xbonus && yserp==ybonus)
{
	affichbon=false;
	vie++;
	score();
	xbonus=1000;
    ybonus=800;
}

}

function over()
{
	if (bodyserp.length>5)
	{
		for (var i = 0;i < bodyserp.length-1;i++)
		{
			if (bodyserp[i].x == bodyserp[bodyserp.length-1].x && bodyserp[i].y == bodyserp[bodyserp.length-1].y)
			{
              collision=true;	
               break;			  
            }
			
		}
		
    }
	if (xserp < 0 || yserp < 0 || xserp > canvasWidth || yserp > canvasHeight)
	{
		collision = true;	


	}
}

function mang(){

	 if(xserp==xpom&&yserp==ypom)	
	 {
		initialpomm();
  
       scorre += 10 + 3*bodyserp.length;
	   niveau=Math.trunc(scorre/300);
	  taillbody += 5;
 		score();


	 }else if ( temp++ > tempmax) 
	 {   temp=0;
         initialpomm()
	 }
}
function score()
{
	var message="score:" + scorre+" |vie:"+vie+" |niveau:"+niveau;
	document.getElementById("affichage").innerHTML = message;
	
}
function initialpomm()
{
	 xpom = Math.trunc(Math.random()*nomblowid)*tailleser;
     ypom = Math.trunc(Math.random()*nomblohi)*tailleser;
}

function initialserp()
{
    xserp = canvasWidth/2;
    yserp = canvasHeight/2;
}
function initialbon()
{
	 xbonus = Math.trunc(Math.random()*nomblowid)*tailleser;
     ybonus = Math.trunc(Math.random()*nomblohi)*tailleser;
}
function viee()
{
	if (pause==true)
	{
		return;
	}
	if (collision==true)
	{	
		vie--;
		taillbody=5;
		bodyserp=[bodyserp[bodyserp.length-1]];
		collision=false;
		initialserp();
		initialpomm();
		score();
		if (vie==0)
		{
			ctx.fillStyle="#fff";
			ctx.font="40px arial";
			ctx.fillText("game-over",canvasWidth/2-130,canvasHeight/2);
			ctx.font="15px arial";
			ctx.fillText("SCORE : "+scorre+" point(s)",canvasWidth/2-130,canvasHeight*2/3-40);
			ctx.fillText("Si vous vouliez jouer Clickez ENTRER maintenat ! 😍",canvasWidth/2-130,canvasHeight*3/4-50);

			clearTimeout(intervalID);
			
		}
	}
}

 function interaction (event){
	 switch(event.keyCode)
	 {
		 case 37:
		 if (codtouch==39)
		 {
			 break;
		 }
	 
			  deplx =-1;
			  deply=0;
			  codtouch=event.keyCode;
              pause=false;
		 break;
		  
		 case 38:
		 if (codtouch==40)
		 {
			 break;
		 }
		 
		   deplx =0;
           deply=-1;
		   codtouch=event.keyCode;
           pause=false;
		 
		 break;



         case 39:
		 if (codtouch==37)
		 {
			 break;
		 }
		   deplx =1;
		   deply=0;
		   codtouch=event.keyCode;
           pause=false;
		 break;



		 case 40:
		 if (codtouch==38)
		 {
			 break;
		 }
		   deplx =0;
		   deply=1;
		   codtouch=event.keyCode;
           pause=false;
		 break;
		    
			
		 case 32:
		 
		   deplx =0;
           deply=0;
     	  codtouch=event.keyCode;
           pause=true;
		 break;
		  case 13:
		 
		  document.location.reload(true);
		 break;

		 
		 
		 
		 default:
	 }
	 
	 
	 
 }



}