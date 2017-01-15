
import sn=Tt.Snake;
window.onload = () => {
    var container = <HTMLTableElement>document.getElementById("tabcontainer");
    var infobar = <HTMLSpanElement>document.getElementById("span");
    var snake = new sn.Snake(container, infobar, 30, 30);
    snake.Init();
    snake.Run();
 
};