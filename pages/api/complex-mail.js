import {
    render,
    Mjml,
    MjmlHead,
    MjmlTitle,
    MjmlPreview,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlButton,
    MjmlImage,
  } from "@faire/mjml-react";

export default async function handler(req, res) {
  // Require:
  var postmark = require("postmark");

  // Send an email:
  var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

  // Get Server Host URL with https://
  const host = "http://"+req.headers.host;

  const mail = await client.sendEmail({
    From: "account@viadukt.de",
    To: "rohn@viadukt.de",
    // "To": "rohn@viadukt.de, johann@arrenberg.studio, johann.rohn@gmail.com",
    Subject: "Hello from Postmark",
    HtmlBody:  MailHtml(host),
    TextBody: "Hello from Postmark!",
    MessageStream: "energiequartier-signin",
  });

  res.status(200).json({ name: "John Doe", mail });
}

function MailHtml(host) {
    const { html, errors } = render(
        <Mjml>
          <MjmlHead>
            <MjmlTitle>Last Minute Offer</MjmlTitle>
            <MjmlPreview>Last Minute Offer...</MjmlPreview>
          </MjmlHead>
          <MjmlBody width={500}>
            <MjmlSection fullWidth backgroundColor="#efefef">
              <MjmlColumn>
                <MjmlImage src="https://static.wixstatic.com/media/5cb24728abef45dabebe7edc1d97ddd2.jpg" />
              </MjmlColumn>
            </MjmlSection>
            <MjmlSection>
              <MjmlColumn>
                <MjmlButton
                  padding="20px"
                  backgroundColor="#346DB7"
                  href="https://www.wix.com/"
                >
                  I like it!
                </MjmlButton>
              </MjmlColumn>
            </MjmlSection>
          </MjmlBody>
        </Mjml>,
        { validationLevel: "soft" }
      );
  return html;
}
