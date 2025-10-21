function compareVersions(v1, v2) {
  // 定义预发布版本的优先级
  const preReleaseOrder = {
    alpha: 1,
    beta: 2,
    rc: 3,
    stable: 4,
  };

  // 解析版本号
  function parseVersion(version) {
    const [main, preRelease] = version.split("-");
    const [major, minor, patch] = main.split(".").map(Number);
    return { major, minor, patch, preRelease: preRelease || "stable" };
  }

  const parsedV1 = parseVersion(v1);
  const parsedV2 = parseVersion(v2);

  // 比较主要部分
  if (parsedV1.major !== parsedV2.major) {
    return parsedV1.major - parsedV2.major;
  }
  if (parsedV1.minor !== parsedV2.minor) {
    return parsedV1.minor - parsedV2.minor;
  }
  if (parsedV1.patch !== parsedV2.patch) {
    return parsedV1.patch - parsedV2.patch;
  }

  // 比较预发布部分
  if (parsedV1.preRelease !== parsedV2.preRelease) {
    return (
      preReleaseOrder[parsedV1.preRelease] -
      preReleaseOrder[parsedV2.preRelease]
    );
  }

  return 0;
}

function sortVersions(versions) {
  return versions.sort(compareVersions);
}

// 示例
const versions = [
  "v1.0.1-beta",
  "v1.0.1-alpha",
  "v1.0.1",
  "v1.0.2",
  "v1.0.1-rc",
];

const sortedVersions = sortVersions(versions);
console.log(sortedVersions);
