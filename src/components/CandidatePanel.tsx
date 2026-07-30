import React from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { WarningOutlined, EditOutlined } from "@ant-design/icons";
import { getCandidates, CharEntry } from "../dictionary";
import { SyllableToken } from "./IMEMain";

const { Text } = Typography;

interface Props {
  tokens: SyllableToken[];
  selectedChars: (CharEntry | null)[];
  onSelect: (syllableIndex: number, entry: CharEntry) => void;
}

const CandidatePanel: React.FC<Props> = ({
  tokens,
  selectedChars,
  onSelect,
}) => {
  return (
    <div>
      {tokens.map((token, idx) => {
        const candidates = getCandidates(token.base, token.tone);
        if (candidates.length === 0) {
          return (
            <Card
              key={idx}
              size="small"
              style={{
                marginBottom: 12,
                borderRadius: 16,
                border: "1px solid #ffccd5",
                background: "#fff5f5",
              }}
            >
              <WarningOutlined style={{ color: "#faad14", marginRight: 8 }} />
              <Text type="warning">找不到 "{token.raw}" 的候选字</Text>
            </Card>
          );
        }
        return (
          <Card
            key={idx}
            size="small"
            title={
              <Text strong style={{ fontSize: 16, color: "#d6336c" }}>
                <EditOutlined style={{ marginRight: 8 }} />
                {token.raw}
              </Text>
            }
            style={{
              marginBottom: 12,
              borderRadius: 16,
              border: "1px solid #ffccd5",
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(255, 182, 193, 0.15)",
            }}
          >
            <Row gutter={[10, 10]}>
              {candidates.map((entry, cIdx) => {
                const isSelected =
                  selectedChars[idx]?.char === entry.char &&
                  selectedChars[idx]?.tone === entry.tone;
                return (
                  <Col key={cIdx}>
                    <Button
                      type={isSelected ? "primary" : "default"}
                      shape="round"
                      size="large"
                      onClick={() => onSelect(idx, entry)}
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        background: isSelected
                          ? "linear-gradient(45deg, #ff9a9e, #fad0c4)"
                          : "#fff",
                        borderColor: isSelected ? "transparent" : "#ffd6d6",
                        color: isSelected ? "#fff" : "#d6336c",
                        boxShadow: isSelected
                          ? "0 4px 12px rgba(255, 138, 128, 0.5)"
                          : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {entry.char}
                      <sup style={{ fontSize: "0.7em", marginLeft: 4 }}>
                        {entry.tone}
                      </sup>
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </Card>
        );
      })}
    </div>
  );
};

export default CandidatePanel;
