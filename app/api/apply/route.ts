import { NextResponse } from "next/server"
import { getEmailConfig, getResendClient } from "@/lib/email"
import { applySchema } from "@/lib/validation"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = applySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid application data." }, { status: 400 })
    }

    const resend = getResendClient()
    const { recipient, from } = getEmailConfig()

    if (!resend || !recipient || !from) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and JASON_INBOX_EMAIL.",
        },
        { status: 500 },
      )
    }

    const values = parsed.data

    await resend.emails.send({
      from,
      to: recipient,
      subject: `New IUL Application: ${values.fullName}`,
      replyTo: values.email,
      text: [
        `Full Name: ${values.fullName}`,
        `DOB: ${values.dob}`,
        `Gender: ${values.gender}`,
        `State: ${values.state}`,
        `Smoker Status: ${values.smokerStatus}`,
        `Major Conditions: ${values.majorConditions}`,
        `Monthly Contribution: ${values.monthlyContribution}`,
        `Death Benefit Target: ${values.deathBenefitTarget}`,
        `Primary Goal: ${values.primaryGoal}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Best Time to Call: ${values.bestTimeToCall}`,
      ].join("\n"),
    })

    return NextResponse.json({ message: "Application submitted successfully." })
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 })
  }
}
