// import nodemailer from 'nodemailer'

// export const sendEmail = () => {
//   return async (context) => {
//     const userEmail = context.data.email
//     const userData = context.data

//     console.log('User Data')
//     console.log(userData)

//     console.log('userEmail')
//     console.log(userEmail)

//     await main(userEmail, userData).catch(console.error)

//     return context
//   }
// }

// async function main(userEmail, userData) {
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.email,
//       pass: process.env.devpassword
//     }
//   })

//   const textMessage = `Welcome to Report Card Management System. Your registered Email is ${userData.email} and your Password is ${userData.password}.`

//   let info = await transporter.sendMail({
//     from: process.env.email,
//     to: userEmail, // Specify the recipient email address here
//     subject: 'Password Change at Report Card Management System.',
//     text: textMessage
//   })
// }

import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, body, attachments }) => {
  try {
    // Create a transporter using your email service provider's configuration
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email, // Replace with your email username
        pass: process.env.devpassword, // Replace with your email password
      },
    });

    // Compose the email
    let info = await transporter.sendMail({
      from: process.env.email, // Replace with your email address
      to: to,
      subject: subject,
      text: body,
      attachments: attachments,
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
