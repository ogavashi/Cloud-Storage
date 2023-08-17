import { FileItem } from "@/api/dto/files.dto";
import { FileActions } from "@/components/FileActions";
import { FileList } from "@/components/FileList";
import { Empty } from "antd";

import { TrashFileActions } from "@/components/TrashFileActions";
import { useFiles } from "@/hooks/useFiles";

type FilesProps = {
  items: FileItem[];
  withActions?: boolean;
  isTrashCan?: boolean;
};

export const Files: React.FC<FilesProps> = ({ items, withActions, isTrashCan = false }) => {
  const {
    files,
    isLoading,
    selectedIds,
    handleDelete,
    handleDeleteAll,
    handleRemoveAll,
    handleRemove,
    handleRestore,
    handleRestoreAll,
    handleSelect,
    handleDownloadFile,
  } = useFiles(items);

  const Actions: React.FC = () => {
    const commonProps = {
      isLoading,
    };

    return isTrashCan ? (
      <TrashFileActions
        {...commonProps}
        onClickDelete={handleDelete}
        onClickDeleteAll={handleDeleteAll}
        onClickRestore={handleRestore}
        onClickRestoreAll={handleRestoreAll}
        isActive={!!selectedIds.length}
      />
    ) : (
      <FileActions
        {...commonProps}
        onClickRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        selectedAmount={selectedIds.length}
        onDownloadFile={handleDownloadFile}
      />
    );
  };

  return (
    <div>
      {files.length ? (
        <>
          {withActions && <Actions />}
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
