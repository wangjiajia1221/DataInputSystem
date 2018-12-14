function confirm(target, name, descriptor) {
  const func = descriptor.value;
  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return func.apply(target, arguments);
  };
}
export default confirm