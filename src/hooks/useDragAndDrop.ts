import { useState, useCallback, useRef } from "react";
import type { File } from "@/types";

export function useDragAndDrop(
  files: File[],
  onReorder: (orderedIds: string[]) => void
) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [items, setItems] = useState<File[]>(files);
  const dragOverId = useRef<string | null>(null);

  if (
    files.length !== items.length ||
    files.some((f, i) => f.id !== items[i]?.id)
  ) {
    setItems(files);
  }

  const onDragStart = useCallback((id: string) => {
    setDraggedId(id);
  }, []);

  const onDragOver = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      if (draggedId === null || draggedId === targetId) return;
      dragOverId.current = targetId;

      setItems((prev) => {
        const fromIdx = prev.findIndex((f) => f.id === draggedId);
        const toIdx = prev.findIndex((f) => f.id === targetId);
        if (fromIdx === -1 || toIdx === -1) return prev;
        const next = [...prev];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        return next;
      });
    },
    [draggedId]
  );

  const onDragEnd = useCallback(() => {
    if (draggedId !== null) {
      onReorder(items.map((f) => f.id));
    }
    setDraggedId(null);
    dragOverId.current = null;
  }, [draggedId, items, onReorder]);

  return {
    items,
    draggedId,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
}
