import { Show } from "../models/Show";

export default function formatShowsGrid(shows: Show[]) {
  return shows.map((show) => {
    return {
      id: show.id,
      col1: show.name,
      col2: transformZeroOrNullValues(show.currentEpisode),
      col3: transformZeroOrNullValues(show.currentSeason),
      col4: show.status,
      col5: show.type,
      col6: show.score,
      col7: transformZeroOrNullValues(show.startYear),
      col8: transformZeroOrNullValues(show.endYear),
    };
  });
}

function transformZeroOrNullValues(value: number | null) {
  return value === 0 || value === null ? "N/A" : value;
}
