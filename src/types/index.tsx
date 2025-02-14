type LocationInfo = {
  name: string;
  url: string;
};

export type CardInfo = {
  id: number;
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
  error?: string;
};

export type PageInfo = {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
};

export type ApiResponse = {
  error?: string;
  info?: PageInfo;
  results?: CardInfo[];
};

export type AppSlice = {
  bookmarks: CardInfo[];
  params: {
    page: number;
    searchTerm: string;
    details: string;
  };
  error: {
    pageError: string | undefined;
    detailsError: string | undefined;
  };
};

export type LinkAtributes = {
  download: string;
  href: string;
};
