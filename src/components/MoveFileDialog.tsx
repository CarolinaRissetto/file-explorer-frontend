import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Folder } from "@/types";

interface MoveFileDialogProps {
  open: boolean;
  onClose: () => void;
  fileName: string;
  folders: Folder[];
  currentParentId: string | null;
  onMove: (targetFolderId: string) => void;
}

export function MoveFileDialog({
  open,
  onClose,
  fileName,
  folders,
  currentParentId,
  onMove,
}: MoveFileDialogProps) {
  const [target, setTarget] = useState<string>("");

  const availableFolders = folders.filter((f) => f.id !== currentParentId);

  const handleSubmit = () => {
    if (!target) return;
    onMove(target);
    setTarget("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move "{fileName}"</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Select value={target} onValueChange={setTarget}>
            <SelectTrigger>
              <SelectValue placeholder="Select target folder" />
            </SelectTrigger>
            <SelectContent>
              {availableFolders.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!target}>
            Move
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
