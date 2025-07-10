const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const callNumber = async (toNumber) => {
  const twiml = `
    <Response>
      <Say voice="Polly.Kanya" language="th-TH">
        สวัสดีค่ะ
        <Pause length="1"/>
        โปรโมชั่นพิเศษจาก PG DOG
        <Pause length="1"/>
        ฝากแปดสิบแปด รับหนึ่งร้อยแปดสิบแปด
        <Pause length="1"/>
        ทำเทิร์นสี่เท่า
        <Pause length="1"/>
        ถอนได้สูงสุดหกร้อยแปดสิบแปดบาท
        <Pause length="1"/>
        อย่าลืมมารับโปรนะคะ
      </Say>
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
