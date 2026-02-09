import type { File, Folder } from "@/types";
import { getAllFolders } from "./folders";
import { getAllFiles } from "./files";

export async function searchAll(
  query: string,
  parentId?: string | null
): Promise<{ folders: Folder[]; files: File[] }> {
  const [folders, files] = await Promise.all([
    getAllFolders(),
    getAllFiles(),
  ]);
  const q = query.toLowerCase();

  let matchedFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(q)
  );
  let matchedFiles = files.filter((f) =>
    f.name.toLowerCase().includes(q)
  );

  if (parentId !== undefined) {
    matchedFolders = matchedFolders.filter((f) => f.parentId === parentId);
    matchedFiles = matchedFiles.filter((f) =>
      f.parentId === (parentId === null ? "__root__" : parentId)
    );
  }

  return { folders: matchedFolders, files: matchedFiles };
}
