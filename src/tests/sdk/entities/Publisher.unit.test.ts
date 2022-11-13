import { Publisher } from "@/sdk/entities/Publisher"

describe("Publisher SDK enttity", ()=>{
  it("Should create a new Publisher", ()=>{
    const options = {
      user: '',
      password: '',
      host: '',
      port: ''
    }

    const publisher = new Publisher(options)

    expect(publisher).toBeInstanceOf(Publisher)
  })
})
