enum Roman {
  M = 1000,
  D = 500,
  C = 100,
  L = 50,
  X = 10,
  V = 5,
  I = 1,
}

function RomanCalculator(input: any) {
  //เช็ค input เพื่อเลือกฟังก์ชัน
  if (typeof input === "string") {      //แปลง Roman --> Number
    const result: any = toNumber(input);
    return result === -1 ? "invalid input" : result;
  } else {                              //แปลง Number --> Roman
    return toRoman(input);
  }
}

function getValue(char: string) {
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

function toNumber(str: string) {
  if (!str.match(/^[a-zA-Z]+$/)) {        //เช็ค input มีเฉพาะอักษร
    return "invalid input";
  }

  const strLst: string[] = str.split("");
  for (let ci = 0; ci < strLst.length; ci++) {
    if (!(strLst[ci] in Roman)) {         //เช็ค input มีเฉพาะอักษรโรมัน
      return "invalid input";
    } else {                              //เช็ค input มีอักษรโรมันไม่เกิน 4 ตัว ยกเว้น M
      if (strLst[ci] === "M" && ci === 0) {
        continue;
      }
      if (ci + 4 > strLst.length) {
        continue;
      }

      let checkLst: string[] = [];
      for (let i = ci; i < ci + 4; i++) {
        checkLst.push(strLst[i]);
      }
      if (new Set(checkLst).size === 1) {
        return "invalid input";
      }
    }
  }

  //เช็ค input มีอักษรโรมัน ที่ค่า 4,9,40,90,400,900 ต้องไม่มีตัวด้านซ้ายที่มีค่าเดียวกัน เช่น IIV
  const fourNineLst: string[] = ["IV", "IX", "XL", "XC", "CD", "CM"];
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

  //เช็ค input มีอักษรโรมันไม่ผิดเงื่อนไขการลบ
  const badFormatLst: string[] = [
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

function calToNum(str: string) {
  let result: number = 0;
  let current: number = 0;
  let previous: number = 0;

  for (const char of str.split("").reverse()) {
    current = getValue(char);
    if (current >= previous) {  //ค่าปัจจุบัน มากกว่าหรือเท่ากับ ค่าก่อนหน้า ให้บวกเพิ่ม
      result += current;
    } else {                    //ค่าปัจจุบัน น้อยกว่า ค่าก่อนหน้า ให้ลบ
      result -= current;
    }
    previous = current;         //อัพเดตค่าก่อนหน้า
  }
  return result;
}

function toRoman(n: number) {
  if (n > 4999 || n < 0) {//เช็ค input ไม่มากกว่า 4999 และไม่ติดลบ
    return "invalid input";
  }
  return calToRoman(n, 10 ** (n.toString().length - 1));
}

function calToRoman(n: number, digit: number) {
  let result: string = "";
  //จำนวนหลัก
  let digitNum: number = Math.floor(n / digit);
  //จำนวนที่เหลือ
  let remaining: number = n % digit;

  if (digit !== 1000) {
    if (digitNum === 4) {         //ถ้าจำนวนหลักเท่ากับ 4 จะเอาเลขโรมันหลักนี้(1, 10, 100, 1000)และหลักถัดไป(5, 50, 500) ex <1> --> <5>
      result += Roman[digit];
      result += Roman[digit * 5];
    } else if (digitNum === 5) {  //ถ้าจำนวนหลักเท่ากับ 5 จะเอาเลขโรมันถัดไป(5, 50, 500)
      result += Roman[digit * 5];
    } else if (digitNum === 9) {  //ถ้าจำนวนหลักเท่ากับ 9 จะเอาเลขโรมันหลักนี้(1, 10, 100, 1000) และหลักถัดๆไป(1, 10, 100, 1000) ex <1> --> x<5>x --> <10>
      result += Roman[digit];
      result += Roman[digit * 10];
    } else {                       //กรณีอื่นๆ (1, 2, 3, 6, 7, 8)
      let digitNumLoop: number = digitNum > 5 ? digitNum - 5 : digitNum;
      if (digitNum > 5) {
        result += Roman[digit * 5];
      }
      for (let i = 0; i < digitNumLoop; i++) {
        result += Roman[digit];
      }
    }
  } else {  //กรณี 1000
    for (let i = 0; i < digitNum; i++) {
      result += Roman[digit];
    }
  }

  if (remaining === 0) {
    return result;
  }

  const nextDigit = digit / 10; //ทำต่อ มีจำนวนที่เหลือ โดยจะใข้หลักถัดๆไป <1000> --> x<500>x --> <100>
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
