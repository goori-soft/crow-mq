import { Message } from '@/domain/entities/Message'

export function makeMockMessage(): Message{
  return new Message('hello world')
}