export interface md {
  file: string;
  fileName: string;
  createdAt: string;
  id?: string;
  isFavorite?: boolean;
  deletedAt?: string;
}

export interface history {
  id: string;
  fileId: number;
  timestamp: string;
  fileName: string;
  action: "created" | "deleted" | "edited" | "restored";
}
