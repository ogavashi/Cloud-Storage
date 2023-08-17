import { Button, Upload, UploadFile, notification } from "antd";
import { useCallback, useState } from "react";
import { CloudFilled } from "@ant-design/icons";

import styles from "@/styles/Home.module.scss";

import * as Api from "@/api";
import { useRouter } from "next/router";

export const UploadButton = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const router = useRouter();

  const onUploadSuccess = useCallback(async (options: any) => {
    try {
      await Api.files.uploadFile(options);

      setFileList([]);
      router.reload();
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Failed to upload file.",
          description: error.message,
        });
      }
    }
  }, []);

  return (
    <Upload
      className={styles.upload}
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button type="primary" icon={<CloudFilled />} size="large">
        Upload
      </Button>
    </Upload>
  );
};
