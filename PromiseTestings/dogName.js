
const fs = require('fs');
//module.export = dogs[random()*11];

function SelectDog(){
    console.log('Arrived the SelectDog.js file');
    let dogs = [`brabancon`,`mountain`,`lakeland`,`sharpei`,`irish`,`shiba`,`komondor`,`lhasa`,`tervuren`,`shepherd`,`african`];
    const SelectedDog = dogs[Math.floor(Math.random()*11)];
    console.log(SelectedDog, 'Selected from the Dog Names array.');
    fs.writeFile(`./PromiseTestings/dog.txt`,SelectedDog, (err)=>{ if(err)console.log(err);});
    console.log('wrote the name to dog.txt file');
    console.log('exporting the dog name to the main JS file promiseTest.js');
    return SelectedDog;
}



exports.module = SelectDog();

