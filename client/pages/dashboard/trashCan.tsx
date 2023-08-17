import { GetServerSidePropsContext } from "next";
import * as utils from "@/utils";
import { Layout } from "@/layouts/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { FileItem } from "@/api/dto/files.dto";
import { FileList } from "@/components/FileList";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import * as Api from "@/api";
import { Files } from "@/modules/Files";

type DashboardTrashCanProps = {
  items: FileItem[];
};

const DashboardTrashCan: NextPageWithLayout<DashboardTrashCanProps> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} isTrashCan withActions />
    </DashboardLayout>
  );
};

DashboardTrashCan.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Trash can">{page} </Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await utils.checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("trash");

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

export default DashboardTrashCan;
