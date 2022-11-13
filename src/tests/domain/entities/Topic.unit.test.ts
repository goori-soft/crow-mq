import { Message, Queue, Topic } from '@/domain/entities'
import { TopicAlreadyExists } from '@/domain/errors/TopicAlreadyExists'
import { makeSilentConsumer } from '@/tests/mock/makeSilentConsumer.mock'
import { sleep } from '@/tests/sleep'
describe("Topic entity", ()=>{

  beforeEach(()=>{
    Topic.clear()
  })
  it('Should create a new Topic using a static construcor', ()=>{
    const topicName = 'myTopic'

    const topic = Topic.create({topicName})

    expect(topic).toBeInstanceOf(Topic)
    expect(topic.queue).toBeInstanceOf(Queue)
  })

  it('Should return the same topic instance for the same topicName', ()=>{
    const topicName = 'myTopic'

    const topic1 = Topic.create({topicName})
    const topic2 = Topic.create({topicName})

    expect(topic1).toBe(topic2)
  })

  it('Should throw when try create a new topic with existent name using the constructor', ()=>{
    const topicName = 'myTopic'

    const topic1 = Topic.create({topicName})
    
    expect(()=>{
      const topic2 = new Topic({topicName})
    }).toThrowError(TopicAlreadyExists)
  })

  it('Should retrieve a topic by name', ()=>{
    const topicName = 'myTopic'

    const topic1 = Topic.create({topicName})
    const topic2 = Topic.getByName(topicName)

    expect(topic1).toBe(topic2)
  })

  it('Should insert and notify a new consumer', async ()=>{
    const NEXT = new Date( new Date().getTime() + 1000)
    const topicName = 'myTopic'
    const groupName = 'myGroup'
    const topic = Topic.create({topicName})
    const message1 = new Message('hello')
    const message2 = new Message('hi', {deliveryDate: NEXT})
    const consumer = makeSilentConsumer()
    topic.attachConsumer(consumer, groupName)
    
    topic.queue.push(message1)
    topic.queue.push(message2)
    await sleep(50)
    expect(consumer.send).toHaveBeenCalledTimes(1)
    await sleep(1000)
    expect(consumer.send).toHaveBeenCalledTimes(2)
  })
})