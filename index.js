const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify');
const replaceTemplate = require('./module/replaceTemplate.js');

const tempMainPage = fs.readFileSync('./1-node-farm/starter/templates/overview.html', 'utf-8'); // template to load the main page
const tempCard = fs.readFileSync('./1-node-farm/starter/templates/template-card.html', 'utf-8'); //template to load the card inside the main page, . 
const tempProdcut = fs.readFileSync('./1-node-farm/starter/templates/template-product.html', 'utf-8'); //template to load the product page. 
const data = fs.readFileSync('./1-node-farm/starter/dev-data/data.json', 'utf-8');// this methoad will read the content inside the data.json as a string. 
// also this code will only execute once when the program starts. so we could mention it as sync.
const productData= JSON.parse(data); // will convert to a json array and store it in to productData. 
// by moving this out of the scope the code will not get keep executing, while we go to the /api page. instead it will just send the data out at line 18.
// it means there will be only one server request. 



console.log(slugify('Fresh Avacados', {lower: true}));

const server = http.createServer((req,res)=>{// this function will be keep getting executed when the user make each changes. req and res are objects that helps to gather the request from the client and res object for choosing the reponse to the client. 
	let {pathname, query} = url.parse(req.url,true);
	const queryE={...query};
	/*
	console.log(url.parse(req.url,true));  //url.parse(req.url,true) it will get the HTTP request as an object. the format of the object will be like below. 
	Url {
		protocol: null,
		slashes: null,
		auth: null,
		host: null,
		port: null,
		hostname: null,
		hash: null,
		search: null,
		query: [Object: null prototype] {},
		pathname: '/api',
		path: '/api',
		href: '/api'
	  } 
	  in the above object we will take the path and query object.
	  */
    //let pathname = req.url; // req.url to get the path name the userwanted to go inside the site. eg: /api, /food, /water, /product. etc

	if(pathname==="/"){// for the main page.
		const output = productData.map(el=> replaceTemplate(tempCard,el)).join('');
		const mainoutput = tempMainPage.replace(/{%PRODUCT_CARDS%}/,output);
		res.end(mainoutput);
	} 
	else if(pathname==="/product"){
		let prodcutDataN = productData[queryE.id]; // will get the details of the product from JSON format array stored in productData variable in the lexical scope.
		res.writeHead(200,{'Content-type':'text/html'});
		let output = replaceTemplate(tempProdcut,prodcutDataN);
		res.end(output);
} // for the product view page. 
	else if(pathname==="/food"){res.end('Page to serve food');} // testing page. 
	else if(pathname==="/water"){res.end('Page to drink water');} // testing page. 
	else if (pathname==='/api'){  // testing page to see if the api is working or not. 
		res.writeHead( 200 , {'Content-type':'application/json'}); // just making a head for the api call. 
		res.end(data); // sending the data inside the data.json as output for the call. 
	}
	else {
	res.writeHead(404,{   // write head is not mandatory but it's a good pratice to have. it will give the response and update the HTTP request code along with it. 
	'Content-type': "text/html",
	'my-own-header': 'hello-world'
	});
	res.end('<h1>Page Not Found </h1>');
	}
});

server.listen(8000, '127.0.0.1', ()=>{
	console.log('Listening to requests on port 8000')}); 

