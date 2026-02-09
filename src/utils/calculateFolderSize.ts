import type { File, Folder } from "@/types";

export function calculateFolderSize(
  folderId: string,
  allFolders: Folder[],
  allFiles: File[]
): number {
  const directFileSize = allFiles
    .filter((f) => f.parentId === folderId)
    .reduce((sum, f) => sum + f.size, 0);

  const childFolders = allFolders.filter((f) => f.parentId === folderId);
  const nestedSize = childFolders.reduce(
    (sum, child) => sum + calculateFolderSize(child.id, allFolders, allFiles),
    0
  );

  return directFileSize + nestedSize;
}
