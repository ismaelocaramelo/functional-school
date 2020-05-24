## What are monoids?

Is an algebraic structure with a single associative binary operation and an
identity element.

Something that has to follow this rules:

- The operation must combine two values of the set into a third value of the
  same set. E.g "hello" + " world" = "hello world".

- The operation must be associative: concat(x, concat(y, z)) must be the same as
  concat(concat(x, y), z) where x, y, and z are any value in the set.

- The set must posses a neutral element in regard to the operation. If that
  neutral element is combined with any other value, it should not change it.
  concat(element, neutral) == concat(neutral, element) == element.

Monoids:

- Number Addition Is A Monoid
- String Concatenation Is a Monoid
- Function Composition Is A Monoid

If there is a monoid, you can make very flexible to take any numbers of
arguments. Using `Array.reduce`

```javascript
const add = (a, b) => a + b
const addArray = (arr) => arr.reduce(add, 0)
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
addArray(numbers)
```

```javascript
const concat = (a, b) => a.concat(b)
const concatArray = (arr) => arr.reduce(concat, '')
const strings = ['hello', ' ', 'world']
concatArray(strings) // 'hello world';
```

```javascript
const compose = (f1, f2) => (arg) => f1(f2(arg))
const composeArray = (arr) => arr.reduce(compose, (x) => x)
const resultIs = (a) => `result: ${a}`
const add5 = (a) => a + 5
const double = (a) => a * 2
const functions = [resultIs, add5, double]
const myOperation = composeArray(functions)
myOperation(2) // result: 9
```

Let's generalize: when you have a monoid, you can transform a function taking
two arguments to a function taking an array of arguments by calling:

`[value1, value2, value3, ...].reduce(concat, neutral);`

## Splitting Computation In Chunks

As the operation of a monoid is associative

```javascript
const concat = (a, b) => a + b
const bigArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
bigArray.reduce(concat, 0) // 55
const result1 = bigArray.slice(0, 5).reduce(concat, 0) // 15
const result2 = bigArray.slice(5).reduce(concat, 0) // 40
concat(result1, result2) // 55
```

## Async Composition

```javascript
const fetchSomething = fetch('someUrl')
const toJson = fetchSomething.json()
const parseJson = (json) => json.value

const getSomething = async number => parseJson(await toJson(await fetchSomething(something))

getSomething(23).then(console.log);

const asyncCompose = (func1, func2) => async (x) => func1(await func2(x))

// asyncCompose() is associative
asyncCompose(parseJson, asyncCompose(toJson, fetchSomething))(23).then(console.log);

// asyncCompose() has a neutral element - the identity function
const neutralAsyncFunc = x => x;
asyncCompose(a => Promise.resolve(a + 1), neutralAsyncFunc)(5) // Promise(6)
asyncCompose(neutralAsyncFunc, a => Promise.resolve(a + 1))(5) // Promise(6)


// so async functions form a monoid under the asyncCompose operation. We can use Array.reduce!
const asyncComposeArgs = (...args) => args.reduce(asyncCompose, x => x);

const getJoke2 = asyncComposeArgs(parseJoke, toJson, fetchJoke);
getJoke2(23).then(console.log);
```
