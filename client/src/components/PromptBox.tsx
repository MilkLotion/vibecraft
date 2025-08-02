import React, { useState } from "react";
import { Input, Button, message as antMessage } from "antd";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { InputType, ProcessStatus } from "@/types/session";
import { PromptBoxProcessMessage } from "@/message/prompt";

interface PromptBoxProps {
  connectionState?: string;
  inputType: InputType;
  processStatus: ProcessStatus;
  sendMessage: (message: string, userId?: string) => Promise<boolean>;
  placeholder?: string;
  disabled?: boolean;
  onTyping?: () => void;
  onStopTyping?: () => void;
}

const PromptBox = ({
  connectionState,
  inputType,
  processStatus,
  sendMessage,
  disabled = false,
  onTyping,
  onStopTyping,
}: PromptBoxProps) => {
  const [inputText, setInputText] = useState("");

  const isLoading =
    connectionState === "CREATING_THREAD" ||
    connectionState === "CONNECTING" ||
    connectionState === "RECONNECTING";

  const isInputDisabled = disabled || isLoading;

  const handleSubmit = async () => {
    const message = inputText.trim();
    if (!message || disabled || isLoading) return;

    // 타이핑 상태 정리
    onStopTyping?.();

    // 입력창 즉시 클리어
    setInputText("");

    try {
      console.log("📤 메시지 전송 시작:", message);

      // 서버로 직접 메시지 전송 (세션이 없어도 서버에서 생성)
      const success = await sendMessage(message);
      if (success) {
        console.log("✅ 메시지가 성공적으로 전송되었습니다.");
      } else {
        antMessage.error("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        setInputText(message);
      }
    } catch (error) {
      console.error("❌ 메시지 전송 오류:", error);
      antMessage.error("메시지 전송 중 오류가 발생했습니다.");
      setInputText(message);
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getPlaceholderTextForInput = () => {
    return disabled ? "" : PromptBoxProcessMessage[processStatus];
  };

  return (
    <div className="w-full">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl prompt-box-shadow p-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <Input.TextArea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                // 입력 시작 시 타이핑 상태 활성화
                if (e.target.value.length > 0 && !disabled) {
                  onTyping?.();
                }
              }}
              onKeyDown={handleKeyPress}
              onBlur={() => onStopTyping?.()}
              placeholder={getPlaceholderTextForInput()}
              disabled={isInputDisabled}
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="border-0 bg-transparent resize-none text-gray-700 placeholder-gray-400"
              style={{
                boxShadow: "none",
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            />
          </div>
          <div className="flex-shrink-0">
            <Button
              type="primary"
              icon={<Send className="w-4 h-4" />}
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!inputText.trim() || isInputDisabled}
              className="h-10 px-4 bg-gradient-to-r from-purple-500 to-blue-500 border-0 rounded-xl hover:from-purple-600 hover:to-blue-600"
            >
              전송
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBox;
