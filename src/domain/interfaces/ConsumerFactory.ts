import { Consumer } from "./Consumer";

export interface ConsumerFactory{
  create: <T = any>(consumerType: string, consumerOptions: T) => Consumer
}
