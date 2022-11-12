import { MessageOptions, TopicName } from "@/domain/types"
import { v4 as uuid } from 'uuid';

export class Message{
  private readonly id: string
  private readonly body: Buffer
  private readonly topicName?: TopicName
  private readonly deliveryDate?: Date
  private readonly expiryDate?: Date

  constructor(body: string | Buffer, options?: MessageOptions){
    this.topicName = options?.topicName
    this.deliveryDate = options?.deliveryDate ? new Date(options?.deliveryDate) : undefined
    this.expiryDate = options?.expiryDate ? new Date(options.expiryDate) : undefined
    this.body = Buffer.from(body)
    this.id = uuid()
  }

  getBody(): string{
    return this.body.toString('utf-8')
  }

  getId(): string {
    return this.id
  }

  getTopic(): string | undefined{
    return this.topicName
  }

  isExpired(): boolean{
    const NOW = new Date()
    if(this.expiryDate === undefined) return false
    if(this.expiryDate < NOW) return false
    return true
  }

  getDeliveryDelay(): number {
    if(this.deliveryDate === undefined) return 0
    const now = new Date().getTime()
    const deliveryTime = this.deliveryDate.getTime()
    const delay = deliveryTime - now
    return delay > 0 ? delay : 0
  }
}
