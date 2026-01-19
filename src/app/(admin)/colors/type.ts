interface Color {
  id: string;
  name: string;
  hexCode: string;
}

interface ColorCreate {
  name: string;
  hexCode: string;
}

export type { Color, ColorCreate };