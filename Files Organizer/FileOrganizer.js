const fs = require("fs");
const path = require("path");

folderPath = "paste your messy folder path here"; // EDIT IT BEFORE RUNNING THE CODE

const extensions = new Set(); // to store extensions name

// Code to get respective folders names
try {
  const files = fs.readdirSync(folderPath); // read files name

  // iterate through each file
  files.forEach((file) => {
    const filePath = path.join(folderPath, file); // full path of that file

    const stats = fs.statSync(filePath); // read stats of that file

    if (!stats.isDirectory()) {
      // if current item is not a folder or anything but a file
      const extension = path.extname(file); // get its extension

      extensions.add(extension.slice(1)); // add extension name to the set
    }
  });

  //   console.log(extensions);
} catch (err) {
  if (err.code === "ENOENT") {
    // if wrong path
    console.log("Path does not exist.");
  } else {
    // otherwise
    console.error("An error occurred:", err);
  }
}

// Code to create respective folders
extensions.forEach((extension) => {
  // iterate through each folder name
  const pathOfFolder = path.join(folderPath, `${extension} files`); // get folder full path

  fs.mkdirSync(pathOfFolder); // create corresponding folder
});

// Code to move each file to its corresponding folder
try {
  const files = fs.readdirSync(folderPath); // get current folder content names

  files.forEach((file) => {
    // iterate through each of them
    const oldFilePath = path.join(folderPath, file); // full old path of the item
    const stats = fs.statSync(oldFilePath); // get item's stats

    if (!stats.isDirectory()) {
      // if the item is not a folder or anything but a file
      const ext = path.extname(oldFilePath).slice(1); // get file's extension
      const respectiveDir = path.join(folderPath, `${ext} files`); // full path of the corresponding folder  for that file

      const newFilePath = path.join(respectiveDir, file); // full new path of the file

      fs.renameSync(oldFilePath, newFilePath); // move the file to the corresponding folder
    }
  });
} catch (err) {
  if (err.code === "ENOENT") {
    // if wrong path
    console.log("Path does not exist.");
  } else {
    // otherwise
    console.error("An error occurred:", err);
  }
}
