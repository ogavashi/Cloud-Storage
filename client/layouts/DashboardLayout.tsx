import React, { useCallback } from "react";

import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import { UploadButton } from "@/components/UploadButton";
import { Menu } from "antd";
import { DeleteFilled, FileFilled, FileImageFilled } from "@ant-design/icons";

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  const handleClick = useCallback(
    (key: string) => {
      router.push(key);
    },
    [router]
  );

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: "/dashboard",
              label: "Files",
              icon: <FileFilled />,
              onClick: () => handleClick("/dashboard"),
            },
            {
              key: "/dashboard/photos",
              label: "Photos",
              icon: <FileImageFilled />,
              onClick: () => handleClick("/dashboard/photos"),
            },
            {
              key: "/dashboard/trashCan",
              label: "Trash can",
              icon: <DeleteFilled />,
              onClick: () => handleClick("/dashboard/trashCan"),
            },
          ]}
        />
      </div>

      <div className="container">{children}</div>
    </main>
  );
};
