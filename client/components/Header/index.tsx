import { Avatar, Button, Layout, Menu, Popover, Typography } from "antd";
import styles from "./Header.module.scss";
import { CloudOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Link from "next/link";

import * as Api from "@/api";

export const Header = () => {
  const router = useRouter();
  const selectedMenu = "/" + router.pathname.split("/").at(1);

  const navigate = useCallback(
    ({ key }: { key: string }) => {
      router.push(key);
    },
    [router]
  );

  const handleLogout = useCallback(() => {
    Api.auth.logout();
    location.href = "/dashboard/auth";
  }, [Api]);

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <Link href={"/dashboard"}>
            <Typography.Title level={3} style={{ color: "white", margin: 0 }}>
              <CloudOutlined style={{ marginRight: 10 }} />
              Cloud Storage
            </Typography.Title>
          </Link>
          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            selectedKeys={[selectedMenu]}
            onSelect={navigate}
            items={[
              { key: "/dashboard", label: "Dasboard" },
              { key: "/profile", label: "Profile" },
            ]}
          />
        </div>

        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Button type="primary" danger onClick={handleLogout}>
                Logout
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};
