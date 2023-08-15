import axios from "@/core/axios";
import { FileItem } from "./dto/files.dto";

type FileType = "all" | "photos" | "trash";

export const getAll = async (type: FileType = "all"): Promise<FileItem[]> => {
  return (await axios.get("/files?type=" + type)).data;
};
