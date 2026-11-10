export interface Pantry {
  pantryId: number;
  ownerId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreatePantry {
  ownerId: number;
  name: string;
}

export interface DataUpdate {
  pantryId: number;
  ownerId: number;
  name: string;
}
