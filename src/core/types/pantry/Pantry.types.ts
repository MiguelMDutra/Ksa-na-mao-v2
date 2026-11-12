export interface Pantry {
  pantryId: number;
  ownerId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface PantryCreate {
  ownerId: number;
  name: string;
}

export interface PantryUpdate {
  pantryId: number;
  ownerId: number;
  name: string;
}
