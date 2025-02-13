 let canvas = document.getElementById('myCanvas');
 let gameOvertext = document.querySelector(".gameOverText");
 let scoreNumbers = document.querySelector('#scorenumber');
 let context = canvas.getContext('2d');
 context.font = "bold 30px sans-serif";
 let scrollCounter,cameraY,current,mode,xSpeed

let ySpeed = 5;
let height = 50;

let boxes =[];
boxes[0]={
    x :300,
    y: 300,
    width: 200,
}
let dibris = {
    x:0,
    width:0 
}
    function newBox(){
        boxes[current]= {
            x:0,
            y:(current+10)*height,
            width:boxes[current - 1].width
        }
    }
    function gameover(){
        gameOvertext.style.display = "block";
        mode = 'gameOver';

    }
    function animate(){
        if(mode != "gameOver"){
            context.clearRect(0,0,canvas.width,canvas.height);
            scoreNumbers.innerHTML = current - 1;

            for (let i = 0; i < boxes.length; i++) {
                let box = boxes[i];
                context.fillStyle = 'rgb(' + i * 16 + ',' + i * 16 + ',' + i * 16 + ')';
                
                context.fillRect(box.x,600-box.y+cameraY,box.width,height);
            }
            context.fillStyle = 'red';
            context.fillRect(dibris.x,600-dibris.y+cameraY,dibris.width,height); 
            
            if(mode =="bounce"){
                boxes[current].x = boxes[current].x + xSpeed;
                if(xSpeed>0 && boxes[current].x + boxes[current].width > canvas.width){
                    xSpeed = -xSpeed;
                }
                if(xSpeed<0 && boxes[current].x < 0){
                    xSpeed = -xSpeed;
                }
            }
            if(mode == "fall"){
                boxes[current].y =boxes[current].y - ySpeed;
                if(boxes[current].y ==boxes[current - 1].y + height ){
                    mode = "bounce";
                    
                    let diff = boxes[current].x - boxes[current - 1].x;
                    
                    if(Math.abs(diff)>= boxes[current].width){
                        gameover();
                    }
                    dibris = {
                        y:boxes[current].y,
                        width:diff,
                    }
                    
                    if(boxes[current].x > boxes[current - 1].x){
                        boxes[current].width = boxes[current].width - diff;
                        dibris.x = boxes[current].x + boxes[current].width
                    }
                    
                    else{
                        dibris.x = boxes[current].width + diff
                        boxes[current].width = boxes[current].width + diff;
                        boxes[current].x = boxes[current-1].x;
                    }
                    if(xSpeed>0){
                        xSpeed++;
                    }else{
                        xSpeed--;
                    }
                    current++;
                    scrollCounter = height
                    newBox();
                }
            }
            dibris.y = dibris.y-ySpeed;
            if(scrollCounter){
                cameraY++;
                scrollCounter--;
            }
        }
        window.requestAnimationFrame(animate); 
    }
    function restart(){
        gameOvertext.style.display = "none";
        boxes.splice(1,boxes.length-1);
        mode = 'bounce';``
        cameraY = 0;
        xSpeed = 2;
        scrollCounter = 0;
        current = 1;
        newBox();
        dibris.y = 0;
    } 
        canvas.onpointerdown = function(e){
            if(mode =="gameOver"){
                restart();
            }else{
                if (mode == "bounce"){
                    mode = "fall"
                }
            }
        }
    restart();
    animate();



    