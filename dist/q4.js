"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tasks3 = [
    { task: [1, 2, 3] },
    { task: [4, 5, 6] },
    { task: [7, 8, 9] },
];
function doSomething3(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num);
        }, Math.random() * 2000);
    });
}
function main3() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const el of tasks3) {
            const result = yield Promise.all(el.task.map((item) => {
                return doSomething3(item);
            }));
            console.log(result);
        }
    });
}
main3();
