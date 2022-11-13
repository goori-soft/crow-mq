import { GroupOptions } from "@/domain/types";
import { Consumer } from "@/domain/interfaces";
import { Message } from "./Message";
import { TextInput } from "./TextInput";

export class Group{
  private readonly name: string
  private readonly consumerSet: Set<Consumer> = new Set()
  private pointer: number = -1

  constructor(options: GroupOptions){
    this.name = new TextInput(options.name, 'Group name').notBlank().getValue()
  }

  push(consumer: Consumer): Group{
    this.consumerSet.add(consumer)
    return this
  }

  totalConsumers(): number{
    return this.consumerSet.size
  }

  is(name: string): boolean{
    return this.name === name
  }

  notify(message: Message): Group{
    if(this.consumerSet.size <= 0) return this
    this.increasePointer()
    const consumer = this.getCurrentConsumer()
    if(consumer !== undefined) consumer.send(message)
    return this
  }

  private increasePointer(): number{
    this.pointer++
    if(this.pointer >= this.consumerSet.size) this.pointer = 0
    return this.pointer
  }

  private getCurrentConsumer(): Consumer | undefined{
    if(this.pointer < 0) return undefined
    return [...this.consumerSet][this.pointer]
  }

  getName(): string{
    return this.name
  }
}