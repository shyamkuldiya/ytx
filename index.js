import fs from "fs";

async function getFileData() {
  try {
    fs.writeFile(
      "./hello.txt",
      "Google dogs https://localhost:300",
      (error, result) => {
        if (error) {
          console.log("Error", error);
        } else {
          console.log(`Result:\n${result}`);
        }
      },
    );
  } catch (error) {
    console.log("Error", error);
  }
}

getFileData();
