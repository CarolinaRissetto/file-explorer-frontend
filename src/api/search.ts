import type { File, Folder } from "@/types";
import { folders, files } from "./mockData";

const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

export async function searchAll(
  query: string,
  parentId?: string | null
): Promise<{ folders: Folder[]; files: File[] }> {
  await delay();
  const q = query.toLowerCase();

  let matchedFolders = folders.filter((f) =>
    f.name.toLowerCase().includes(q)
  );
  let matchedFiles = files.filter((f) =>
    f.name.toLowerCase().includes(q)
  );

  if (parentId !== undefined) {
    matchedFolders = matchedFolders.filter((f) => f.parentId === parentId);
    matchedFiles = matchedFiles.filter((f) => f.parentId === (parentId ?? "__root__"));
  }

  return { folders: matchedFolders, files: matchedFiles };
}
