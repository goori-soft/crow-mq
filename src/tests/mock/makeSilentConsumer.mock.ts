import { Consumer } from '@/domain/interfaces'

export function makeSilentConsumer(): Consumer{
  const consumer = {
      send: jest.fn()
  }

  return consumer
}