import { Message } from "@/domain/entities"
import { Group } from "@/domain/entities/Group"
import { InvalidTextInput } from "@/domain/errors"
import { makeSilentConsumer } from "@/tests/mock/makeSilentConsumer.mock"

describe("Group entity", ()=>{
  it("Should create a new group of consumers", ()=>{
    const name = 'myGroup'
    const group = new Group({ name })
    expect(group).toBeInstanceOf(Group)
    expect(group.totalConsumers()).toBe(0)
    expect(group.is(name)).toBe(true)
    expect(group.is('otherName')).toBe(false)
  })

  it('Should not allow a group with a blank name', ()=>{
    const name = ''
    expect(()=>{
      const group = new Group({ name })
    }).toThrowError(InvalidTextInput)
  })

  it('Should insert a new consumer and notify it', ()=>{
    const consumer = makeSilentConsumer()
    const message = new Message('Hello')
    const group = new Group({ name: 'myGroup' })

    group.push(consumer)
    group.notify(message)

    expect(group.totalConsumers()).toBe(1)
    expect(consumer.send).toHaveBeenCalledTimes(1)
  })
})