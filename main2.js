function jumpSound(){
    var audio1 = document.getElementsByClassName("audio")[0];
    audio1.play();
}
function gameOverSound(){
    var audio = document.getElementById("audio");
    audio.play();
}

var theLastestSec = 0;
var scoreBar = document.querySelector("#score");
var score = 0;
var time = 0;
let gameOver = false;
var dino = document.getElementById("dino");
let isJump = false;
var originDinoOffsetTop = dino.offsetTop;
var windowWidth = window.innerWidth;


var mainLoop = setInterval(()=>{
    time++;
    if(time % 50 == 0){
        score++;
        scoreBar.textContent = `Your score: ${score}`;
    }
    var timeCall = Math.floor(Math.random()*100);
    if(windowWidth <= 500){ //responsive
        if(timeCall % 100 == 0 && time - theLastestSec >= 200){
            //cài đặt biến để 2 con cá xuất hiện không quá gần nhau
            theLastestSec = time;
            //thực hiện xuất cá ra ở đây
            var newElement = document.createElement("img");
            newElement.className = "fish";
            newElement.src = "./assetForDino/fish.png";
            newElement.alt = "fish";
            document.querySelector("body").appendChild(newElement);
        }
    }else if(timeCall % 100 == 0 && time - theLastestSec >= 50){
        //cài đặt biến để 2 con cá xuất hiện không quá gần nhau
        theLastestSec = time;
        //thực hiện xuất cá ra ở đây
        var newElement = document.createElement("img");
        newElement.className = "fish";
        newElement.src = "./assetForDino/fish.png";
        newElement.alt = "fish";
        document.querySelector("body").appendChild(newElement);
    }

    //thực hiện vòng lặp thông thường
    var fishArray = document.querySelectorAll(".fish");
    console.log(`fish array length : ${fishArray.length}`);

     //xoá bớt phần tử thừa và kiểm tra gameOver
        for(let i=0;i<fishArray.length;i++){

            //xoá bớt phần tử thừa
            if(fishArray[i].getBoundingClientRect().x < 0){
                fishArray[i].className = ""; 
            }

            //kiểm tra gameOver
            var dinoOffsetLeft = dino.offsetLeft ;
            var dinoOffsetWidth = dino.offsetWidth;
            if(fishArray[i].offsetLeft <= dinoOffsetLeft+dinoOffsetWidth && fishArray[i].offsetLeft >= dinoOffsetLeft){
                if(isJump == false){
                    console.log("thua");
                    gameOver = true;
                }
            }
        }
        console.log(`---dino:${dino.offsetTop}`);

    //dino nhảy
    if(windowWidth <= 500){
        document.addEventListener('keydown', function jumping1() {
                if(isJump == false && gameOver == false){
                    async function delay(){
                        document.removeEventListener('keydown',jumping1);     
                        if ( event.keyCode === 13 || event.keyCode === 32) {
                            jumpSound();       
                            console.log("nhay");
                            isJump = true;
                            dino.style.animation = "jump 1.2s linear";
                        }
                        await new Promise((resolve)=>{
                            setTimeout(()=>{
                                resolve();
                            },1200);
                        })
                        dino.style.animation = "headShake 2s infinite";
                        document.addEventListener('keydown',jumping1);
                        console.log("dung nhay");
                        isJump = false;
                    }
                    delay();
                }     
            });

            document.onclick = function jumping() {
                if(isJump == false && gameOver == false){
                    async function delay(){
                        document.removeEventListener('keydown',jumping);     
                            jumpSound();       
                            console.log("nhay");
                            isJump = true;
                            dino.style.animation = "jump 1.2s linear";
                        await new Promise((resolve)=>{
                            setTimeout(()=>{
                                resolve();
                            },1200);
                        })
                        dino.style.animation = "headShake 2s infinite";
                        document.addEventListener('keydown',jumping);
                        console.log("dung nhay");
                        isJump = false;
                    }
                    delay();
                }     
            }
    }else{
        document.addEventListener('keydown', function jumping1() {
            if(isJump == false && gameOver == false){
                async function delay(){
                    document.removeEventListener('keydown',jumping1);     
                    if ( event.keyCode === 13 || event.keyCode === 32) {
                        jumpSound();       
                        console.log("nhay");
                        isJump = true;
                        dino.style.animation = "jump 0.7s linear";
                    }
                    await new Promise((resolve)=>{
                        setTimeout(()=>{
                            resolve();
                        },700);
                    })
                    dino.style.animation = "headShake 2s infinite";
                    document.addEventListener('keydown',jumping1);
                    console.log("dung nhay");
                    isJump = false;
                }
                delay();
            }     
        });
    
        document.onclick = function jumping() {
            if(isJump == false && gameOver == false){
                async function delay(){
                    document.removeEventListener('keydown',jumping);     
                        jumpSound();       
                        console.log("nhay");
                        isJump = true;
                        dino.style.animation = "jump 0.7s linear";
                    await new Promise((resolve)=>{
                        setTimeout(()=>{
                            resolve();
                        },700);
                    })
                    dino.style.animation = "headShake 2s infinite";
                    document.addEventListener('keydown',jumping);
                    console.log("dung nhay");
                    isJump = false;
                }
                delay();
            }     
        }
    }
    
    //kiem tra de dung vong lap
    if(gameOver == true){
        gameOverSound();
        clearInterval(mainLoop);
        document.querySelector("#gameOver").style.display = "block";

        setTimeout(()=>{
            document.getElementById("replay").style.display = "block";
        },2000)
        for(let i=0;i<fishArray.length;i++){
            fishArray[i].style.animation = "inMarquee 1s linear";
        }
        dino.style.animation = "sinkDino 2s linear"
        dino.src = "./assetForDino/deadDino.png";
        setTimeout(()=>{
            dino.style.display = "none";
        },2000);
    }

},10)

function switchPage(){
        window.location.href = "index.html";
}

