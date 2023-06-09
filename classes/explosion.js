export default class Explosion{

    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw(context) {

        context.save();
        context.globalAlpha = this.alpha;
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            0, Math.PI * 2,
            false
        );
        context.fillStyle = this.color;
        context.fill();
        context.restore();

    }

    update(context) {

        this.draw(context);
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;

    }    

}