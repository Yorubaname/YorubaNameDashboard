import { HttpError, useGo, useMany } from "@refinedev/core";
import { formatDate } from "../../utils/dateformater";
import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
  CreateButton,
} from "@refinedev/antd";

import { Table, Space, Breadcrumb } from "antd";

import type { INameEntries, ICategory } from "../../interfaces";

export const NamesList = ({ children }: React.PropsWithChildren) => {
  const { tableProps } = useTable<INameEntries>({
    resource: "names",
    pagination: { mode: "server", current: 1, pageSize: 10 },

    syncWithLocation: true,
  });
  const go = useGo();
  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => go({ to: { resource: "names", action: "create" } })}
          ></CreateButton>
        )}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="name" title="Name" />
          <Table.Column dataIndex="syllables" title="Syllables" />
          <Table.Column
            title="Geolocation"
            render={(record) => record.geoLocation?.[0]?.place ?? "N/A"}
          />
          <Table.Column dataIndex="state" title="Status" />
          <Table.Column dataIndex="submittedBy" title="SubmittedBy" />
          <Table.Column
            render={(record) => formatDate(record.createdAt)}
            title="Created"
          />
          <Table.Column
            render={(record) => formatDate(record.updatedAt)}
            title="Edited"
          />
          <Table.Column<INameEntries>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.name} />
                <ShowButton hideText size="small" recordItemId={record.name} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
