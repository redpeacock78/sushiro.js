# sushiro.js
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/redpeacock78/sushiro.js/blob/master/LICENSE)  [![npm version](https://badge.fury.io/js/sushiro.js.svg)](https://badge.fury.io/js/sushiro.js) [![Npm Publish](https://github.com/redpeacock78/sushiro.js/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/redpeacock78/sushiro.js/actions/workflows/npm-publish.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/1475f12e9437c19434ba/maintainability)](https://codeclimate.com/github/redpeacock78/sushiro.js/maintainability) [![codecov](https://codecov.io/gh/redpeacock78/sushiro.js/branch/master/graph/badge.svg?token=E0WE1464IN)](https://codecov.io/gh/redpeacock78/sushiro.js)  
🍣 A Node.js porting of [sushiro](https://github.com/redpeacock78/sushiro).🍣 

## 🛠 Usage
### 🖥 CLI
```console
$ yarn global add sushiro.js  # npm install -g sushiro.js

$ sushiro-js -h
Usage: sushiro-js [options]

Options:
  -r [number]     Randomly display the number of specified menus (By default it
                  display one item)
  -p [menu_name]  Display price of menu corresponding to name (If not
                  specified,all menus and prices will be displayed)
  -k [menu_name]  Display the calorie of the name corresponding menu (If not
                  specified,all menus and prices will be displayed)
  -a              Display names of all menus (158 species in total)
  -v, --version   Output the version number
  -h, --help      display help for command

$ sushiro-js -r
手巻き納豆

$ sushiro-js -r 5
魚のアラの赤だし
りんごジュース　国産100％果汁
きゅうり巻
焼き鯖
数の子松前漬け

$ sushiro-js -k 〆
大えび3貫盛り(活〆大えび・特大ジャンボ赤えび・大型生えび) 121kcal
〆真さば 115kcal
〆真さば(ごまネギ) 117kcal
〆いわし(ネギ・生姜) 101kcal
```
### 📄 Javascript
```javascript
import { Sushiro } from 'sushiro.js';

(async () => {
    const sushiro = new Sushiro();
    await sushiro.random(5).then((menu) => {
        console.log(menu);
    });
})();
/*
甘えび
きゅうり巻
抹茶とあんこの和パフェ
生たこ
特ネタ中とろ
*/
(async () => {
    const sushiro = new Sushiro();
    await sushiro.price('さば').then((menu) => {
        console.log(menu);
    });
})();
/*
〆真さば 100円+税
〆真さば(ごまネギ) 100円+税
*/
(async () => {
    const sushiro = new Sushiro();
    await sushiro.calorie('コーヒー').then((menu) => {
        console.log(menu);
    });
})();
/*
アイスコーヒー 砂糖なしの場合4kcal
ホットコーヒー 砂糖なしの場合7kcal
*/
```

## 🔗 API
### `sushiro.all(): Promise<string>`
Get the names of all menus that currently exist in "https://www.akindo-sushiro.co.jp".
```javascript
(async () => {
    const sushiro = new Sushiro();
    console.log(await sushiro.all());
})();
```
### `sushiro.random(random_num?: number): Promise<string>`
If a number is specified as an argument, the specified number of menu names will be returned randomly from the menu names currently available at "https://www.akindo-sushiro.co.jp".  
If no number is specified as an argument, it will randomly extract one of the menu names currently available at "https://www.akindo-sushiro.co.jp" and return it.  
If the number is greater than the number of menus currently available, an error message will be returned.
```javascript
(async () => {
    const sushiro = new Sushiro();
    console.log(await sushiro.random()); // No Argument
    console.log(await sushiro.random(20)); // When 20 is specified as an argument
    await sushiro.random(1000).catch(() => {
      console.error("There aren't that many menus!"); // Too many numbers in the argument
    })
})();
```
### `sushiro.price(search_word?: string): Promise<string>`
If a string is specified as the argument, it will return the names and prices of the menus that partially match the menu names currently available at "https://www.akindo-sushiro.co.jp".  
If no argument is specified, it will return the names and prices of all the menus currently available at "https://www.akindo-sushiro.co.jp".  
If there is no menu that matches the argument, it will return an error.
```javascript
(async () => {
    const sushiro = new Sushiro();
    console.log(await sushiro.price()); // No Argument
    console.log(await sushiro.price('えび')); // When "えび" is specified as an argument
    await sushiro.price('Github').catch(() => {
      console.error('There is no item with that name!'); // When the search result does not exist
    });
})();
```
### `sushiro.calorie(search_word?: string): Promise<string>`
If a string is specified as the argument, it will return the name and calorie (kcal) of the menu that partially matches the menu name currently available at "https://www.akindo-sushiro.co.jp".  
If no argument is specified, it will return the names and calories (kcal) of all the menus currently available at "https://www.akindo-sushiro.co.jp".  
If there is no menu that matches the argument, it will return an error.
```javascript
(async () => {
    const sushiro = new Sushiro();
    console.log(await sushiro.calorie()); // No Argument
    console.log(await sushiro.calorie('サーモン')); // When "サーモン" is specified as an argument
    await sushiro.calorie('Google').catch(() => {
      console.error('There is no item with that name!'); // When the search result does not exist
    });
})();
```

## 🍵 License
[MIT](https://github.com/redpeacock78/sushiro.js/blob/master/LICENSE)