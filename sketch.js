var trex_runningImg, trexSprite;
var groundImg,groundSprite;
var cldgrp,obsgrp;
var gameState="play";
var score=0;



function preload()
{
    trex_runningImg=loadAnimation("trex1.png","trex3.png","trex4.png");
    groundImg=loadImage("ground2.png");

    cloudImg=loadImage("cloud.png");
    obs1=loadImage("obstacle1.png");
    obs2=loadImage("obstacle2.png");
    obs3=loadImage("obstacle3.png");
    obs4=loadImage("obstacle4.png");
    obs5=loadImage("obstacle5.png");
    obs6=loadImage("obstacle6.png");

    goimg=loadImage("gameOver.png");
    restrtimg=loadImage("restart.png");
    trex_collide=loadImage("trex_collided.png");
}
function setup()
{
    createCanvas(1200,520);
    trexSprite=createSprite(50,430,40,40);

    trexSprite.setCollider("circle",0,0,40);
    trexSprite.debug=false;
    trexSprite.addAnimation("trex",trex_runningImg);
    trexSprite.addAnimation("collided",trex_collide);
    trexSprite.scale=0.7;
   
    // x,y,width,height
   groundSprite=createSprite(400,470,4000,50);
   groundSprite.addImage(groundImg);

    grondSprite=createSprite(400,500,4000,50);
    grondSprite.visible=false;


    cldgrp=new Group();
    obsgrp=new Group();

    go_img=createSprite(550,300);
    restrt_img=createSprite(600,400);

    go_img.addImage(goimg);
    restrt_img.addImage(restrtimg);

    go_img.visible=false;
    restrt_img.visible=false;
}

function draw()
{
    background("white");
    
    
    if(gameState === "play")
    {
        score++;
        groundSprite.velocityX=-10;
        if(groundSprite.x<10)
        {
            groundSprite.x=400;
        }
        if(keyDown("space") && trexSprite.collide(grondSprite) /*&& trexSprite.y<=440*/)
        {
            trexSprite.velocityY=-15;
            //-5 + 1= -4 _
        }
        trexSprite.velocityY=trexSprite.velocityY+0.5;
        cloud();
        obstacle();
        if(obsgrp.isTouching(trexSprite))
        {
            gameState="end";
        }
    }
    else if(gameState === "end")
    {
        groundSprite.velocityX=0;
        cldgrp.setVelocityXEach(0);
        obsgrp.setVelocityXEach(0);
        cldgrp.setLifetimeEach(-1);
        obsgrp.setLifetimeEach(-1);
        go_img.visible=true;
        restrt_img.visible=true;
        trexSprite.changeAnimation("collided",trex_collide);
        if(mousePressedOver(restrt_img))
        {
            score=0;
            cldgrp.destroyEach();
            obsgrp.destroyEach();
            gameState="play";
            go_img.visible=false;
            restrt_img.visible=false;
            trexSprite.changeAnimation("trex",trex_runningImg);
        }
    }

    trexSprite.collide(grondSprite);        //trex is in contact with ground
    //console.log(trexSprite.y);
    
    drawSprites();
    text("Score: "+score,800,50);
}
function cloud()
{
    // 4/2 = 2 r= 0,  10/5 = 2 r= 0 ,15/3 = 5 r =0
    //fc=20 frameCount%20 === 0
    if(frameCount%40 === 0)
    {
        var cloud=createSprite(1000,Math.round(random(100,300)));
        cloud.addImage(cloudImg); 
        cloud.velocityX=-10;
        cloud.depth=trexSprite.depth;
        trexSprite.depth++;
        cloud.lifetime=200;
        cldgrp.add(cloud);
        //console.log(trexSprite.depth);
    } 
}
function obstacle()
{
    // var FCrand=Math.round(random(180,300));
    var rand=Math.round(random(1,6));
    if(frameCount%120 === 0)
    {
        var obs=createSprite(1200,460);
        obs.lifetime=500;
        obs.scale=0.5;
        obs.velocityX=-3;
        obsgrp.add(obs);
        switch(rand)
        {
            case 1: obs.addImage(obs1);
            break;
            case 2: obs.addImage(obs2);
            break;
            case 3: obs.addImage(obs3);
            break;
            case 4: obs.addImage(obs4);
            break;
            case 5: obs.addImage(obs5);
            break;
            case 6: obs.addImage(obs6);
            break;
            default:break;

        }
    }
}
//3 steps 
//1) load the image --animation 1)->image -> 1var
 //2) create a sprite -> save in another var
 //3)connect both variables