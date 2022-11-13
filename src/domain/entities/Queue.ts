import {v4 as uuid} from 'uuid'
import { 
  QueueEventName, 
  QueueEventListener, 
  QueueEventListenerCallback, 
  ScheduledDelivery 
} from '@/domain/types'
import { Message } from './Message'

export class Queue{
  static Events = QueueEventName

  private readonly id: string
  private readonly messages: Message[]
  private eventListeners: QueueEventListener[]
  private readonly scheduledDeliveries: ScheduledDelivery[]

  constructor(){
    this.id = uuid()
    this.messages = []
    this.eventListeners = []
    this.scheduledDeliveries = []
  }

  clear(): void{
    this.messages.length = 0
  }

  length(): number{
    return this.messages.length
  }

  getId(): string{
    return this.id
  }

  push(message: Message): Queue{
    this.messages.push(message)
    this.notify(Queue.Events.INCOMING_MESSAGE, message)
    this.scheduleDelivery(message)
    return this
  }

  on(eventName: QueueEventName, callback: QueueEventListenerCallback): void{
    this.eventListeners.push({
      eventName,
      callback,
      once: false
    })
  }

  private notify(eventName: QueueEventName, message: Message | undefined): void{
    const queue = this
    const listeners = this.getEventListenersByEventName(eventName)
    listeners.map( listener =>{
      try{
        listener.callback(message, queue, eventName)
      }
      catch(error: any){
        //
      }
    })
  }

  private getEventListenersByEventName(eventName: QueueEventName): QueueEventListener[]{
    return this.eventListeners.filter( eventListener => {
      return eventListener.eventName === eventName
    })
  }

  private scheduleDelivery(message: Message): void{
    if(message.isExpired()) return
    const delivery = ()=>{
      this.notify(Queue.Events.MESSAGE_DELIVERY, message)
    }
    const delay =  message.getDeliveryDelay()
    const timeout = setTimeout(delivery, delay)
    const scheduledDelivery: ScheduledDelivery = {
      message,
      timeout
    }
    this.scheduledDeliveries.push(scheduledDelivery)
  }

  cancelDeliveryById(messageId: string): void{
    this.scheduledDeliveries.forEach( schedule =>{
      if(schedule.message.getId() === messageId){
        clearTimeout(schedule.timeout)
      }
    })
  }

  unsubscribe(listener: QueueEventListenerCallback): void{
    this.eventListeners = this.eventListeners.filter( eventListener =>{
      return eventListener.callback !== listener
    })
  }
}
