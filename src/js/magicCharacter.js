import Character from './character.js';
import ErrorRepository from './errorRepository.js';

export default class MagicCharacter extends Character {
    constructor(name, type) {
        super(name, type);

        this.errorRepo = new ErrorRepository();
        this._stoned = false;
        this._distance = 1;
    }

    set stoned(value) {
        this._stoned = Boolean(value);
    }

    get stoned() {
        return this._stoned;
    }

    set attackDistance(distance) {
        if (distance < 1) {
            throw new Error(this.errorRepo.translate(1015));
        }
        this._distance = distance;
    }

    get attackDistance() {
        return this._distance;
    }

    _getDistanceModifier(distance) {
        const modifier = 1 - (distance - 1) * 0.1;
        return Math.max(modifier, 0.6);
    }

    _applyStonedEffect(baseAttack, distance) {
        if (!this._stoned) {
            return baseAttack;
        }
        const stonedPenalty = Math.log2(distance) * 5;
        return baseAttack - stonedPenalty;
    }

    get attack() {
        if (this._attack === undefined) {
            return 0;
        }

        const distanceModifier = this._getDistanceModifier(this._distance);
        let effectiveAttack = this._attack * distanceModifier;

        effectiveAttack = this._applyStonedEffect(effectiveAttack, this._distance);

        return Math.max(Math.round(effectiveAttack), 0);
    }

    set attack(value) {
        if (value < 0) {
            throw new Error(this.errorRepo.translate(1016));
        }
        this._attack = value;
    }
};