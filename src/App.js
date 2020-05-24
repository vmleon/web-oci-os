import React, { useState } from "react";
import { PageHeader, Divider } from "antd";
import styled from "styled-components";
import BucketForm from "./BucketForm";
import UploadFile from "./UploadFile";
import Objects from "./Objects";

function App() {
  const [region, setRegion] = useState("uk-london-1");
  const [namespaceName, setNamespaceName] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [pac, setPac] = useState("");
  const [refresh, setRefresh] = useState(false);

  const updateObjects = () => setRefresh(!refresh);

  return (
    <Container>
      <PageHeader
        className="site-page-header"
        title="Oracle Cloud"
        subTitle="Upload files to Object Storage"
        avatar={{ src: "favicon.ico" }}
      />
      <Divider />
      <BucketForm
        region={region}
        setRegion={setRegion}
        pac={pac}
        setPac={setPac}
        namespaceName={namespaceName}
        setNamespaceName={setNamespaceName}
        bucketName={bucketName}
        setBucketName={setBucketName}
      />
      <UploadFile
        region={region}
        pac={pac}
        setPac={setPac}
        setRefresh={updateObjects}
        namespaceName={namespaceName}
        bucketName={bucketName}
      />
      <Objects
        region={region}
        pac={pac}
        setPac={setPac}
        refresh={refresh}
        update={updateObjects}
        namespaceName={namespaceName}
        bucketName={bucketName}
      />
    </Container>
  );
}

const Container = styled.div`
  margin: 1rem;
`;

export default App;
