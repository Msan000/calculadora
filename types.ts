export enum Category {
  MAMPOSTERIA = 'Mampostería',
  REVOQUES = 'Revoques',
  HORMIGON_HIERRO = 'Hormigón y Hierro',
  LOSAS = 'Losas Alivianadas',
  ENCADENADOS = 'Encadenados y Dinteles',
  CONTRAPISOS_CARPETAS = 'Contrapisos y Carpetas',
  AISLACIONES = 'Aislaciones e Impermeabilizaciones',
  REVESTIMIENTOS = 'Revestimientos, Pisos y Zócalos',
  CIELORRASOS = 'Cielorrasos de Placas',
  PINTURA = 'Pintura y Revestimientos Texturados',
}

export interface MaterialResult {
  name: string;
  unit: string;
  quantity: number;
}

export interface CalculationInput {
  [key: string]: number | string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}