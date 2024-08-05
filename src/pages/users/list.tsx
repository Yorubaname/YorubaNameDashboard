import { useMany } from "@refinedev/core";

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

export const UserList = () => {
  const { tableProps } = useTable<IUser>({ resource: "auth/users" });

  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
        // onClick={() => go({ to: { resource: "names", action: "edit" } })}
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
  );
};
