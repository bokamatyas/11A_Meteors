import Explosion from "./explosion.js";

export default class Enemy{
    constructor(x, y, radius, dy, dx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = dy; // esés gyorsaságát határozza meg
        this.dx = dx;        

        this.meteor = document.querySelector("#meteor" + `${Math.floor(Math.random() * (3 - 1) + 1)}`)
    }


    drawBall(context){

        context.drawImage(
            this.meteor,
            0,
            0,
            500,
            500,
            this.x - this.radius * 0.5,
            this.y - this.radius * 0.5,
            this.radius,
            this.radius
        ); 

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

    evaluateExplosions(context, explosions){
        explosions.forEach((explosion, explosionIndex) => {
            explosion.update(context);
            if (explosion.alpha <= 0.01) {
                explosions.splice(explosionIndex, 1);
            } else {
                explosion.update(context);
            }
        });
    }

    hitDetection(context, enemies, projectiles, explosions){

        this.evaluateExplosions(context, explosions);

        enemies.forEach((enemy, enemyIndex) => {                        

            projectiles.forEach((projectile, projectileIndex ) => {

                const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

                if(distance - enemy.radius < 1) {
                    for (let i = 0; i < enemy.radius * 2; i++) {

                        explosions.push(new Explosion(
                            enemy.x,
                            enemy.y,
                            Math.random() * 2,
                            `hsl(${Math.random() * (70 - 30) + 30}, 100%, 40%)`,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 8),
                                y: (Math.random() - 0.5) * (Math.random() * 8)
                            }
                        ));    
                    }

                    setTimeout(() =>{
                        enemies.splice(enemyIndex, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                }
            });

        });
    }
}