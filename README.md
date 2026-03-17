# Sneaker Crush web

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Development

- **Requirements:** Node >= 18, npm >= 9 (see `engines` in package.json).
- **Commands:** `npm run dev` (dev server), `npm run build` (production client build), `npm run build:ssr` (SSR build, used by CI). Optional: `npm run lint`, `npm run format`, `npm run test` (Jest), `npm run test:watch`.
- **Environment:** Copy `.env.example` to `.env` and set `GRAPHQL_TARGET` if you need a different GraphQL backend for local dev. `PORT` and `HOST` can override the dev server.
- **Build-time globals:** `SERVER` (true in SSR build) and `DEBUG` (true in dev) are injected by Webpack; see `build/webpack.*.conf.js`.

### Структура проекта

#### /build
здесь находятся стандартные настройки webpack для сборки проекта

#### /config
стандартный конфиг для сборки проекта

#### /dist
выходные файлы после сборки

#### /src
исходный код проекта

##### /assets 
ассеты проекта
##### /components
визуальные компоненты vue
##### /modules
подключаемые модули

adsense - модуль рекламы (нужны коды блоков)

api - настройки запросов

bootstrap - подключение бутстрапа

currency - модуль валют

filters - кастомные фильтры vue

fontawesome -подключение иконочного шрифта


graphql - подключение graphql

moment-shortformat-fix - фикс короткой даты

resized-var - модуль переменных зависящих от размера окна

social - модуль share

viewer - модуль юзера который залогинился или нет

vue-analytics - модуль гугл аналитики

vue-carousel - модуль слайдера

vue-datepicker - модуль пикера дат

vue-form-generator - модуль генератора форм (не используется)

vue-meta - модуль мета тегов в зависимости от страницы

vue-notification - модуль уведомлений

vue-resource - модуль запросов к api (не используется)

vue-vuex - модуль хранения информации в localStorage

##### /pages
страницы проекта разбитые по папкам

##### /router
настройки роутинга

#### /static


