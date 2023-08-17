import React from "react";
import styles from "./FileActions.module.scss";
import { Button, Popconfirm } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

type FileActionsProps = {
  onClickRemove: VoidFunction;
  onRemoveAll: VoidFunction;
  onDownloadFile: VoidFunction;
  selectedAmount: number;
  isLoading: boolean;
};

export const FileActions: React.FC<FileActionsProps> = ({
  onClickRemove,
  onRemoveAll,
  onDownloadFile,
  selectedAmount,
  isLoading,
}) => {
  const isActive = !!selectedAmount;

  return (
    <div className={styles.root}>
      <div>
        <Button
          onClick={onDownloadFile}
          disabled={selectedAmount !== 1}
          loading={isLoading}
          icon={<DownloadOutlined />}
        >
          Download
        </Button>

        <Popconfirm
          title="Remove file(s) ?"
          description="All files will be moved to trah can"
          okText="Yes"
          cancelText="No"
          disabled={!isActive}
          onConfirm={onClickRemove}
        >
          <Button disabled={!isActive} type="primary" danger loading={isLoading}>
            Remove
          </Button>
        </Popconfirm>
      </div>
      <Button type="dashed" danger onClick={onRemoveAll}>
        Remove all
      </Button>
    </div>
  );
};
