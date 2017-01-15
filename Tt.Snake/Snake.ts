module Tt.Snake {
    export class Snake {
        private _timer: number;
        _container: HTMLTableElement;
        _infobar: HTMLSpanElement;
        private _rowNums: number;
        private _colNums: number;

        private _curMoveDirection: Direction;
        private _bodys: Array<SnakeBody>;
        private _speed: number;
        private _isPaused: boolean;
        private _foodCount: number;
        private _foodCountCur: number;
        

        constructor(container: HTMLTableElement, infobar:HTMLSpanElement, rowNums: number, colNums) {
            this._container = container;
            this._infobar = infobar;
            this._rowNums = rowNums;
            this._colNums = colNums;

            //固定值
            this._foodCount = 30;
            this._foodCountCur = this._foodCount;
            this._speed = 500;
            this._curMoveDirection = Common.Random(3);

        }

        Init(): void {
            this.InitContainer();
            this.InitFood();
            this.InitSnakeBody();
            this.InitEvent()
        }


        /**
         * 初始化container
         */
        private InitContainer(): void {
            let tbody = this._container.createTBody();
            for (let i = 0; i < this._rowNums; i++) {
                let row = <HTMLTableRowElement>tbody.insertRow(i);
                for (let j = 0; j < this._colNums; j++) {
                    let cell = row.insertCell(j);
                    cell.innerHTML = "&nbsp;"
                    cell.bgColor = BkColor.ContainerColor;
                }
            }

        }

        /**
         *  初始化食物
         */
        private InitFood(): void {
            for (let i = 0; i < this._foodCount; i++) {
                let row: number;
                let col: number;
                row = Common.Random(this._rowNums);
                col = Common.Random(this._colNums);
                if (!Draw.IsFilledColorAlready(this._container, row, col)) {
                    Draw.DrawBkColorContainer(this._container, row, col, BkColor.FoodColor);
                } else {
                    i--;
                }
            }
        }

        /**
         * 初始化蛇头
         */
        private InitSnakeBody(): void {
            let falg: boolean = true;
            while (falg) {
                let row = Common.Random(this._rowNums);
                let col = Common.Random(this._colNums);
                if (!Draw.IsFilledColorAlready(this._container, row, col)) {
                    Draw.DrawBkColorContainer(this._container, row, col, BkColor.SnakeBodyColor);
                    let body = new SnakeBody(col, row);
                    this._bodys = new Array<SnakeBody>();
                    this._bodys.unshift(body);
                    falg = false;
                }
            }
        }

        /**
         * 初始化事件监听
         */
        private InitEvent(): void {
            document.onkeydown=(ev) => {
                switch (ev.keyCode) {
                    case 38://up
                        if (this._curMoveDirection != Direction.Down) {
                            this._curMoveDirection = Direction.Up;
                        }
                        break;
                    case 40://down
                        if (this._curMoveDirection != Direction.Up) {
                            this._curMoveDirection = Direction.Down;
                        }
                        break;
                    case 37://left
                        if (this._curMoveDirection != Direction.Right) {
                            this._curMoveDirection = Direction.Left;
                        }
                        break;
                    case 39://right
                        if (this._curMoveDirection != Direction.Left) {
                            this._curMoveDirection = Direction.Right;
                        }
                        break;
                }
            };
              
        }

        /**
         * 程序运行
         */
        Run(): void {
            this._isPaused = true;
            let that = this;
            this._timer = setInterval(function () {
                Draw.ClearDraw(that._bodys, that._container);
                that.MoveNext();
                Draw.RefreshDraw(that._bodys, that._container);
                that._infobar.innerText = "得分：" + (that._bodys.length - 1).toString() + "  食物：" + that._foodCountCur.toString();
            }, this._speed);
        }

        /**
         * 移动到下一步
         */
        private MoveNext(): void {
            let head = this._bodys[0];
            let newHead = new SnakeBody(0, 0);
            newHead.X = head.X;
            newHead.Y = head.Y;

            switch (this._curMoveDirection) {
                case Direction.Up:
                    newHead.Y = newHead.Y - 1;
                    break;
                case Direction.Down:
                    newHead.Y = newHead.Y + 1;
                    break;
                case Direction.Left:
                    newHead.X = newHead.X - 1;
                    break;
                case Direction.Right:
                    newHead.X = newHead.X + 1;
                    break;
            }
            if (this.IsFoodNextStep(newHead.Y, newHead.X)) {
                this._bodys.unshift(newHead);
                this._foodCountCur--;
                this.GenerateFood();

            } else {
                this._bodys.unshift(newHead);
                this._bodys.pop();
                if (this.IsGameOver(newHead)) {
                    this._isPaused = true;
                    alert("游戏结束");
                    clearInterval(this._timer);
                    return;
                }
            }


        }

        /**
         * 游戏是否结束
         * @param newHead
         */
        private IsGameOver(newHead: SnakeBody): boolean {
            if (newHead.X < 0 || newHead.X >= this._colNums) {
                return true;
            }
            if (newHead.Y < 0 || newHead.Y >= this._rowNums) {
                return true;
            }
            let flag: boolean = false;
            for (let i = 1; i < this._bodys.length; i++) {
                if (newHead.X == this._bodys[i].X && newHead.Y == this._bodys[i].Y) {
                    flag = true;
                    break;
                }
            }
            return flag;
        }

        /**
         * 下一步是否是食物
         */
        private IsFoodNextStep(row: number, col: number) {
            if (Draw.GetColor(row, col, this._container) == BkColor.FoodColor) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 产生食物
         */
        private GenerateFood(): void {
            let flag: boolean = true;

            while (this._foodCountCur < this._foodCount) {
                let row: number;
                let col: number;
                row = Common.Random(this._rowNums);
                col = Common.Random(this._colNums);
                if (!Draw.IsFilledColorAlready(this._container, row, col)) {
                    Draw.DrawBkColorContainer(this._container, row, col, BkColor.FoodColor);
                    this._foodCountCur++;
                }  
            }
        }
    }
}