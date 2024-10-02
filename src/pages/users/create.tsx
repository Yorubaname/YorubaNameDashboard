import React from "react";
import { UserList } from "./list";
import { Form, Input, Modal, Select } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";

export const UserCreate = () => {
  const go = useGo();
  const goToPageList = () => {
    go({
      to: { resource: "users", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };
  const { formProps, modalProps, onFinish } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "auth/create",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToPageList,
  });

  const handleOnFinish = (values: any) => {
    onFinish({
      username: `${values.username}`,
      email: `${values.email}`,
      password: `${values.password}`,
      createdBy: `${localStorage.username}`,

      roles: [`${values.roles}`],
    });
  };

  return (
    <UserList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToPageList}
        title="Create User"
        width={512}
        height={512}
      >
        <Form
          {...formProps}
          layout="vertical"
          onFinish={handleOnFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter username" autoComplete="false" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Please enter email" autoComplete="false" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              autoComplete="off"
              placeholder="Please enter email"
            />
          </Form.Item>

          <Form.Item
            label="Priviledges"
            name="roles"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Please select a role"
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
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    </UserList>
  );
};
