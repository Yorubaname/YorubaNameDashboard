import React from "react";

import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import type { IUser } from "../../interfaces";

export const UserEdit = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm<IUser>({
    //resource: "/auth/users/",
  });
  const record = queryResult?.data?.data;
  const handleOnFinish = (values: any) => {
    onFinish({
      username: `${values.username}`,
      email: `${values.email}`,
      password: `${values.password}`,
      updatedBy: `${localStorage.username}`,
      roles: [`${values.roles}`],
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
            { disabled: true },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Admin",
                value: "ADMIN",
              },
              {
                label: "Basic Lexicographer",
                value: "BASIC_LEXICOGRAPHER",
              },
              {
                label: "Pro Lexicographer",
                value: "PRO_LEXICOGRAPHER",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
