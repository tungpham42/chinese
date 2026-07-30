// src/components/IMEMain.tsx
import React, { useState, useMemo, useCallback } from "react";
import { Space, Button, message, Tooltip } from "antd";
import { ClearOutlined, CopyOutlined } from "@ant-design/icons";
import PinyinInput from "./PinyinInput";
import CandidatePanel from "./CandidatePanel";
import OutputArea from "./OutputArea";
import { CharEntry } from "../dictionary";

export interface SyllableToken {
  base: string;
  tone?: number;
  raw: string;
}

const IMEMain: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedChars, setSelectedChars] = useState<(CharEntry | null)[]>([]);

  const tokens: SyllableToken[] = useMemo(() => {
    if (!inputValue.trim()) return [];
    return inputValue
      .trim()
      .split(/\s+/)
      .map((token) => {
        const match = token.match(/^([a-zA-Z]+)([1-5])?$/);
        if (!match)
          return { base: token.toLowerCase(), tone: undefined, raw: token };
        return {
          base: match[1].toLowerCase(),
          tone: match[2] ? parseInt(match[2]) : undefined,
          raw: token,
        };
      });
  }, [inputValue]);

  React.useEffect(() => {
    setSelectedChars((prev) => {
      if (prev.length === tokens.length) return prev;
      if (prev.length < tokens.length) {
        return [...prev, ...Array(tokens.length - prev.length).fill(null)];
      }
      return prev.slice(0, tokens.length);
    });
  }, [tokens.length]);

  const composedText = useMemo(() => {
    return tokens.map((_, idx) => selectedChars[idx]?.char ?? "_").join("");
  }, [tokens, selectedChars]);

  const handleSelect = useCallback(
    (syllableIndex: number, entry: CharEntry) => {
      setSelectedChars((prev) => {
        const next = [...prev];
        next[syllableIndex] = entry;
        return next;
      });
    },
    [],
  );

  const handleClear = () => {
    setInputValue("");
    setSelectedChars([]);
  };

  const copyToClipboard = async () => {
    if (!composedText || composedText.includes("_")) {
      message.warning("请先完成所有音节的选择哦");
      return;
    }
    try {
      await navigator.clipboard.writeText(composedText);
      message.success("已复制到剪贴板！");
    } catch {
      message.error("复制失败，请手动复制");
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <PinyinInput value={inputValue} onChange={setInputValue} />

      {tokens.length > 0 && (
        <div
          className="candidate-section"
          style={{ animation: "fadeInUp 0.4s ease" }}
        >
          <CandidatePanel
            tokens={tokens}
            selectedChars={selectedChars}
            onSelect={handleSelect}
          />
        </div>
      )}

      <OutputArea text={composedText} />

      <Space size="middle" style={{ width: "100%", justifyContent: "center" }}>
        <Tooltip title="清空所有内容">
          <Button
            icon={<ClearOutlined />}
            onClick={handleClear}
            size="large"
            shape="round"
            style={{
              background: "#fff",
              borderColor: "#ff9a9e",
              color: "#ff9a9e",
              fontWeight: 600,
              minWidth: 100,
            }}
          >
            清空
          </Button>
        </Tooltip>
        <Tooltip title="复制生成的中文文本">
          <Button
            icon={<CopyOutlined />}
            onClick={copyToClipboard}
            size="large"
            shape="round"
            type="primary"
            style={{
              background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
              border: "none",
              fontWeight: 600,
              minWidth: 100,
              boxShadow: "0 4px 12px rgba(255, 138, 128, 0.4)",
            }}
          >
            复制文本
          </Button>
        </Tooltip>
      </Space>
    </Space>
  );
};

export default IMEMain;
