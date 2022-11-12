import { Message } from "../entities/Message";
import { PublishMessageOptions } from "../types/PublishMessageOptions";

export function publishMessage(publishMessageOptions: PublishMessageOptions){
  const message = new Message(publishMessageOptions.body, publishMessageOptions)
  
}