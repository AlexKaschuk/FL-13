const VEHICLESPEED = 70;
const CARSPEED = 80;
const MOTOSPEED = 90;
const MOVE = 20;
const TIMERDRIVE = 2000;
const TIMERSTOP = 1500;
const LIMIT = 30;

let index, index2;
const Vehicle = function(color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = VEHICLESPEED;
    this.model = 'unknown model';
    this.speed = 0;
    this.topSpeed = 0;
}

Vehicle.prototype.getInfo = function() {
    let info = {};
    info.color = this.color;
    info.engine = this.engine;
    info.maxSpeed = this.maxSpeed;
    info.model = this.model;
    return info;
}

Vehicle.prototype.drive = function() {
    clearInterval(index2);
    index2 = null;
    if (index) {
        console.log('Already driving');
    } else if (!index && this.speed) {
        console.log('Already driving');
        index = setInterval(() => {
                this.speed += MOVE;
                console.log(this.speed);

            },
            TIMERDRIVE);
    } else {
        console.log(`let's drive`);
        index = setInterval(() => {
                this.speed += MOVE;
                console.log(this.speed);
                this.topSpeed = this.speed;
                if (this.speed > this.maxSpeed) {
                    console.log('speed is too high, SLOW DOWN!');
                }
            },
            TIMERDRIVE);
    }
}

Vehicle.prototype.stop = function() {
    clearInterval(index);
    index = null;
    if (index2) {
        console.log('Already slows down');
    } else {
        if (this.speed > 0) {
            index2 = setInterval(() => {
                this.speed -= MOVE;
                console.log(this.speed);
                if (!this.speed) {
                    clearInterval(index2);
                    console.log(`${Vehicle.name} is stopped. Maximum speed during the drive was ${this.topSpeed} `);
                }
            }, TIMERSTOP);
        }
    }
}

Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed) {
    if (!this.speed) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    } else {
        console.log('You can upgrade engine only if car is stopped');
    }
}

const Car = function(model, color, engine) {
    Vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = MOTOSPEED;
};

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.stop = function() {
    clearInterval(index);
    index = null;
    if (index2) {
        console.log('Already slows down');
    } else {
        if (this.speed > 0) {
            index2 = setInterval(() => {
                this.speed -= MOVE;
                console.log(this.speed);
                if (!this.speed) {
                    clearInterval(index2);
                    console.log(`${Car.name} ${this.model} 
                    is stopped. Maximum speed during the drive 
                    was ${this.topSpeed}`);
                }
            }, TIMERSTOP);
        }
    }
};
Car.prototype.changeColor = function(newColor) {
    if (this.color !== newColor) {
        this.color = newColor;
    } else {
        console.log('The selected color is the same as previous, please choose another one');
    }
}

const Motorcycle = function(model, color, engine) {
    Vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = MOTOSPEED;
};

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;
Motorcycle.prototype.stop = function() {
    clearInterval(index);
    index = null;
    if (index2) {
        console.log('Already slows down');
    } else {
        if (this.speed > 0) {
            index2 = setInterval(() => {
                this.speed -= MOVE;
                console.log(this.speed);
                if (!this.speed) {
                    clearInterval(index2);
                    console.log(`${Motorcycle.name} ${this.model} 
                    is stopped. Maximum speed during the drive 
                    was ${this.topSpeed}`);
                }
            }, TIMERSTOP);
        }
    }
};
Motorcycle.prototype.drive = function() {
    clearInterval(index2);
    index2 = null;
    if (index) {
        console.log('Already driving');
    } else if (!index && this.speed) {
        console.log('Already driving');
        index = setInterval(() => {
                this.speed += MOVE;
                console.log(this.speed);
            },
            TIMERDRIVE);
    } else {
        console.log(`let's drive`);
        index = setInterval(() => {
                this.speed += MOVE;
                console.log(this.speed);
                this.topSpeed = this.speed;
                if (this.speed > this.maxSpeed) {
                    console.log('speed is too high, SLOW DOWN!');
                }
                if (this.speed > this.maxSpeed + LIMIT) {
                    console.log(this.speed);
                    console.log('engine overheating!');
                    this.stop();
                }
            },
            TIMERDRIVE);
    }
}