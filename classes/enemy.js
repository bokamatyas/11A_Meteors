export default class Enemy{
    constructor(x, y, radius, dy, dx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = dy; // esés gyorsaságát határozza meg
        this.dx = dx;
    }


    drawBall(context){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fill();
    }

    draw(context, canvas) {
        this.drawBall(context);

        // lepattanjon a falról a meteor
        if(this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;
    }

    hitDetection(enemies, projectiles){
        enemies.forEach((enemy, enemyIndex) => {                        

            projectiles.forEach((projectile, projectileIndex ) => {

                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

                if(distance - enemy.radius < 1) {
                    setTimeout(() =>{
                        enemies.splice(enemyIndex, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                }
            });

        });
    }
}