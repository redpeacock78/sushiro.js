import { Sushiro } from './main';
import { Command } from 'commander';
const packageJson = require("../package.json");

const command = new Command();
command
    .name('sushiro-js')
    .description(packageJson.description)
    .option(
        "-r [number]",
        "Randomly display the number of specified menus (By default it display one item)"
    )
    .option(
        "-p [menu_name]",
        "Display price of menu corresponding to name (If not specified,all menus and prices will be displayed)"
    )
    .option(
        "-k [menu_name]",
        "Display the calorie of the name corresponding menu (If not specified,all menus and prices will be displayed)"
    )
    .option(
        "-a",
        "Display names of all menus (158 species in total)"
    )
    .version(`sushiro.js version ${packageJson.version}`, "-v, --version", "Output the version number")
    .parse(process.argv);

const options = command.opts();
const sushiro = new Sushiro();
(async (): Promise<void> => {
    if (options.a) {
        console.log(await sushiro.all());
    } else if (options.r) {
        const num: number = options.r !== true ? options.r : "";
        await sushiro.random(num).then((value: string): void => {
            console.log(value);
        }).catch((): void => {
            process.on("exit", (): void => {
                console.error('sushiro-js: missing operand');
                console.error("Try 'sushiro-js -h' for more information.");
                process.exit(1);
            });
        });
    } else if (options.p) {
        const price: string = options.p !== true ? options.p : "";
        await sushiro.price(price).then((value: string): void => {
            console.log(value);
        }).catch((): void => {
            process.on("exit", (): void => {
                console.error('sushiro-js: missing operand');
                console.error("Try 'sushiro-js -h' for more information.");
                process.exit(1);
            });
        });
    } else if (options.k) {
        const calorie: string = options.k !== true ? options.k : "";
        await sushiro.calorie(calorie).then((value: string): void => {
            console.log(value);
        }).catch((): void => {
            process.on("exit", (): void => {
                console.error('sushiro-js: missing operand');
                console.error("Try 'sushiro-js -h' for more information.");
                process.exit(1);
            });
        });
    } else {
        process.on("exit", (): void => {
            console.error('sushiro-js: missing operand');
            console.error("Try 'sushiro-js -h' for more information.");
            process.exit(1);
        });
    }
})();