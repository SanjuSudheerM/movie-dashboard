# Fink (Movie Dashboard)
Fink is a movie dashboard powered by [TMDB's](https://developers.themoviedb.org/3/movies/get-popular-movies) popular movies API.

#### Dashboard
![desktop](src/assets/doc-images/landing.png)


## Table of Contents
1. [Local Setup Instructions](#local-setup)
2. [Development server](#development-server)
3. [Production Build](#production-build)
4. [Test Cases](#test-cases)
5. [Test Case Coverage Screenshots](#test-coverage-reports)
6. [Application Screenshots](#application-screenshots)


<a name="local-setup"></a>
## Local Setup Instructions

Inorder to set it up on local, the TMDB api key has to be added in the `environment.ts` & `environment.prod.ts` file under `src/environments` directory 

![environment file](src/assets/doc-images/env-config.png)

Note: TMDB Api key can be created from TMDB Portal, [Check here](https://developers.themoviedb.org/3/getting-started/introduction)

<a name="development-server"></a>
## Development server
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<a name="development-server"></a>
## Production Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

<a href="#test-cases"></a>
## Testcases 

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

<a href="test-coverage-reports"></a>
## Test Case Coverage Screenshots

![testcoverage](src/assets/doc-images/coverage.png)

<a href="application-screenshots"></a>
## Application Screenshots

#### Dashboard - On hovering a movie
![desktop-on-hover](src/assets/doc-images/on-hover.png)

#### IPad View
[![tab-view](src/assets/doc-images/ipad.png)](width)

#### IPhone View
![phone-view](src/assets/doc-images/iphone.png)
