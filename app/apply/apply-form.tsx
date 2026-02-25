"use client"

import { useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { applySchema, type ApplyFormValues } from "@/lib/validation"

const steps = ["Personal Info", "Health Questions", "Coverage Goals", "Contact Preferences"]

export function ApplyForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "",
      dob: "",
      gender: "",
      state: "AZ",
      smokerStatus: "",
      majorConditions: "",
      monthlyContribution: "",
      deathBenefitTarget: "",
      primaryGoal: "retirement_income",
      email: "",
      phone: "",
      bestTimeToCall: "",
    },
  })

  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep])

  const stepFields: (keyof ApplyFormValues)[][] = [
    ["fullName", "dob", "gender", "state"],
    ["smokerStatus", "majorConditions"],
    ["monthlyContribution", "deathBenefitTarget", "primaryGoal"],
    ["email", "phone", "bestTimeToCall"],
  ]

  const nextStep = async () => {
    const valid = await trigger(stepFields[currentStep])
    if (valid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const onSubmit = async (values: ApplyFormValues) => {
    setServerError(null)

    const response = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const result = (await response.json()) as { error?: string }

    if (!response.ok) {
      setServerError(result.error || "Unable to submit application.")
      return
    }

    window.dispatchEvent(new CustomEvent("stamp-impact", { detail: { label: "APPROVED" } }))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-card p-8">
        <h2 className="text-3xl text-primary">Application Received</h2>
        <p className="mt-4 text-muted-foreground">
          Jason has your information and will review your goals and underwriting profile. Next step is a consultation
          call to discuss assumptions, policy structure, and illustration options.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          <span>Step {currentStep + 1} of 4</span>
          <span>{steps[currentStep]}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {currentStep === 0 ? (
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName ? <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" {...register("dob")} />
              {errors.dob ? <p className="mt-1 text-xs text-destructive">{errors.dob.message}</p> : null}
            </div>
            <div>
              <Label>Gender</Label>
              <Select onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non_binary">Non-binary</SelectItem>
                  <SelectItem value="prefer_not_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender ? <p className="mt-1 text-xs text-destructive">{errors.gender.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...register("state")} />
              {errors.state ? <p className="mt-1 text-xs text-destructive">{errors.state.message}</p> : null}
            </div>
          </section>
        ) : null}

        {currentStep === 1 ? (
          <section className="space-y-4">
            <div>
              <Label>Smoker Status</Label>
              <Select onValueChange={(value) => setValue("smokerStatus", value, { shouldValidate: true })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never smoked</SelectItem>
                  <SelectItem value="former">Former smoker</SelectItem>
                  <SelectItem value="current">Current smoker</SelectItem>
                </SelectContent>
              </Select>
              {errors.smokerStatus ? <p className="mt-1 text-xs text-destructive">{errors.smokerStatus.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="majorConditions">Major Conditions / Relevant Health Notes</Label>
              <Textarea id="majorConditions" rows={6} {...register("majorConditions")} />
              {errors.majorConditions ? (
                <p className="mt-1 text-xs text-destructive">{errors.majorConditions.message}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {currentStep === 2 ? (
          <section className="space-y-4">
            <div>
              <Label>Monthly Contribution Range</Label>
              <Select onValueChange={(value) => setValue("monthlyContribution", value, { shouldValidate: true })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select monthly range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="250-500">$250 - $500</SelectItem>
                  <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500-plus">$2,500+</SelectItem>
                </SelectContent>
              </Select>
              {errors.monthlyContribution ? (
                <p className="mt-1 text-xs text-destructive">{errors.monthlyContribution.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="deathBenefitTarget">Death Benefit Target</Label>
              <Input id="deathBenefitTarget" placeholder="$500,000" {...register("deathBenefitTarget")} />
              {errors.deathBenefitTarget ? (
                <p className="mt-1 text-xs text-destructive">{errors.deathBenefitTarget.message}</p>
              ) : null}
            </div>
            <div>
              <Label>Primary Goal</Label>
              <Select
                defaultValue={watch("primaryGoal")}
                onValueChange={(value) =>
                  setValue("primaryGoal", value as ApplyFormValues["primaryGoal"], { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retirement_income">Retirement Income</SelectItem>
                  <SelectItem value="legacy">Legacy Planning</SelectItem>
                  <SelectItem value="living_benefits">Living Benefits</SelectItem>
                </SelectContent>
              </Select>
              {errors.primaryGoal ? <p className="mt-1 text-xs text-destructive">{errors.primaryGoal.message}</p> : null}
            </div>
          </section>
        ) : null}

        {currentStep === 3 ? (
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p> : null}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
              <Input id="bestTimeToCall" placeholder="Weekdays after 3 PM" {...register("bestTimeToCall")} />
              {errors.bestTimeToCall ? (
                <p className="mt-1 text-xs text-destructive">{errors.bestTimeToCall.message}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0 || isSubmitting}>
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
