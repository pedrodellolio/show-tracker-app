import { z } from "zod";

export const createUserDetailsFormSchema = z.object({
  userName: z
    .string()
    .min(1, "Field username is required")
    .transform((x) => x.toLocaleUpperCase()),
});

export type CreateUserDetailsFormData = z.infer<
  typeof createUserDetailsFormSchema
>;
