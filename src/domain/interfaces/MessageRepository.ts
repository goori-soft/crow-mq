import { Message } from "@/domain/entities";

export interface MessageRepository {
  save: (message: Message) => Promise<void>
}