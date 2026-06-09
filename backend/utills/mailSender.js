import nodemailer from "nodemailer";

const sendResetPasswordMail = async (to, url) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER_EMAIL,
            pass: process.env.MAIL_SENDER_PASS 
        }
    });

    const mailOptions = {
        from: process.env.MAIL_SENDER_EMAIL,
        to: to,
        subject: "[Brew Bliss] Password Reset",
        html: `
        <div style="background-color:#f5f5f0; padding:40px; font-family:Arial, sans-serif;">
            <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e8e8e8;">

            <!-- Header -->
            <div style="background-color:#FEA90C; padding:36px 40px; text-align:center;">
                <div style="font-size:28px; font-weight:800; color:#1a1a1a;">Brew Bliss</div>
                <div style="margin-top:6px; font-size:11px; color:#1a1a1a; opacity:0.65; text-transform:uppercase; letter-spacing:1.5px;">Password Reset</div>
            </div>

            <!-- Body -->
            <div style="padding:36px 40px;">
                <p style="margin:0 0 24px; font-size:15px; color:#666; line-height:1.65;">
                Someone requested to reset the password for your Brew Bliss account. If this was a mistake, just ignore this email and nothing will happen.
                </p>

                <div style="background:#fffbf2; border-left:3px solid #FEA90C; border-radius:0 6px 6px 0; padding:16px 18px; margin-bottom:32px;">
                    <div style="font-size:15px; color:#333; line-height:1.7;">To reset your password, click the button below. This link will expire in <strong>15 minutes</strong>.</div>
                </div>

                <a href="${url}" style="display:inline-block; background:#FEA90C; padding:12px 28px; font-size:14px; font-weight:700; color:#1a1a1a; text-decoration:none; border-radius:8px;">
                Reset Password
                </a>
            </div>

            <!-- Footer -->
            <div style="background:#fafaf7; border-top:1px solid #f0f0f0; padding:24px 40px; text-align:center;">
                <div style="font-size:12px; color:#bbb; line-height:1.6;">
                Sent via Brew Bliss · © ${new Date().getFullYear()} Brew Bliss
                </div>
            </div>

            </div>
        </div>
        `
    };

    await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
        }
    });
}

const sendContactMail = async (to, name, phone, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER_EMAIL,
            pass: process.env.MAIL_SENDER_PASS 
        }
    });

    const mailOptions = {
    from: process.env.MAIL_SENDER_EMAIL,
    to: process.env.MAIL_SENDER_EMAIL,
    replyTo: to,
    subject: "[Brew Bliss] New Contact Form Submission",
    html: `
    <div style="background-color:#f5f5f0; padding:40px; font-family:Arial, sans-serif;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e8e8e8;">

        <!-- Header -->
        <div style="background-color:#FEA90C; padding:36px 40px; text-align:center;">
            <div style="font-size:28px; font-weight:800; color:#1a1a1a;">Brew Bliss</div>
            <div style="margin-top:6px; font-size:11px; color:#1a1a1a; opacity:0.65; text-transform:uppercase; letter-spacing:1.5px;">Contact Form Submission</div>
        </div>

        <!-- Body -->
        <div style="padding:36px 40px;">
            <p style="margin:0 0 24px; font-size:15px; color:#666; line-height:1.65;">
            You've received a new message through the Brew Bliss contact form.
            </p>

            <div style="border-bottom:1px solid #f0f0f0; padding:12px 0;">
            <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#FEA90C; font-weight:700; margin-bottom:3px;">Name</div>
            <div style="font-size:15px; color:#1a1a1a; font-weight:600;">${name}</div>
            </div>

            <div style="border-bottom:1px solid #f0f0f0; padding:12px 0;">
            <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#FEA90C; font-weight:700; margin-bottom:3px;">Email</div>
            <div style="font-size:15px; color:#1a1a1a; font-weight:600;">
                <a href="mailto:${to}" style="color:#1a1a1a; text-decoration:none;">${to}</a>
            </div>
            </div>

            <div style="border-bottom:1px solid #f0f0f0; padding:12px 0;">
            <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#FEA90C; font-weight:700; margin-bottom:3px;">Phone</div>
            <div style="font-size:15px; color:#1a1a1a; font-weight:600;">${phone}</div>
            </div>

            <div style="padding:12px 0 24px;">
            <div style="font-size:11px; text-transform:uppercase; letter-spacing:1px; color:#FEA90C; font-weight:700; margin-bottom:10px;">Message</div>
            <div style="background:#fffbf2; border-left:3px solid #FEA90C; border-radius:0 6px 6px 0; padding:16px 18px;">
                <div style="font-size:15px; color:#333; line-height:1.7;">${message}</div>
            </div>
            </div>

            <a href="mailto:${to}" style="display:inline-block; background:#FEA90C; padding:12px 28px; font-size:14px; font-weight:700; color:#1a1a1a; text-decoration:none; border-radius:8px;">
            Reply to ${name} →
            </a>
        </div>

        <!-- Footer -->
        <div style="background:#fafaf7; border-top:1px solid #f0f0f0; padding:24px 40px; text-align:center;">
            <div style="font-size:12px; color:#bbb; line-height:1.6;">
            Sent via the Brew Bliss contact form · © ${new Date().getFullYear()} Brew Bliss
            </div>
        </div>

        </div>
    </div>
    `,
    };

    await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log('success')
        }
    });
}

export {sendResetPasswordMail, sendContactMail}