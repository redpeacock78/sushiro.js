import * as menu from './generate/generate';

export class Sushiro {
    public all = async () => {
        const all_menu: string[][] = await menu();
        return all_menu.map((i: string[]): string => {
            return i[0];
        }).join('\n');
    };
    public random = async (random_num?: number): Promise<string> => {
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
    public price = async (search_word?: string) => {
        const all_menu: string[][] = await menu();
        const title: string[] = all_menu.map((i: string[]): string => {
            return i[0];
        });
        const price: string[] = all_menu.map((i: string[]): string => {
            return i[1];
        });
        if (search_word) {
            const search_tit: number[] = [];
            for (let i = 0; i < title.length; i++) {
                if (title[i].indexOf(search_word) !== -1) {
                    search_tit[i] = i
                }
            }
            const nums: number[] = search_tit.filter(Boolean);
            if (nums.length !== 0) {
                const result: string[][] = [];
                for (let i = 0; i < nums.length; i++) {
                    result[i] = [title[nums[i]], price[nums[i]]];
                }
                return result.join('\n').replace(/,/g, ' ');
            } else {
                throw new Error('Error');
            }
        } else {
            const result: string[][] = [];
            for (let i = 0; i < title.length; i++) {
                result[i] = [title[i], price[i]];
            };
            return result.join('\n').replace(/,/g, ' ');
        }
    };
    public calorie = async (search_word?: string) => {
        const all_menu: string[][] = await menu();
        const title: string[] = all_menu.map((i: string[]): string => {
            return i[0];
        });
        const calorie: string[] = all_menu.map((i: string[]): string => {
            return i[2];
        });
        if (search_word) {
            const search_tit: number[] = [];
            for (let i = 0; i < title.length; i++) {
                title[i].indexOf(search_word) !== -1 ? search_tit[i] = i : "";
            }
            const nums: number[] = search_tit.filter(Boolean);
            if (nums.length !== 0) {
                const result: string[][] = [];
                for (let i = 0; i < nums.length; i++) {
                    result[i] = [title[nums[i]], calorie[nums[i]]];
                }
                return result.join('\n').replace(/,/g, ' ');
            } else {
                throw new Error('Error');
            }
        } else {
            const result: string[][] = [];
            for (let i = 0; i < title.length; i++) {
                result[i] = [title[i], calorie[i]];
            };
            return result.join('\n').replace(/,/g, ' ');
        }
    };
}