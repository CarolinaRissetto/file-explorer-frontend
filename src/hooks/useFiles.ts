import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFiles,
  getAllFiles,
  createFile,
  deleteFile,
  moveFile,
  reorderFiles,
  renameFile,
} from "@/api/files";
import type { File } from "@/types";

export function useFiles(parentId: string | null) {
  return useQuery<File[]>({
    queryKey: ["files", parentId],
    queryFn: () => getFiles(parentId),
  });
}

export function useAllFiles() {
  return useQuery<File[]>({
    queryKey: ["files", "all"],
    queryFn: () => getAllFiles(),
  });
}

export function useCreateFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      parentId,
      size,
    }: {
      name: string;
      parentId: string;
      size: number;
    }) => createFile(name, parentId, size),
    onSuccess: (_, { parentId }) => {
      qc.invalidateQueries({ queryKey: ["files", parentId] });
      qc.invalidateQueries({ queryKey: ["files", "all"] });
    },
  });
}

export function useDeleteFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["files"] });
    },
  });
}

export function useMoveFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newParentId }: { id: string; newParentId: string }) =>
      moveFile(id, newParentId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["files"] });
    },
  });
}

export function useReorderFiles() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      parentId,
      orderedIds,
    }: {
      parentId: string;
      orderedIds: string[];
    }) => reorderFiles(parentId, orderedIds),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["files"] });
    },
  });
}

export function useRenameFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName: string }) =>
      renameFile(id, newName),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["files"] });
    },
  });
}
