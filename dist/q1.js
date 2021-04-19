"use strict";
var Roman;
(function (Roman) {
    Roman[Roman["M"] = 1000] = "M";
    Roman[Roman["D"] = 500] = "D";
    Roman[Roman["C"] = 100] = "C";
    Roman[Roman["L"] = 50] = "L";
    Roman[Roman["X"] = 10] = "X";
    Roman[Roman["V"] = 5] = "V";
    Roman[Roman["I"] = 1] = "I";
})(Roman || (Roman = {}));
function RomanCalculator(input) {
    if (typeof input === "string") {
        const result = toNumber(input);
        return result === -1 ? "invalid input" : result;
    }
    else {
        return toRoman(input);
    }
}
function getValue(char) {
    switch (char) {
        case "I":
            return Roman.I;
        case "V":
            return Roman.V;
        case "X":
            return Roman.X;
        case "L":
            return Roman.L;
        case "C":
            return Roman.C;
        case "D":
            return Roman.D;
        case "M":
            return Roman.M;
        default:
            return 0;
    }
}
function toNumber(str) {
    if (!str.match(/^[a-zA-Z]+$/)) {
        return "invalid input";
    }
    const strLst = str.split("");
    for (let ci = 0; ci < strLst.length; ci++) {
        if (!(strLst[ci] in Roman)) {
            return "invalid input";
        }
        else {
            if (strLst[ci] === "M" && ci === 0) {
                continue;
            }
            if (ci + 4 > strLst.length) {
                continue;
            }
            let checkLst = [];
            for (let i = ci; i < ci + 4; i++) {
                checkLst.push(strLst[i]);
            }
            if (new Set(checkLst).size === 1) {
                return "invalid input";
            }
        }
    }
    const fourNineLst = ["IV", "IX", "XL", "XC", "CD", "CM"];
    for (const el of fourNineLst) {
        if (str.includes(el)) {
            const indexOfEl = str.indexOf(el);
            if (indexOfEl === 0) {
                continue;
            }
            if (str[indexOfEl] === str[indexOfEl - 1]) {
                return "invalid input";
            }
        }
    }
    const badFormatLst = [
        "IL",
        "IC",
        "ID",
        "IM",
        "VX",
        "VL",
        "VC",
        "VD",
        "VM",
        "XD",
        "XM",
        "LC",
        "LD",
        "LM",
        "VV",
        "LL",
        "DD"
    ];
    for (const el of badFormatLst) {
        if (str.includes(el)) {
            return "invalid input";
        }
    }
    return calToNum(str.toUpperCase());
}
function calToNum(str) {
    let result = 0;
    let current = 0;
    let previous = 0;
    for (const char of str.split("").reverse()) {
        current = getValue(char);
        if (current >= previous) {
            result += current;
        }
        else {
            result -= current;
        }
        previous = current;
    }
    return result;
}
function toRoman(n) {
    if (n > 4999 || n < 0) {
        return "invalid input";
    }
    return calToRoman(n, Math.pow(10, (n.toString().length - 1)));
}
function calToRoman(n, digit) {
    let result = "";
    //จำนวนหลัก
    let digitNum = Math.floor(n / digit);
    //จำนวนที่เหลือ
    let remaining = n % digit;
    if (digit !== 1000) {
        if (digitNum === 4) {
            result += Roman[digit];
            result += Roman[digit * 5];
        }
        else if (digitNum === 5) {
            result += Roman[digit * 5];
        }
        else if (digitNum === 9) {
            result += Roman[digit];
            result += Roman[digit * 10];
        }
        else {
            let digitNumLoop = digitNum > 5 ? digitNum - 5 : digitNum;
            if (digitNum > 5) {
                result += Roman[digit * 5];
            }
            for (let i = 0; i < digitNumLoop; i++) {
                result += Roman[digit];
            }
        }
    }
    else {
        for (let i = 0; i < digitNum; i++) {
            result += Roman[digit];
        }
    }
    if (remaining === 0) {
        return result;
    }
    const nextDigit = digit / 10;
    result += calToRoman(remaining, nextDigit);
    return result;
}
console.log(RomanCalculator("MMMMCMXCIX"));
console.log(RomanCalculator(4999));
console.log("_____");
console.log(RomanCalculator("DCLXXVII"));
console.log(RomanCalculator(677));
console.log("_____");
console.log(RomanCalculator("MCCCXXIII"));
console.log(RomanCalculator(1323));
console.log("_____");
console.log(RomanCalculator("XII"));
console.log(RomanCalculator(12));
console.log("_____");
console.log(RomanCalculator(-1));
console.log(RomanCalculator(5000));
console.log(RomanCalculator("VIIII"));
console.log(RomanCalculator("MMMMMIII"));
console.log(RomanCalculator("XXXXX"));
console.log(RomanCalculator("MMMDCVVVV"));
console.log(RomanCalculator("IIV"));
console.log(RomanCalculator("LC"));
console.log(RomanCalculator("MMIL"));
console.log(RomanCalculator("CCCLLL"));
console.log("_____");
