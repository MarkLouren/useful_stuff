**1. The Most popular linux commands:**
* _mkdir_ - create a new directory
* _touch_ - create a new file
* _ls_ - list of directories in the current folder _ls -a_ see hiden files
* _cd_ - change the directory
* _cd .._ - move on one level up
* _rm_ - remove a file or a directory
* _sudo lsof -iTCP -sTCP:LISTEN -n -P_ - Find a list of tasks running on your machine with their pid
* sudo kill <mongo_command_pid>_  - kill the task by pid

**2. useful Commands GIT:**
* _git inint_ - create folder git in the local directory (working Directory)
* _git status_ - check the current status of a git folder if it the same as the directory on GitHub
* _git remote add origin_ https://github.com/MarkLouren/CodeCourse.git  a local folder to a the chosen Github Directory
* _git *_ - add everything from the folder to git
* _git push --set-upstream origin master_   - create a folder Master if doesn't exist in Github directory
* _git push_  - push updates from the local directory (working Directory) to the Github Directory
* _git pull_ - update your local repository with the last updates from the GitHub repository 
* _git clone_ https://github.com/MarkLouren/stores-rest-api.git . - Clone from github at the same directory "."

**3. Popular Pipelines:**

**4. Other:**
* _ssh-keygen_ - generate SSH pair keys
* _vi_ - visual editor for files


**5. Heroku CLI:**
* Link: https://devcenter.heroku.com/articles/heroku-cli-commands
* heroku login - login to CLI
* heroku logs --app=stores-rest-new check apps logs
