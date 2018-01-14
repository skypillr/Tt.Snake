var Tt;
(function (Tt) {
    var Snake;
    (function (Snake_1) {
        var Snake = /** @class */ (function () {
            function Snake(container, infobar, rowNums, colNums) {
                this._container = container;
                this._infobar = infobar;
                this._rowNums = rowNums;
                this._colNums = colNums;
                //固定值
                this._foodCount = 100;
                this._foodCountCur = this._foodCount;
                this.speedTimeSlice = 300;
                this.accuTime = 0;
                this._speed = 500;
                this._curMoveDirection = Snake_1.Common.Random(3);
            }
            Snake.prototype.Init = function () {
                this.InitContainer();
                this.InitFood();
                this.InitSnakeBody();
                this.InitEvent();
            };
            Snake.prototype.SpeedAdjust = function (deltTime) {
                var res = false;
                this.accuTime += deltTime;
                if (this.accuTime > this.speedTimeSlice) {
                    this.accuTime = 0;
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 初始化container
             */
            Snake.prototype.InitContainer = function () {
                var tbody = this._container.createTBody();
                for (var i = 0; i < this._rowNums; i++) {
                    var row = tbody.insertRow(i);
                    for (var j = 0; j < this._colNums; j++) {
                        var cell = row.insertCell(j);
                        cell.innerHTML = "&nbsp;";
                        cell.bgColor = Snake_1.BkColor.ContainerColor;
                    }
                }
            };
            /**
             *  初始化食物
             */
            Snake.prototype.InitFood = function () {
                for (var i = 0; i < this._foodCount; i++) {
                    var row = void 0;
                    var col = void 0;
                    row = Snake_1.Common.Random(this._rowNums);
                    col = Snake_1.Common.Random(this._colNums);
                    if (!Snake_1.Draw.IsFilledColorAlready(this._container, row, col)) {
                        Snake_1.Draw.DrawBkColorContainer(this._container, row, col, Snake_1.BkColor.FoodColor);
                    }
                    else {
                        i--;
                    }
                }
            };
            /**
             * 初始化蛇头
             */
            Snake.prototype.InitSnakeBody = function () {
                var falg = true;
                while (falg) {
                    var row = Snake_1.Common.Random(this._rowNums);
                    var col = Snake_1.Common.Random(this._colNums);
                    if (!Snake_1.Draw.IsFilledColorAlready(this._container, row, col)) {
                        Snake_1.Draw.DrawBkColorContainer(this._container, row, col, Snake_1.BkColor.SnakeBodyColor);
                        var body = new Snake_1.SnakeBody(col, row);
                        this._bodys = new Array();
                        this._bodys.unshift(body);
                        falg = false;
                    }
                }
            };
            /**
             * 初始化事件监听
             */
            Snake.prototype.InitEvent = function () {
                var _this = this;
                document.onkeydown = function (ev) {
                    switch (ev.keyCode) {
                        case 38://up
                            if (_this._curMoveDirection != Snake_1.Direction.Down) {
                                _this._curMoveDirection = Snake_1.Direction.Up;
                            }
                            break;
                        case 40://down
                            if (_this._curMoveDirection != Snake_1.Direction.Up) {
                                _this._curMoveDirection = Snake_1.Direction.Down;
                            }
                            break;
                        case 37://left
                            if (_this._curMoveDirection != Snake_1.Direction.Right) {
                                _this._curMoveDirection = Snake_1.Direction.Left;
                            }
                            break;
                        case 39://right
                            if (_this._curMoveDirection != Snake_1.Direction.Left) {
                                _this._curMoveDirection = Snake_1.Direction.Right;
                            }
                            break;
                    }
                };
            };
            /**
             * 程序运行
             */
            Snake.prototype.Run = function () {
                this._isPaused = true;
                var that = this;
                this._timer = setInterval(function () {
                    Snake_1.Draw.ClearDraw(that._bodys, that._container);
                    that.MoveNext();
                    Snake_1.Draw.RefreshDraw(that._bodys, that._container);
                    that._infobar.innerText = "得分：" + (that._bodys.length - 1).toString() + "  食物：" + that._foodCountCur.toString();
                }, this._speed);
            };
            Snake.prototype.GameLoop = function () {
                this._isPaused = false;
                var that = this;
                var g = function () {
                    var thisTime = Date.now();
                    appGlobal.deltTime = thisTime - appGlobal.lastTime;
                    appGlobal.lastTime = thisTime;
                    Snake_1.Draw.ClearDraw(that._bodys, that._container);
                    that.MoveNext();
                    Snake_1.Draw.RefreshDraw(that._bodys, that._container);
                    that._infobar.innerText = "得分：" + (that._bodys.length - 1).toString() + "  食物：" + that._foodCountCur.toString();
                    if (that._isPaused) {
                        alert("游戏结束");
                    }
                    else {
                        requestAnimFrame(g, null);
                    }
                };
                requestAnimFrame(g, null);
            };
            /**
             * 移动到下一步
             */
            Snake.prototype.MoveNext = function () {
                var head = this._bodys[0];
                var newHead = new Snake_1.SnakeBody(0, 0);
                newHead.X = head.X;
                newHead.Y = head.Y;
                var res = this.SpeedAdjust(appGlobal.deltTime);
                if (res) {
                    switch (this._curMoveDirection) {
                        case Snake_1.Direction.Up:
                            newHead.Y = newHead.Y - 1;
                            break;
                        case Snake_1.Direction.Down:
                            newHead.Y = newHead.Y + 1;
                            break;
                        case Snake_1.Direction.Left:
                            newHead.X = newHead.X - 1;
                            break;
                        case Snake_1.Direction.Right:
                            newHead.X = newHead.X + 1;
                            break;
                    }
                    if (this.IsFoodNextStep(newHead.Y, newHead.X)) {
                        this._bodys.unshift(newHead);
                        this._foodCountCur--;
                        this.GenerateFood();
                    }
                    else {
                        this._bodys.unshift(newHead);
                        this._bodys.pop();
                        if (this.IsGameOver(newHead)) {
                            this._isPaused = true;
                            //alert("游戏结束");
                            //clearInterval(this._timer);
                            return;
                        }
                    }
                }
            };
            /**
             * 游戏是否结束
             * @param newHead
             */
            Snake.prototype.IsGameOver = function (newHead) {
                if (newHead.X < 0 || newHead.X >= this._colNums) {
                    return true;
                }
                if (newHead.Y < 0 || newHead.Y >= this._rowNums) {
                    return true;
                }
                var flag = false;
                for (var i = 1; i < this._bodys.length; i++) {
                    if (newHead.X == this._bodys[i].X && newHead.Y == this._bodys[i].Y) {
                        flag = true;
                        break;
                    }
                }
                return flag;
            };
            /**
             * 下一步是否是食物
             */
            Snake.prototype.IsFoodNextStep = function (row, col) {
                if (Snake_1.Draw.GetColor(row, col, this._container) == Snake_1.BkColor.FoodColor) {
                    return true;
                }
                else {
                    return false;
                }
            };
            /**
             * 产生食物
             */
            Snake.prototype.GenerateFood = function () {
                var flag = true;
                while (this._foodCountCur < this._foodCount) {
                    var row = void 0;
                    var col = void 0;
                    row = Snake_1.Common.Random(this._rowNums);
                    col = Snake_1.Common.Random(this._colNums);
                    if (!Snake_1.Draw.IsFilledColorAlready(this._container, row, col)) {
                        Snake_1.Draw.DrawBkColorContainer(this._container, row, col, Snake_1.BkColor.FoodColor);
                        this._foodCountCur++;
                    }
                }
            };
            return Snake;
        }());
        Snake_1.Snake = Snake;
    })(Snake = Tt.Snake || (Tt.Snake = {}));
})(Tt || (Tt = {}));
//# sourceMappingURL=Snake.js.map