export interface UnitCreate {
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}

export interface UnitGet {
  id: number;
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}
