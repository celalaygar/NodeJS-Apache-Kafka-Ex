module.exports = {
  kafka: {
    TOPIC: 'message-log',
    BROKERS: ['localhost:9092'],
    GROUPID: 'bills-consumer-group',
    CLIENTID: 'sample-kafka-client'
  }
}