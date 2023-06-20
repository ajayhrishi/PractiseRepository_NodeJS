module.exports = (temp,el) => { // tempCard is a string filled with HTML content becuase we have used the readFileSync() to read it. 
							
	let output = temp.replace(/{%IMAGE%}/g,el.image); // function replaceAll will not work with nodeJS
	output = output.replace(/{%PRODUCTNAME%}/g,el.productName); // /{%IMAGE%} is not in the '' becuase the element in tempcard is not a string. 
	output = output.replace(/{%DESCRIPTION%}/g, el.description);
	output = output.replace(/{%FROM%}/g, el.from);
	output = output.replace(/{%PRICE%}/g, el.price);
	output = output.replace(/{%DESCRIPTION%}/g, el.description);
	output = output.replace(/{%QUANTITY%}/g,el.quantity);
	output = output.replace("{%ID%}",el.id);
	output = output.replace(/ {%NUTRIENTS%}/g, el.nutrients);
	if(!el.organic){
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}
	return output; 
}