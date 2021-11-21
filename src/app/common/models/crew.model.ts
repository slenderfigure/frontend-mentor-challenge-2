export interface Crew {
  id:     number;
  name:   string;
  images: Images;
  role:   string;
  bio:    string;
}

export interface Images {
  png:  string;
  webp: string;
}
