import fs from 'fs';
const DOG_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all'
const DOG_BREED_IMAGE_URL = (breed,subBreed = undefined) => `https://dog.ceo/api/breed/${breed}${subBreed ? `/${subBreed}` : ''}/images/random`
let dogBreeds = [];

async function getDogBreeds() {
    try {
      const response = await fetch(DOG_BREEDS_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error("Error fetching dog breeds:", error);
      throw error;
    }
  }

async function getThreeRandomBreed() {
    try {
        let threeRandomBreeds = [];
      const breeds = await getDogBreeds();
      dogBreeds = breeds;

      const randomBreedIndex = Math.floor(Math.random() * Object.keys(breeds).length);
      const randomBreedIndex2 = Math.floor(Math.random() * Object.keys(breeds).length);
      const randomBreedIndex3 = Math.floor(Math.random() * Object.keys(breeds).length);

      const randomBreed1 = Object.keys(breeds)[randomBreedIndex];
      const randomBreed2 = Object.keys(breeds)[randomBreedIndex2];
      const randomBreed3 = Object.keys(breeds)[randomBreedIndex3];

      checkForSubBreed(breeds,randomBreed1,threeRandomBreeds);
      checkForSubBreed(breeds,randomBreed2,threeRandomBreeds);
      checkForSubBreed(breeds,randomBreed3,threeRandomBreeds);

      return threeRandomBreeds; 
    } catch (error) {
      console.error("Failed to get dog breeds:", error);
    }
  }
  function checkForSubBreed(breeds,breed,acc){
    if(Object.keys(breeds[breed]).length > 0){
        const randomSubBreedIndex = Math.floor(Math.random() * Object.keys(breeds[breed]).length)
        const randomSubBreed = breeds[breed][randomSubBreedIndex];
        acc.push([breed,randomSubBreed]);
      }else{
        acc.push([breed]);
      }
  }
  async function writeThreeBreedImages(){
    const randomBreed = await getThreeRandomBreed();
    let text = '';
    for (const breedInfo of randomBreed) {
        if (breedInfo.length === 1) {
          const response = await fetch(DOG_BREED_IMAGE_URL(breedInfo[0]));
          const data = await response.json();
          text += data.message + " (" + breedInfo[0] + ")" + '\n';
        } else if (breedInfo.length === 2) {
          const response = await fetch(DOG_BREED_IMAGE_URL(breedInfo[0],breedInfo[1]));
          const data = await response.json();
          text += data.message + " (" + breedInfo[0] + " " + breedInfo[1] + ")" + '\n';
        }
      }
      try {
        fs.writeFileSync('dog_breeds.txt', text);
      } catch (error) {
        console.error("Error writing to file:", error);
      }
  }
  
  await writeThreeBreedImages()

