import { z } from "zod";

export const moodSchema = z.object({
   mood_name: z.string().nonempty("Mood name is required"),
  icon: z
    .any()
    .refine((file) => file instanceof File, { message: "Photo is required" }),
});
