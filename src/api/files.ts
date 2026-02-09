import type { File } from "@/types";
import { request } from "./client";

function parentQuery(parentId: string | null): string {
  if (parentId === null) return "parentId=__root__";
  return `parentId=${encodeURIComponent(parentId)}`;
}

export async function getFiles(parentId: string | null): Promise<File[]> {
  return request<File[]>(`/files?${parentQuery(parentId)}`);
}

export async function getAllFiles(): Promise<File[]> {
  return request<File[]>("/files?all=true");
}

export async function createFile(
  name: string,
  parentId: string,
  size: number
): Promise<File> {
  return request<File>("/files", {
    method: "POST",
    body: JSON.stringify({ name, parentId, size }),
  });
}

export async function deleteFile(id: string): Promise<void> {
  return request(`/files/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function moveFile(id: string, newParentId: string): Promise<File> {
  return request<File>(`/files/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ parentId: newParentId }),
  });
}

export async function reorderFiles(
  parentId: string,
  orderedIds: string[]
): Promise<void> {
  return request("/files/reorder", {
    method: "PATCH",
    body: JSON.stringify({ parentId, orderedIds }),
  });
}

export async function renameFile(id: string, newName: string): Promise<File> {
  return request<File>(`/files/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ name: newName }),
  });
}
