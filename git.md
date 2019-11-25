**npm**
npm install --save-dev  popper.js@^1.14.7 => npm i gulp -D  - cокращенная версия
npm i --развернуть все packages в json

**GIT**
Git Commands CheatSheet: https://github.com/joshnh/Git-Commands
and https://education.github.com/git-cheat-sheet-education.pdf
How to add existing directory from comp to Github, one of the examples:
1. create repository on Github, for example: https://github.com/MarkLouren/django-deployment-example
2. Check if you have installed git: in terminal: git --version (otherwise download from https://git-scm.com/download/gui/mac)
3. In your  DIR that you want to add to Github (terminal): git init
4. git add . (all files)
5. git commit . -m 'first' (commit all files from the comp directory to github)
6. git remote add origin https://github.com/MarkLouren/django-deployment-example.git
7. git push -u origin master
generally, see the tips for new directory

Update the Github directory with changes on your Local machine:
```
0. git status
1. git add -A
2. git commit -m "Added Gitignore file or Other Files"
3. git push origin master

CHANGE SPECIFIC DIRECTORY/File =>push:
 git commit -m "my message" -- HomeWorks2

```

Add files on server (in VirtualEnv):
1. git clone https://github.com/MarkLouren/tribes-landing.git
2. Update: git pull origin master


Основные операции с Git
*Подключение SSH ключа к Github/Gitlab*
ВАЖНО: подвязать SSH под гит - делается один раз на каждой машине, после этого больше не нужно вводить логин/пароль.

**Создаем SSH ключ**
- Открываем терминал (git bash или любой другой).
- Выполняем команду ssh-keygen -t rsa -b 4096 -C "your_email@example.com".
- Когда спросят "Enter a file in which to save the key" просто нажмите Enter, ключ будет лежать в файле по умолчанию.
- После этого попросят написать секретную фразу и повторить ее.
- Копируем ключ и подвязываем под гитхаб/гитлаб
- Выполняем команду pbcopy < ~/.ssh/id_rsa.pub
- Если не сработает, пишем cat ~/.ssh/id_rsa.pub и копируем то что нам вернулось.
- Ищем в настройках аккаунта на Github/Gitlab SSH keys, выбираем в этой вкладке new key, вставляем то что скопировали.
- Сохраняем.

- Теперь можно (и нужно) клонировать и стягивать все нужные репозитории через SSH.
- Бонус: перевод всех https репозиториев на ssh

**Как проверить какой репозиторий у вас?**
git remote -v.
- Если адрес начинается на https://, необходимо выполнить команду git remote set-url origin git@github.com:USERNAME/REPOSITORY.git, где указать хост (github/gitlab), ваше имя пользователя и имя репозитория.
Еще раз git remote -v чтобы убедиться, что все сработало.

**Создание нового репозитория и закидывание туда своих файлов (если они есть)**
- Создаем новый репозиторий в GitHub/GitLab/BitBucket.
- В папке с проектом выполняем git init.
- git add .
- git commit -m "initial commit"
- git remote add origin git@git-where-you-are.com:your-name/your-awesome-git-project.git
- git push -u origin master
- Готово

**Объединение нескольких гит комманд в одну**
Например, мы хотим сделать коммит и запушить одной командой. Для этого используется оператор последовательного выполнения команд &&:

- git commit -am "new commit" && git push

- Отмена всего непотребства, которое написали и еще (к счастью) не закоммитили
git checkout -- .

**Отмена последнего коммита, который случайно залили не в ту ветку**
- В ветке, в которой вы сделали коммит, необходимо выполнить git reset HEAD~1 --soft.
- Последний коммит будет отменен, все изменения вернутся в нужные файлы (не пропадут).
- git stash (спрятать все изменения в хранилище гита).
- git checkout correct-branch
- git stash apply (возвращаем изменения в нужную ветку).
- git commit -am "Your commit message"

*Отмена последнего коммита и удаление всех изменений, которые были в нем сделаны
git reset HEAD~1 --hard

***Работа с ветками***
ВАЖНО! При работе в командах создавайте как минимум свои собственные ветки.

**Создание новой ветки и переход на нее**
git checkout -b your-new-awesome-branch

**Pull/push изменений**
git pull/push origin your-branch

**Слияние (merge) ветки master с вашей веткой с новыми фичами**
- Закинуть все изменения в гит на свою ветку(git add . && git commit -m "new-commit" && git push origin your-branch).
- git checkout master
- git pull
- git checkout your-branch
- git merge master
- Фиксим конфликты (консоль будет говорить в каких файлах конфликты, ищите много знаков >>>>>>>> и <<<<<<<<<), либо с помощью IDE.
- git commit -am "merging changes from my branch" && git push

Теперь в вашей ветке есть слитые ваши изменения и последняя версия мастера, теперь нужно закинуть все это дело в мастер.

- git checkout master
- git merge your-branch
- Конфликтов уже не должно быть, все должно слиться автоматически.
- Profit

***Как переключаться с ветки на ветку локально, чтобы постоянно не возникал конфликт с git?***
- Если вы работаете в какой то ветке (имеете незакомиченные файлы), при переключении на другую ветку git попробует смерджить всю вашу текущую работу с этой другой веткой. При этом могут возникнуть конфликты, а часть работы при переключении обратно позже вообще может быть утеряна. Поэтому, если хотите переключиться на другую ветку (например чтобы проверить пулл реквест соседа), сделайте одно из следующих действий:

- Перед переключением закомитьте все файлы. Переключайтесь только когда у вас локально нет никаких изменений.
Если ваш код не до конца рабочий и вы не хотите его коммитить, вы можете его временно "спрятать", используя команду git stash. В гите есть специальный "карман", в котором можно хранить куски кода. После выполнения этой команды все ваши изменения локально исчезнут, и будут помещены в этот карман. То есть код откатится до изначального состояния. Теперь можно смело переходить на другие ветки. Когда вы вернетесь обратно на свою ветку и захотите снова увидеть свои изменения, выполните команду git stash apply - это вернет последние изменения из кармана обратно в вашу ветку.


git pull = git fetch + git merge ( по факту состоит из двух команд)
