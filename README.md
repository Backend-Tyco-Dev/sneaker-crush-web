# Sneaker Crush web

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

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


