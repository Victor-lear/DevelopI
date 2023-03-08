const mqtt = require('mqtt')

/** 
 * -- Gets credentials from env variables
 */
// const esServices = JSON.parse(process.env.ENSAAS_SERVICES);
// const mqttUri = esServices['p-rabbitmq'][0].credentials.protocols.mqtt.uri

/** 
 * Use credentials directly from local device
 * Ispect the credentials inside the secret and fill out the following variables.
 */
// ---mqtt---
const username = 'ed6e5a2a-5899-11ea-8729-f6bfce9fbbfd:KvqY0jOYgYek';
const password = 'a1U2yLvfsKjf0zpPy8sf';
const externalHosts = 'rabbitmq-001-pub.sa.wise-paas.com';


const mqttUri = `mqtt://${username}:${password}@${externalHosts}:1883`;

/** 
 * Connects to the IoTHub service using MQTT URI
 */
const client = mqtt.connect(mqttUri);
client.on('connect', (connack) => {
  setInterval(() => {
    publishMockTemp();
  }, 3000);
});

/** 
 * Publish mock random temperature periodically 
 */
function publishMockTemp() {
  const temp = Math.floor((Math.random() * 8) + 22);
// Please fill in your own number, user can check it in in your mqtt pod, use $kubectl logs -f pod_name
  client.publish('livingroom/temperature/9103270123', temp.toString(), { qos: 0 }, (err, packet) => {
    if (!err) console.log('Data sent to livingroom/temperature -- ' + temp);
  });
}
