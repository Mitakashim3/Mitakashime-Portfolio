

import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Configure your email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail address
      pass: process.env.GMAIL_PASS, // your Gmail app password
    }
  });

  const mailOptions = {
  from: process.env.GMAIL_USER, // should be your Gmail
  to: process.env.GMAIL_USER,   // your receiving Gmail
  subject: `New contact form message from ${name}`,
  text: `From: ${name}\nEmail: ${email}\n\n${message}`,
  replyTo: email                // <--- This makes "Reply" go to sender
}

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
