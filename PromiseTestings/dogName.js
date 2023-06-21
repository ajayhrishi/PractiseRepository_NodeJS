

//module.export = dogs[random()*11];

function SelectDog(){
    const dogs = [`German Shepherd`,`Bulldog`,`Labrador Retriever`,`French Bulldog`,`Siberian Husky`,`Afghan Hound`,`Dachshund`,`Border Collie`,`Chihuahua`,`Poodle`,`Alaskan Malamute`];
    const SelectedDog = dogs[Math.floor(Math.random()*11)];
    console.log(SelectedDog, ' exported from the dogName.js file');
    return SelectedDog;
}



exports.module = SelectDog();