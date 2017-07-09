# ReNest

The idea is to be able to use this to do list app when moving to a new place. This prototype uses firebase so all clients have the data synched. In a future release a way to manage the 2do items should be added, for now the list is preset (although it can be easily configured directly from firebase's database cms).

A couple of animations were added to showcase how easily css transitions can be used. With React I defined two states (initial and final) and by adding a class the css transitions are executed.

## Mobile friendly

This app can be used via a browser (full size), a resized browser and a smartphone as it was developed with a responsive approach.

### Dev
```sh
npm i -g nwb
npm install
nwb serve
```

### Build
```sh
npm run build
```

A new folder (dist/) should appear.


### Notes

Uses firebase as the persistence layer and by doing so allows the changes to be seen in real time between the clients. In order to use this prototype you should include your own firebase.js file with the proper configurations.


