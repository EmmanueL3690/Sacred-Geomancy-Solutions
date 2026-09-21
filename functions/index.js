const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.sendUserEmail = functions.firestore
  .document("userDetails/{docId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    // Email details
    const output = `
      <h2>New User Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Whatsapp:</strong> ${data.WhatsappNumber}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number Picked:</strong> ${JSON.stringify(data.numberPicked)}</p>
    `;

    // Email transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "geomancysolutions@gmail.com",
        pass: "zgcr nevu pbtk csne"
      }
    });

    let mailOptions = {
      from: '"Site Notification" <YOUR_EMAIL@gmail.com>',
      to: "YOUR_EMAIL@gmail.com", 
      subject: "New User Submitted Details",
      html: output
    };

    await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully!");
  });
