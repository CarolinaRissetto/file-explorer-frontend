import { FileItem } from "@/components/FileItem";
import type { File } from "@/types";

interface FileListProps {
  files: File[];
  draggedId: string | null;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
}

export function FileList({
  files,
  draggedId,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
}: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-1">
      {files.map((file) => (
        <FileItem
          key={file.id}
          id={file.id}
          name={file.name}
          size={file.size}
          isDragged={file.id === draggedId}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
}
