import Enemy from "./classes/enemy.js";
import Player from "./classes/player.js";
import UI from "./classes/ui.js";
import get_highscores from "./database/get_highscore.js";
import save_highscore from "./database/save_highscore.js";
import Button from "./utilities/button.js";

const startY = (window.height / 2) + window.height * 0.1;
const endY =  (window.height / 2) - window.height * 0.1;
const easyBut = new Button(window.width * 0.1, startY, window.width * 0.3, endY, imgsrc , mainGame());
const medBut = new Button(window.width *  0.4, startY, window.width * 0.6, endY, imgsrc, mainGame());
const hardBut = new Button(window.width * 0.7, startY, window.width * 0.9, endY, imgsrc, mainGame());

easyBut.draw();
medBut.draw();
hardBut.draw();
// save_highscore("asd", 3);
// const highcorses = get_highscores(2);
// highcorses.then((a) => {console.log(a)});

window.addEventListener('load', function () {

    const canvas = this.document.querySelector("canvas");

    canvas.width = this.window.innerWidth;
    canvas.height = this.window.innerHeight - 10;

    const context = canvas.getContext('2d');

    const player = new Player(canvas.width * 0.5, canvas.height - canvas.height * 0.1, 20);
    const enemy = new Enemy();

    const ui = new UI;

    let enemies = [];
    let explosions = [];

    var stage = 1;
    this.setInterval(()=> {
        stage++;
    }, 5000)
    this.setInterval(() =>{
        var speed = 0.8 * stage; // alapból 1 és 2 között majd idővel növelni a maximumot
        var x = Math.random() * canvas.width;
        var fallingAngle = Math.random() * 2  *stage - 1;
        enemies.push(new Enemy(x, canvas.height * 0.1, 70, speed, fallingAngle));
    }, 1000);


    let projectiles = [];
    let buttons = [];

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
       enemy.hitDetection(context, enemies, projectiles, explosions);


        player.evaluateProjectiles(context, projectiles, canvas);
        player.draw(context);
        player.updateWeapon(context, mouseClientX, mouseClientY);        

        ui.clearCanvas(context, canvas);

        //console.log(projectiles);
        //console.log(enemies);

        buttons.forEach(button => {
            button.draw(context, mouseClientX, mouseClientY);
        });
    }
    function onclick() {
        buttons.forEach(button => {
            button.clicked(mouseClientX, mouseClientY);
        });

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
        projectiles = player.shoot(event, mouseClientX, mouseClientY, projectiles);
    });
    window.addEventListener("click", onclick);

    animate();
});