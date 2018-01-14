module Tt.Snake {
    export class Draw {

        /**
         * 填充单元格颜色
         * @param container
         * @param row
         * @param col
         * @param color
         */
        static DrawBkColorContainer(container: HTMLTableElement, row: number, col: number, color: any): void {
            if (Draw.IsRowColValid(container, row, col)) {

                let cell = Draw.GetCellContainer(container, row, col);
                if (cell != null) {
                    cell.bgColor = color;

                }
            }
        }

        /**
         * 验证行列index有效性
         * @param container
         * @param row
         * @param col
         */
        static IsRowColValid(container: HTMLTableElement, row: number, col: number): boolean {
            let flag: boolean = false
            if (row > 0 && container.rows.length > row) {
                let tabrow = <HTMLTableRowElement>container.rows[row];
                if (col > 0 && tabrow.cells.length > col) {
                    flag = true;
                }
                return flag;
            }
        }

        /**
         * 获取制定单元格
         * @param container
         * @param row
         * @param col
         */
        static GetCellContainer(container: HTMLTableElement, row: number, col: number): HTMLTableCellElement {
            if (Draw.IsRowColValid(container, row, col)) {
                return (<HTMLTableCellElement>(<HTMLTableRowElement>container.rows[row]).cells[col])
            } else {
                return null;
            }

        }
        /**
         * 是否已经被填充过颜色
         * @param container
         * @param row
         * @param col
         * @param color
         */
        static IsFilledColorAlready(container: HTMLTableElement, row: number, col: number) {
            let flag: boolean = false;
            if (Draw.IsRowColValid(container, row, col)) {
                let cell = Draw.GetCellContainer(container, row, col);
                if (cell != null) {
                    if (cell.bgColor != BkColor.EmptyColor) {
                        flag = true;
                    }
                }
            }
            return flag;
        }

        /**
         * 擦除
         * @param bodys
         * @param container
         */
        static ClearDraw(bodys: Array<SnakeBody>, container: HTMLTableElement): void {
            if (bodys != null && bodys.length > 0) {
                //for (let i = 0; i < bodys.length; i++) {
                //    Draw.DrawBkColorContainer(container, bodys[i].Y, bodys[i].X, BkColor.EmptyColor);
                //}
                //优化
                Draw.DrawBkColorContainer(container, bodys[bodys.length - 1].Y, bodys[bodys.length - 1].X, BkColor.EmptyColor);
                
            }
        }

        /**
         * 重绘
         * @param bodys
         * @param container
         */
        static RefreshDraw(bodys: Array<SnakeBody>, container: HTMLTableElement): void {
            if (bodys != null && bodys.length > 0) {
              
                for (let i = 0; i < bodys.length; i++) {
                    Draw.DrawBkColorContainer(container, bodys[i].Y, bodys[i].X, BkColor.SnakeBodyColor);
                }
                //优化
               // Draw.DrawBkColorContainer(container, bodys[0].Y, bodys[0].X, BkColor.SnakeBodyColor);
            }
        }

        static GetColor(row: number, col: number, container: HTMLTableElement): string {
            let color: any = BkColor.EmptyColor;
            if (Draw.IsRowColValid(container, row, col)) {
                let cell = Draw.GetCellContainer(container, row, col);
                if (cell != null) {
                    color = cell.bgColor;
                }
            }
            return color;
        }
    }
}