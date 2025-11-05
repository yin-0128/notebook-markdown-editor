import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { FileText, Plus, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

export function FileList({
  files,
  selectedFileId,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [renameFileName, setRenameFileName] = useState('');
  const [fileToDelete, setFileToDelete] = useState(null);
  const [fileToRename, setFileToRename] = useState(null);

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      toast.error('File name cannot be empty');
      return;
    }

    const fileName = newFileName.endsWith('.md') ? newFileName : `${newFileName}.md`;
    
    if (files.some((f) => f.name === fileName)) {
      toast.error('A file with this name already exists');
      return;
    }

    onCreateFile(fileName);
    setNewFileName('');
    setIsCreateDialogOpen(false);
    toast.success('File created successfully');
  };

  const handleRenameFile = () => {
    if (!renameFileName.trim() || !fileToRename) {
      toast.error('File name cannot be empty');
      return;
    }

    const fileName = renameFileName.endsWith('.md') ? renameFileName : `${renameFileName}.md`;
    
    if (files.some((f) => f.name === fileName && f.id !== fileToRename)) {
      toast.error('A file with this name already exists');
      return;
    }

    onRenameFile(fileToRename, fileName);
    setRenameFileName('');
    setFileToRename(null);
    setIsRenameDialogOpen(false);
    toast.success('File renamed successfully');
  };

  const handleDeleteFile = () => {
    if (fileToDelete) {
      onDeleteFile(fileToDelete);
      setFileToDelete(null);
      setIsDeleteDialogOpen(false);
      toast.success('File deleted successfully');
    }
  };

  const openRenameDialog = (file) => {
    setFileToRename(file.id);
    setRenameFileName(file.name.replace('.md', ''));
    setIsRenameDialogOpen(true);
  };

  const openDeleteDialog = (fileId) => {
    setFileToDelete(fileId);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-muted/30 border-r">
      {/* Header */}
      <div className="p-4 border-b bg-background/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-foreground">Files</h2>
          <Button
            size="sm"
            onClick={() => setIsCreateDialogOpen(true)}
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" />
            New File
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">
          {files.length} {files.length === 1 ? 'file' : 'files'}
        </p>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {files.length === 0 ? (
            <div className="text-center py-8 px-4">
              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground text-sm">
                No files yet. Create your first file to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`group relative flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                    selectedFileId === file.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => onSelectFile(file.id)}
                >
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{file.name}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                          selectedFileId === file.id ? 'text-primary-foreground hover:bg-primary-foreground/20' : ''
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openRenameDialog(file)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(file.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Create File Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Enter a name for your new Markdown file.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="File name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFile();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFile}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename File Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>
              Enter a new name for this file.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="File name"
            value={renameFileName}
            onChange={(e) => setRenameFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRenameFile();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameFile}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
