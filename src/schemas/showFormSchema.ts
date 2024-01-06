import { z } from "zod";
import firstLetterUpperCase from "../utils/firstLetterUpperCase";
import { Status, Type } from "../models/UserShow";

// const currentYear = new Date().getFullYear();
export const createShowFormSchema = z.object({
  title: z
    .string()
    .min(1, "Field title is required")
    .transform((val) => firstLetterUpperCase(val)),
  currentEpisode: z.coerce.number().nullable().default(null),
  currentSeason: z.coerce.number().nullable().default(null),
  status: z.nativeEnum(Status).default(Status.ToWatch),
  type: z.nativeEnum(Type).default(Type.TV),
  rating: z.coerce.number().min(0).max(5).default(0),
  // startYear: z.coerce.number().lte(currentYear).int().nullable(),
  // endYear: z.coerce.number().int().nullable(),
});

export type CreateShowFormData = z.infer<typeof createShowFormSchema>;
