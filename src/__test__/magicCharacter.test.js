import MagicCharacter from '../js/magicCharacter';
import Magician from '../js/magician';
import Daemon from '../js/daemon';
import ErrorRepository from '../js/errorRepository';

const checkAttackAtDistance = (char, distance, expectedAttack) => {
    char.attackDistance = distance;
    expect(char.attack).toBe(expectedAttack);
};

describe('MagicCharacter base class', () => {
    let magicChar;

    beforeEach(() => {
        magicChar = new MagicCharacter('Test', 'Magician');
        magicChar.attack = 100;
    });

    test('initializes properties correctly', () => {
        expect(magicChar.name).toBe('Test');
        expect(magicChar.type).toBe('Magician');
        expect(magicChar.health).toBe(100);
        expect(magicChar.level).toBe(1);
        expect(magicChar.stoned).toBe(false);
        expect(magicChar.attackDistance).toBe(1);
    });

    test('handles stoned state conversion', () => {
        const truthyValues = [1, 'true'];
        for (const value of truthyValues) {
            magicChar.stoned = value;
            expect(magicChar.stoned).toBeTruthy();
        }

        const falsyValues = ['', null, undefined];
        for (const value of falsyValues) {
            magicChar.stoned = value;
            expect(magicChar.stoned).toBeFalsy();
        }
    });

    test('validates attack distance', () => {
        expect(() => { magicChar.attackDistance = 0; }).toThrow('Distance must not be less than 1');
        expect(() => { magicChar.attackDistance = -1; }).toThrow('Distance must not be less than 1');
    });

    describe('_getDistanceModifier method', () => {
        test('should calculate correct distance modifiers', () => {
            expect(magicChar._getDistanceModifier(1)).toBeCloseTo(1.0);
            expect(magicChar._getDistanceModifier(2)).toBeCloseTo(0.9);
            expect(magicChar._getDistanceModifier(3)).toBeCloseTo(0.8);
            expect(magicChar._getDistanceModifier(4)).toBeCloseTo(0.7);
            expect(magicChar._getDistanceModifier(5)).toBeCloseTo(0.6);
            expect(magicChar._getDistanceModifier(6)).toBeCloseTo(0.6);
            expect(magicChar._getDistanceModifier(10)).toBeCloseTo(0.6);
        });
    });

    describe('attack property getter', () => {
        test('should return 0 when attack is not set', () => {
            const charWithoutAttack = new MagicCharacter('Test', 'Magician');
            expect(charWithoutAttack.attack).toBe(0);
        });

        test('should calculate attack with distance modifier only (not stoned)', () => {
            const baseAttack = 100;
            const expectedAttacks = [
                { distance: 1, expected: 100 },
                { distance: 2, expected: 90 },
                { distance: 3, expected: 80 },
                { distance: 4, expected: 70 },
                { distance: 5, expected: 60 },
                { distance: 6, expected: 60 },
            ];

            for (const { distance, expected } of expectedAttacks) {
                magicChar.attack = baseAttack;
                magicChar.stoned = false;
                magicChar.attackDistance = distance;

                expect(magicChar.attack).toBe(expected);
            }
        });
    });

    test('handles negative attacks gracefully', () => {
        magicChar.attack = 10;
        magicChar.stoned = true;
        magicChar.attackDistance = 5;
        expect(magicChar.attack).toBe(0);
    });
});

describe('Derived classes', () => {
    test('creates Magician correctly', () => {
        const magician = new Magician('Gandalf');
        expect(magician.type).toBe('Magician');
        expect(magician.attack).toBe(10);
        expect(magician.defence).toBe(40);
    });

    test('creates Daemon correctly', () => {
        const daemon = new Daemon('Balrog');
        expect(daemon.type).toBe('Daemon');
        expect(daemon.attack).toBe(10);
        expect(daemon.defence).toBe(40);
    });

    test('inherits from MagicCharacter', () => {
        const magician = new Magician('Gandalf');
        expect(magician instanceof MagicCharacter).toBe(true);

        const daemon = new Daemon('Balrog');
        expect(daemon instanceof MagicCharacter).toBe(true);
    });
});

describe('MagicCharacter attack property with ErrorRepository', () => {
    let magicChar;
    let errorRepo;

    beforeEach(() => {
        errorRepo = new ErrorRepository();
        magicChar = new MagicCharacter('Test', 'Magician');
    });

    test('returns zero when attack is not set', () => {
        const char = new MagicCharacter('Test', 'Magician');
        expect(char.attack).toBe(0);
    });

    test('sets attack value correctly', () => {
        magicChar.attack = 50;
        expect(magicChar._attack).toBe(50);

        magicChar.attack = 0;
        expect(magicChar._attack).toBe(0);

        magicChar.attack = 1000;
        expect(magicChar._attack).toBe(1000);
    });

    test('throws an error for negative attack using ErrorRepository', () => {
        expect(() => { magicChar.attack = -10; }).toThrow(errorRepo.translate(1016));
        expect(() => { magicChar.attack = -1; }).toThrow(errorRepo.translate(1016));
        expect(() => { magicChar.attack = -0.1; }).toThrow(errorRepo.translate(1016));
    });
});
