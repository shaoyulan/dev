const fs = require('fs');
const path = require('path');
const TARGET_JSON_LOCATION = 'settingApi/index.json';
const BUNDLE_FOLDER = 'bundle'
const __dirname = process.cwd();

/**
 * @description action steps
 * 
 * 1. 讀取 bundle內所有的資料夾，並索取各app內js檔案的hash值
 * 2. 將hash值寫入settingApi/index.json
 * 
 * 打包後FileSystem路徑的使用請留意
 * @see https://www.npmjs.com/package/pkg#snapshot-filesystem
 */

function main() {
  const targetJsonPath = path.join(__dirname, TARGET_JSON_LOCATION);
  const targetJson = require(targetJsonPath);
  const bundleFolderPath = path.join(__dirname, BUNDLE_FOLDER);
  const folders = fs.readdirSync(bundleFolderPath);

  folders.forEach(folder => {
    const folderPath = path.join(bundleFolderPath, folder);
    const files = fs.readdirSync(folderPath);
    const gameType = folder.split('-').slice(-1)[0];
    files.forEach(file => {
      const [name, hash, ext] = file.split('.');
      if (ext === 'js') {
        console.log('folders', file);
        if (!targetJson[gameType]) {
          targetJson[gameType] = hash;
        }
      }
    });
  });

  fs.writeFileSync(targetJsonPath, JSON.stringify(targetJson, null, 2));
}

main();