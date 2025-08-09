import { useState } from "react";
import { Card, Typography, Upload, Button, message as antMessage } from "antd";
import { Bot, Upload as UploadIcon, FileText } from "lucide-react";
const { Text } = Typography;

const Uploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  // 파일 업로드 핸들러
  const handleFileUpload = (info: any) => {
    const { fileList } = info;
    setUploadedFiles(fileList);
  };

  // 파일 업로드 전 검증
  const beforeUpload = (file: File) => {
    const allowedTypes = [".csv", ".sql", ".json", ".xlsx", ".xls", ".txt"];
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    if (!allowedTypes.includes(fileExtension)) {
      antMessage.error(
        `지원하지 않는 파일 형식입니다. (${allowedTypes.join(", ")}만 지원)`
      );
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      antMessage.error("파일 크기는 10MB를 초과할 수 없습니다.");
      return false;
    }

    return false; // 자동 업로드 방지
  };

  return (
    <div className="flex items-start space-x-3">
      {/* AI 아바타 */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="min-w-0 max-w-[75%] flex flex-col items-start">
        <div className="flex items-center space-x-2 mb-1">
          <Text strong className="text-sm text-green-700">
            AI
          </Text>
        </div>

        <Card
          size="small"
          className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200 shadow-sm inline-block"
          styles={{ body: { padding: "16px" } }}
        >
          <div className="space-y-4">
            <div className="text-gray-800">
              <p className="mb-3">
                📊 <strong>데이터 수집</strong>
              </p>
              <p className="text-sm text-gray-600 mb-3">
                분석할 데이터를 제공해주세요. 다음 중 하나의 방법을 선택하세요:
              </p>
              <div className="text-sm text-gray-600 mb-3 space-y-1">
                <p>
                  • <strong>요구사항 입력:</strong> 데이터 소스 URL 혹은 요청
                  사항을 입력해주세요
                </p>
                <p>
                  • <strong>파일 업로드:</strong> 데이터 파일 직접 업로드
                </p>
              </div>
            </div>

            <Upload.Dragger
              multiple
              beforeUpload={beforeUpload}
              onChange={handleFileUpload}
              fileList={uploadedFiles}
              className="bg-white/50 border-dashed border-gray-300 hover:border-green-400 transition-colors"
              style={{ minHeight: "90px" }}
            >
              <div className="py-3">
                <UploadIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1 font-medium">
                  데이터 파일 업로드
                </p>
                <p className="text-xs text-gray-500">
                  CSV, SQL, JSON, XLSX, XLS, TXT 파일을 드래그하거나 클릭 (최대
                  10MB)
                </p>
              </div>
            </Upload.Dragger>

            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  업로드된 파일:
                </p>
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">{file.name}</span>
                    <span className="text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ))}
                <Button
                  type="primary"
                  size="small"
                  className="mt-2"
                  onClick={() => {
                    // TODO: 파일 전송 로직 구현
                    antMessage.success("파일이 업로드되었습니다!");
                  }}
                >
                  파일 전송
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Uploader;
