import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getReadURL, addPreAuthenticatedRequest } from "./utils";
const { Dragger } = Upload;

function onChange(info) {
  const { ok } = info.action;
  if (ok) {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else {
    message.error(`${info.file.name} file upload failed.`);
  }
}

async function action(url, file, setRefresh) {
  if (!file) {
    return;
  }
  const objectURL = `${url}/${file.name}`;
  const result = await fetch(objectURL, {
    method: "PUT",
    body: file,
  });
  setRefresh(true);
  return result;
}

function UploadFile({ region, namespaceName, bucketName, pac, setRefresh }) {
  const [file, setFile] = useState();
  const osPath = getReadURL(region, namespaceName, bucketName);
  const pacUrl = addPreAuthenticatedRequest(osPath, pac);
  const disabled = !(region && namespaceName && bucketName && pac);
  return (
    <Container>
      <Dragger
        disabled={disabled}
        action={() => action(pacUrl, file, setRefresh)}
        customRequest={onChange}
        beforeUpload={(file) => {
          setFile(file);
        }}
        showUploadList={false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag your file here to upload
        </p>
      </Dragger>
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem;
`;

export default UploadFile;
