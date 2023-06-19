const http = require('http');
const url = require('url');
const fs = require('fs');

const tempMainPage = fs.readFileSync('./1-node-farm/starter/templates/overview.html', 'utf-8'); // template to load the main page
const tempCard = fs.readFileSync('./1-node-farm/starter/templates/template-card.html', 'utf-8'); //template to load the card inside the main page, . 
const tempProdcut = fs.readFileSync('./1-node-farm/starter/templates/template-product.html', 'utf-8'); //template to load the product page. 
const data = fs.readFileSync('./1-node-farm/starter/dev-data/data.json', 'utf-8');// this methoad will read the content inside the data.json as a string. 
// also this code will only execute once when the program starts. so we could mention it as sync.
const productData= JSON.parse(data); // will convert to a json array and store it in to productData. 
// by moving this out of the scope the code will not get keep executing, while we go to the /api page. instead it will just send the data out at line 18.
// it means there will be only one server request. 

function replaceTemplate(temp,el){ // tempCard is a string filled with HTML content becuase we have used the readFileSync() to read it. 
									
						
	let output = tempCard.replace(/{%IMAGE%}/g,el.image); // function replaceAll will not work with nodeJS
	output = output.replace(/{%PRODUCTNAME%}/g,el.productName); // /{%IMAGE%} is not in the '' becuase the element in tempcard is not a string. 
	output = output.replace(/{%DESCRIPTION%}/g, el.description);
	output = output.replace(/{%FROM%}/g, el.from);
	output = output.replace(/{%PRICE%}/g, el.price);
	output = output.replace(/{%DESCRIPTION%}/g, el.description);
	output = output.replace(/{%QUANTITY%}/g,el.quantity);
	if(!el.organic){
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}
	return output; 
}

// the code below this will be keep getting executed when the user make each changes. 
const server = http.createServer((req,res)=>{
    let pathname = req.url;
	if(pathname==="/"){// foR the main page. 
		const output = productData.map(el=> replaceTemplate(tempCard,el)).join('');  //
		const mainoutput = tempMainPage.replace(/{%PRODUCT_CARDS%}/,output);
		res.end(mainoutput);
	} 
	else if(pathname==="/product"){res.end('it is the product');} // for the product view page. 
	else if(pathname==="/food"){res.end('Page to serve food');} // testing page. 
	else if(pathname==="/water"){res.end('Page to drink water');} // testing page. 
	else if (pathname==='/api'){  // testing page to see if the api is working or not. 
		res.writeHead( 200 , {'Content-type':'application/json'}); // just making a head for the api call. 
		res.end(data); // sending the data inside the data.json as output for the call. 
	}
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