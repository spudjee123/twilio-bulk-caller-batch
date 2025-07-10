const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const callNumber = async (toNumber) => {
  const twiml = `
    <Response>
      <Say voice="Polly.Kanya">สวัสดีค่ะ</Say>
      <Pause length="1"/>
      <Say voice="Polly.Kanya">โปรโมชั่นพิเศษจาก PG DOG</Say>
      <Pause length="1"/>
      <Say voice="Polly.Kanya">ฝากแปดสิบแปด รับหนึ่งร้อยแปดสิบแปด</Say>
      <Pause length="1"/>
      <Say voice="Polly.Kanya">ทำเทิร์นสี่เท่า</Say>
      <Pause length="1"/>
      <Say voice="Polly.Kanya">ถอนได้สูงสุดหกร้อยแปดสิบแปดบาท</Say>
      <Pause length="1"/>
      <Say voice="Polly.Kanya">อย่าลืมมารับโปรนะคะ</Say>
      <Hangup/>
    </Response>
  `;

  try {
    const response = await client.calls.create({
      to: toNumber,
      from: process.env.TWILIO_FROM_NUMBER,
      twiml: twiml
    });

    console.log("📞 Call initiated:", response.sid);
    return response;
  } catch (error) {
    console.error("❌ Error making call:", error.message);
    throw error;
  }
};

module.exports = { callNumber };