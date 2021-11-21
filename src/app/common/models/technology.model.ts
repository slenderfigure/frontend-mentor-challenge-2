export interface  Technology {
  id:          number;
  name:        string;
  images:      Images;
  description: string;
}

export interface Images {
  portrait:  string;
  landscape: string;
}
