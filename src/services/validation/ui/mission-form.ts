import { ContractEnum } from "@/services/missions/type"
import { z } from "zod"

export const MissionFormSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(4, "Title is required"),
  company: z.string().min(1, "Company name is required"),
  expirationDate: z.date().optional(),
  salary: z.number().min(0, "Salary must be a positive number").default(0),
  description: z.string().min(20, "Description is required (20 characters)"),
  
  // Job details
  type: z.nativeEnum(ContractEnum),
  analytics: z.boolean().default(true),
  url: z.string()
    .url({ message: "Must be a valid URL" })
    .or(z.literal(""))
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  
  // Rating and categorization
  level: z.number().min(0).max(10),
  source: z.string(),
  technologies: z.array(z.string())
})

export type MissionSchemaType = z.infer<typeof MissionFormSchema>
