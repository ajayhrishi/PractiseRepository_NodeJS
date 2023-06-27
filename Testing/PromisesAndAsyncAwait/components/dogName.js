
const fs = require('fs');
//module.export = dogs[random()*11];

function SelectDog(){
    console.log('Arrived the SelectDog.js file');
    let dogs = [`clumber`,`mountain`,`sharpei`,`sharpei`,`irish`,`shiba`,`komondor`,`lhasa`,`tervuren`,`african`];
    const SelectedDog = dogs[Math.floor(Math.random()*10)];
    console.log(SelectedDog, 'Selected from the Dog Names array.');
    fs.writeFile(`./dog.txt`,SelectedDog, (err)=>{ if(err)console.log(err);});
    console.log('wrote the name to dog.txt file');
    console.log('exporting the dog name to the main JS file promiseTest.js');
    return SelectedDog;
}



exports.module = SelectDog();

