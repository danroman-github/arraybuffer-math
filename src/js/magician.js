import MagicCharacter from '../js/magicCharacter';

class Magician extends MagicCharacter {
    constructor(name) {
        super(name, 'Magician');
        this.attack = 10;
        this.defence = 40;
    };
};

export default Magician;