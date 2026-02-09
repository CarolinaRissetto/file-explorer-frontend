import { useMemo } from "react";
import type { Folder, File } from "@/types";
import { calculateFolderSize } from "@/utils/calculateFolderSize";

export function useFolderSize(
  folderId: string,
  allFolders: Folder[] | undefined,
  allFiles: File[] | undefined
): number {
  return useMemo(
    () => calculateFolderSize(folderId, allFolders ?? [], allFiles ?? []),
    [folderId, allFolders, allFiles]
  );
}
