import { Extension } from "./getColorByExtension";

export const getExtension = (fileName: string) => fileName.split(".").pop() as Extension;
