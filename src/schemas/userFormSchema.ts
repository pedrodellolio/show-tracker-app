import { z } from "zod";
import firstLetterUpperCase from "../utils/firstLetterUpperCase";

export const createUserFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "Field first name is required")
    .transform((x) => firstLetterUpperCase(x)),
  lastName: z
    .string()
    .min(1, "Field last name is required")
    .transform((x) => firstLetterUpperCase(x)),
  userName: z.string().min(1, "Field username is required"),
  email: z.string().min(1, "Field email is required").email("Email invalid"),
  password: z.string().min(6, "Field password is required"),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
