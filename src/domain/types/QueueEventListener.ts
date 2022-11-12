import { QueueEventName } from "./QueueEventName"
import { QueueEventListenerCallback } from './QueueEventListenerCallback'

export type QueueEventListener = {
  eventName: QueueEventName
  callback: QueueEventListenerCallback
  once: boolean
}