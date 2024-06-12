import { Artery } from "@vivotech/artery";
import { readdir } from "fs/promises";

export class Memory extends Artery {
  async readDirectory(path: string) {
    const dir = await readdir(path);

    return dir;
  }

  constructor() {
    super({
      statics: [],
    });

    this.get("/directory", async (params) => {
      return await this.readDirectory("/home/dev");
    });
  }
}
