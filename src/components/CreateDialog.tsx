import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  type: "file" | "folder";
  onSubmit: (name: string, size?: number) => void;
}

export function CreateDialog({ open, onClose, type, onSubmit }: CreateDialogProps) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("1024");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), type === "file" ? Number(size) : undefined);
    setName("");
    setSize("1024");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create {type === "file" ? "File" : "Folder"}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            {type === "file" && (
              <div className="space-y-2">
                <Label htmlFor="size">Size (bytes)</Label>
                <Input
                  id="size"
                  type="number"
                  min="0"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
