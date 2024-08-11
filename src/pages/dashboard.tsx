import { BulbFilled } from "@ant-design/icons";
import { useGetIdentity, usePermissions } from "@refinedev/core";

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
              <Text style={fontStyle}>{/* {identity?.name} */}7</Text>
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
            <Text style={fontStyle}>7</Text>
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
            <Text style={fontStyle}>2</Text>
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
            <Text style={fontStyle}>1</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
