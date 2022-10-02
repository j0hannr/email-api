export default async function handler(req, res) {

    // Require:
    var postmark = require("postmark");

    // Send an email:
    var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

    // Get Server Host URL with https://
    const host = "http://"+req.headers.host;

    const mail = await client.sendEmail({
        "From": "account@viadukt.de",
        "To": "rohn@viadukt.de",
        // "To": "rohn@viadukt.de, johann@arrenberg.studio, johann.rohn@gmail.com",
        "Subject": "Hello from Postmark",
        "HtmlBody": "<strong>Hello</strong> dear Postmark user. " + host,
        "TextBody": "Hello from Postmark!",
        "MessageStream": "energiequartier-signin"
    });

    res.status(200).json({ name: 'John Doe', mail })
  }
  