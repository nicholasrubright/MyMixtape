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

export type PlaylistMapping = Record<string, boolean>;

export enum AlertType {
  ERROR = 0,
  WARNING = 1,
  SUCCESS = 2,
}

export type Alert = {
  type: AlertType;
  message: string;
};
