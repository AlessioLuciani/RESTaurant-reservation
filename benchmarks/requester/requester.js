var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
while(true) {
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "http://localhost:8081", false ); // false for synchronous request
xmlHttp.send( null );
}
