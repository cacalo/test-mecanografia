
const {promises: fsPromises} = require('fs');

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

    return arr;
  } catch (err) {
    console.log(err);
  }
}

asyncReadFile('palabras.txt').then((palabras)=>{
	console.log(palabras)
	asyncArrayToFile("palabrasArray.txt",palabras);
})

async function asyncArrayToFile(filename,content) {
  try {
		console.log(typeof content)
		contenidoString = "["+content.map(palabra => "'"+palabra+"'")+"]";
    await fsPromises.writeFile(filename, contenidoString, 'utf-8');


    //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
		console.log("Archivo generado")
    return arr;
  } catch (err) {
    console.log(err);
  }
}