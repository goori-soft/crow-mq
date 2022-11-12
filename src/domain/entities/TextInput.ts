import { InvalidTextInput } from "../errors"

export class TextInput{
  constructor(private value: string | number, private readonly label = 'Text Input'){}

  getValue(): string{
    return this.value.toString()
  }

  notBlank(): TextInput{
    if(this.value.toString().trim() === ''){
      throw new InvalidTextInput(`${this.label} should not be blank`)
    }
    return this
  }
}