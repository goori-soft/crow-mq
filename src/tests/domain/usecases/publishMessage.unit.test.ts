import { Queue, Topic } from "@/domain/entities"
import { publishMessage as sut } from "@/domain/usecases/publishMessage"
import { makeMessageRepository } from "@/tests/mock/makeMessageRepository.mock"

describe("Publish message use case", ()=>{
  const messageRepository = makeMessageRepository()
  const adapters = {
    messageRepository
  }

  beforeEach(()=>{
    messageRepository.save.mockReset()
  })
  it("Should publish a new message", async ()=>{
    const spyTopicCreate = jest.spyOn(Topic, 'create')
    const spyQueuePush = jest.spyOn(Queue.prototype, 'push')
    const messageOptions = { body: 'hello' }
    
    await sut(messageOptions, adapters)

    expect(messageRepository.save).toHaveBeenCalledTimes(1)
    expect(spyTopicCreate).toHaveBeenCalledTimes(1)
    expect(spyQueuePush).toHaveBeenCalledTimes(1)
  })
})