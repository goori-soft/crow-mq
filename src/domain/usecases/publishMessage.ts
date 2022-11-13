import { Message, Topic } from "@/domain/entities";
import { 
  PublishMessageOptions, 
  PublishMessageAdapters 
} from "@/domain/types";

export async function publishMessage(publishMessageOptions: PublishMessageOptions, adapters: PublishMessageAdapters): Promise<void>{
  const { messageRepository } =  adapters
  const message = new Message(publishMessageOptions.body, publishMessageOptions)
  await messageRepository.save(message)
  const topicName  = message.getTopic()
  const topic = Topic.create({ topicName })
  topic.queue.push(message)
}