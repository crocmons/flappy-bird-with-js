let moveSpeed = 3, gravity = 0.5;
let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");
let bird_props = bird.getBoundingClientRect();
let bg = document.querySelector(".bg").getBoundingClientRect();
let scoreValue = document.querySelector(".scoreValue");
let msg = document.querySelector(".msg");
let scoreTitle = document.querySelector(".scoreTitle");

let gameState = "Start";
img.style.display = "none";
msg.classList.add("msgStyle");

document.addEventListener("keydown", (e)=>{
    if(e.key == "Enter" && gameState != "Play"){
         document.querySelectorAll(".pipe_sprite").forEach((e)=>{
               e.remove();
               
         })
         img.style.display ="block";
         bird.style.top = "40vh";
         gameState ="Play";
         msg.innerHTML = "";
         scoreTitle.innerHTML = "Score : ";
         scoreValue.innerHTML = '0';
         msg.classList.remove("msgStyle");
         play();
        }
})

function play (){
     function move(){
        if(gameState != "Play") return;

        let pipe_sprite = document.querySelectorAll(".pipe_sprite");
        pipe_sprite.forEach((element)=>{
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    gameState = 'End';
                    msg.innerHTML = "Game Over".fontcolor("red") + "<br> Press Enter To Restart The Game.";
                    msg.classList.add("msgStyle");
                    img.style.display = "none";
                    return;
                }else{
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + moveSpeed >= bird_props.left && element.increase_score == '1' ){
                        scoreValue.innerHTML =+ scoreValue.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - moveSpeed + "px";

                }
            }
        });
        requestAnimationFrame(move);
     }
     requestAnimationFrame(move);

     let bird_dy = 0;

     function applyGravity(){
        if(gameState != "Play") return;
        bird_dy = bird_dy + gravity;
        document.addEventListener("keydown",(e)=>{
            if(e.key == "ArrowUp" || e.key == ''){
                img.src = "images/bird-2.png";
                bird_dy = -7.6;
            }
        });

        document.addEventListener("keyup",(e)=>{
            if(e.key == "ArrowUp" || e.key == " "){
                img.src = "images/bird.png";
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= bg.bottom){
            gameState = "End";
            msg.style.left = "28vw";
            window.location.reload();
            msg.classList.remove("msgStyle");
            return;
        }
         bird.style.top = bird_props.top + bird_dy + "px";
         bird_props = bird.getBoundingClientRect();
         requestAnimationFrame(applyGravity);
     }
     requestAnimationFrame(applyGravity);

     let pipe_separation = 0;
     let pipe_gap = 35;

     function createPipe(){
        if(gameState != "Play") return;

        if(pipe_separation >115){
            pipe_separation = 0;
            let pipe_position = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement("div");
            pipe_sprite_inv.className = "pipe_sprite";
            pipe_sprite_inv.style.top = pipe_position - 70 + "vh";
            pipe_sprite_inv.style.left  = "100vw";
            document.body.appendChild(pipe_sprite_inv);

            let pipe_sprite = document.createElement("div");
            pipe_sprite.className = "pipe_sprite";
            pipe_sprite.style.top = pipe_position + pipe_gap + "vh";
            pipe_sprite.style.left = "100vw";
            pipe_sprite.increase_score = "1";
            document.body.appendChild(pipe_sprite);


        }
            pipe_separation++;
            requestAnimationFrame(createPipe);
     }
     requestAnimationFrame(createPipe);
}

