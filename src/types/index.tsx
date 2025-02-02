type LocationInfo = {
  name: string;
  url: string;
};

export type CardInfo = {
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: LocationInfo;
  name: string;
  origin: LocationInfo;
  species: string;
  status: string;
  type: string;
  url: string;
};

type PageInfo = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

export type ApiResponse = {
  info: PageInfo;
  results: CardInfo[];
};
