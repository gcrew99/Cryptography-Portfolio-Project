#Running application
If this is your first time downloading, or you have just git pulled, make sure to run
```
npm install
```
Then to run, all you should need to is run
```
npm start
```

If you get an error when you run npm run start that looks like this: "Can't resolve ./documentclasses"... this is because it is dumb and can't figure out how to find a folder that doesn't exist yet.
To resolve, do this: 
```
mkdir node_modules/latex.js/dist/documentclasses
```