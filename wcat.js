let fs = require("fs")
//input
let input = process.argv.slice(2);
console.log("input",input);
let options=[];
let filePaths =[];

//lstatsync also a fun to identify files
//isFileexist
for(let i =0; i< input.length ; i++){
    //google it
    let firstChar = input[i].charAt(0);
    if(firstChar == "-"){
        options.push(input[i]);
    }else{
        filePaths.push(input[i]);
    }
}
console.log("options", options);
console.log("filePath", filePaths);
for(let i = 0 ; i<filePaths.length;i++){
    let isFilePresent = fs.existsSync(filePaths[i]);
    if(isFilePresent ==false){
        console.log("filepath",filePaths[i],"does not exist");
        return;
    }
    // }else{
    //     fs.readFile(filePaths[i], 'utf8', function (err,data) {
    //         if (err) {
    //           return console.log(err);
    //         }
    //         console.log(data);
    //         return data;
    //       });
    // }
}
let totalContent = "";
for(let i = 0 ; i<filePaths.length;i++){
    let contentOFCurrent = fs.readFileSync(filePaths[i]);
    totalContent += contentOFCurrent +"\r\n";
}
console.log(totalContent);



let isSoption = options.includes("-s");
let isN = options.includes("-n");
let isB = options.includes("-b");
let finalOption;
if(isN ==true){
    if(isB==true){
        //to check which option comes first
        let idxB = options.indexOf("-b");
        let idxN = options.indexOf("-n");
        finalOption = idxB < idxN ? "-b" : "-n";
    }else{
        finalOption = "-n";
    }}else if(isB ==true){
        finalOption = "-b";
    }

if(isSoption == true){
    //empty line break remove
    //console.log(totalContent);
    //identify empty lines breaks
    let contentArr = totalContent.split("\r\n");
    console.log(contentArr);
    //remove
    let tempArr = [];
    for(let i = 0 ; i< contentArr.length;i++){
        if(contentArr[i] !== ""){
            tempArr.push(contentArr[i]);
        }
    }
    totalContent=tempArr.join("\r\n");
}
if(finalOption == "-n"){
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    // console.log(contentArr);
    for(let i =0;i< contentArr.length; i++){
        contentArr[i] = count+". "+contentArr[i];
        count++;
    }
    totalContent = contentArr.join("\r\n");
}

if(finalOption=="-b"){
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    // console.log(contentArr);
    for(let i =0;i< contentArr.length; i++){
        if(contentArr[i] !== ""){
            contentArr[i] = count+". "+contentArr[i];
            count++;
        }
    }
    totalContent = contentArr.join("\r\n");
}
console.log(totalContent);
//node wcat.js -s -b -n "f1.txt"
//node wcat.js -s -b -n "f2txt" "f4.txt"