
import sn = Tt.Snake;
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
        //|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
        ||
        function ( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();
var appGlobal = {
     deltTime: 0,
    lastTime:Date.now()
}

window.onload = () => {
    var container = <HTMLTableElement>document.getElementById("tabcontainer");
    var infobar = <HTMLSpanElement>document.getElementById("span");
    var snake = new sn.Snake(container, infobar, 20, 20);
    snake.Init();
    //snake.Run();
    snake.GameLoop();
 
};