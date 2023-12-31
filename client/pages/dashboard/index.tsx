import { GetServerSidePropsContext } from "next";
import * as utils from "@/utils";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import * as Api from "@/api";
import { Files } from "@/modules/Files";

type DashboardPageProps = {
  items: FileItem[];
};

const DashboardPage: NextPageWithLayout<DashboardPageProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard">{page} </Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await utils.checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll();

    return {
      props: {
        items,
      },
    };
  } catch (error) {
    return {
      props: {
        items: [],
      },
    };
  }
};

export default DashboardPage;
