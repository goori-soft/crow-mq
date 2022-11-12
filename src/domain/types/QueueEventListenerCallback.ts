import { Message, Queue } from "@/domain/entities"
import { QueueEventName } from "./QueueEventName"

export type QueueEventListenerCallback = (message: Message | undefined, queue?: Queue, eventName?: QueueEventName) => any