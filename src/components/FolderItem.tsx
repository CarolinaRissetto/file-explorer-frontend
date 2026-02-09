import { Folder as FolderIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FolderItemProps {
  id: string;
  name: string;
  size: number;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function FolderItem({
  id,
  name,
  size,
  onNavigate,
  onDelete,
}: FolderItemProps) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "Empty";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2">
      <button
        onClick={() => onNavigate(id)}
        className="flex flex-1 items-center gap-2 text-left"
      >
        <FolderIcon className="h-4 w-4 shrink-0 text-primary" />
        <span className="flex-1 truncate text-sm font-medium text-foreground">
          {name}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatSize(size)}
        </span>
      </button>
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
