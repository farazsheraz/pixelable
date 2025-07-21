// // Follow this setup guide to integrate the Deno language server with your editor:
// // https://deno.land/manual/getting_started/setup_your_environment
// // This enables autocomplete, go to definition, etc.

// // Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-contact-email' \
//     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//     --header 'Content-Type: application/json' \
//     --data '{"name":"Functions"}'

// */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (reqs) => {
  if (reqs.method === "OPTIONS") {
    // Handle CORS preflight request
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "https://pixelable.netlify.app/", // Or restrict to your domain
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const body = await reqs.json();
  const resendApiKey = Deno.env.get("re_U4Gp1Rey_Eem48GYh4LKaF7WBngPtqAHg");
  if (!resendApiKey) {
    return new Response("Missing Resend API key", { status: 500 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Pixelable Contact <farazahmed9094@gmail.com>",
      to: ["farazahmed9094@gmail.com"],
      subject: "📩 New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${body.firstname} ${body.lastname}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Plan:</strong> ${body.selected_plan}</p>
        <p><strong>Budget:</strong> ${body.plan_budget}</p>
        <p><strong>Service:</strong> ${body.selected_service}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(`Failed to send: ${error}`, { status: 500 });
  }

  return new Response(
    JSON.stringify({ success: true, message: "Email sent" }),
    {
      headers: { "Content-Type": "application/json" },
      status: 200,
    },
  );
});
