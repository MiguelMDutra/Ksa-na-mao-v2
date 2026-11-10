export interface CreatePantryInvite {
  pantryId: number;
  inviterId: number;
  invitedId: number;
  status: "Pendente";
}

export interface UpdatePantryInvite {
  pantryId: number;
  inviterId: number;
  invitedId: number;
  status: "Rejeitado" | "Aceito";
}
