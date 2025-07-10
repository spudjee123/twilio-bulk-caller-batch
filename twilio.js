const twilio = require('twilio');
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const callNumber = async (toNumber) => {
  const twiml = `
    <Response>
      <Say voice="Polly.Kanya" language="th-TH">
        สวัสดีค่ะ ขอแนะนำสมาชิกจากทาง PG DOG โปรโมชั่นพิเศษ วันเข้าพรรษา
        โปรสายบุญ ฝากแล้วแตก (ไม่ต้องจุดธูป!)
        ฝาก 88 รับ 188 ทำเทิร์น 4 เท่า ถอนได้สูงสุด 688 บาท อย่าลืมมารับโปรนะคะ
      </Say>
      <Hangup/>
    </Response>
  `;

  const response = await client.calls.create({
    to: toNumber,
    from: process.env.TWILIO_FROM_NUMBER,
    twiml: twiml
  });

  return response;
};

module.exports = { callNumber };
