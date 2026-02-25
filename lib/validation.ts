import { z } from "zod"

export const applySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  state: z.string().min(2, "State is required"),
  smokerStatus: z.string().min(1, "Please select smoker status"),
  majorConditions: z.string().min(2, "Please provide health details"),
  monthlyContribution: z.string().min(1, "Select a contribution range"),
  deathBenefitTarget: z.string().min(2, "Enter a death benefit target"),
  primaryGoal: z.enum(["retirement_income", "legacy", "living_benefits"]),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  bestTimeToCall: z.string().min(2, "Share the best time to call"),
})

export type ApplyFormValues = z.infer<typeof applySchema>

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone"),
  message: z.string().min(10, "Please share at least 10 characters"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
