import React from "react";
import styles from "./TrashFileActions.module.scss";
import { Button, Popconfirm, Popover, Typography } from "antd";

type TrashFileActionsProps = {
  onClickDelete: VoidFunction;
  onClickDeleteAll: VoidFunction;
  onClickRestore: VoidFunction;
  onClickRestoreAll: VoidFunction;
  isActive: boolean;
  isLoading: boolean;
};

export const TrashFileActions: React.FC<TrashFileActionsProps> = ({
  onClickDelete,
  onClickDeleteAll,
  onClickRestore,
  onClickRestoreAll,
  isActive,
  isLoading,
}) => {
  return (
    <div className={styles.root}>
      <div>
        <Popconfirm
          title="Restore file(s) ?"
          description="All files will be restored."
          okText="Yes"
          cancelText="No"
          disabled={!isActive}
          onConfirm={onClickRestore}
        >
          <Button disabled={!isActive} loading={isLoading} type="primary">
            Restore
          </Button>
        </Popconfirm>

        <Popconfirm
          title="Delete file(s) ?"
          description="All files will be completely removed. You can't undo this action."
          okText="Yes"
          cancelText="No"
          disabled={!isActive}
          onConfirm={onClickDelete}
        >
          <Button disabled={!isActive} type="primary" danger loading={isLoading}>
            Delete
          </Button>
        </Popconfirm>
      </div>
      <div>
        <Popover
          arrow={false}
          placement="bottom"
          content={
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Button type="primary" loading={isLoading} onClick={onClickRestoreAll}>
                Restore All
              </Button>
              <Button type="primary" danger loading={isLoading} onClick={onClickDeleteAll}>
                Delete All
              </Button>
            </div>
          }
        >
          <Typography>
            <Button type="link">Actions</Button>
          </Typography>
        </Popover>
      </div>
    </div>
  );
};
