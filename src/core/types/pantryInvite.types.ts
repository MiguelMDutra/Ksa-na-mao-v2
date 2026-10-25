export interface createPantryInvite {
  pantryId: number;
  inviterId: number;
  invitedId: number;
  status: "Pendente";
}

export interface updatePantryInvite {
  pantryId: number;
  inviterId: number;
  invitedId: number;
  status: "Rejeitado" | "Aceito";
}
