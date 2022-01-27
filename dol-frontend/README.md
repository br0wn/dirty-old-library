# DOL Frontend

[React.js](https://reactjs.org/) app created with [Create react app](https://facebook.github.io/create-react-app/) using [yarn](https://yarnpkg.com/en/) as package manager and [TypeScript](https://www.typescriptlang.org/).

## Repository structure

```
- node_modules/
- public/
- src/
  - api/
    - model/
    - request/
    - routing/
      - route.ts
    - sdk/
      - <sdk.component.name>.ts
    - index.ts
  - app/
    - asset/
      - image/
      - style/
    - duck/
      - <duck-name>/
	    - hook/
		  - <hook.name>.ts
        - <duck.name>.action.ts
        - <duck.name>.helper.ts
        - <duck.name>.reducer.ts 
        - <duck.name>.saga.ts
        - <duck.name>.selector.ts
        - <duck.name>.state.ts
    - model/
      - <model.name>.ts
    - routing/
      - route.ts
    - store/
      - store.factory.ts
      - root.reducer.ts
    - view/
      - component/
        - <component-name>/    
      - screen/
        - <screen-name>/ 
    - app.tsx
  - lib/
    - <component>/
  - vendor/
    - <package>/
      - index.d.ts
  - test/
  - index.ts
- .env
- package.json
- yarn.lock
- tsconfig.json
```

## Coding standard

1. Naming files and folders

  - **Files** must be named in all **lower cased** letters, using dot character (.) as word separator. 
  
    Example: 
    ```
    this.is.a.javascript.class.ts
    this.is.a.react.class.tsx
    ```
              
  - **Folders** must be named in all **lower cased** letters, using dash character (-) as word separator.
  
    Example: 
    ```
    this-is-a-flolder
    ```

2. File SHOULD declare new symbols (classes, functions, constants, etc.) and cause no other side effects, or it SHOULD execute logic with side effects, but **SHOULD NOT** do both.

   The phrase “side effects” means execution of logic not directly related to declaring classes, functions, constants, etc., merely from including the file.

   "Side effects" include but are not limited to: generating output, connecting to external services, emitting errors or exceptions, modifying global or static variables, reading from or writing to a local storage, and so on.
   
3. **Never** use `export default`. Always export concrete method/class/component.

   ```
   // no
   class FooClass { .. }
   export default FooComponent; 
   
   // yes
   export class FooClass { .. }
   ```   

4. Constants MUST be declared in all upper case with underscore separators (ex. `FOO_BAR_BAZ`).

5. Method names, variable names and class properties MUST be declared in `camelCase`. Prefixing `private` or `protected` class properties with underscore (_) **should be avoided**.
   
6. Class names MUST be declared in `StudlyCaps`.

7. There MUST be one blank line after `import` declarations.
     

### Redux

For Redux code organization, a slightly modified version of [modular ducks](https://github.com/erikras/ducks-modular-redux) will be used. Each part of the duck will get own file:

```
- <duck.name>.action.ts
- <duck.name>.helper.ts
- <duck.name>.reducer.ts 
- <duck.name>.saga.ts
- <duck.name>.selector.ts
- <duck.name>.state.ts
````

## Development

```bash
yarn install
yarn start
```


## Tech

- React
- Redux
- React Router
- Redux Saga
- normalizr
- redux-actions
- reselect
- ant.design
- react-final-form
