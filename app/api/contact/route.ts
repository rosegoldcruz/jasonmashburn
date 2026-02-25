import { NextResponse } from "next/server"
import { getEmailConfig, getResendClient } from "@/lib/email"
import { contactSchema } from "@/lib/validation"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid contact form data." }, { status: 400 })
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
      subject: `Contact Inquiry: ${values.name}`,
      replyTo: values.email,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone}`,
        `Message: ${values.message}`,
      ].join("\n"),
    })

    return NextResponse.json({ message: "Message sent successfully." })
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 })
  }
}
