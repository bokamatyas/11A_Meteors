export default class Button {
    constructor(startX, startY, endX, endY, image_src, action_on_click, hoverOffsetX = 0, hoverOffsetY = 0) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.image = new Image();
        this.image.src = image_src;
        this.action_on_click = action_on_click;
        this.hoverOffsetX = hoverOffsetX;
        this.hoverOffsetY = hoverOffsetY;
    }
    draw(context, mouseX, mouseY) {
        if (this.position_on_button(mouseX, mouseY)) {
            context.drawImage(this.image, this.startX + this.hoverOffsetX, this.startY + this.hoverOffsetY);
            return;
        }
        context.drawImage(this.image, this.startX, this.startY);
    }
    position_on_button(mouseX, mouseY) {
        if (this.startX < mouseX & mouseX < this.endX & this.startY < mouseY & mouseY < this.endY) {
            return true;
        }
        return false;
    }
    clicked(mouseX, mouseY) {
        if (this.position_on_button(mouseX, mouseY)) {
            this.action_on_click();
        }
    }
}
