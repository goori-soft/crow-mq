import { Message, Queue } from "@/domain/entities"
import { QueueEventName } from "@/domain/types"
import { makeMockMessage } from "@/tests/mock/makeMockMessage.mock"
import { sleep } from "@/tests/sleep"

describe("Message Queue entity", ()=>{

  it("Should create a new message queue", ()=>{
    const queue = new Queue()

    expect(queue.length()).toBe(0)
    expect(queue.getId()).toEqual(expect.any(String))
  })

  it("Should insert a new message in a message queue", ()=>{
    const queue = new Queue()
    const message = makeMockMessage()

    queue.push(message)

    expect(queue.length()).toBe(1)
  })

  it('Should notify a listener when a message is pushed', ()=>{
    const queue = new Queue()
    const message = makeMockMessage()
    const listener = jest.fn()

    queue.on(Queue.Events.INCOMING_MESSAGE, listener)
    queue.push(message)

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(message, queue, Queue.Events.INCOMING_MESSAGE)
  })

  it('Should clear a queue', ()=>{
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const queue = new Queue()
    const message = new Message('hello now')
    const futureMessage = new Message('hello future', {
      deliveryDate: tomorrow
    })
    
    queue
      .push(message)
      .push(futureMessage)
    
    expect(queue.length()).toBe(2)
    queue.clear()
    expect(queue.length()).toBe(0)
  })

  it('Should delivery a message in order of schedule', async ()=>{
    const SECOND = 1000
    const NOW = new Date()
    const NEXT = new Date( NOW.getTime() + SECOND * 2)
    const message1 = new Message('hello now 1', { deliveryDate: NOW })
    const message2 = new Message('hello next 2', { deliveryDate: NEXT })
    const message3 = new Message('hello next 3', { deliveryDate: NEXT })
    const listener = jest.fn()
    const queue = new Queue()

    queue.on(Queue.Events.MESSAGE_DELIVERY, listener)
    queue
      .push(message1)
      .push(message2)
      .push(message3)

    await sleep(100)
    expect(listener).toHaveBeenCalledTimes(1)
    queue.cancelDeliveryById(message3.getId())
    await sleep(SECOND * 2.5)
    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('Should unsbscribe a listener', async ()=>{
    const message = new Message('hello')
    const queue = new Queue()
    const listener = jest.fn()

    queue.on(Queue.Events.INCOMING_MESSAGE, listener)
    queue.unsubscribe(listener)
    queue.push(message)

    await sleep(100)
    expect(listener).toHaveBeenCalledTimes(0)
  })
})
