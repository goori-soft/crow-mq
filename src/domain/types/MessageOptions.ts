import { TopicName } from './TopicName'

export type MessageOptions = {
  topicName?: TopicName
  deliveryDate?: Date | string
  expiryDate?: Date |  string
}
