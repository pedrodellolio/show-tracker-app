import axiosInstance from "../api/axios";
import { Show } from "../models/Show";
import { Type } from "../models/UserShow";

const DEFAULT_LANGUAGE = "en-US";
const DEFAULT_PAGE = 1;

export async function findShowByTitle(type: string, title: string) {
  if (title === "") return [];
  const response = await axiosInstance.get(
    `/${type.toLocaleLowerCase()}?query=${title}&language=${DEFAULT_LANGUAGE}&page=${DEFAULT_PAGE}`
  );
  const results: any[] = response.data.results;
  if (type === Type.TV) {
    return results.map((result: any) => ({
      ...result,
      title: result.name,
      original_title: result.original_name,
      release_date: result.first_air_date,
    })) as Show[];
  }
  return response.data.results as Show[];
}
