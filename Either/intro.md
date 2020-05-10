## Either

It represents a value of two possible data types. An Either is either Left or a
Right. By convention, the left signifies a failure case result and the Right
signifies a success.

## Why Either is useful?

It tells in a pure way the possible paths of a given funtion, while try and
catch and in its nature impure or worse in the case using if-statements which
becomes harder to follow. Pure functions always return a value.

## How we can implement it?

Through polymorphism. It means single interface to entities of different types.
Ej:

```javascript
const Left = (value) => {
  toString: () => `Left(${value.toString()})`
}

const Right = (value) => {
  toString: () => `Right(${value.toString()})`
}

const trace = (value) => {
  console.log(value.toString())
  return value
}

trace(Left('Hi'))
//Left(Hi)

trace(Right('Hi'))
//Right(Hi)
```
