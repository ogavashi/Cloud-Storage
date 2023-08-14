import { LoginForm, RegisterForm } from "@/components/auth";
import { Tabs } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useMemo, useState } from "react";

const AuthPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const tabs = useMemo(
    () => [
      { key: "1", label: "Login", children: <LoginForm /> },
      {
        key: "2",
        label: "Register",
        children: <RegisterForm />,
      },
    ],
    []
  );

  const currentTitle = useMemo(
    () => tabs.find(({ key }) => activeTab === key)?.label || "Authorization",
    [activeTab]
  );

  return (
    <>
      <Head>
        <title>{currentTitle}</title>
      </Head>
      <main style={{ width: 400, margin: "50px auto" }}>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabs} />
      </main>
    </>
  );
};

export default AuthPage;
