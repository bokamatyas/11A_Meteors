import Projectile from "./projectile.js";

export default class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.imageBase = document.querySelector('#turret_base');
    this.imageWeapon = document.querySelector('#turret_weapon');

    this.spriteHeight = 400;
    this.spriteWidth = 500;
    this.width = this.spriteWidth * 0.2;
    this.height = this.spriteHeight * 0.2;
    this.spriteX = this.x - 50;
    this.spriteY = this.y - 20;

    this.frameX = 1;
    this.frameY = 1;
  }

  draw(context) {
    context.drawImage(
        this.imageBase,
        0,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
    );    
  }

  drawWeapon(context){
    context.drawImage(
      this.imageWeapon,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      -42.5,
      -8,
      this.width,
      this.height
    );
  }

  updateWeapon(context, mouseClientX, mouseClientY){
    const angle = Math.atan2(
      mouseClientY - this.y,
      -(mouseClientX - this.x)                         
    );

    context.save();
    context.translate(this.x, this.y);
    // context.rotate(Math.PI / 180);
    context.rotate(-(Math.PI + angle));
    context.scale(-1, 1);
    this.drawWeapon(context);
    
    context.restore();
      
  }  

  shoot(event, mouseClientX, mouseClientY, projectiles) {
    if (event.code == "KeyF") {
      const angle = Math.atan2(
        mouseClientY - this.y,
        mouseClientX - this.x                               
      );

      const speedModifier = 6;

      const velocity = {
        x: Math.cos(angle) * speedModifier,
        y: Math.sin(angle) * speedModifier,
      };

      projectiles.push(
        new Projectile(this.x, this.y, 5, "rgba(0, 255, 0, 1)", velocity)
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

  // evaulateMeteors(context, meteors, canvas){

  // }
}
