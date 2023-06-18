const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{
    let pathname = req.url;
	if(pathname==="/product"){res.end('it is the product');}
	else if(pathname==="/food"){res.end('Page to serve food');}
	else if(pathname==="/water"){res.end('Page to drink water');}
    else {
	res.writeHead(404,{
	'Content-type': 'text/html',
	'my-own-header': 'hello-world'
	});
	res.end('<h1>Page Not Found </h1>');
	}
});

server.listen(8000, '127.0.0.1', ()=>{
	console.log('Listening to requests on port 8000')});