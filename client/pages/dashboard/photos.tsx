import { GetServerSidePropsContext } from "next";
import * as utils from "@/utils";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import * as Api from "@/api";
import { Files } from "@/modules/Files";

type DashboardPhotosProps = {
  items: FileItem[];
};

const DashboardPhotos: NextPageWithLayout<DashboardPhotosProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Photos">{page} </Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await utils.checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("photos");

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

export default DashboardPhotos;
