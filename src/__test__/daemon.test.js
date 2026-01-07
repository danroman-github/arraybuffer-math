import Daemon from '../js/daemon';

describe('Daemon class', () => {
    test('should create Daemon with correct stats', () => {
        const daemon = new Daemon('Демон');
    
        expect(daemon.name).toBe('Демон');
        expect(daemon.type).toBe('Daemon');
        expect(daemon.attack).toBe(10);
        expect(daemon.defence).toBe(40);
    });
});
