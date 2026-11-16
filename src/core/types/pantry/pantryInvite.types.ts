export interface PantryInviteCreate {
  pantryId: number;
  inviterId: number;
  invitedId: number;
  status: "Pendente";
}

export interface PantryInviteUpdate {
  pantryId: number;
  inviterId: number;
  invitedId: number;
  status: "Rejeitado" | "Aceito";
}
