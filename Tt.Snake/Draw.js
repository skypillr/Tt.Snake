var Tt;
(function (Tt) {
    var Snake;
    (function (Snake) {
        var Draw = /** @class */ (function () {
            function Draw() {
            }
            /**
             * 填充单元格颜色
             * @param container
             * @param row
             * @param col
             * @param color
             */
            Draw.DrawBkColorContainer = function (container, row, col, color) {
                if (Draw.IsRowColValid(container, row, col)) {
                    var cell = Draw.GetCellContainer(container, row, col);
                    if (cell != null) {
                        cell.bgColor = color;
                    }
                }
            };
            /**
             * 验证行列index有效性
             * @param container
             * @param row
             * @param col
             */
            Draw.IsRowColValid = function (container, row, col) {
                var flag = false;
                if (row > 0 && container.rows.length > row) {
                    var tabrow = container.rows[row];
                    if (col > 0 && tabrow.cells.length > col) {
                        flag = true;
                    }
                    return flag;
                }
            };
            /**
             * 获取制定单元格
             * @param container
             * @param row
             * @param col
             */
            Draw.GetCellContainer = function (container, row, col) {
                if (Draw.IsRowColValid(container, row, col)) {
                    return container.rows[row].cells[col];
                }
                else {
                    return null;
                }
            };
            /**
             * 是否已经被填充过颜色
             * @param container
             * @param row
             * @param col
             * @param color
             */
            Draw.IsFilledColorAlready = function (container, row, col) {
                var flag = false;
                if (Draw.IsRowColValid(container, row, col)) {
                    var cell = Draw.GetCellContainer(container, row, col);
                    if (cell != null) {
                        if (cell.bgColor != Snake.BkColor.EmptyColor) {
                            flag = true;
                        }
                    }
                }
                return flag;
            };
            /**
             * 擦除
             * @param bodys
             * @param container
             */
            Draw.ClearDraw = function (bodys, container) {
                if (bodys != null && bodys.length > 0) {
                    //for (let i = 0; i < bodys.length; i++) {
                    //    Draw.DrawBkColorContainer(container, bodys[i].Y, bodys[i].X, BkColor.EmptyColor);
                    //}
                    //优化
                    Draw.DrawBkColorContainer(container, bodys[bodys.length - 1].Y, bodys[bodys.length - 1].X, Snake.BkColor.EmptyColor);
                }
            };
            /**
             * 重绘
             * @param bodys
             * @param container
             */
            Draw.RefreshDraw = function (bodys, container) {
                if (bodys != null && bodys.length > 0) {
                    for (var i = 0; i < bodys.length; i++) {
                        Draw.DrawBkColorContainer(container, bodys[i].Y, bodys[i].X, Snake.BkColor.SnakeBodyColor);
                    }
                    //优化
                    // Draw.DrawBkColorContainer(container, bodys[0].Y, bodys[0].X, BkColor.SnakeBodyColor);
                }
            };
            Draw.GetColor = function (row, col, container) {
                var color = Snake.BkColor.EmptyColor;
                if (Draw.IsRowColValid(container, row, col)) {
                    var cell = Draw.GetCellContainer(container, row, col);
                    if (cell != null) {
                        color = cell.bgColor;
                    }
                }
                return color;
            };
            return Draw;
        }());
        Snake.Draw = Draw;
    })(Snake = Tt.Snake || (Tt.Snake = {}));
})(Tt || (Tt = {}));
//# sourceMappingURL=Draw.js.map