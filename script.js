import Player from "./classes/player.js";
import UI from "./classes/ui.js";

window.addEventListener('load', function (){

    const canvas = this.document.querySelector("canvas");

    canvas.width = this.window.innerWidth - window.innerWidth * 0.1;
    canvas.height = this.window.innerHeight - window.innerHeight * 0.1;

    const context = canvas.getContext('2d');

    const player = new Player(canvas.width * 0.5, canvas.height - canvas.height * 0.1, 20);

    const ui = new UI;

    let projectiles = [];

    // Framek    
    let animationId;
    function animate(){

        animationId = requestAnimationFrame(animate);

        player.draw(context);
        player.evaluateProjectiles(context, projectiles, canvas);
        ui.clearCanvas(context, canvas);
        console.log(projectiles);
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