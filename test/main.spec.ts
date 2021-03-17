import { Sushiro } from '../src/main';

describe("Test main function", () => {
    const sushiro = new Sushiro();
    it('Test sushiro.all()', async () => {
        expect(await sushiro.all().then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
    });
    it('Test sushiro.random()', async () => {
        expect(await sushiro.random().then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
        expect(await sushiro.random(5).then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
        expect(await sushiro.random(50000).catch((): string => {
            return 'Error';
        })).toBe('Error');
    });
    it('Test sushiro.price()', async () => {
        expect(await sushiro.price().then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
        expect(await sushiro.price('〆').then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
        expect(await sushiro.price('nciwuhi').catch((): string => {
            return 'Error';
        })).toBe('Error');
    });
    it('Test sushiro.calorie()', async () => {
        expect(await sushiro.calorie().then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
        expect(await sushiro.calorie('〆').then((menu: string): number => {
            return menu.split('\n').length;
        })).toBeGreaterThan(0);
        expect(await sushiro.calorie('nciwuhi').catch((): string => {
            return 'Error';
        })).toBe('Error');
    });
})