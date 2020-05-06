class Fighter {
    constructor(parameters) {
        let _wins = 0;
        this.addWin = function() {
            _wins++;
        }
        let _loss = 0;
        this.addLoss = function() {
            _loss++;
        }
        this.getWins = function() {
            return _wins;
        }
        this.getLoss = function() {
            return _loss;
        }
        this.getName = function() {
            return parameters.name;
        };
        this.getDamage = function() {
            return parameters.damage;
        };
        this.getStrength = function() {
            return parameters.strength;
        };
        this.getAgility = function() {
            return parameters.agility;
        };
        let _startHp = parameters.hp;
        let _hp = parameters.hp;
        this.getHealth = function() {
            return _hp;
        };
        this.dealDamage = function(makedDamage) {
            if (_hp <= makedDamage) {
                _hp = 0;
            } else {
                _hp = _hp - makedDamage;
            }
        }
        this.heal = function(heals) {
            if (_hp > _startHp - heals) {
                _hp = _startHp;
            } else {
                _hp += heals;
            }
        }
    }
    attack(defendFighter) {
        const atata = defendFighter.getStrength() + defendFighter.getAgility();
        const MAX_CHANCE = 100;
        if (Math.random() * MAX_CHANCE > atata) {
            console.log(
                `${this.getName()} makes ${defendFighter.getName()}` + ` ${this.getDamage()} damage`
            );
            defendFighter.dealDamage(this.getDamage());
        } else {
            console.log(`${this.getName()} atack missed`);
        }
    }

    logCombatHistory() {
        console.log(`Name: ${this.getName()}, Wins: ${this.getWins()}, Loses: ${this.getLoss()}`);
    }
}

function battle(myFighter, myFighter1) {
    if (!myFighter.getHealth()) {
        console.log(`${myFighter.getName()} is dead and can't fight`);
    } else if (!myFighter1.getHealth()) {
        console.log(`${myFighter1.getName()} is dead and can't fight`);
    } else {
        while (myFighter.getHealth() && myFighter1.getHealth()) {
            myFighter.attack(myFighter1);
            if (myFighter1.getHealth()) {
                myFighter1.attack(myFighter);
            }
        }
        if (myFighter.getHealth()) {
            console.log(`${myFighter.getName()} has won`);
            myFighter1.addLoss();
            myFighter.addWin();
        } else {
            console.log(`${myFighter1.getName()} has won`);
            myFighter.addLoss();
            myFighter1.addWin();
        }
    }
}

const myFighter = new Fighter({
    name: 'Maximus',
    damage: 20,
    hp: 100,
    strength: 20,
    agility: 15
});
const myFighter1 = new Fighter({
    name: 'Comodus',
    damage: 25,
    hp: 90,
    strength: 25,
    agility: 20
});