var sn = Tt.Snake;
window.onload = function () {
    var container = document.getElementById("tabcontainer");
    var infobar = document.getElementById("span");
    var snake = new sn.Snake(container, infobar, 30, 30);
    snake.Init();
    snake.Run();
};
//# sourceMappingURL=app.js.map