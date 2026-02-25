export const SITE = {
  name: "Jason Mashburn",
  serviceArea: "Serving clients across Arizona",
  officeLocation: "Arizona office — virtual and in-person consultations by appointment",
  phone: process.env.NEXT_PUBLIC_JASON_PHONE || "Phone available after consultation request",
  email: process.env.NEXT_PUBLIC_JASON_EMAIL || "inbox not configured",
  recipientEmail: process.env.JASON_INBOX_EMAIL,
}

export const COMPLIANCE_COPY =
  "Jason Mashburn is a licensed insurance agent in the state of Arizona. Products offered through Bankers Life. Indexed Universal Life insurance is not a securities product and is not subject to SEC or FINRA regulation. Policy performance is subject to carrier terms, caps, and participation rates. All illustrations are hypothetical and not a guarantee of future results."
