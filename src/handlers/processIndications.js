const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const sns = new AWS.SNS();

const WARN = 700; // warning threshold
const EMERG = 800; // emergency threshold

module.exports.handler = async (event) => {
  const [record] = event.Records;
  try {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString();
    const {temp, reactor, date} = JSON.parse(payload);
    // save records to the dynamodb
    await dynamodb.putItem({
      TableName: 'indications-table',
      Item: {
        recordId: { S: record.eventID },
        temp: { N: String(temp) },
        reactor: { S: reactor },
        date: { S: date }
      }
    }).promise();
  
    if (temp >= WARN) {
      console.log('Overheat!');
      // publish messages to special SNS topic
      await sns.publish({
        TopicArn: process.env.NOTIFICATIONS_TOPIC_ARN,
        Subject: temp >= EMERG ? 'emergency' : 'warning',
        Message: `${reactor} coolant temperature is ${temp}°C!`
      }).promise();
    }
  } catch (err) {
    console.log(err);
  }
};