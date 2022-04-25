
const { Kafka } = require("kafkajs")



// async function createConsumer() {
//     const clientId = "my-app"
//     const brokers = ["localhost:9092"]
//     const topic = "message-log"
//     const kafka = new Kafka({ clientId, brokers })

//     const consumer = kafka.consumer({
//         groupId: "bills-consumer-group"
//     })
//     consumer.run({
//         eachMessage: async ({ message }) => {
//             try {
//                 const jsonObj = JSON.parse(message.value.toString())
//                 console.log(jsonObj)

//             } catch (error) {
//                 console.log('err=', error)
//             }
//         }
//     })
// }


createConsumer();
 
async function createConsumer(){
    try { 
        const clientId = "my-app"
        const brokers = ["localhost:9092"]
        const topic = "message-log"
        const kafka = new Kafka({ clientId, brokers })
    
        const consumer = kafka.consumer({
            groupId: "bills-consumer-group"
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