
const { Kafka } = require("kafkajs")
const config = require('./config')


createConsumer();
 
async function createConsumer(){
    try { 
        const clientId = config.kafka.CLIENTID
        const brokers = config.kafka.BROKERS
        const topic = config.kafka.TOPIC
        const kafka = new Kafka({ clientId, brokers })
        
        const consumer = kafka.consumer({
            groupId: config.kafka.GROUPID
        })
        await consumer.connect();
        await consumer.subscribe({
            topic: topic, 
            fromBeginning: true
        });
        await consumer.run({
            eachMessage:  async result => { 
                console.log('Consumer key : ',result.message.key.toString('utf8'),' value : ',result.message.value.toString('utf8'),' Partition : ',result.partition) ;
            }
        });

    } catch (error) {
        console.log("Error occured. ",error)
    } 
}