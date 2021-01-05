class SwipeObject {
    _detectionTime;
    _handPos1;
    _handPos2;
    _dirVector;
    _dirVectorNormalized;
    _velocity;
    _dir;
    _dirAngle;
    SPACING = 5;

    constructor(position1, position2) {
        this._detectionTime = Date.now();
        this._handPos1 = position1;
        this._handPos2 = position2;
        this._dirVector = this.calcDirVector(this._handPos1, this._handPos2);
        this._dirVectorNormalized = this.normalizeDirectionVector();
        this._velocity = this.calcVelocity(this._dirVector);
        this._dirAngle = this.calcAngle();
        this.calcDirSimple();
    }

    get time() {
        return this._detectionTime;
    }

    get velocity() {
        return this._velocity();
    }

    get direction() {
        return this._dir;
    }

    get directionVector() {
        return this._dirVector;
    }

    get nomalizedDirection() {
        return this._dirVectorNormalized()
    }

    get Spacing() {
        return this.SPACING
    }

    set Spacing(newSpacing) {
        if (typeof newSpacing == "number") {
            this.SPACING = newSpacing;
        }
    }

    calcDirVector(pos1, pos2) {
        let temp;
        for (let i = 0; i < pos1.length; i++) {
            temp.push(pos2[i] - pos1[i]);
        }
        return temp;
    }

    calcVelocity(direction) {
        let temp = 0;
        for (let i = 0; i < direction.length; i++) {
            temp += direction[i] * direction[i];
        }
        return Math.sqrt(temp);

    }

    normalizeDirectionVector() {
        let temp;
        for (let i = 0; i < this.direction.length; i++) {
            temp.push(this.direction[i] / this.velocity);
        }
        return temp;
    }

    calcDirSimple() {
        //this._dir = 0 for right and this._dir = 1 for left
        if (this.direction[0] > 0) {
            this._dir = 0;
        } else {
            this._dir = 1;
        }
    }

    calcAngle() {
        let x = this._dirVectorNormalized[0];
        let y = this._dirVectorNormalized[1];
        if (y >= 0) {
            return Math.acos(x);
        } else {
            return -Math.acos(x);
        }
    }

    calcDirComplex(gesture) {
        let phi = this._dirAngle;
        let delta = (Math.PI * this.SPACING) / 180;

        if (-Math.PI / 4 + delta <= phi && phi <= Math.PI / 4 - delta) {
            console.log("Swipedirection is Right");
            this._dir = 0;
        }
        if (phi >= (3 * Math.PI) / 4 + delta || phi <= -((3 * Math.PI) / 4 + delta)) {
            console.log("Swipedirection is Left");
            this._dir = 1;
        }
        if (Math.PI / 4 + delta <= phi && phi <= (3 * Math.PI) / 4 - delta) {
            console.log("Swipedirection is Up");
            this._dir = 2;
        }
        if (-(3 * Math.PI) / 4 + delta <= phi && phi <= -Math.PI / 4 - delta) {
            console.log("Swipedirection is Down");
            this._dir = 3;
        }
    }
}

module.exports = SwipeObject;
