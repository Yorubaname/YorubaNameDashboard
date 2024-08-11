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
  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "auth/create",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToPageList,
  });
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
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter username" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Please enter email" />
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
