import { FileItem } from "@/api/dto/files.dto";
import { FileSelectType } from "@/components/FileList";
import { notification } from "antd";
import { useCallback, useState } from "react";

import * as Api from "@/api";

export const useFiles = (items: FileItem[]) => {
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
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [selectedIds]);

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      await Api.files.destroy(selectedIds);
      setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
      setSelectedIds([]);
      notification.success({
        message: "Successfully deleted files.",
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Error while deleting file(s).",
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedIds]);

  const handleRestore = useCallback(async () => {
    try {
      setIsLoading(true);
      await Api.files.restore(selectedIds);
      setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
      setSelectedIds([]);
      notification.success({
        message: "Successfully restored files.",
        description: "You can find them in your sections.",
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Error while restoring file(s).",
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedIds]);

  const handleRemoveAll = useCallback(async () => {
    const ids = files.map(({ id }) => id);
    try {
      setIsLoading(true);
      await Api.files.remove(ids);
      setFiles((prev) => prev.filter((file) => !ids.includes(file.id)));
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
    } finally {
      setIsLoading(false);
    }
  }, [selectedIds]);

  const handleDeleteAll = useCallback(async () => {
    const ids = files.map(({ id }) => id);
    try {
      setIsLoading(true);
      await Api.files.destroy(ids);
      setFiles((prev) => prev.filter((file) => !ids.includes(file.id)));
      notification.success({
        message: "Successfully deleted files.",
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Error while deleting file(s).",
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedIds]);

  const handleRestoreAll = useCallback(async () => {
    const ids = files.map(({ id }) => id);
    try {
      setIsLoading(true);
      await Api.files.restore(ids);
      setFiles((prev) => prev.filter((file) => !ids.includes(file.id)));
      notification.success({
        message: "Successfully restored files.",
        description: "You can find them in your sections.",
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Error while restoring file(s).",
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedIds]);

  const handleDownloadFile = useCallback(() => {
    const fileId = selectedIds.at(0);

    const file = files.find(({ id }) => id === fileId);

    if (!file) {
      return;
    }

    const fileName = file.filename;

    const url = "http://localhost:7777/uploads/" + fileName;

    const link = document.createElement("a");

    link.href = url;
    link.download = url;
    link.click();

    link.parentNode?.removeChild(link);
  }, [selectedIds]);

  return {
    files,
    isLoading,
    selectedIds,
    handleDelete,
    handleDeleteAll,
    handleRemove,
    handleRemoveAll,
    handleRestore,
    handleRestoreAll,
    handleSelect,
    handleDownloadFile,
  };
};
