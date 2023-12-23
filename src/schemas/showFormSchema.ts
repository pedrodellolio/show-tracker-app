import { z } from "zod";
import firstLetterUpperCase from "../utils/firstLetterUpperCase";
import { Status, Type } from "../models/Show";

const currentYear = new Date().getFullYear();
export const createShowFormSchema = z.object({
  name: z
    .string()
    .min(1, "Field name is required")
    .transform((val) => firstLetterUpperCase(val)),
  currentEpisode: z.coerce.number().nullable(),
  currentSeason: z.coerce.number().nullable(),
  status: z.nativeEnum(Status),
  type: z.nativeEnum(Type),
  score: z.coerce.number().min(0).max(5).default(0),
  startYear: z.coerce.number().lte(currentYear).int().nullable(),
  endYear: z.coerce.number().int().nullable(),
});

export type CreateShowFormData = z.infer<typeof createShowFormSchema>;
