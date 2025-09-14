const types = ['leg', 'hypotenuse', 'adjacent angle', 'opposite angle', 'angle'];
const forbitenTogether = types.slice(2);

class RightTriangle {
    #a;
    #b;
    #c;
    #alpha;
    #beta;
    constructor() {
        this.#Init();
        // this.#instructionDisplay();
    }

    #sameElements = (x, y) => [...x].sort().every((v, i) => v === [...y].sort()[i]);

    #radiansToDegrees = x => x * (180 / Math.PI);

    #degressToRadians = x => x / (180 / Math.PI);

    //     #instructionDisplay() {
    //         console.log(`Для використання програми уведіть в консоль наступний текст:
    // triangle(arg1, type1, arg2, type2);
    // У поля arg1 / arg2 - введіть числа.
    // У поля type1 / type2 - введіть тип числа.
    // Число може бути таких типів:
    //     leg - катет
    //     hypotenuse - гіпотенуза
    //     adjacent angle - прилеглий до катета кут
    //     opposite angle - протилежний до катета кут
    //     angle - один з двох гострих кутів(коли задана гіпотенуза)
    // Приклад: triangle(2, ‘leg’, 3, ‘leg);
    // У разі друкарської помилки чи від’ємного числа виведеться повідомлення про помилку.
    // Якщо ж усе введено без помилок - виведеться обрахований прямокутний трикутник та повідомлення про успіх.
    // `);
    //     };

    #displayResults() {
        console.log(`a: ${(this.#a).toFixed(2)}
b: ${(this.#b).toFixed(2)}
c: ${(this.#c).toFixed(2)}
alpha: ${(this.#alpha).toFixed(2)}
beta: ${(this.#beta).toFixed(2)}`
        );
    }

    #Init() {
        this.#a = 0;
        this.#alpha = 0;
        this.#b = 0;
        this.#beta = 0;
        this.#c = 0;
    }

    #typePlacment(arg, type, pos = true) {
        // pos = true => a, else b
        switch (type) {
            case 'leg':
                pos ? this.#a = arg : this.#b = arg;
                break;
            case 'hypotenuse':
                this.#c = arg;
                break;
            case 'adjacent angle':
                this.#alpha = arg;
                break;
            case 'opposite angle':
                this.#beta = arg;
                break;
            case 'angle':
                this.#alpha = arg;
                break;
        }
    }

    #typoCheacker = type => types.includes(type);

    #cheackBeforeCalc(arg1, type1, arg2, type2) {
        // первірка чи аргументи число а не стрінг
        if (isNaN(arg1) || isNaN(arg2)) {
            console.error('В аргументі ви ввели не число, або ви не закінчили виклик функції');
            return 'failed';
        }

        // первірка на друкарську одруківку
        if (!this.#typoCheacker(type1) || !this.#typoCheacker(type2)) {
            console.error('Ви допустили друкарську помилку у якомусь зі слів, або ви не закінчили виклик функції');
            this.#Init();
            return 'failed';
        }

        // первірка на від'ємне число
        if (arg1 < 1 || arg2 < 1) {
            console.error("Ви ввели від'ємне число");
            this.#Init();
            return 'failed';
        }


        if ((type1 === 'hypotenuse' && (type2 === 'adjacent angle' || type2 === 'opposite angle'))
            || (type2 === 'hypotenuse' && (type1 === 'adjacent angle' || type1 === 'opposite angle'))) {
            console.error("Для розв'язання прямокутного трикутнику через гіпотенузу й кут варто застосовувати не 'adjacent angle' або 'opposite angle', а просто 'angle'");
            this.#Init();
            return 'failed';
        }
        // первірка на два два однакові типи, і катети
        if ((type1 === type2) && type1 === 'leg') {
            this.#typePlacment(arg1, type1);
            this.#typePlacment(arg2, type2, false);
        }
        // первірка на два однакові типи або на два кути
        else if ((type1 === type2) || (forbitenTogether.includes(type1) && forbitenTogether.includes(type2))) {
            console.error('Ви ввели недозволену комбінацію даних (2 рази гіпотенузу, чи два кути).');
            this.#Init();
            return 'failed';
        }
        else { // запис якщо всі перевірки пройдено
            this.#typePlacment(arg1, type1);
            this.#typePlacment(arg2, type2);
        }

        // перевірка чи при введені катета і гіпотенузи, катет не більший від гіпотенузи
        if ((this.#a >= this.#c) && (this.#c !== 0)) {
            console.error('Катет не може бути більшим від гіпотенузи');
            this.#Init();
            return 'failed';
        }
        // перевірка чи вказані кути не більші від 90°
        if (this.#alpha >= 90 || this.#beta >= 90) {
            console.error('Кути не можуть бути рівні чи більші від 90°.');
            this.#Init();
            return 'failed';
        };
    }

    triangleSolve(arg1, type1, arg2, type2) {
        if (this.#cheackBeforeCalc(arg1, type1, arg2, type2) === 'failed') {
            return 'failed';
        }
        const arr = [type1, type2];

        if (this.#sameElements(['leg', 'leg'], arr)) {
            this.#twoLeg(this.#a, this.#b);
            this.#displayResults();
            return 'success';
        }
        if (this.#sameElements(['leg', 'hypotenuse'], arr)) {
            this.#legHypotenuse(this.#a, this.#c);
            this.#displayResults();
            return 'success';
        }
        if (this.#sameElements(['leg', 'adjacent angle'], arr)) {
            this.#legAdjacentAngle(this.#a, this.#alpha);
            this.#displayResults();
            return 'success';
        }
        if (this.#sameElements(['leg', 'opposite angle'], arr)) {
            this.#legOppositeAngle(this.#a, this.#beta);
            this.#displayResults();
            return 'success';
        }
        if (this.#sameElements(['hypotenuse', 'angle'], arr)) {
            this.#hypotenuseAngle(this.#c, this.#alpha);
            this.#displayResults();
            return 'success';
        };
    }


    #twoLeg(arg1, arg2) { // a = arg1, b = arg2
        this.#c = Math.sqrt(arg1 ** 2 + arg2 ** 2);
        this.#alpha = this.#radiansToDegrees(Math.atan(arg1 / arg2));
        this.#beta = this.#radiansToDegrees(Math.atan(arg2 / arg1));
    };

    #legHypotenuse(arg1, arg2) { // a = arg1, c = arg2
        this.#b = Math.sqrt(arg2 ** 2 - arg1 ** 2);
        this.#alpha = this.#radiansToDegrees(Math.asin(arg1 / arg2));
        this.#beta = this.#radiansToDegrees(Math.acos(arg1 / arg2));
    };

    #legAdjacentAngle(arg1, arg2) { // a = arg1, alpha = arg2
        this.#c = arg1 / (Math.cos(this.#degressToRadians(arg2))); // 3.60
        this.#b = arg1 * Math.tan(this.#degressToRadians(arg2));
        this.#beta = 90 - arg2;
    };

    #legOppositeAngle(arg1, arg2) {// a = arg1, beta = arg2
        this.#c = arg1 / Math.sin(this.#degressToRadians(arg2));
        this.#b = arg1 / Math.tan(this.#degressToRadians(arg2));
        this.#alpha = 90 - arg2;
    }

    #hypotenuseAngle(arg1, arg2) { //c = arg1, alpha = arg2
        this.#a = arg1 * Math.sin(this.#degressToRadians(arg2));
        this.#b = arg1 * Math.cos(this.#degressToRadians(arg2));
        this.#beta = 90 - arg2;
    }
};

export function triangle(arg1, type1, arg2, type2) {
    const tri = new RightTriangle();
    return tri.triangleSolve(arg1, type1, arg2, type2);;
}

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
Приклад: triangle(2, 'leg', 3, 'leg');
У разі друкарської помилки чи від’ємного числа виведеться повідомлення про помилку.
Якщо ж усе введено без помилок - виведеться обрахований прямокутний трикутник та повідомлення про успіх.
`);

window.triangle = triangle;
