const sgMail = require('@sendgrid/mail')


class MailController {

    sendMessage = async (req, res) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: 'manzi.elyse27@gmail.com', // Change to your recipient
            from: 'asifiwemanzi@gmail.com', // Change to your verified sender
            subject: 'New driver requested',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }

        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
                res.send("mail sent")
            })
            .catch((error) => {
                console.error(error)
                res.status(500).send("error, not sent")
            })
    }

}

module.exports = MailController