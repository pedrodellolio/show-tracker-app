export enum Status {
  // None = "",
  ToWatch = "To Watch",
  Ongoing = "Ongoing",
  Paused = "Paused",
  Dropped = "Dropped",
  Completed = "Completed",
}

export enum Type {
  // None = "",
  TV = "TV",
  Movie = "Movie",
}

export interface UserShow {
  id: string;
  userUID: string;
  title: string;
  status: Status;
  type: Type;
  currentEpisode: number | null;
  currentSeason: number | null;
  rating: number;
  releaseDate: Date | null;
  // startYear: number | null;
  // endYear: number | null;
}
