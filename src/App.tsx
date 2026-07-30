import React from "react";
import { Layout, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import IMEMain from "./components/IMEMain";
import "./App.css";

const { Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <Layout className="app-layout">
        <div className="app-header">
          <Title
            level={2}
            style={{ color: "#fff", margin: 0, fontWeight: 700 }}
          >
            <HeartOutlined style={{ marginRight: 12 }} />
            中文输入法{" "}
            <span style={{ fontSize: "0.7em", fontWeight: 400 }}>
              Pinyin IME
            </span>
          </Title>
        </div>
        <Content className="app-content">
          <IMEMain />
        </Content>
      </Layout>
    </div>
  );
};

export default App;
