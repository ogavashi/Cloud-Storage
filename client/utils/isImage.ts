import { Extension } from "./getColorByExtension";

export const isImage = (ext: Extension) => ["jpg", "png", "jpeg", "gif", "webp"].includes(ext);
