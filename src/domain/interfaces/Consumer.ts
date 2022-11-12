import { Message } from "../entities";

export interface Consumer{
  send: (message: Message) => void
}