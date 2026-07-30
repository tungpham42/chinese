import React from "react";
import { Input, Typography, Row, Col } from "antd";
import { HighlightOutlined, SmileOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Props {
  text: string;
}

const OutputArea: React.FC<Props> = ({ text }) => {
  const hasText = text.trim().length > 0 && !text.includes("_");
  return (
    <div
      style={{
        background: "#fff0f3",
        borderRadius: 20,
        padding: 20,
        marginTop: 8,
      }}
    >
      <Row align="middle" gutter={8} style={{ marginBottom: 8 }}>
        <Col>
          <Text strong style={{ fontSize: 16, color: "#d6336c" }}>
            <HighlightOutlined style={{ marginRight: 8 }} />
            生成的文字
          </Text>
        </Col>
        {hasText && (
          <Col>
            <SmileOutlined style={{ color: "#ff9a9e", fontSize: 20 }} />
          </Col>
        )}
      </Row>
      <Input.TextArea
        value={text}
        readOnly
        rows={3}
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "#333",
          borderRadius: 16,
          border: "1px dashed #ffccd5",
          background: "#fff",
          padding: 12,
          resize: "none",
        }}
      />
    </div>
  );
};

export default OutputArea;
