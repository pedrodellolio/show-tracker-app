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

export interface Show {
  id: string;
  name: string;
  type: Type;
  status: Status;
  currentEpisode: number | null;
  currentSeason: number | null;
  score: number;
  startYear: number | null;
  endYear: number | null;
}
