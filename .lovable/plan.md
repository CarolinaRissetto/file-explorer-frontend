

## File Explorer - Implementation Plan

### Overview
A web-based file explorer with folder navigation, CRUD operations, drag-and-drop reordering, search, and breadcrumb navigation. All data is mocked but structured for easy backend swap via React Query.

---

### 1. Project Structure & Types
Set up the required folder structure (`api/`, `components/`, `hooks/`, `routes/`, `views/`, `utils/`, `types/`, `styles/`) and define the core domain models (`File` and `Folder` types with flat `parentId` references). Remove the existing `lib/` folder.

### 2. Mock API Layer (`src/api/`)
Implement an in-memory data store with mock API functions matching the REST contract:
- `getFolders(parentId)`, `createFolder`, `deleteFolder` (cascading)
- `getFiles(parentId)`, `createFile`, `deleteFile`, `moveFile`, `reorderFiles`
- Enforce unique names per parent folder
- Simulate async behavior with small delays

### 3. React Query Hooks (`src/hooks/`)
- **`useFiles` / `useFolders`** — fetch files/folders for a given parent using React Query, with proper cache invalidation on mutations
- **`useCreateFolder` / `useCreateFile` / `useDeleteFolder` / `useDeleteFile`** — mutation hooks
- **`useMoveFile`** — mutation to change a file's `parentId`
- **`useReorderFiles`** — mutation to update file order
- **`useDragAndDrop`** — isolated hook managing drag state and reorder logic
- **`useSearch`** — hook for filtering files/folders by name (global or scoped)
- **`useBreadcrumb`** — derives the current folder path from flat folder data
- **`useFolderSize`** — computes recursive folder size using the utility function

### 4. Utility Functions (`src/utils/`)
- **`calculateFolderSize`** — pure function that recursively sums file sizes across nested folders from flat data
- **`buildBreadcrumbPath`** — builds an ordered path array from a folder ID up to root

### 5. Presentational Components (`src/components/`)
- **`FileItem`** — displays a file row (name, size, actions) with drag handle
- **`FolderItem`** — displays a folder row (name, computed size, actions)
- **`Breadcrumb`** — renders clickable path segments
- **`SearchBar`** — text input for search queries
- **`CreateDialog`** — simple dialog/form for creating files or folders
- **`FileList`** — renders a sortable list of files with drag-and-drop support

### 6. Explorer View (`src/views/`)
- **`ExplorerView`** — the main page composing all hooks and components:
  - Shows breadcrumb at top
  - Search bar
  - Folder list + file list for current directory
  - Create folder/file buttons
  - Handles navigation into subfolders via state (current `parentId`)

### 7. Routing (`src/routes/`)
- Simple route setup with the Explorer view as the main route
- Current folder tracked via URL query param or state

