## Declarative Coding

Declarative, as opposed to imperative, means that we will write expressions, as
opposed to step by step instructions.

Think of SQL. There is no "first do this, then do that". There is one expression
that specifies what we'd like from the database.

```javascript
// imperative
const makes = []
for (let i = 0; i < cars.length; i += 1) {
  makes.push(cars[i].make)
}

// declarative
const makes = cars.map((car) => car.make)
```

The map version is one expression. It does not require any order of evaluation.
It specifies what, not how.

```javascript
// imperative
const authenticate = (form) => {
  const user = toUser(form)
  return logIn(user)
}

// declarative
const authenticate = compose(logIn, toUser)
```

We don't have to encode the order of evaluation, declarative coding lends itself
to parallel computing.
