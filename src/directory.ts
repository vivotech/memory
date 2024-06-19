export interface Directory {
  type: "directory" | "file" | "unknown";
  path: string;
  name: string;
}
