
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const formData = await req.json();

    if (!formData.email || !formData.fullName) {
      return NextResponse.json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: `New Booking from ${formData.fullName}`,
      text: `This is the details that you have entered in your booking form 
        Name: ${formData.fullName}
        Email: ${formData.email}
        Trip Start: ${formData.tripStartDate}
        Travellers: ${formData.numTravelers}
        DOB / Passport: ${formData.dob}
        Mobile: ${formData.mobile}
        Arrival: ${formData.arrivalDate}
        Departure: ${formData.departureDate}
        Pickup: ${formData.airportPickup}
        Dropoff: ${formData.airportDropoff}
        Insurance: ${formData.insurance}
        Payment Method: ${formData.paymentMethod}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
    );
  }
}
