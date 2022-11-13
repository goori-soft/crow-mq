import { AttachConsumerOptions, AttachConsumerAdapters } from "@/domain/types";
import { Topic } from "../entities";

export async function attachConsuer(options: AttachConsumerOptions, adapters: AttachConsumerAdapters): Promise<void>{
  const { consumerFactory } = adapters
  const consumer = consumerFactory.create(options.consumerType, {...options})
  const topic = Topic.create({ topicName: options.topic })
  topic.attachConsumer(consumer, options.group)
}
