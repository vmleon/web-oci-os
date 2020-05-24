import React, { useEffect, useState } from "react";
import { List, Typography, Divider, Button } from "antd";
import styled from "styled-components";
import { getReadURL, addPreAuthenticatedRequest } from "./utils";

function Objects({ region, namespaceName, bucketName, pac, refresh, update }) {
  const osURL = getReadURL(region, namespaceName, bucketName, pac);
  const pacUrl = addPreAuthenticatedRequest(osURL, pac);
  const [bucketObjects, setBucketObjects] = useState([]);
  const disabled = !(region && namespaceName && bucketName && pac);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(osURL);
      const { objects } = await response.json();
      setBucketObjects(objects);
    };

    fetchData();
  }, [osURL, refresh]);

  return (
    <Container>
      <Links disabled={disabled} osURL={osURL} pacUrl={pacUrl} />
      <Divider>Objects</Divider>
      <Button onClick={update}>Refresh</Button>
      <ObjectList bucketName={bucketName}>{bucketObjects}</ObjectList>
    </Container>
  );
}

function Links({ disabled, osURL, pacUrl }) {
  if (disabled) {
    return null;
  }
  return (
    <>
      <Divider>Request Links</Divider>
      <p>Request:</p>
      <p>
        <Typography.Text code copyable>
          {osURL}
        </Typography.Text>
      </p>
      <p>Pre Authenticated Request:</p>
      <p>
        <Typography.Text code copyable>
          {pacUrl}
        </Typography.Text>
      </p>
    </>
  );
}

function ObjectList({ children: objects, bucketName }) {
  return (
    <List
      header={
        <div>
          Objects in <Typography.Text strong>{bucketName}</Typography.Text>{" "}
          bucket
        </div>
      }
      bordered
      dataSource={objects}
      renderItem={(item) => <List.Item>{item.name}</List.Item>}
    />
  );
}

const Container = styled.div`
  padding-top: 2rem;
  margin: 1rem;
`;

export default Objects;
