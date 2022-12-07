const path=require("path"),FileDatabase=require("./db")
const directoryPath = "C:\\Users\\MPA\\Videos\\file"
  
// Créez une instance de la classe FileDatabase en lui passant le chemin du dossier en paramètre
const fileDatabase = new FileDatabase(directoryPath);

// Utilisez la méthode readDatabase pour lire les fichiers du dossier et remplir la base de données
fileDatabase.readDatabase();

// Utilisez la méthode getUuids pour obtenir tous les UUID de la base de données
const uuids = fileDatabase.getUuids();
for (const uuid of uuids) {
  console.log(uuid);
}