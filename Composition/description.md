> By wikipedia, composition is an act or mechanism to combine simple functions
> to build more complicated ones.

> Composition everywhere, the result of each function is passed as the argument
> of the next, and the result of the last one is the result of the whole. All
> the functions should be pure, this enhance code reuse and functions
> maintability.

> This is the one of the core principles of FP and must be applied correctly.
> Here in the world of javascript we have some built in utils to perfom such
> operations.

## Why composition?

It encourage us to think in terms of small units of pureness. Otherwise violates
the principale of single responsability.

## How

This is the signature of simple composing:

```javascript
const compose = (f, g) => f(g(x))
```

```javascript
const addOne = (x) => x + 1
const addThree = (x) => x + 3
const addOneAndThree = compose(addOne, addThree)

addOneAndThree(4)
```

Composing two units of some type (in this case function) should yield a new unit
of that very type. Creating a right to left flow of data

```javascript
// without composition

const addOne = (x) => x + 1
const addThree = (x) => x + 3
const addOneAndThree = (x) => addOne(addThree(x))

addOneAndThree(4)
```

The cool thing about composition is associativity

```javascript
compose(f, compose(g, h)) === compose(compose(f, g), h)
```

Composition is associative, meaning it doesn't matter how you group two of them.
