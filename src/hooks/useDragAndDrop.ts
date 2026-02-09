import { useState, useCallback, useRef } from "react";
import type { File } from "@/types";

export function useDragAndDrop(
  files: File[],
  onReorder: (orderedIds: string[]) => void
) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [items, setItems] = useState<File[]>(files);
  const orderedIdsRef = useRef<string[]>([]);

  if (
    !draggedId &&
    (files.length !== items.length || files.some((f, i) => f.id !== items[i]?.id))
  ) {
    setItems(files);
    orderedIdsRef.current = files.map((f) => f.id);
  }

  const onDragStart = useCallback((id: string) => {
    setDraggedId(id);
    orderedIdsRef.current = [];
  }, []);

  const onDragOver = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      if (draggedId === null || draggedId === targetId) return;

      setItems((prev) => {
        const fromIdx = prev.findIndex((f) => f.id === draggedId);
        const toIdx = prev.findIndex((f) => f.id === targetId);
        if (fromIdx === -1 || toIdx === -1) return prev;
        const next = [...prev];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        orderedIdsRef.current = next.map((f) => f.id);
        return next;
      });
    },
    [draggedId]
  );

  const onDragEnd = useCallback(() => {
    if (draggedId !== null) {
      const idsToSend =
        orderedIdsRef.current.length > 0
          ? orderedIdsRef.current
          : items.map((f) => f.id);
      onReorder(idsToSend);
    }
    setDraggedId(null);
    orderedIdsRef.current = [];
  }, [draggedId, items, onReorder]);

  return {
    items,
    draggedId,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
}
