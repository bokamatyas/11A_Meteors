import Player from "./classes/player.js";

window.addEventListener('load', function (){

    const canvas = this.document.querySelector("canvas");

    canvas.width = this.window.innerWidth - window.innerWidth * 0.1;
    canvas.height = this.window.innerHeight - window.innerHeight * 0.1;

    const context = canvas.getContext('2d');

    const player = new Player(canvas.width * 0.5, canvas.height - canvas.height * 0.1, 20);

    // ideiglenes
    player.draw(context);
});