const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const callNumber = async (toNumber) => {
  const twiml = `
    <Response>
      // ลองใช้เสียงพื้นฐานแทน Polly
      <Say language="th-TH">
        สวัสดีค่ะ นี่คือการทดสอบระบบค่ะ
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
