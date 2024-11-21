import fs from 'fs';

fs.mkdir('folder', (err) => {
    if (err) {
        console.error(`Error creating folder: ${err}`);
        return;
    }
    console.log('Folder created successfully');

    fs.rmdir('folder', (err) => {
        if (err) {
            console.error(`Error deleting folder: ${err}`);
            return;
        }
        console.log('Folder deleted successfully');
    });
});
