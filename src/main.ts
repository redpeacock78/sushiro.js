import * as menu from './generate/generate';

export class Sushiro {
    _str: string
    public all: () => Promise<string> = async (): Promise<string> => {
        const all_menu: string[][] = await menu();
        return all_menu.map((i: string[]): string => {
            return i[0];
        }).join('\n');
    };
    public random: (random_num?: number) => Promise<string> = async (random_num?: number): Promise<string> => {
        const all_menu: string[][] = await menu();
        const title: string[] = all_menu.map((i: string[]): string => {
            return i[0];
        });
        const shuffle: ([...array]: string[]) => string[] = ([...array]: string[]): string[] => {
            for (let i: number = array.length - 1; i >= 0; i--) {
                const j: number = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        if (random_num) {
            if (all_menu.length < random_num) {
                throw new Error('Error');
            } else {
                return shuffle(title).slice(0, random_num).join('\n');
            }
        } else {
            return shuffle(title).slice(0, 1).join('\n');
        }
    };
    public price: (search_word?: string) => Promise<string> = async (search_word?: string): Promise<string> => {
        const all_menu: string[][] = await menu();
        const title: string[] = all_menu.map((i: string[]): string => {
            return i[0];
        });
        const price: string[] = all_menu.map((i: string[]): string => {
            return i[1];
        });
        if (search_word) {
            const nums: number[] = title.map((v: string, i: number): number => {
                if (v.indexOf(search_word) !== -1) {
                    return i;
                }
            }).filter(Boolean);
            if (nums.length) {
                const result: string[][] = nums.map((i: number): string[] => {
                    return [title[i], price[i]];
                });
                return result.join('\n').replace(/,/g, ' ');
            } else {
                throw new Error('Error');
            }
        } else {
            const result: string[][] = title.map((v: string, i: number): string[] => {
                return [v, price[i]];
            });
            return result.join('\n').replace(/,/g, ' ');
        }
    };
    public calorie: (search_word?: string) => Promise<string> = async (search_word?: string): Promise<string> => {
        const all_menu: string[][] = await menu();
        const title: string[] = all_menu.map((i: string[]): string => {
            return i[0];
        });
        const calorie: string[] = all_menu.map((i: string[]): string => {
            return i[2];
        });
        if (search_word) {
            const nums: number[] = title.map((v: string, i: number): number => {
                if (v.indexOf(search_word) !== -1) {
                    return i;
                }
            }).filter(Boolean);
            if (nums.length) {
                const result: string[][] = nums.map((i: number): string[] => {
                    return [title[i], calorie[i]];
                });
                return result.join('\n').replace(/,/g, ' ');
            } else {
                throw new Error('Error');
            }
        } else {
            const result: string[][] = title.map((v: string, i: number): string[] => {
                return [v, calorie[i]];
            });
            return result.join('\n').replace(/,/g, ' ');
        }
    };
}