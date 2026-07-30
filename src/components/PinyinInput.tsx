import React from "react";
import { Input } from "antd";
import { SmileOutlined } from "@ant-design/icons";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const PinyinInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Input
      size="large"
      placeholder='试试输入 "ni3 hao shi4 jie4" （用空格分开拼音）'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      prefix={<SmileOutlined style={{ color: "#ff9a9e" }} />}
      style={{
        borderRadius: 16,
        padding: "12px 20px",
        fontSize: 16,
        border: "2px solid #ffccd5",
        boxShadow: "0 4px 12px rgba(255, 182, 193, 0.2)",
        transition: "all 0.3s",
      }}
    />
  );
};

export default PinyinInput;
