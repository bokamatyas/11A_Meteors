import Projectile from "./projectile.js";

export default class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  // Játékos megrajzolása (ToDo: játékos grafika)
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fill();
  }

  shoot(event, mouseClientY, mouseClientX, player, projectiles) {
    if (event.code == "KeyF") {
      const angle = Math.atan2(
        mouseClientX - player.x,
        mouseClientY - player.y        
      );

      const speedModifier = 6;

      const velocity = {
        x: Math.cos(angle) * speedModifier,
        y: Math.sin(angle) * speedModifier,
      };

      projectiles.push(
        new Projectile(player.x, player.y, 5, "rgba(255, 215, 0, 1)", velocity)
      );
    }
    return projectiles;
  }

  evaluateProjectiles(context, projectiles, canvas){
    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update(context);
  
        if (
          projectile.x + projectile.radius < 0 ||
          projectile.x - projectile.radius > canvas.width ||
          projectile.y + projectile.radius < 0 ||
          projectile.y - projectile.radius > canvas.height
        ) {
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      });
    return projectiles;
  }
}
