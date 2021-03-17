import axios, { AxiosResponse } from "axios";

const URL = "https://www.akindo-sushiro.co.jp/menu/";

interface get_menu {
  (URL: string): Promise<string[][]>;
}
const get_menu: get_menu = async (URL: string): Promise<string[][]> => {
  return await axios
    .get(URL)
    .then((resp: AxiosResponse<string>): string[][] => {
      const data_arr: string[] = resp.data.toString().split("\n");
      const reg_exp = new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/g);
      const title: string[] = [];
      data_arr.map((i: string): void => {
        if (i.match(/<p class="ttl">/)) {
          title.push(i.replace(reg_exp, ""));
        }
      });
      const price: string[] = [];
      data_arr.map((i: string): void => {
        if (i.match(/<p class="price">/)) {
          price.push(
            i.replace(reg_exp, "").replace(" + 税", "+税").replace(/ .*$/, "")
          );
        }
      });
      const calorie: string[] = [];
      data_arr.map((i: string): void => {
        if (i.match(/<p class="price">/)) {
          calorie.push(
            i
              .replace(reg_exp, "")
              .replace(" + 税", "+税")
              .replace("場合 ", "場合")
              .replace(/　/g, " ")
              .split(" ")[1]
          );
        }
      });
      const menu: string[][] = [];
      for (let i = 0; i < title.length; i++) {
        menu[i] = [title[i], price[i], calorie[i]];
      }
      return menu;
    });
};

const menu: () => Promise<string[][]> = async (): Promise<string[][]> => {
  return await get_menu(URL);
};

export = menu;
