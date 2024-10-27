import fs from "fs";

fs.writeFile("hello.txt", "Hello, World!", (err) => {
    if (err) {
        console.error(`Error creating file: ${err}`);
    }
    console.log("File created successfully");
});

fs.readFile("hello.txt", "utf8", (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
    }
    console.log(data);
})