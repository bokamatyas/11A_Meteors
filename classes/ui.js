export default class UI {

    clearCanvas(context, canvas){
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}