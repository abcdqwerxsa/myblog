"use client";

import { useMemo, useState } from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
import {
  ReadingConfig,
  loadReadingConfig,
  saveReadingConfig,
} from "@/lib/pretext";
import { ReadingPanel } from "./ReadingPanel";

interface PretextRendererProps {
  content: string;
}

interface LineData {
  text: string;
  x: number;
  y: number;
  width: number;
}

interface BlockData {
  type: "drop-cap" | "paragraph";
  capChar?: string;
  lines: LineData[];
  height: number;
}

export function PretextRenderer({ content }: PretextRendererProps) {
  const [config, setConfig] = useState<ReadingConfig>(loadReadingConfig);

  const fontStr = `${config.fontSize}px ${config.fontFamily}`;
  const lineHeightPx = config.fontSize * config.lineHeight;

  const paragraphs = useMemo(
    () => content.split("\n\n").filter(Boolean),
    [content]
  );

  const layout = useMemo(() => {
    const blocks: BlockData[] = [];
    let currentY = 0;

    for (let i = 0; i < paragraphs.length; i++) {
      const para = paragraphs[i];

      if (i === 0 && para.length > 1) {
        // First paragraph: drop cap + body
        const capChar = para[0];
        const bodyText = para.slice(1).trimStart();

        const capFontSize = config.fontSize * 4;
        const capWidth = config.fontSize * 3;

        // Cap line
        const capLine: LineData = {
          text: capChar,
          x: 0,
          y: currentY,
          width: capWidth,
        };

        // Body text wrapping around cap
        const prepared = prepareWithSegments(bodyText, fontStr);
        const bodyWidth = config.maxWidth - capWidth - 12;
        const result = layoutWithLines(prepared, bodyWidth, lineHeightPx);

        const capLinesCount = Math.ceil(capFontSize / lineHeightPx);
        const bodyLines: LineData[] = result.lines.map((line, j) => ({
          text: line.text,
          x: j < capLinesCount ? capWidth + 12 : 0,
          y: currentY + j * lineHeightPx,
          width: line.width,
        }));

        const blockHeight = Math.max(capFontSize, bodyLines.length * lineHeightPx);
        blocks.push({
          type: "drop-cap",
          capChar,
          lines: [capLine, ...bodyLines],
          height: blockHeight,
        });
        currentY += blockHeight + lineHeightPx;
      } else {
        // Regular paragraph
        const prepared = prepareWithSegments(para, fontStr);
        const result = layoutWithLines(prepared, config.maxWidth, lineHeightPx);

        const lines: LineData[] = result.lines.map((line, j) => ({
          text: line.text,
          x: 0,
          y: currentY + j * lineHeightPx,
          width: line.width,
        }));

        const blockHeight = lines.length * lineHeightPx;
        blocks.push({ type: "paragraph", lines, height: blockHeight });
        currentY += blockHeight + lineHeightPx;
      }
    }

    return { blocks, totalHeight: currentY };
  }, [paragraphs, fontStr, lineHeightPx, config.maxWidth, config.fontSize]);

  const handleConfigChange = (next: ReadingConfig) => {
    setConfig(next);
    saveReadingConfig(next);
  };

  return (
    <div className="max-w-[960px] mx-auto">
      <ReadingPanel config={config} onConfigChange={handleConfigChange} />

      {/* Pretext rendered content */}
      <div
        className="mt-8"
        style={{
          position: "relative",
          width: config.maxWidth,
          height: Math.max(layout.totalHeight, 50),
          margin: "0 auto",
        }}
      >
        {layout.blocks.map((block, blockIdx) => (
          <div key={blockIdx}>
            {block.type === "drop-cap" && block.capChar ? (
              <>
                {/* Drop cap character */}
                <span
                  style={{
                    position: "absolute",
                    left: block.lines[0].x,
                    top: block.lines[0].y,
                    fontSize: `${config.fontSize * 4}px`,
                    fontWeight: 700,
                    fontFamily: `"Space Grotesk", ${config.fontFamily}`,
                    lineHeight: 1,
                  }}
                >
                  {block.capChar}
                </span>
                {/* Body lines */}
                {block.lines.slice(1).map((line, lineIdx) => (
                  <span
                    key={lineIdx}
                    style={{
                      position: "absolute",
                      left: line.x,
                      top: line.y,
                      fontSize: `${config.fontSize}px`,
                      lineHeight: `${config.lineHeight}`,
                      whiteSpace: "pre",
                    }}
                  >
                    {line.text}
                  </span>
                ))}
              </>
            ) : (
              <>
                {block.lines.map((line, lineIdx) => (
                  <span
                    key={lineIdx}
                    style={{
                      position: "absolute",
                      left: line.x,
                      top: line.y,
                      fontSize: `${config.fontSize}px`,
                      lineHeight: `${config.lineHeight}`,
                      whiteSpace: "pre",
                    }}
                  >
                    {line.text}
                  </span>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
