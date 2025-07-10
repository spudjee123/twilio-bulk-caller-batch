const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const callNumber = async (toNumber) => {
  const twiml = `
    <Response>
      <Say voice="th-TH-Standard-A" language="th-TH">สวัสดีค่ะ</Say>
      <Pause length="1"/>
      <Say voice="th-TH-Standard-A" language="th-TH">โปรโมชั่นพิเศษจาก PG DOG</Say>
      <Pause length="1"/>
      <Say voice="th-TH-Standard-A" language="th-TH">ฝากแปดสิบแปด รับหนึ่งร้อยแปดสิบแปด</Say>
      <Pause length="1"/>
      <Say voice="th-TH-Standard-A" language="th-TH">ทำเทิร์นสี่เท่า</Say>
      <Pause length="1"/>
      <Say voice="th-TH-Standard-A" language="th-TH">ถอนได้สูงสุดหกร้อยแปดสิบแปดบาท</Say>
      <Pause length="1"/>
      <Say voice="th-TH-Standard-A" language="th-TH">อย่าลืมมารับโปรนะคะ</Say>
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