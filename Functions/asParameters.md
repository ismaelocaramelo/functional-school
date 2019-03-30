> One of the reasons that functions as parameters is very benefitial is the
> ability to perfom an action without exposing much information, so is letting
> the caller to decide what happens

#### Bad

```js
// 🚜 Method has decided to throw
function divide(top, bottom) {
  if (bottom === 0) {
    throw new Error('Invalid Operation Exception div by 0')
  } else {
    return top / bottom
  }
}
```

#### Almost

```js
// ✈️ Let the caller to decide what happens
// 🚗 Too many arguments
function divide(top, bottom, ifZero, ifSuccess) {
  if (bottom === 0) {
    ifZero()
  } else {
    ifSuccess(top / bottom)
  }
}
```

#### Good

```js
// ✈️ Let the caller to decide what happens
// ✈️ Pure functions (ifZero and isSuccess)
// ✈️ Partially apply
// ✈️ Composition
const ifZero1 = () => {
  return throw new Error('Invalid Operation Exception div by 0')
}

const ifSuccess1 = value => console.log(`Result: ${value}`)

const divide = (top, bottom) => ifZero => ifSuccess => {
  return bottom === 0 ? ifZero() : ifSuccess(top / bottom)
}

let divide1 = divide(4, 3)(ifZero1)(ifSuccess1)
```
