## Hindley-Milner Type Signatures

To be able to communicative effectively what parameters they should pass. It has
been developed a special notion for specifying what types of parameter a
function takes, and what it returns. The standard type system used across FP
languages is Hindley-Milner **Hindley-Milner Type Signatures**.

```javascript
// greeting :: String -> String
const welcome = (name) => 'Welcome ' + name

// sum :: [Number] -> Number
const sum = reduce(add, 0)

// identity :: a -> a
const identity = (x) => x

// formatDollars :: Number -> String
const formatDollars = replace('${{number}}', '{{number}}')

// filter :: (a -> Bool) -> [a] -> [a]
const filter = curry((f, xs) => xs.filter(f))
```

Variable names like a and b are convention, but they are arbitrary and can be
replaced with whatever name you'd like. If they are the same variable, they have
to be the same type. That's an important rule so let's reiterate: a -> b can be
any type a to any type b, but a -> a means it has to be the same type. For
example, id may be String -> String or Number -> Number, but not String -> Bool.

### Constraints

```javascript
// sort :: Ord a => [a] -> [a]
```

What we see on the left side of our fat arrow here is the statement of a fact: a
must be an Ord. Or in other words, a must implement the Ord interface. What is
Ord and where did it come from? In a typed language it would be a defined
interface that says we can order the values. This not only tells us more about
the a and what our sort function is up to, but also restricts the domain. We
call these interface declarations type constraints.
