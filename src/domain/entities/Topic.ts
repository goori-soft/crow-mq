import { TopicName, TopicOptions } from "@/domain/types";
import { Consumer } from '@/domain/interfaces'
import { TopicAlreadyExists } from "@/domain/errors";
import { Queue } from './Queue'
import { Group } from "./Group";
import { Message } from ".";

const topicMemory: Map<TopicName, Topic> = new Map()

export class Topic{
  private readonly topicName: TopicName
  public readonly queue: Queue
  public readonly groupSet: Set<Group>

  constructor(options: TopicOptions){
    this.topicName = options.topicName
    if(topicMemory.has(this.topicName)) throw new TopicAlreadyExists(this.topicName)
    topicMemory.set(this.topicName, this)
    this.groupSet = new Set()
    this.queue = new Queue()
    this.queue.on(Queue.Events.MESSAGE_DELIVERY, (message)=>{
      this.notifyGroups(message)
    })
  }

  attachConsumer(consumer: Consumer, groupName: string): void {
    const group = this.getGroupByName(groupName)
    group.push(consumer)
  }

  private getGroupByName(groupName: string): Group{
    for(let group of this.groupSet){
      if(group.is(groupName)) return group
    }
    const group = new Group({name: groupName})
    this.groupSet.add(group)
    return group
  }

  private notifyGroups(message: Message | undefined): void{
    if(message === undefined) return
    for(let group of this.groupSet) group.notify(message)
  }

  static clear(): void{
    topicMemory.clear()
  }

  static create(options: TopicOptions){
    const topic = Topic.getByName(options.topicName)
    if(topic !== undefined) return topic
    return new Topic(options)
  }

  static getByName(topicName: TopicName): Topic | undefined {
    if(topicMemory.has(topicName)) return topicMemory.get(topicName)
    return undefined
  }
}