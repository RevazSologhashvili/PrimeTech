'use server'
import nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info.primetechteam@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
    }
});

export const sendMail = async (mailOptions: MailOptions) => {
    try {
        if (!process.env.GMAIL_APP_PASSWORD) {
            throw new Error('GMAIL_APP_PASSWORD environment variable is not set');
        }

        // Check if the 'from' email is different from the transporter email
        if (mailOptions.from !== 'info.primetechteam@gmail.com') {
            // Append the 'from' email to the body of the email
            mailOptions.text += `\n\nOriginal sender: ${mailOptions.from}`;
            if (mailOptions.html) {
                mailOptions.html += `<br><br>Original sender: ${mailOptions.from}`;
            }
            // Set the 'from' email to the transporter email
            mailOptions.from = 'info.primetechteam@gmail.com';
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

