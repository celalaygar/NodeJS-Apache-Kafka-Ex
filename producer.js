const { Kafka } = require("kafkajs")


const sendMessage = async (producer, topic) => {

	let i = 0 

    console.log("prdoce started")
    await producer.connect()

    
	setInterval(async () => {
		try {
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: "Producer message is " + i,
					},
				],
			})
			console.log("Producer : ", i, "Producer message is " + i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
	}, 3000)

}
const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "message-log" 
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

sendMessage(producer, topic)
