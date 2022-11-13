import { Topic } from '@/domain/entities'
import { attachConsuer as sut } from '@/domain/usecases/attachConsumer'
import { makeConsumerFactory } from '@/tests/mock/makeConsumerFactory.mock'
describe("Attach consumer use case", ()=>{
  const consumerFactory = makeConsumerFactory()
  const adapters = {
    consumerFactory
  }
  it("Should attach a new consumer", async ()=>{
    const spyTopicAttachConsumer = jest.spyOn(Topic.prototype, 'attachConsumer')
    const consumerOptions = {
      consumerType: 'aws-lambda',
      group: 'myGroup',
      topic: 'myTopic'
    }

    sut(consumerOptions, adapters)

    expect(consumerFactory.create).toHaveBeenCalledTimes(1)
    expect(spyTopicAttachConsumer).toHaveBeenCalledTimes(1)
  })
})