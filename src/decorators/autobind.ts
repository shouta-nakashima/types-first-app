
//autobind decoretor
export function autobind(target: any, methodName: string, descripter: PropertyDescriptor) {
  const originalMethods = descripter.value
  const abjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethods.bind(this)
      return boundFn;
    }
  }
  return abjDescriptor
}

