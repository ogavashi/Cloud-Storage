import { FileItem } from "@/api/dto/files.dto";
import { FileActions } from "@/components/FileActions";
import { FileList, FileSelectType } from "@/components/FileList";
import { Empty, notification } from "antd";
import { useCallback, useState } from "react";

import * as Api from "@/api";

type FilesProps = {
  items: FileItem[];
  withActions?: boolean;
};

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = useState(items || []);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = useCallback(
    (id: number, type: FileSelectType) => {
      if (type === "select") {
        setSelectedIds((prev) => [...prev, id]);
      } else {
        setSelectedIds((prev) => prev.filter((_id) => _id !== id));
      }
    },
    [setSelectedIds]
  );

  const handleRemove = useCallback(async () => {
    try {
      await Api.files.remove(selectedIds);
      setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
      setSelectedIds([]);
      notification.success({
        message: "Successfully removed files.",
        description: "You can find them in trash can.",
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Error while removing file(s).",
          description: error.message,
        });
      }
    }
  }, [selectedIds]);

  const handleShare = useCallback(() => {
    alert("Not implemented");
  }, []);

  return (
    <div>
      {items.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={handleRemove}
              onClickShare={handleShare}
              isActive={!!selectedIds.length}
            />
          )}
          <FileList items={files} onFileSelect={handleSelect} />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "600px",
          }}
        >
          <Empty description="No files" />
        </div>
      )}
    </div>
  );
};
