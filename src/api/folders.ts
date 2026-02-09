import type { Folder } from "@/types";
import { folders, files, generateId } from "./mockData";

const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

export async function getFolders(parentId: string | null): Promise<Folder[]> {
  await delay();
  return folders.filter((f) => f.parentId === parentId);
}

export async function getAllFolders(): Promise<Folder[]> {
  await delay();
  return [...folders];
}

export async function createFolder(name: string, parentId: string | null): Promise<Folder> {
  await delay();
  const exists = folders.some(
    (f) => f.parentId === parentId && f.name.toLowerCase() === name.toLowerCase()
  );
  if (exists) throw new Error(`Folder "${name}" already exists in this directory`);

  const folder: Folder = {
    id: generateId(),
    name,
    parentId,
    createdAt: new Date().toISOString(),
  };
  folders.push(folder);
  return folder;
}

/** Cascading delete: removes folder + all nested subfolders and files */
export async function deleteFolder(id: string): Promise<void> {
  await delay();
  const idsToDelete = collectDescendantFolderIds(id);
  idsToDelete.push(id);

  // Remove files in all deleted folders
  for (let i = files.length - 1; i >= 0; i--) {
    if (idsToDelete.includes(files[i].parentId)) {
      files.splice(i, 1);
    }
  }

  // Remove folders
  for (let i = folders.length - 1; i >= 0; i--) {
    if (idsToDelete.includes(folders[i].id)) {
      folders.splice(i, 1);
    }
  }
}

function collectDescendantFolderIds(parentId: string): string[] {
  const children = folders.filter((f) => f.parentId === parentId);
  const ids: string[] = [];
  for (const child of children) {
    ids.push(child.id);
    ids.push(...collectDescendantFolderIds(child.id));
  }
  return ids;
}
