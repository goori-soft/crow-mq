import { makeSilentConsumer } from "./makeSilentConsumer.mock"

export function makeConsumerFactory(){
  return {
    create: jest.fn().mockImplementation((consumerType: string, consuerOptions: any)=>{
      return makeSilentConsumer()
    })
  }
}