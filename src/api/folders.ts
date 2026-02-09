import type { Folder } from "@/types";
import { request } from "./client";

export async function getFolders(parentId: string | null): Promise<Folder[]> {
  const q = parentId === null ? "parentId=" : `parentId=${encodeURIComponent(parentId)}`;
  return request<Folder[]>(`/folders?${q}`);
}

export async function getAllFolders(): Promise<Folder[]> {
  return request<Folder[]>("/folders?all=true");
}

export async function createFolder(
  name: string,
  parentId: string | null
): Promise<Folder> {
  return request<Folder>("/folders", {
    method: "POST",
    body: JSON.stringify({ name, parentId }),
  });
}

export async function deleteFolder(id: string): Promise<void> {
  return request(`/folders/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function renameFolder(
  id: string,
  newName: string
): Promise<Folder> {
  return request<Folder>(`/folders/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ name: newName }),
  });
}
