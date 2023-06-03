import Enemy from "./classes/enemy.js";
import Player from "./classes/player.js";
import UI from "./classes/ui.js";

window.addEventListener('load', function (){

    const canvas = this.document.querySelector("canvas");

    canvas.width = this.window.innerWidth - window.innerWidth * 0.1;
    canvas.height = this.window.innerHeight - window.innerHeight * 0.1;

    const context = canvas.getContext('2d');

    const player = new Player(canvas.width * 0.5, canvas.height - canvas.height * 0.1, 20);

    const ui = new UI;

    let enemies = [];

    var stage = 1;
    this.setInterval(()=> {
        stage++;
    }, 5000)
    this.setInterval(() =>{
        var speed = 0.8 * stage; // alapból 1 és 2 között majd idővel növelni a maximumot
        var x = Math.random() * canvas.width;
        var fallingAngle = Math.random() * 2  *stage - 1;
        enemies.push(new Enemy(x, canvas.height * 0.1, 30, speed, fallingAngle));
    }, 1000);


    let projectiles = [];

    // Framek    
    let animationId;
    function animate(){

        animationId = requestAnimationFrame(animate);
        for (let i = 0; i < enemies.length; i++) {
            if(enemies[i].y > canvas.height * 0.9){
                enemies.splice(i, 1);
            }
            enemies[i].draw(context, canvas);
        }
        player.draw(context);
        player.evaluateProjectiles(context, projectiles, canvas);
        ui.clearCanvas(context, canvas);
        console.log(projectiles);
        console.log(enemies);
    }

    // egér koordináták
    let mouseClientX;
    let mouseClientY;
    this.window.addEventListener("pointermove", (e) => {
        mouseClientX = e.clientX;
        mouseClientY = e.clientY;
    });

    // tüzelés listener
    window.addEventListener("keyup", (event) => {
        projectiles = player.shoot(event, mouseClientX, mouseClientY, player, projectiles);
    });

    animate();
});