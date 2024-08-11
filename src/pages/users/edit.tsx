import React from "react";

import { Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import type { IUser } from "../../interfaces";

export const UserEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IUser>({
    resource: "users",
  });
  const postData = queryResult?.data?.data;

  console.log(postData);
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Change Username"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
          valuePropName="test"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Priviledges"
          name="role"
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
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
