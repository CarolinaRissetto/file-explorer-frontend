import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAll } from "@/api/search";
import type { File, Folder } from "@/types";

export function useSearch(parentId?: string | null) {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery<{ folders: Folder[]; files: File[] }>({
    queryKey: ["search", query, parentId],
    queryFn: () => searchAll(query, parentId),
    enabled: query.length > 0,
  });

  return {
    query,
    setQuery,
    results: data ?? { folders: [], files: [] },
    isSearching: query.length > 0,
    isLoading,
  };
}
