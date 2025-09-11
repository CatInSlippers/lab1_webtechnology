// console.log('js is created');

// function triangle(arg1, type1, arg2, type2){
// }

class Triangle {
    constructor(a, b, c, alpha, beta) {
        this._explanation();
        this.a = a;
        this.b = b;
        this.c = c;
        this.alpha = alpha;
        this.beta = beta;
    }

    _explanation() {
        console.log(`
У консолі запишіть функцію у такому вигляді:
triangle(аргумент 1, тип аргументу 1, аргумент 2, тип аргументу 2).
Приклад: triangle(3, leg, 4, leg);
Можливі наступні випадки використання програми:
            1) Два катети;
            2) Катет і гіпотенуза;
            3) Катет і прилеглий гострий кут;
            4) Катет і протилежний гострий кут;
            5) Гіпотенуза і гострий кут;`);
    };

    _typePlacment(arg, type, pos = true) {
        // pos = true => a, else b
        switch (type) {
            case 'leg':
                pos ? this.a = arg : this.b = arg;
                break;
            case 'hypotenuse':
                this.c = arg;
                break;
            case 'adjacent angle':
                this.alpha = arg;
                break;
            case 'opposite angle':
                this.beta = arg;
                break;
            case 'angle':
                this.alpha = arg;
                break;
        }
    };

    _triangle(arg1, type1, arg2, type2) {
        this._typePlacment(arg1, type1, true);
        this._typePlacment(arg2, type2, false);
        if (type1 === 'leg' && type2 === 'leg') {
            this._twoLeg(arg1, arg2);
        }
        if (type1 === 'leg' && type2 === 'hypotenuse') {
            this._legHypotenuse(arg1, arg2);
        }
        if (type1 === 'hypotenuse' && type2 === 'leg') {
            this._legHypotenuse(arg2, arg1);
        }
        if (type1 === 'leg' && type2 === 'adjacent angle') {
            this._legAdjacentAngle(arg1, arg2);
        }
        if (type1 === 'adjacent angle' && type2 === 'leg') {
            this._legAdjacentAngle(arg2, arg1);
        }
        if (type1 === 'leg' && type2 === 'opposite angle') {
            this._legOppositeAngle(arg1, arg2);
        }
        if (type1 === 'opposite angle' && type2 === 'leg') {
            this._legOppositeAngle(arg2, arg1);
        }
        if (type1 === 'hypotenuse' && type2 === 'angle') {
            this._legOppositeAngle(arg1, arg2);
        }
        if (type1 === 'angle' && type2 === 'hypotenuse') {
            this._legOppositeAngle(arg2, arg1);
        };
        this._displayResult();
    };

    _displayResult() {
        console.log(`
            a: ${(this.a).toFixed(2)}
            b: ${(this.b).toFixed(2)}
            c: ${(this.c).toFixed(2)}
            alpha: ${(this.alpha * (180 / Math.PI)).toFixed(2)}
            beta: ${(this.beta * (180 / Math.PI)).toFixed(2)}`);
        return console.log('success');
    }

    _twoLeg(arg1, arg2) { // a = arg1, b = arg2
        this.c = Math.sqrt(arg1 ** 2 + arg2 ** 2);
        this.alpha = Math.atan(arg1 / arg2);
        this.beta = Math.atan(arg2 / arg1);
    };

    _legHypotenuse(arg1, arg2) { // a = arg1, c = arg2
        this.b = Math.sqrt(arg2 ** 2 - arg1 ** 2);
        this.alpha = Math.asin(arg1 / arg2);
        this.beta = Math.acos(arg1 / arg2);
    };

    _legAdjacentAngle(arg1, arg2) { // a = arg1, alpha = arg2
        this.c = arg1 / (Math.cos(arg2));
        this.b = arg1 * Math.tan(arg2);
        this.beta = 90 - arg2;
    };

    _legOppositeAngle(arg1, arg2) {// a = arg1, beta = arg2
        this.c = arg1 / (Math.sin(arg2));
        this.b = arg1 * Math.tan(arg2);
        this.alpha = 90 - arg2;
    }

    _hypotenuseAngle(arg1, arg2) { //c = arg1, alpha = arg2
        this.alpha = 90 - arg2;
        this.a = arg1 * Math.sin(arg2);
        this.b = arg1 * Math.cos(arg2);
    }
}

const triangle = new Triangle();
// triangle._triangle(2, 'leg', 3, 'leg');
triangle._triangle(33.69, 'adjacent angle', 2, 'leg');

