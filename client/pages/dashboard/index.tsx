import { GetServerSidePropsContext } from "next";
import * as utils from "@/utils";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";

import styles from "@/styles/Home.module.scss";

import { Button, Menu } from "antd";
import { useRouter } from "next/router";
import { DeleteFilled, FileFilled, FileImageFilled } from "@ant-design/icons";
import { useCallback } from "react";
import { UploadButton } from "@/components/UploadButton";

const DashboardPage: NextPageWithLayout = () => {
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
              key: "/dashboard/trash",
              label: "Trash can",
              icon: <DeleteFilled />,
              onClick: () => handleClick("/dashboard"),
            },
          ]}
        />
      </div>

      <div className="container">FILES</div>
    </main>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard">{page} </Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await utils.checkAuth(ctx);

  return authProps;
};

export default DashboardPage;
