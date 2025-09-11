'use strict'
const types = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];


const sameElements = (x, y) => [...x].sort().every((v, i) => v === [...y].sort()[i]);

function instructionDisplay() {
    console.log(`Для використання програми уведіть в консоль наступний текст:
triangle(arg1, type1, arg2, type2);
У поля arg1 / arg2 - введіть числа.
У поля type1 / type2 - введіть тип числа.
Число може бути таких типів:
    leg - катет
    hypotenuse - гіпотенуза
    adjacent angle - прилеглий до катета кут
    opposite angle - протилежний до катета кут
    angle - один з двох гострих кутів(коли задана гіпотенуза)
    Приклад: triangle(2, ‘leg’, 3, ‘leg);
У разі друкарської помилки чи від’ємного числа виведеться повідомлення про помилку.Якщо ж усе введено без помилок - виведеться обрахований прямокутний трикутник та повідомлення про успіх.
`);
};


function Init() {
    return {
        a: null,
        b: null,
        c: null,
        alpha: null,
        beta: null
    }
}
function typePlacment(arg, type, pos = true) {
    // pos = true => a, else b
    switch (type) {
        case 'leg':
            pos ? t.a = arg : t.b = arg;
            break;
        case 'hypotenuse':
            t.c = arg;
            break;
        case 'adjacent angle':
            t.alpha = arg;
            break;
        case 'opposite angle':
            t.beta = arg;
            break;
        case 'angle':
            t.alpha = arg;
            break;
    }
};

function radiansToDegrees(arg) {
    return arg * (180 / Math.PI);
}

function degressToRadians(arg) {
    return arg * (180 / Math.PI);
}

function triangle(arg1, type1, arg2, type2) {
    // Перевіряє друкарські одруківки
    const typoCheacker = type => types.includes(type);
    if (!typoCheacker(type1) || !typoCheacker(type2))
        return console.error('Ви допустили друкарську помилку у якомусь зі слів');

    if (arg1 <= 1 || arg2 <= 1) {
        console.error("Ви ввели від'ємне число");
        return;
    }

    // Записує до об'єкту / перевіряє чи типи не однакові / чи двічі не були введені кути
    const forbitenTogether = types.slice(2);
    if ((type1 === type2) && type1 === 'leg') {
        typePlacment(arg1, type1);
        typePlacment(arg2, type2, false);
    } else if ((type1 === type2) || (forbitenTogether.includes(type1) && forbitenTogether.includes(type2))) {
        console.error('Ви ввели недозволену комбінацію даних (2 рази гіпотенузу, чи два кути).');
    } else {
        typePlacment(arg1, type1);
        typePlacment(arg2, type2);
    }

    if ((t.a >= t.c) && (t.c !== null)) {
        console.error('Катет не може бути більшим від гіпотенузи');
        t = Init();
    }
    if (t.alpha >= 90 || t.beta >= 90) {
        console.error('Кути не можуть бути рівні чи більші від 90°.');
        t = Init();
    };

    // const types = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];
    const arr = [type1, type2];
    if (sameElements(['leg', 'leg'], arr)) {
        twoLeg(t.a, t.b);
    }
    if (sameElements(['leg', 'hypotenuse'], arr)) {
        legHypotenuse(t.a, t.c);
    }
    if (sameElements(['leg', 'adjacent angle'], arr)) {
        legAdjacentAngle(t.a, t.alpha);
    }
    if (sameElements(['leg', 'opposite angle'], arr)) {
        legOppositeAngle(t.a, t.beta);
    }
    if (sameElements(['hypotenuse', 'angle'], arr)) {
        hypotenuseAngle(t.c, t.alpha);
    };

    t.alpha = radiansToDegrees(t.alpha);
    t.beta = radiansToDegrees(t.beta);
};

function twoLeg(arg1, arg2) { // a = arg1, b = arg2
    t.c = Math.sqrt(arg1 ** 2 + arg2 ** 2);
    t.alpha = Math.atan(arg1 / arg2);
    t.beta = Math.atan(arg2 / arg1);
};

function legHypotenuse(arg1, arg2) { // a = arg1, c = arg2
    t.b = Math.sqrt(arg2 ** 2 - arg1 ** 2);
    t.alpha = Math.asin(arg1 / arg2);
    t.beta = Math.acos(arg1 / arg2);
};

function legAdjacentAngle(arg1, arg2) { // a = arg1, alpha = arg2
    t.c = degressToRadians(arg1 / Math.cos(arg2));
    t.b = arg1 * radiansToDegrees(Math.tan(arg2));
    t.beta = 90 - arg2;
};

function legOppositeAngle(arg1, arg2) {// a = arg1, beta = arg2
    t.c = arg1 / radiansToDegrees(Math.sin(arg2));
    t.b = arg1 * radiansToDegrees(Math.tan(arg2));
    t.alpha = (90 - arg2) / (180 / Math.PI);
}

function hypotenuseAngle(arg1, arg2) { //c = arg1, alpha = arg2
    t.beta = (90 - arg2) / (180 / Math.PI);
    t.a = arg1 * radiansToDegrees(Math.abs(Math.sin(arg2)));
    t.b = arg1 * radiansToDegrees(Math.cos(arg2));
    t.alpha /= (180 / Math.PI);
}

// const types = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];

let t = Init();
instructionDisplay();
// triangle(2, 'angle', 3, 'angle');
// triangle(7, 'hypotenuse', 3, 'leg');
// triangle(2, 'leg', 3, 'leg');
// triangle(3, 'leg', 3.61, 'hypotenuse');
triangle(3, 'leg', 33.69, 'adjacent angle');
// triangle(3, 'leg', 3.61, 'hypotenuse');
// triangle(3.61, 'hypotenuse', 56.31, 'angle');

console.log(t);
let a = ['apple', 'banana'];
let b = ['banana', 'apple'];