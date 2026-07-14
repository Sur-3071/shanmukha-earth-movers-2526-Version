const fs = require("fs");

const filePath = "C:\\Users\\koner\\Downloads\\dummyfile.txt";

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    data.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line)
        .forEach(line => {
            const column = line.replace(/,$/, ""); // Remove trailing comma
            const alias = column.replace(/^Q_/, ""); // Remove Q_
            console.log(`${column} AS ${alias},`);
        });
});