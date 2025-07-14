import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend";

serve(async (req) => {
  const body = await req.json();

  const resend = new Resend(Deno.env.get("RESEND_API_KEY")); // Load from .env

  try {
    const { error } = await resend.emails.send({
      from: "Pixelable Contact <onboarding@resend.dev>", // Use a verified sender
      to: ["admin@example.com"], // 🔁 Replace with your admin email
      subject: "🚀 New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${body.firstname} ${body.lastname}</p>
        <p><b>Email:</b> ${body.email}</p>
        <p><b>Plan:</b> ${body.selected_plan}</p>
        <p><b>Budget:</b> ${body.plan_budget}</p>
        <p><b>Service:</b> ${body.selected_service}</p>
        <p><b>Message:</b> ${body.message}</p>
      `,
    });

    if (error) {
      return new Response("Failed to send email: " + error.message, {
        status: 500,
      });
    }

    return new Response("Email sent successfully!", { status: 200 });
  } catch (err) {
    return new Response("Unexpected error: " + err.message, { status: 500 });
  }
});
