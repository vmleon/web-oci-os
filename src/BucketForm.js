import React from "react";
import styled from "styled-components";
import { Form, Input, Select } from "antd";
import { getReadURL } from "./utils";
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function BucketForm({
  region,
  setRegion,
  pac,
  setPac,
  namespaceName,
  setNamespaceName,
  bucketName,
  setBucketName,
}) {
  const osURL = getReadURL(region, namespaceName, bucketName);
  return (
    <Container>
      <Form {...layout}>
        <Form.Item name="region" label="Region">
          <Select
            placeholder="Select a Region"
            defaultValue={region}
            onChange={(regionIdentifier) => setRegion(regionIdentifier)}
          >
            <Option value="uk-london-1">UK South (London)</Option>
            <Option value="eu-frankfurt-1">Germany Central (Frankfurt)</Option>
            <Option value="eu-zurich-1">Switzerland North (Zurich)</Option>
          </Select>
        </Form.Item>
        <Form.Item name="pac" label="Pre-Authenticate Code">
          <Input defaultValue={pac} onChange={(e) => setPac(e.target.value)} />
        </Form.Item>
        <Form.Item name="namespace" label="Namespace">
          <Input
            defaultValue={namespaceName}
            onChange={(e) => setNamespaceName(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="bucket" label="Bucket">
          <Input
            defaultValue={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem;
`;

export default BucketForm;
