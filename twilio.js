const twilio = require("twilio");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function callNumber(to) {
  return client.calls.create({
    url: process.env.TWIML_URL,
    to,
    from: process.env.TWILIO_FROM_NUMBER,
  });
}

module.exports = { callNumber };
