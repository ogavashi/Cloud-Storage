import React, { useCallback } from "react";
import styles from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { LoginFormDTO } from "@/api/dto/auth.dto";

import { setCookie } from "nookies";
import * as Api from "@/api";

export const LoginForm: React.FC = () => {
  const onSubmit = useCallback(async (values: LoginFormDTO) => {
    try {
      const { token } = await Api.auth.login(values);

      notification.success({
        message: "Login successful",
        description: "Going to your storage...",
      });

      setCookie(null, "_token", token, { path: "/" });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Login failed",
          description: error.message,
        });
      }
    }
  }, []);

  return (
    <div className={styles.formBlock}>
      <Form name="login" labelCol={{ span: 8 }} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name={"email"}
          label={"E-mail"}
          rules={[
            { required: true, message: "Enter e-mail" },
            { type: "email", message: "Enter valid e-mail" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"password"}
          label={"Password"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
