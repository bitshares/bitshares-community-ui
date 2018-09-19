## Tools

### Dependencies
- [Vue.js](https://vuejs.org/) - Frontend Framework
- [Vuex](https://vuex.vuejs.org/) - State management
- [Vue-router](https://router.vuejs.org/en/) - Routing
- [Date-fns](https://date-fns.org/) - Helper library for Dates & Time

### DEV Dependencies
- [Prettier](https://prettier.io/) - Code Formatting
- [ESLint](https://github.com/eslint/eslint) - Linting
- [Vue-test-utils](https://vue-test-utils.vuejs.org/) - Unit-Testing
- [Jest](https://facebook.github.io/jest/) - Unit-Testing
- [Vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) - Styleguide

### Styleguides
We are following these styleguides:
- [ESLint Standard Config](https://standardjs.com/) - JS
- [Vue.js official styleguide](https://vuejs.org/v2/style-guide/) - Vue

### Issues
https://github.com/bitshares/bitshares-community-ui/issues
Most of our commucation should happen throught the issues and comments to them. Just label issue the accordingly and mention people throught @.

### Branches
Naming: <number of the issue on github>-<short on the branch> e.g. `23-brainkey-authorization`

## How to contribute

### Git workflow

#### Internal team

- **production branch** - no one commits to production, production contains the currently deployed code
- **staging branch** - code in staging
- **new feature** = new branch, add an issues number in the name of the branch
- **pull requests** - once done with a feature, submit a pull request, add reviewers
- **tests** - make sure to write a test for the piece of functionality you created


#### External contributions

- fork the repository
- create a branch out of *staging*
- make your changes and create a Pull Request to the main repository to *staging*.


## Project structure
src/Components - reusuable UI components are store in here, each component in it's own folder that contains index.js that imports the components and exports it

eg
Components/Button/
	Button.vue - components itself
	Button.md - component docs for styleguidist
	index.js - file importing components and exporting it (so that you can `import @/Components/Button/`)


src/Views - actual view .vue components 




