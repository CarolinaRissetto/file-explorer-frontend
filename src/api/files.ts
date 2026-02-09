import type { File } from "@/types";
import { files, folders, generateId } from "./mockData";

const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

export async function getFiles(parentId: string | null): Promise<File[]> {
  await delay();
  const pid = parentId ?? "__root__";
  return files
    .filter((f) => f.parentId === pid)
    .sort((a, b) => a.order - b.order);
}

export async function getAllFiles(): Promise<File[]> {
  await delay();
  return [...files];
}

export async function createFile(
  name: string,
  parentId: string,
  size: number
): Promise<File> {
  await delay();
  const exists = files.some(
    (f) => f.parentId === parentId && f.name.toLowerCase() === name.toLowerCase()
  );
  if (exists) throw new Error(`File "${name}" already exists in this directory`);

  // Also check no folder with same name
  const folderExists = folders.some(
    (f) => f.parentId === parentId && f.name.toLowerCase() === name.toLowerCase()
  );
  if (folderExists) throw new Error(`A folder named "${name}" already exists in this directory`);

  const maxOrder = files
    .filter((f) => f.parentId === parentId)
    .reduce((max, f) => Math.max(max, f.order), -1);

  const file: File = {
    id: generateId(),
    name,
    parentId,
    size,
    order: maxOrder + 1,
    createdAt: new Date().toISOString(),
  };
  files.push(file);
  return file;
}

export async function deleteFile(id: string): Promise<void> {
  await delay();
  const idx = files.findIndex((f) => f.id === id);
  if (idx !== -1) files.splice(idx, 1);
}

export async function moveFile(id: string, newParentId: string): Promise<File> {
  await delay();
  const file = files.find((f) => f.id === id);
  if (!file) throw new Error("File not found");

  const exists = files.some(
    (f) =>
      f.parentId === newParentId &&
      f.name.toLowerCase() === file.name.toLowerCase() &&
      f.id !== id
  );
  if (exists) throw new Error(`File "${file.name}" already exists in target folder`);

  const maxOrder = files
    .filter((f) => f.parentId === newParentId)
    .reduce((max, f) => Math.max(max, f.order), -1);

  file.parentId = newParentId;
  file.order = maxOrder + 1;
  return { ...file };
}

export async function reorderFiles(
  parentId: string,
  orderedIds: string[]
): Promise<void> {
  await delay();
  orderedIds.forEach((id, index) => {
    const file = files.find((f) => f.id === id && f.parentId === parentId);
    if (file) file.order = index;
  });
}
