import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    let transporter;
    let isTestAccount = false;
    let previewUrl = '';

    // Check if custom SMTP env variables exist
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Create a test account on the fly with Ethereal Email (Development fallback)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      isTestAccount = true;
    }

    // Compose the email
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'jaydeepbodar732@gmail.com', // Recipient is Jaydeep Bodar
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
          <h2 style="color: #0d9488; margin-top: 0; border-bottom: 2px solid #0d9488; padding-bottom: 8px;">New Contact Message</h2>
          <p style="margin: 16px 0;"><strong>Sender Name:</strong> ${name}</p>
          <p style="margin: 16px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-weight: bold; margin-bottom: 8px;">Message Content:</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #94a3b8; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info) || '';
    }

    return NextResponse.json({
      success: true,
      message: isTestAccount 
        ? 'Email sent successfully via test SMTP mail client!' 
        : 'Email sent successfully to Jaydeep!',
      isTestAccount,
      previewUrl,
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An error occurred while sending the email.' },
      { status: 500 }
    );
  }
}
