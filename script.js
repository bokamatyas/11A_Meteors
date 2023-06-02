import Player from "./classes/player.js";
import UI from "./classes/ui.js";
import Button from "./utilities/button.js"

window.addEventListener('load', function () {

    const canvas = this.document.querySelector("canvas");

    canvas.width = this.window.innerWidth - window.innerWidth * 0.1;
    canvas.height = this.window.innerHeight - window.innerHeight * 0.1;

    const context = canvas.getContext('2d');

    const player = new Player(canvas.width * 0.5, canvas.height - canvas.height * 0.1, 20);

    const ui = new UI;

    let projectiles = [];
    let buttons = [];

    // Framek    
    let animationId;
    function animate(){

        animationId = requestAnimationFrame(animate);

        player.draw(context);
        player.evaluateProjectiles(context, projectiles, canvas);
        ui.clearCanvas(context, canvas);
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
        projectiles = player.shoot(event, mouseClientX, mouseClientY, player, projectiles);
    });
    window.addEventListener("click", onclick);

    animate();
});