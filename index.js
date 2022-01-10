const fs = require('fs');

let data = [1,3,4,2,1,7,5,4,3,8,9,1,3,2,10,3,2,4,3,8];

function equation(a, b, c, d, e) {
    return Math.sin(a) * Math.cos(b) * Math.tan(c) * Math.log(d) / e;
}

function compress(array) {
    let out = [];

    for(let i = 0; i < array.length; i += 5) {
        let sum = equation(array[i], array[i + 1], array[i + 2], array[i + 3], array[i + 4]);
        
        let biggest = 0;

        for(let o = 0; o < 5; o++) {
            if(array[i + o] > biggest) biggest = array[i + o];
        }

        let smallest = 9999999999999999;

        for(let o = 0; o < 5; o++) {
            if(array[i + o] < smallest) smallest = array[i + o];
        }

        out.push(biggest, smallest, sum);
    }

    return out;
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function solve(sector, max, min, sum) {
    process.stdout.write("Solving sector " + (sector + 1));

    let out = [];
    let used = [];

    let s = 0;

    let guesses = 0;

    while(s != sum) {
        used.push(out.join(","));

        while(used.includes(out.join(","))) {
            out = [rnd(min, max), rnd(min, max), rnd(min, max), rnd(min, max), rnd(min, max)];
        }

        s = equation(out[0], out[1], out[2], out[3], out[4]);

        guesses++;

        process.stdout.write("\r\x1b[K");
        process.stdout.write("Solving sector " + (sector + 1) + " (" + guesses + " guesses)");
    }

    console.log("\nSolved sector " + (sector + 1));

    return out;
}

function decompress(array) {
    let out = [];

    for(let i = 0; i < array.length; i += 3) {
        out.push(...solve(i / 3, array[i], array[i + 1], array[i + 2]));
    }

    return out;
}

let compressed = compress(data);
let decompressed = decompress(compressed);

fs.writeFile("uncompressed", Buffer.from(data), () => {});
fs.writeFile("compressed", Buffer.from(compressed), () => {});

console.log(data);
console.log(decompressed);