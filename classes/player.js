export default class Player{

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

    }

    // Játékos megrajzolása (ToDo: játékos grafika)
    draw(context) {

        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            0, Math.PI * 2,
            false
        );
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fill();

    }
}