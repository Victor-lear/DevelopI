const mqtt = require('mqtt');

// Gets the credentials for connecting the IoTHub service
//const esServices = JSON.parse(process.env.ENSAAS_SERVICES);
//const rabbitmqCreds = esServices['p-rabbitmq'][0].credentials;
//const mqttUri = rabbitmqCreds.protocols.mqtt.uri;

/**
 * Connects to IotHub and Subcribes to the topic when the connection is made.
 */
const client = mqtt.connect("mqtt://ed6e5a2a-5899-11ea-8729-f6bfce9fbbfd%3AKvqY0jOYgYek:a1U2yLvfsKjf0zpPy8sf@rabbitmq-001.sa.wise-paas.com:1883");
const topic = 'greeting/guanchen/hou';     // Sets the topic to subscribe -> greeting/firsName/lastName

client.on('connect', (connack) => {
  logger('Connected to IoTHub');

  client.subscribe(topic, (err, granted) => {
    if (!err) logger(`Subscribed to ${topic}`);
  });
});

/**
 * Receives messages from the above topic. Publishes the message to another topic right away upon receiving it.
 */
client.on('message', (topic, message, packet) => {
  const msg = `Hey, I hear you say '${message.toString()}' on topic '${topic}'.`;

  client.publish('blackhole', msg, { qos: 1 }, (err, packet) => {
    if (!err) logger(`Message sent: ${msg}`);
  });
});

/**
 * Other MQTT events
 */
client.on('error', err => logger(err));
client.on('close', () => logger('[MQTT]: close'));
client.on('offline', () => logger("[MQTT]: offline"));

/**
 * Helper function
 */
function logger(s) {
  console.log(Date() + ' -- ' + s);
}
