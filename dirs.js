const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const dirs = [
    'dir-1/dir-1-1',
    'dir-1/dir-1-2',
    'dir-1/dir-1-2/dir-1-2-1',
    'dir-2/dir-2-1/dir-2-1-1',
    'dir-2/dir-2-2/dir-2-2-1',
    'dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
    'dir-3/dir-3-1',
    'dir-3',
    'dir-3/dir-3-2/dir-3-2-1',
    'dir-3/dir-3-3/dir-3-3-1'
];

let newDirs = [];
function addDir(dirPieces){
    let newDir ='';
    dirPieces.forEach((piece)=>{
        newDir +=piece+'/';
        if(!newDirs.includes(newDir)){
            newDirs.push(newDir);
        }
    });
    return 0;
}

dirs.forEach((dir)=>{
    let dirPieces = dir.split('/');
    addDir(dirPieces);
});

Promise.mapSeries(newDirs, (dir) => {
    return fs.mkdirAsync(dir);
});