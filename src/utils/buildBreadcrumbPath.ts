import type { Folder, BreadcrumbSegment } from "@/types";

export function buildBreadcrumbPath(
  folderId: string | null,
  allFolders: Folder[]
): BreadcrumbSegment[] {
  const segments: BreadcrumbSegment[] = [];
  let currentId = folderId;

  while (currentId !== null) {
    const folder = allFolders.find((f) => f.id === currentId);
    if (!folder) break;
    segments.unshift({ id: folder.id, name: folder.name });
    currentId = folder.parentId;
  }

  segments.unshift({ id: null, name: "Root" });
  return segments;
}
