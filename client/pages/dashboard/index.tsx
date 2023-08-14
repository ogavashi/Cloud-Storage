import axios from "@/core/axios";
import { GetServerSidePropsContext, NextPage } from "next";
import nookies from "nookies";
import * as Api from "@/api";
import * as utils from "@/utils";

const DashboardPage: NextPage = () => {
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await utils.checkAuth(ctx);

  return authProps;
};

export default DashboardPage;
