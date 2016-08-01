# SEMrush

# [Демо](http://posevkin.ru/semrush/)

```
cd public/
npm install
cd ..
sass --watch scss:public/css
```
\+ веб-сервер

Используя Backbonejs необходимо реализовать простой список проектов и страницу проекта.
Список проектов должен включать в себя следующие элементы:
1. лист проектов, у каждого проекта
    * название
    * домен
    * переключатель “любимый проект”
    * блоки инструментов включающие только название
2. элемент выбора основного инструмента “Favorite tool”,
3. переключатель “Все проекты/Любимые проекты”
4. кнопку добавления нового проекта

Страница списка проектов
![alt text](http://posevkin.ru/semrush/page-1.png "Projects list")

Страница проекта с деталями
![alt text](http://posevkin.ru/semrush/page-2.png "Project info")

Список инструментов должен храниться в отдельном файле-конфиге. Набор инструментов одинаков для всех проектов.

При выборе основного инструмента (по умолчанию не выбран ни один), его блок должен вставать на первое место и увеличиваться (без визуальных изысков). Результат должен сохраняться после перезагрузки страницы.

При нажатии на кнопку “Добавить новый проект” открывается простой popup с формой добавления нового проекта. Для добавления достаточно названия и домена проекта. После сохранения нового проекта, popup закрывается, а проект появляется в списке.

При нажатии на переключатель “любимый проект”, переключатель меняет вид. Результат должен сохраняться после перезагрузки страницы.

Использование переключателя “Все проекты/Любимые проекты” приводит к фильтрации списка на основании информации о “любимых проектах”. Результат должен сохраняться после перезагрузки страницы.

При клике на название проекта осуществляется переход на страницу проекта, содержащую информацию о проекте и общих лимитах.

Для работы с данными по проектам предлагается использовать local storage.
