import { TopicName } from "@/domain/types";

export class TopicAlreadyExists extends Error{
  constructor(topicName: TopicName){
    super(`The topic '${topicName} already exists`)
  }
}
