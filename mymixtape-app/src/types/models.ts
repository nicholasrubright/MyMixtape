export type Profile = {
  id: string;
  name: string;
  images: Image[];
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Playlist = {
  id: string;
  name: string;
  images: Image[];
};
