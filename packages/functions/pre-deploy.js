/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');

const packageJsonPath = './package.json';
const packageJsonOutputPath = './dist/package.json';
const packageJson = require(packageJsonPath);

(async () => {
  await fs.copy(`../core`, `./dist/core`);
  await fs.copy(`../testing`, `./dist/testing`);

  packageJson.engines = { node: '10' };

  await fs.writeFile(
    packageJsonOutputPath,
    JSON.stringify(packageJson, null, 2)
  );
})();
