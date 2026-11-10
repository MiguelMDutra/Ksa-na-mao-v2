export interface CreateUnit {
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}

export interface GetUnit {
  id: number;
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}
