import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileItemProps {
  id: string;
  name: string;
  size: number;
  isDragged: boolean;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
}

export function FileItem({
  id,
  name,
  size,
  isDragged,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
}: FileItemProps) {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      draggable
      onDragStart={() => onDragStart(id)}
      onDragOver={(e) => onDragOver(e, id)}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 transition-opacity ${
        isDragged ? "opacity-50" : ""
      }`}
    >
      <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
      <span className="flex-1 truncate text-sm text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">{formatSize(size)}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={() => onDelete(id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
