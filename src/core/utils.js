import path from 'path';
import fs from 'fs-extra';

export function resolveFilePath(structure, examplePath) {
  const fileName = path.basename(examplePath);
  const fullPath = path.join(structure, fileName);
  return fullPath;
}

export async function writeComponentFile(content, fullPath) {
  await fs.ensureDir(path.dirname(fullPath));
  await fs.writeFile(fullPath, content);
}
