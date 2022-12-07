let uuid =require("uuid").v4
const fs =require("fs");
const path = require("path");
class FileDatabase {
    // La fonction constructeur de la classe prend en paramètre le chemin du dossier contenant les fichiers
    constructor(directoryPath) {
      this.directoryPath = directoryPath;
      this.database = [];
    }
  
    // La méthode readDatabase lit les fichiers du dossier et ajoute chaque fichier à la base de données
    readDatabase() {
      fs.readdir(this.directoryPath, (err, files) => {
        if (err) {
          // Gérez les erreurs ici
        }
  
        // Parcourez les fichiers et attribuez un UUID unique à chaque fichier
        files.forEach(file => {
          // Générez un UUID unique
          const fileUuid = uuid.v4();
  
          // Stockez le nom du fichier et son UUID dans un objet
          const fileData = {
            fileName: file,
            filepath:path.join(this.directoryPath,file),
            fileUuid: fileUuid
          };
  
          // Ajoutez l'objet à votre base de données
          this.database.push(fileData);
        });
      });
    }
  
    // La méthode getUuids retourne la liste des UUID de tous les fichiers de la base de données
    getUuids() {
      // Initialisez une liste pour stocker les UUID
      const uuids = [];
  
      // Parcourez la base de données
      for (const fileData of this.database) {
        // Ajoutez le UUID de chaque fichier à la liste
        uuids.push(fileData.fileUuid);
      }
  
      // Retournez la liste des UUID
      return uuids;
    }
  }
  
  module.exports=FileDatabase
  

  
  ```
  // Défini
  ssez le chemin du dossier contenant les fichiers
  const directoryPath = path.join(__dirname, 'my-folder');
  
  // Créez une instance de la classe FileDatabase en lui passant le chemin du dossier en paramètre
  const fileDatabase = new FileDatabase(directoryPath);
  
  // Utilisez la méthode readDatabase pour lire les fichiers du dossier et remplir la base de données
  fileDatabase.readDatabase();
  
  // Utilisez la méthode getUuids pour obtenir tous les UUID de la base de données
  const uuids = fileDatabase.getUuids();
  for (const uuid of uuids) {
    console.log(uuid);
  }
  ```
  
