import { z } from "zod";

const isValidDate = (value: string) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const birthDataSchema = z.object({
  gregorianDate: z.string().refine(isValidDate, "Invalid date"),
  longitude: z.number().min(-180).max(180),
  gender: z.enum(["Male", "Female"]),
});

export type BirthDataInput = z.infer<typeof birthDataSchema>;
