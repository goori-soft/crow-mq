import { TextInput } from "@/domain/entities"
import { InvalidTextInput } from "@/domain/errors"

describe("TextInput entity", ()=>{
  it("Should create a new text input", ()=>{
    const value = 'text'
    const textInput = new TextInput(value)

    expect(textInput).toBeInstanceOf(TextInput)
    expect(textInput.getValue()).toBe(value)
  })

  it('Should not accept blank values', ()=>{
    const value = ''
    const textInput = new TextInput(value)
    
    expect(()=>{
      textInput.notBlank()
    }).toThrowError(InvalidTextInput)
  })
})