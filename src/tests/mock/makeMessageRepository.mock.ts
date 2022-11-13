import { MessageRepository } from "@/domain/interfaces"

export function makeMessageRepository(){
  return {
    save: jest.fn()
  }
}
