> Dependency injection is a technique whereby one object supplies the
> dependencies of another object. Remember someone says Let the caller decides
> what happens... Exactly!. DI allows inversion control, a way to configure the
> implementation externaly.

```javascript
import ConsoleLogger from './ConsoleLogger'

const Calculator = () => {
  const loggingInputs = fn => (a, b) => {
    ConsoleLogger().log(`Inputs: ${a} and ${b}`)
    return fn(a, b)
  }
  const add = (a, b) => a + b

  const addWithLogging = loggingInputs(add)
}
```

```javascript
const Calculator = Logger => {
  const loggingInputs = fn => (a, b) => {
    Logger.log(`Inputs: ${a} and ${b}`)
    return fn(a, b)
  }
  const add = (a, b) => a + b

  const addWithLogging = loggingInputs(add)
}
```

The result is that we can now reuse each module with minimal effort and without
any change in their code. Testing a module that uses the DI pattern is also
greatly simplified; we can easily provide mocked dependencies and test our
modules in isolation from the state of the rest of the system.

Another important aspect to be highlighted from the example we presented earlier
is that we shifted the dependency wiring responsibility from the bottom to the
top of our architecture. The idea is that high-level components are by nature
less reusable than low-level components, and that's because the more we go up in
the layers of an application, the more a component becomes specific.

The ownership of defining the implementation of a dependency is given to the
higher-level components

All these advantages in terms of decoupling and reusability, though, come with a
price to pay. In general, the inability to resolve a dependency at coding time
makes it more difficult to understand the relationship between the various
components of a system.

### Types of DI

- Constructor injection

```javascript
const service = new Service(dependencyA, dependencyB)
```

- Property injection

```javascript
const service = new Service()
service.dependencyA = anInstanceOfDependencyA

//Example

function Afactory(b) {
  return {
    foo: function() {
      b.say()
    },
    what: function() {
      return 'Hello!'
    },
  }
}

function Bfactory(a) {
  return {
    a: a,
    say: function() {
      console.log('I say: ' + a.what)
    },
  }
}

/* 
  The dependency deadlock between the two preceding factories 
  can be resolved only using property injection.
*/

const b = Bfactory(null)
const a = Afactory(b)
a.b = b
```

### Why

- Injecting configuration data
- Injecting different implementations

> We will dive deep on patterns (patterns school) using DI such as service
> locator and DI container
