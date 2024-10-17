# Meals App

![Vercel Deploy](https://github.com/shagidzun/aston-meals-app/actions/workflows/production.yaml/badge.svg?event=push) ![Vercel Deploy](https://github.com/shagidzun/aston-meals-app/actions/workflows/preview.yaml/badge.svg?event=push)

## Описание проекта

Приложение представляет из себя SPA с поиском различных блюд.

Ссылка на деплой приложения: https://aston-meals-app.vercel.app/

Данные о блюдах предоставляются www.themealdb.com/api.php

Для построения компонентов использовалась библиотека Material UI

### Функционал

- В проекте реализована авторизация пользователей и хранение данных каждого пользователя: список "Избранного" и история поиска. Авторизация и хранение данных реализованы с помощью Firebase.

- Реализован поиск блюд с саджестами

- Также есть возможность переключения с Firebase на local storage и обратно через изменение значения переменной VITE_REMOTE_STORE в env файле:

  - "ls" - переключиться на local storage
  - "firebase" - переключиться на Firebase

- Реализована смена цвета навигационной панели и кнопок добавления в избранное. Кнопка расположена на навигационной панели

### Требования к проекту

- 1 уровень (обязательный)
  - [x] Реализованы **Требования к функциональности**
  - [ ] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем **LocalStorage** (в качестве БД используется Firebase)
  - React
    - [x] **Используются функциональные компоненты c хуками** в приоритете над классовыми ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/pages/history/History.tsx))
    - [x] Есть разделение на **умные и глупые компоненты** ([пример умного компонента](https://github.com/shagidzun/aston-meals-app/blob/main/src/pages/category/Category.tsx), [пример глупого компонента](https://github.com/shagidzun/aston-meals-app/blob/main/src/components/table/Table.tsx))
    - [x] Есть **рендеринг списков** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/components/item-list/ItemList.tsx))
    - [x] Реализована хотя бы одна **форма** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/components/form/Form.tsx))
    - [x] Есть применение **Контекст API** ([пример](https://github.com/shagidzun/aston-meals-app/tree/main/src/context))
    - [x] Есть применение **предохранителя** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/App.tsx))
    - [x] Есть хотя бы один **кастомный хук** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/app/hooks.ts))
    - [x] Хотя бы несколько компонентов используют **PropTypes** (пришлось закомментировать PropTypes, т.к. Vite конфликтует с пакетом) ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/components/item-list/ItemList.tsx))
    - [x] Поиск не должен триггерить много запросов к серверу (используется **debounce**) ([пример использования](https://github.com/shagidzun/aston-meals-app/blob/main/src/components/search-field/SearchField.tsx), [useDebounce](https://github.com/shagidzun/aston-meals-app/blob/main/src/app/hooks.ts))
    - [x] Есть применение **lazy + Suspense** ([пример lazy + Suspense](https://github.com/shagidzun/aston-meals-app/blob/main/src/App.tsx))
  - Redux
    - [x] Используем **Modern Redux with Redux Toolkit**
    - [x] Используем **слайсы** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/user/userSlice.ts))
    - [x] Есть хотя бы одна **кастомная мидлвара** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/middleware/middleware.ts))
    - [x] Используется **RTK Query** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/services/mealsApi.ts))
    - [x] Используется **Transforming Responses** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/services/mealsApi.ts))
- 2 уровень (необязательный)
  - [x] Использование **TypeScript** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/services/mealsApi.ts))
  - [ ] Подключен **storybook** и созданы два, три сториса с knobs, которые показывают разные состояния компонента
  - [x] Использование **Firebase** для учетных записей пользователей и их Избранного и Истории поиска ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/favorites/favoritesSlice.ts), [Firebase](https://github.com/shagidzun/aston-meals-app/blob/main/src/firebase/firebase.ts))
  - [x] Низкая связанность клиентского кода, использующего апи кода, работающего с внешним стором (LS + Firebase) ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/favorites/favoritesSlice.ts), [env](https://github.com/shagidzun/aston-meals-app/blob/main/.env) (переключение между LS и Firebase))
  - [x] Настроен **CI/CD** ([тесты и билд ПР-ов](https://github.com/shagidzun/aston-meals-app/blob/main/.github/workflows/preview.yaml), [тесты и билд production](https://github.com/shagidzun/aston-meals-app/blob/main/.github/workflows/production.yaml))
  - [ ] Реализована **виртуализация списков**
  - [ ] Используются **мемоизированные селекторы**
  - [ ] Используется **нормализованная структура стейта**
  - [ ] Проведена **оптимизация приложения**
  - [ ] **Feature Flags.** Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом
  - [ ] Добавить тесты через jest, react-testing-library или Playwright.
  - [x] Связь UI и бизнес-логики построена не через команды, а через **события** ([пример](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/user/userSlice.ts#L87): userSignIn объединяет в себе набор действий, которые запускаются в ответ на событие - отправку формы ([отправка запроса через Firebase](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/user/userSlice.ts#L102), [загрузка списка избранного](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/user/userSlice.ts#L110), [загрузка истории поиска](https://github.com/shagidzun/aston-meals-app/blob/main/src/features/user/userSlice.ts#L111)))
  - [ ] **Project Console API**
