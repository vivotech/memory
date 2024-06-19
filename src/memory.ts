import { out } from "@vivotech/out";
import { Artery } from "@vivotech/artery";
import { readdir, stat } from "fs/promises";

export class Memory extends Artery {
  async readDirectory(path: string) {
    const dir = await readdir(path);

    return dir;
  }

  constructor() {
    super({
      statics: [],
    });

    this.get("/directory", async (params, query) => {
      const path =
        (query.path ? query.path.toString() : params.path) || "/home";

      out(path);

      const list = await this.readDirectory(path);
      return await Promise.all(
        list.map((name) =>
          stat(`${path}/${name}`)
            .then((stat) => {
              const type = stat.isDirectory()
                ? "directory"
                : stat.isFile()
                ? "file"
                : "unknown";

              return { name, type, path: `${path}/${name}` };
            })
            .catch(() => ({ name, type: "unknown", path: `${path}/${name}` }))
        )
      );
    });
  }
}
