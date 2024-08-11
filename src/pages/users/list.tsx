import { useGo, useMany } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  CreateButton,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import type { IUser } from "../../interfaces";
import React from "react";

export const UserList = ({ children }: React.PropsWithChildren) => {
  const { tableProps } = useTable<IUser>({ resource: "auth/users" });
  const go = useGo();
  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() =>
              go({
                to: { resource: "users", action: "create" },
              })
            }
          ></CreateButton>
        )}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="email" title="Email" />
          <Table.Column dataIndex="username" title="Username" />

          <Table.Column<IUser>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.email} />
                <ShowButton hideText size="small" recordItemId={record.email} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
