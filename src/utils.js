export function getReadURL(region, namespaceName, bucketName) {
  const osPath = `/n/${namespaceName}/b/${bucketName}/o`;
  const regionalURL = getRegionURL(region);
  const osURL = `${regionalURL}${osPath}`;
  return osURL;
}

export function addPreAuthenticatedRequest(url, pac) {
  const pacPath = pac ? `/p/${pac}` : "";
  const parts = url.split("oraclecloud.com");
  return `${parts[0]}oraclecloud.com${pacPath}${parts[1]}`;
}

function getRegionURL(region) {
  return `https://objectstorage.${region}.oraclecloud.com`;
}
