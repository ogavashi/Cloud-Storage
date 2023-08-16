import { useMemo } from "react";
import styles from "./FileCard.module.scss";

import * as utils from "@/utils";
import { FileTextFilled } from "@ant-design/icons";

type FileCardProps = {
  fileName: string;
  originalName: string;
};

export const FileCard: React.FC<FileCardProps> = ({ fileName, originalName }) => {
  const ext = useMemo(() => utils.getExtension(fileName), [utils.getExtension]);
  const imageUrl = useMemo(
    () => (ext && utils.isImage(ext) ? "http://localhost:7777/uploads/" + fileName : ""),
    [utils.isImage(ext), fileName]
  );
  const color = useMemo(() => utils.getColorByExtension(ext), []);
  const colorClass = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={colorClass}>{ext}</i>
        {utils.isImage(ext) ? (
          <img className={styles.image} src={imageUrl} alt="File" />
        ) : (
          <FileTextFilled />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};
