# Tinkoff_Test

## npm i 
*Downloads all required files*

## npm start
*Starts local server in port 3000. There is the task*

## npm run lclserver
*Starts local server in port 4000. There is the source server. The web application gets data from it and pushes data there*

## Description of functions:
  - User needs to log in to view contacts. If he doesn't log in, the lock page will be displayed
  - User can log in by the form with a path '/login'
  - After success entering user can view contacts. There are no more than 5 contacts on the screen. If you need to see more just scroll up and down
  - Also user can edit contacts, just push button *edit* on the contact, then edit field you want. When all changes are finished, push button *save*
  - User can delete contacts, just push button *delete* on the contact
  - If you want to create new contact, push button *create*. After that new contact will be created with default values which are able to change
  - __No one change will be save if you will not push button *save* on the bottom of the screen. After pushing all data will be saved on server__
