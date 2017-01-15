module Tt.Snake {
    export class Common {
        static Random(maxValue: number): number {
            return Math.floor(Math.random() * maxValue);
        }
    }
}