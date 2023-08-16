import { FileItem } from "@/api/dto/files.dto";

import styles from "./FileList.module.scss";
import { FileCard } from "../FileCard";
import Selecto from "react-selecto";

export type FileSelectType = "select" | "unselect";

type FileListProps = {
  items: FileItem[];
  onFileSelect: (id: number, type: FileSelectType) => void;
};

export const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  return (
    <div className={styles.root}>
      {items.map(({ id, filename, originalName }) => (
        <div data-id={id} key={id} className="file">
          <FileCard fileName={filename} originalName={originalName} />
        </div>
      ))}
      <Selecto
        container=".files"
        selectableTargets={[".file"]}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("active");
            onFileSelect(Number(el.dataset["id"]), "select");
          });
          e.removed.forEach((el) => {
            el.classList.remove("active");
            onFileSelect(Number(el.dataset["id"]), "unselect");
          });
        }}
      />
    </div>
  );
};
