import MagicCharacter from '../js/magicCharacter';

class Daemon extends MagicCharacter {
    constructor(name) {
        super(name, 'Daemon');
        this.attack = 10;
        this.defence = 40;
    };
};

export default Daemon;
