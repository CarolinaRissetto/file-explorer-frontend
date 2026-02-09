import { useMemo } from "react";
import type { Folder, BreadcrumbSegment } from "@/types";
import { buildBreadcrumbPath } from "@/utils/buildBreadcrumbPath";

export function useBreadcrumb(
  currentFolderId: string | null,
  allFolders: Folder[] | undefined
): BreadcrumbSegment[] {
  return useMemo(
    () => buildBreadcrumbPath(currentFolderId, allFolders ?? []),
    [currentFolderId, allFolders]
  );
}
