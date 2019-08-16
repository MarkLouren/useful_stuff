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
```

Add files on server (in VirtualEnv):
1. git clone https://github.com/MarkLouren/tribes-landing.git
2. Update: git pull origin master

