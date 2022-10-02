import * as mjmlReact from "@faire/mjml-react";

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
  const { html, errors } = mjmlReact.render(
    <mjmlReact.Mjml>
      <mjmlReact.MjmlHead>
        <mjmlReact.MjmlFont
          name="Barlow"
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;700;800&display=swap"
        />
        <mjmlReact.MjmlAttributes>
          <mjmlReact.MjmlButton inner-padding="0" />
          <mjmlReact.MjmlStyle>
            {`
                  .link-nostyle { color: inherit; text-decoration: none }; 
                  .apple-link-black a,
                  .apple-link-black,
                  .apple-link-black div a  { color:#000 !important; text-decoration:none; } 
                  .apple-link-blue a,
                  .apple-link-blue,
                  .apple-link-blue div a  { color:#3292EA !important; text-decoration:none; } 
                  .btn-link a:hover { background-color: #2B6FAE; } 
                  .hover:hover td, .hover:hover p { background-color: #2B6FAE !important; }
                `}
          </mjmlReact.MjmlStyle>
        </mjmlReact.MjmlAttributes>
      </mjmlReact.MjmlHead>
      <mjmlReact.MjmlBody background-color="#EBEFFB">
        <mjmlReact.MjmlWrapper padding="40px 15px">
          <mjmlReact.MjmlSection background-color="#fff" border-radius="25px">
            <mjmlReact.MjmlColumn>
              <mjmlReact.MjmlText
                css-class="apple-link-black"
                font-size="20px"
                font-family="Barlow"
                font-weight="800"
              >
                <a href="#">
                  energie<span style={{ color: "#3292EA" }}>quartier.io</span>
                </a>
              </mjmlReact.MjmlText>
              <mjmlReact.MjmlText
                font-size="40px"
                font-weight="800"
                font-family="Barlow"
              >
                Willkommen im energiequartier.
              </mjmlReact.MjmlText>
              <mjmlReact.MjmlButton
                align="left"
                font-size="18px"
                padding="20px"
                inner-padding="16px 20px"
                border-radius="15px"
                font-weight="700"
                font-family="Barlow"
                background-color="#3292EA"
                title="Zum Dashboard"
                css-class="hover"
                // href={url}
              >
                Zum Dashboard
              </mjmlReact.MjmlButton>
              <mjmlReact.MjmlImage
                src={`${host}/images/mail/immobilie-registrieren.png`}
              />
              <mjmlReact.MjmlImage
                src={`${host}/images/mail/öffentliche-daten-finden.png`}
              />
              <mjmlReact.MjmlImage
                src={`${host}/images/mail/gebäudeanalyse-freischalten.png`}
              />
            </mjmlReact.MjmlColumn>
          </mjmlReact.MjmlSection>
          <mjmlReact.MjmlSection
            full-width="full-width"
            text-align="left"
            padding="15px 0px 0px 0px"
          >
            <mjmlReact.MjmlColumn padding="0px">
              <mjmlReact.MjmlText
                align="left"
                font-size="15px"
                font-weight="500"
                font-family="Barlow"
              >
                Wenn Du diese E-Mail nicht angefordert hast, kannst du sie
                einfach ignorieren.
              </mjmlReact.MjmlText>
            </mjmlReact.MjmlColumn>
          </mjmlReact.MjmlSection>
        </mjmlReact.MjmlWrapper>
      </mjmlReact.MjmlBody>
    </mjmlReact.Mjml>,
    { validationLevel: "soft" }
  );
  return html;
}
