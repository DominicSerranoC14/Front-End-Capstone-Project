//User input is BMP-121048-06096
const userInput = 'BMP-121048-06096';

//Split part# on each '-'
const userSearch = userInput.split('-');

for ( let i = 0; i < userSearch.length; i++ ) {
  const search = userSearch[i];
  console.log("Test userSearch[each]", search);
  //Directories in FB DB
  const dirs = [ 'proto', 'item', 'kit' ];

  //Passes first section of P# and first directory into GET request
  function getItem( userSearch[i], dirs[i] ) {

    $http.get(
      url: `FBUrl/${dirs[i]}`
    )
    .success(function(returnObj) {
      //push each obj in returnObj to an array
      let returnArray = [];
      //Now loop through returnArray and match the user item key to the DB key
      returnArray.each(funciton(each) {
        //Tests if they match
        if ( userSearch[i].key === returnObjArray[each].key ) {
          let userItem = returnObjArray[each];
          //Pass matched item to function that tests for prototype
          if ( userItem.proto === true ) {
            //this is the prototype
          }
          //Now test the following objects here and chain the second to first and so on
        }
      })
    })
  }
}

console.log("Test userInput", userInput);
console.log("Test userSearch", userSearch);
