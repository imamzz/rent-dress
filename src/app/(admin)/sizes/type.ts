interface Size {
  id: string;
  label: string;
  bust: string;
  waist: string;
  hips: string;
};

interface SizeCreate {
  label: string;
  bust: string;
  waist: string;
  hips: string;
}

export type { Size, SizeCreate };
