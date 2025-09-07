import { z } from "zod";

export const moodSchema = z.object({
   mood_name: z.string().nonempty("Mood name is required"),
  icon: z
    .any()
    .refine((file) => file instanceof File, { message: "Photo is required" }),
});


export const musicSchema = z.object({
  vide:z.string().nonempty("Vide is required"),
  location: z.string().nonempty("Location is required"),
  caption: z.string().nonempty("Caption is required"),
  visibility: z.string().nonempty("Visibility is required"),
  audio: z
    .any()
    .refine((file) => file instanceof File, { message: "Audio is required" }),
});
