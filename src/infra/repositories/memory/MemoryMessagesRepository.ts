import { Message } from "@/domain/entities";
import { MessageRepository } from "@/domain/interfaces";

const messagesDataBase: Message[] = []

export class MemomoryMessageRepository implements MessageRepository{
  async save(message: Message): Promise<void>{
    messagesDataBase.push(message)
  }
}
