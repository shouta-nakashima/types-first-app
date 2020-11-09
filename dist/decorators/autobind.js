//autobind decoretor
export function autobind(target, methodName, descripter) {
    const originalMethods = descripter.value;
    const abjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethods.bind(this);
            return boundFn;
        }
    };
    return abjDescriptor;
}
