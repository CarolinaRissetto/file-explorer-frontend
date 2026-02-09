import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFolders, getAllFolders, createFolder, deleteFolder } from "@/api/folders";
import type { Folder } from "@/types";

export function useFolders(parentId: string | null) {
  return useQuery<Folder[]>({
    queryKey: ["folders", parentId],
    queryFn: () => getFolders(parentId),
  });
}

export function useAllFolders() {
  return useQuery<Folder[]>({
    queryKey: ["folders", "all"],
    queryFn: () => getAllFolders(),
  });
}

export function useCreateFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ name, parentId }: { name: string; parentId: string | null }) =>
      createFolder(name, parentId),
    onSuccess: (_, { parentId }) => {
      qc.invalidateQueries({ queryKey: ["folders", parentId] });
      qc.invalidateQueries({ queryKey: ["folders", "all"] });
    },
  });
}

export function useDeleteFolder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
      qc.invalidateQueries({ queryKey: ["files"] });
    },
  });
}
