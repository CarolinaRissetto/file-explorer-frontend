import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useFolders, useAllFolders, useCreateFolder, useDeleteFolder, useRenameFolder } from "@/hooks/useFolders";
import { useFiles, useAllFiles, useCreateFile, useDeleteFile, useMoveFile, useReorderFiles, useRenameFile } from "@/hooks/useFiles";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { useSearch } from "@/hooks/useSearch";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { calculateFolderSize } from "@/utils/calculateFolderSize";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { SearchBar } from "@/components/SearchBar";
import { FolderItem } from "@/components/FolderItem";
import { FileList } from "@/components/FileList";
import { CreateDialog } from "@/components/CreateDialog";
import { MoveFileDialog } from "@/components/MoveFileDialog";
import { RenameDialog } from "@/components/RenameDialog";
import { Button } from "@/components/ui/button";
import { FolderPlus, FilePlus, ArrowLeftRight } from "lucide-react";
import type { File } from "@/types";

export function ExplorerView() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [createType, setCreateType] = useState<"file" | "folder" | null>(null);
  const [moveFileData, setMoveFileData] = useState<File | null>(null);
  const [renameData, setRenameData] = useState<{ id: string; name: string; type: "file" | "folder" } | null>(null);

  // Data queries
  const { data: folders = [] } = useFolders(currentFolderId);
  const { data: allFolders = [] } = useAllFolders();
  const { data: allFiles = [] } = useAllFiles();
  const { data: files = [] } = useFiles(currentFolderId);

  // Mutations
  const createFolder = useCreateFolder();
  const deleteFolder = useDeleteFolder();
  const createFile = useCreateFile();
  const deleteFile = useDeleteFile();
  const moveFileMutation = useMoveFile();
  const reorderFiles = useReorderFiles();
  const renameFile = useRenameFile();
  const renameFolder = useRenameFolder();

  // Breadcrumb
  const breadcrumb = useBreadcrumb(currentFolderId, allFolders);

  // Search
  const { query, setQuery, results, isSearching } = useSearch(currentFolderId);

  // Drag & drop
  const { items: sortedFiles, draggedId, onDragStart, onDragOver, onDragEnd } =
    useDragAndDrop(isSearching ? results.files : files, (orderedIds) => {
      if (currentFolderId) {
        reorderFiles.mutate({ parentId: currentFolderId, orderedIds });
      }
    });

  const displayedFolders = isSearching ? results.folders : folders;

  const handleCreateSubmit = (name: string, size?: number) => {
    if (createType === "folder") {
      createFolder.mutate(
        { name, parentId: currentFolderId },
        {
          onError: (err) =>
            toast({ title: "Error", description: (err as Error).message, variant: "destructive" }),
        }
      );
    } else if (createType === "file") {
      createFile.mutate(
        { name, parentId: currentFolderId ?? "__root__", size: size ?? 1024 },
        {
          onError: (err) =>
            toast({ title: "Error", description: (err as Error).message, variant: "destructive" }),
        }
      );
    }
  };

  const handleMoveFile = (targetFolderId: string) => {
    if (!moveFileData) return;
    moveFileMutation.mutate(
      { id: moveFileData.id, newParentId: targetFolderId },
      {
        onError: (err) =>
          toast({ title: "Error", description: (err as Error).message, variant: "destructive" }),
      }
    );
  };

  const handleRename = (newName: string) => {
    if (!renameData) return;
    const mutation = renameData.type === "file" ? renameFile : renameFolder;
    mutation.mutate(
      { id: renameData.id, newName },
      {
        onError: (err) =>
          toast({ title: "Error", description: (err as Error).message, variant: "destructive" }),
      }
    );
  };

  const handleFileMove = (id: string) => {
    const file = sortedFiles.find((f) => f.id === id);
    if (file) setMoveFileData(file);
  };

  const handleFileRename = (id: string) => {
    const file = sortedFiles.find((f) => f.id === id);
    if (file) setRenameData({ id: file.id, name: file.name, type: "file" });
  };

  const handleFolderRename = (id: string) => {
    const folder = displayedFolders.find((f) => f.id === id);
    if (folder) setRenameData({ id: folder.id, name: folder.name, type: "folder" });
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-foreground">File Explorer</h1>

      <BreadcrumbNav segments={breadcrumb} onNavigate={setCurrentFolderId} />

      {/* Toolbar */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCreateType("folder")}>
            <FolderPlus className="mr-1 h-4 w-4" /> New Folder
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCreateType("file")}>
            <FilePlus className="mr-1 h-4 w-4" /> New File
          </Button>
        </div>
      </div>

      {/* Folders */}
      {displayedFolders.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Folders
          </h2>
          <div className="space-y-1">
            {displayedFolders.map((folder) => (
              <FolderItem
                key={folder.id}
                id={folder.id}
                name={folder.name}
                size={calculateFolderSize(folder.id, allFolders, allFiles)}
                onNavigate={setCurrentFolderId}
                onDelete={(id) => deleteFolder.mutate(id)}
                onRename={handleFolderRename}
              />
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {sortedFiles.length > 0 && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Files
            </h2>
            <span className="text-xs text-muted-foreground">
              Drag to reorder • <ArrowLeftRight className="inline h-3 w-3" /> to move
            </span>
          </div>
          <FileList
            files={sortedFiles}
            draggedId={draggedId}
            onDelete={(id) => deleteFile.mutate(id)}
            onMove={handleFileMove}
            onRename={handleFileRename}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          />
        </div>
      )}

      {displayedFolders.length === 0 && sortedFiles.length === 0 && (
        <div className="mt-12 text-center text-muted-foreground">
          {isSearching ? "No results found." : "This folder is empty."}
        </div>
      )}

      {/* Dialogs */}
      <CreateDialog
        open={createType !== null}
        onClose={() => setCreateType(null)}
        type={createType ?? "file"}
        onSubmit={handleCreateSubmit}
      />

      <MoveFileDialog
        open={moveFileData !== null}
        onClose={() => setMoveFileData(null)}
        fileName={moveFileData?.name ?? ""}
        folders={allFolders}
        currentParentId={currentFolderId}
        onMove={handleMoveFile}
      />

      <RenameDialog
        open={renameData !== null}
        onClose={() => setRenameData(null)}
        currentName={renameData?.name ?? ""}
        itemType={renameData?.type ?? "file"}
        onRename={handleRename}
      />
    </div>
  );
}
