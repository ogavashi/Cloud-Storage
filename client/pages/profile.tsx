import React, { useCallback } from "react";
import PropTypes from "prop-types";

import styles from "@/styles/Profile.module.scss";
import { Button, Divider, Typography } from "antd";
import { Layout } from "@/layouts/Layout";
import { FileTextOutlined, MailOutlined, NumberOutlined, ProfileOutlined } from "@ant-design/icons";
import { ProfileRow } from "@/components/ProfileRow";
import { GetServerSidePropsContext, NextPage } from "next";

import * as utils from "@/utils";
import * as Api from "@/api";
import { User } from "@/api/dto/auth.dto";
import { NextPageWithLayout } from "./_app";

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const handleLogout = useCallback(() => {
    Api.auth.logout();
    location.href = "/";
  }, [Api]);

  return (
    <main>
      <div className={styles.root}>
        <Typography.Title style={{ margin: 0 }}>My profile</Typography.Title>

        <Divider />

        <ProfileRow leftText="ID" rightText={`#${userData.id}`} Icon={NumberOutlined} />
        <ProfileRow leftText="Full name" rightText={userData.fullName} Icon={FileTextOutlined} />
        <ProfileRow leftText="E-mail" rightText={userData.email} Icon={MailOutlined} />

        <Divider />

        <Button onClick={handleLogout} type="primary" danger>
          Logout
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await utils.checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
