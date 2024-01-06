import { Show } from "../models/Show";
import { UserShow } from "../models/UserShow";

export function formatShowsGrid(shows: UserShow[]) {
  return shows.map((show) => {
    return {
      id: show.id,
      col1: show.title,
      col2: transformZeroOrNullValues(show.currentEpisode),
      col3: transformZeroOrNullValues(show.currentSeason),
      col4: show.status,
      col5: show.type,
      col6: transformZeroOrNullValues(show.rating),
      // col7: transformZeroOrNullValues(show.startYear),
      // col8: transformZeroOrNullValues(show.endYear),
    };
  });
}

export function formatSearchedShowsGrid(shows: Show[]) {
  return shows.map((show) => {
    return {
      id: show.id,
      title: show.title,
      releaseDate: show.release_date,
      releaseYear: new Date(show.release_date).getFullYear(),
    };
  });
}

function transformZeroOrNullValues(value: number | null) {
  return value === 0 || value === null ? "-" : value;
}
