export interface createUnit {
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}

export interface getUnit {
  id: number;
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}
