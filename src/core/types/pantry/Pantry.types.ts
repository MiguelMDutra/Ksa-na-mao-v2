export interface pantry {
  pantryId: number;
  ownerId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface createPantry {
  ownerId: number;
  name: string;
}

export interface dataUpdate {
  pantryId: number;
  ownerId: number;
  name: string;
}
