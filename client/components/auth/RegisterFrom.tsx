import React, { useCallback, useState } from "react";
import styles from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { LoginFormDTO, RegisterFormDTO } from "@/api/dto/auth.dto";

import { setCookie } from "nookies";
import * as Api from "@/api";
import { ParsedError, RegisterErrors } from "@/types";
import { useRouter } from "next/router";

export const RegisterForm: React.FC = () => {
  const [serverError, setServerErrors] = useState<null | RegisterErrors>(null);

  const router = useRouter();

  const onSubmit = useCallback(async (values: RegisterFormDTO & { confirm: string }) => {
    try {
      const { confirm, ...rest } = values;

      const { token } = await Api.auth.register(rest);

      notification.success({
        message: "Successfully registered",
        description: "Going to your storage...",
      });

      setCookie(null, "_token", token, { path: "/" });

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Registration failed",
          description: error.message,
        });

        return;
      }

      setServerErrors(error as RegisterErrors);
    }
  }, []);

  return (
    <div className={styles.formBlock}>
      <Form name="register" layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name={"email"}
          label={"E-mail"}
          validateStatus={serverError?.email && "error"}
          help={serverError?.email}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"fullName"}
          label={"Full name"}
          validateStatus={serverError?.fullName && "error"}
          help={serverError?.fullName}
          rules={[{ required: true, message: "Enter your full name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"password"}
          label={"Password"}
          validateStatus={serverError?.password && "error"}
          help={serverError?.password}
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
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
