import { Message } from "@/domain/entities/Message"

describe("Message entity", ()=>{
  it("Should create a new message", ()=>{
    const body = "hello"

    const message = new Message(body)

    expect(message.getBody()).toBe("hello")
    expect(message.getId()).toEqual(expect.any(String))
    expect(message.getTopic()).toBe(undefined)
    expect(message.isExpired()).toBe(false)
  })

  it('Should return the delay to delivery', ()=>{
    const SECOND = 1000
    const NEXT = new Date( new Date().getTime() + SECOND * 2)
    
    const message = new Message('hello', {deliveryDate: NEXT})
    const delay = message.getDeliveryDelay()

    expect(delay).toBeGreaterThan(1000)
    expect(delay).toBeLessThan(2001)
  })
})
