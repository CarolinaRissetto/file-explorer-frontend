export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface File {
  id: string;
  name: string;
  parentId: string;
  size: number;
  order: number;
  createdAt: string;
}

export interface BreadcrumbSegment {
  id: string | null;
  name: string;
}
