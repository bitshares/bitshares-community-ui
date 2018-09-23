## Tools

##### Dependencies
- [Vue.js](https://vuejs.org/) - Frontend Framework
- [Vuex](https://vuex.vuejs.org/) - State management
- [Vue-router](https://router.vuejs.org/en/) - Routing
- [Vuelidate](https://monterail.github.io/vuelidate/) - Form Validation
- [Date-fns](https://date-fns.org/) - Dates & Time
- [vuex-bitshares](https://github.com/bitshares/vuex-bitshares/) - vuex modules that handle communication with BitShares via [bitsharesjs-ws](https://github.com/bitshares/bitsharesjs-ws) and [bitsharesjs](https://github.com/bitshares/bitsharesjs) libraries

##### DEV Dependencies
- [Prettier](https://prettier.io/) - Code Formatting
- [ESLint](https://github.com/eslint/eslint) - Linting
- [Vue-test-utils](https://vue-test-utils.vuejs.org/) - Unit-Testing
- [Jest](https://facebook.github.io/jest/) - Unit-Testing
- [Vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) - Styleguide

##### Styleguides
- [ESLint Standard Config](https://standardjs.com/) - ES
- [Vue.js official styleguide](https://vuejs.org/v2/style-guide/) - Vue


## How to contribute

### Git workflow

#### Internal team

- **production branch** - no one commits to 'production' - contains the final deployed code/live
- **master branch** - no one commits to 'master' without specific request from an admin - contains weekly review of a code by admins for current deployed code from 'staging'
- **staging branch** - code in staging, main development branch
- **new feature** = new branch, add an issue's number in the name of the branch, branch out of the staging branch (e.g. `34-brainkey-authorization`)
- **pull requests** - once done with a feature, submit a pull request to staging, add reviewers. include number of issue in the pr name. if the pull request has some work in progress being done, prepend it with a `wip:` prefix
- **project board** - move issue you are working on to the according column (`open`, `in progress`, `review`, `closed`)
- **tests** - make sure to write a test for the piece of functionality you created


## Project structure

#### Base UI Components
path: `src/Components`  

Reusuable UI .vue components are stored in here, each component in it's own folder that contains `index.js` that imports the component and exports it and `<component-name>.md` file with documentation for styleguidist.

e.g.:  

```
Components/Button/  
	Button.vue - components itself  
	Button.md - component docs for styleguidist  
	index.js - file importing components and exporting it (so that you can `import @/Components/Button/`)  
```

#### View Components 

path: `src/Views/`   
  
Actual page layout components are stored in here.  
Please follow the vue official guidilines for naming and structuring components  

## Tests

#### Unit tests
`tests/unit/components/` - base UI components tests
`tests/unit/views/` - view components tests
`tests/unit/modules/` - vuex modules tests

#### e2e tests
`tests/e2e/`

## Styleguide
To run styleguide use command `npm run styleguide` .     
[How to document components](https://github.com/vue-styleguidist/vue-styleguidist/blob/master/docs/Documenting.md)

## Icons

#### Adding new
1) Add `[icon-name].svg` icon file to `src/assets/svg`
2) Run `npm run svg`
3) Import your icon `import '@icons/[icon-name]'`
4) Use it like `<svgicon name=[icon-name]>`

#### After pulling changes with new icons
Simply run `npm run svg` and you are ready

#### Configuring icon
See [docs](https://github.com/MMF-FE/vue-svgicon) and styles in `src/styles/common.css`


To be continued...
