import { Button, Upload, UploadFile } from "antd";
import { useCallback, useState } from "react";
import { CloudFilled } from "@ant-design/icons";

import styles from "@/styles/Home.module.scss";

import * as Api from "@/api";

export const UploadButton = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onUploadSuccess = useCallback(async () => {
    try {
    } catch (error) {}
  }, []);

  return (
    <Upload className={styles.upload}>
      <Button type="primary" icon={<CloudFilled />} size="large">
        Upload
      </Button>
    </Upload>
  );
};
