import { BulbFilled } from "@ant-design/icons";
import {
  HttpError,
  useGetIdentity,
  useList,
  usePermissions,
} from "@refinedev/core";

import { Row, Col, Card, Avatar, Typography, Space } from "antd";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
  const { data: identity } = useGetIdentity<{
    id: string;
    name: string;
    avatar: string;
  }>();
  const permissions = usePermissions<string[], { permissions: string[] }>({
    params: { permissions: ["admin"] },
  });

  const { data, isLoading, isError } = useList<
    {
      totalNames: number;
      totalNewNames: number;
      totalModifiedNames: number;
      totalPublishedNames: number;
    },
    HttpError
  >({
    resource: "names/meta",
  });

  const metaData = data?.data ?? [];
  console.log(`metadata is ${metaData}`);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const fontStyle = {
    fontSize: "100px",
    color: "whitesmoke",
    TextAlign: "center",
  };

  return (
    <div>
      <Row gutter={20}>
        <Col span={6}>
          <Card
            title={"Name Entries"}
            style={{
              height: "300px",
              borderRadius: "15px",
              backgroundColor: "#DA4453",
              color: "white",
            }}
            headStyle={{ textAlign: "left", color: "whitesmoke" }}
          >
            <Space align="center" direction="horizontal">
              {/* <Avatar size="large" src={identity?.avatar} /> */}
              <Text style={fontStyle}>{metaData.totalNames}</Text>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Published Entries"
            style={{
              height: "300px",
              borderRadius: "15px",
              backgroundColor: "#37BC9B",
            }}
            headStyle={{ textAlign: "left", color: "whitesmoke" }}
          >
            <Text style={fontStyle}>{metaData.totalPublishedNames}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Suggested Names"
            style={{
              height: "300px",
              borderRadius: "15px",
              backgroundColor: "#4A89DC",
            }}
            headStyle={{ textAlign: "left", color: "whitesmoke" }}
          >
            <Text style={fontStyle}>{metaData.totalModifiedNames}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Unpublished Names"
            style={{
              height: "300px",
              borderRadius: "15px",
              backgroundColor: "#F6BB42",
            }}
            headStyle={{ textAlign: "left", color: "whitesmoke" }}
          >
            <Text style={fontStyle}>{metaData.totalNewNames}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
