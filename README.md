# WebVividDreams

Angular app, deployed to GitHub Pages at https://dyj216.github.io/web-vivid-dreams/ in English (`/en/`) and Hungarian (`/hu/`).

## Deployment

Run `npm run deploy`. It builds both locales into `docs/`, adds the site root files from `pages/` and publishes `docs/` to the `gh-pages` branch, replacing its contents.

- `pages/index.html` redirects the site root to the English app.
- `pages/404.html` handles deep links: GitHub Pages serves it for any unknown path, and it sends the visitor to the app of the locale in the URL, which then restores the requested route.

To check the output without publishing, run `npm run build:pages` and look in `docs/`.
On the GitHub project settings page, set the Pages source to the gh-pages branch root.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory. Use `-c production` for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Linting

Run `npm run lint` to lint the app with ESLint.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
