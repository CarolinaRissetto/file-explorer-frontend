import type { File, Folder } from "@/types";

let nextId = 100;
export const generateId = (): string => String(nextId++);

export const folders: Folder[] = [
  { id: "1", name: "Documents", parentId: null, createdAt: "2025-01-01T00:00:00Z" },
  { id: "2", name: "Images", parentId: null, createdAt: "2025-01-02T00:00:00Z" },
  { id: "3", name: "Work", parentId: "1", createdAt: "2025-01-03T00:00:00Z" },
  { id: "4", name: "Vacation", parentId: "2", createdAt: "2025-01-04T00:00:00Z" },
];

export const files: File[] = [
  { id: "10", name: "readme.txt", parentId: "1", size: 1024, order: 0, createdAt: "2025-01-01T00:00:00Z" },
  { id: "11", name: "notes.md", parentId: "1", size: 2048, order: 1, createdAt: "2025-01-01T01:00:00Z" },
  { id: "12", name: "report.pdf", parentId: "3", size: 51200, order: 0, createdAt: "2025-01-03T00:00:00Z" },
  { id: "13", name: "logo.png", parentId: "2", size: 10240, order: 0, createdAt: "2025-01-02T00:00:00Z" },
  { id: "14", name: "beach.jpg", parentId: "4", size: 204800, order: 0, createdAt: "2025-01-04T00:00:00Z" },
  { id: "15", name: "sunset.jpg", parentId: "4", size: 153600, order: 1, createdAt: "2025-01-04T01:00:00Z" },
];
