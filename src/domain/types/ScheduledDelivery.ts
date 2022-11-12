import { Message } from "../entities"

export type ScheduledDelivery = {
  message: Message
  timeout: NodeJS.Timeout
}
