> (By wikipedia) In a OOP interface is a shared boundary across which two or
> more separate components of a computer system exchange information. The
> methods declared in interface are by default abstract (only method signature,
> no body).

### What about FP world?

> In a sense, all functions are 'interfaces', meaning that many of the roles
> that interfaces play in object-oriented design are implicit in the way that
> functions work.

Let's see this with a clear example

```C#
interface ICalculator
{
   int Calculate(int input);
}
```

```C#
class AddingCalculator: ICalculator
{
   public int Calculate(int input) { return input + 1; }
}
```

```C#
class LoggingCalculator: ICalculator
{
   ICalculator _innerCalculator;

   LoggingCalculator(ICalculator innerCalculator)
   {
      _innerCalculator = innerCalculator;
   }

   public int Calculate(int input)
   {
      Console.WriteLine("input is {0}", input);
      var result  = _innerCalculator.Calculate(input);
      Console.WriteLine("result is {0}", result);
      return result;
   }
}
```

So far, so straightforward. But note that, for this to work, we must have
defined an interface for the classes. On a FP you can do the same thing without
having to define the interface first. Any function can be transparently swapped
for any other function as long as the signatures are the same.

```javascript
const addingCalculator = input => input + 1

let loggingCalculator = innerCalculator => input => {
  console.log(`input is ${input}`)
  const result = innerCalculator(input)
  console.log(`result is ${result}`)
  return result
}
```

In other words, the signature of the function is the interface. Even nicer is
that by default, the javascript logging code can be made completely generic so
that it will work for any function at all

```javascript
const add1 = input => input + 1
const times2 = input => input * 2

const genericLogger = anyFunc => input => {
  console.log(`input is ${input}`) //log the input
  const result = anyFunc(input) // evaluate the function
  console.log(`result is ${result}`) //log the result
  return result //return the result
}

const add1WithLogging = genericLogger(add1)
const times2WithLogging = genericLogger(times2)
```

The ability to do this kind of generic wrapping is one of the great conveniences
of the function-oriented approach. You can take any function and create a
similar function based on it. As long as the new function has exactly the same
inputs and outputs as the original function, the new can be substituted for the
original anywhere. Some more examples:

- It is easy to write a generic caching wrapper for a slow function, so that the
  value is only calculated once.

- It is also easy to write a generic “lazy” wrapper for a function, so that the
  inner function is only called when a result is needed
