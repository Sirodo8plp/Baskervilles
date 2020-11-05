let book = [];
let PageIndex = 0;
let totalCharactersPerPage = 1200;
let totalCharactersPerLine = 100;
let pageIndex = 0;

document.querySelector("#Previous").addEventListener('click' , goBack);
document.querySelector("#Next").addEventListener('click' , goForth);

function readTextFile(file)
{
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                let data = rawFile.responseText;
                data = insertChapters(data);
                data = data.replaceAll("\n" , " ");
                data.split(" ");
                let pages = Math.ceil(data.length / 1200);
                let begin = 0;
                let end = 1200;
                for(let i = 0; i < pages; i++){
                    book.push(data.slice(begin,end));
                    begin += 1200;
                    end +=1200;
                }
            }
        }
    }
    rawFile.send(null);
}

function insertChapters(data){
    data = data.replace("Chapter 1.Mr.Sherlock Holmes" , "<h1>Chapter 1: Mr. Sherlock Holmes</h1>");
    data = data.replace("Chapter 2.The Curse of the Baskervilles", "<h1>Chapter 2: The Curse of Baskervilles</h1>");
    data = data.replace("Chapter 3.The Problem" , "<h1>Chapter 3: The Problem</h1>");
    data = data.replace("Chapter 4.Sir Henry Baskerville" , "<h1>Chapter 4: Sir Henry Baskerville</h1>");
    data = data.replace("Chapter 5.Three Broken Threads" , "<h1>Chapter 5: Three Broken Threads</h1>");
    data = data.replace("Chapter 6.Baskerville Hall" , "<h1>Chapter 6: Baskerville Hall</h1>");
    data = data.replace("Chapter 7.The Stapletons of Merripit House" , "<h1>Chapter 7: The Stapletons of Merripit House</h1>");
    data = data.replace("Chapter 8.First Report of Dr.Watson" , "<h1>Chapter 8: First Report of Dr. Watson</h1>");
    data = data.replace("Chapter 9.The Light upon the Moor[Second Report of Dr.Watson]" , "<h1>Chapter 9: The Light upon the Moor</h1>");
    data = data.replace("Chapter 10.Extract from the Diary of Dr.Watson" , "<h1>Chapter 10: Extract from the Diary of Dr. Watson</h1>");
    data = data.replace("Chapter 11.The Man on the Tor" , "<h1>Chapter 11: The Man on the Tor</h1>");
    data = data.replace("Chapter 12.Death on the Moor" , "<h1>Chapter 12: Death on the Moor</h1>");
    data = data.replace("Chapter 13.Fixing the Nets","<h1>Chapter 13: Fixing the Nets</h1>");
    data = data.replace("Chapter 14.The Hound of the Baskervilles" , "<h1>Chapter 14: The Hound of the Baskervilles</h1>")
    data = data.replace("Chapter 15.A Retrospection" , "<h1>Chapter 15: A Retrospection</h1>");
    return data;
}

function goBack(){
    if(pageIndex > 0){
        pageIndex--;
        ChangePage();
    }
}

function goForth(){
    if( pageIndex < book.length){
        pageIndex++;
        ChangePage();
    }
}

function ChangePage(){
    document.querySelector("#content").innerHTML = book[pageIndex];
    document.querySelector("#bookmark").innerHTML = "Currently Reading page." + (pageIndex+1).toString();
}

document.querySelectorAll("li a").forEach( link => {
    let chapter = link.firstChild.data;
    link.addEventListener('click' , () => {
        book.forEach( (page,index) => {
            if (page.includes(chapter)) pageIndex = index;
        });
        ChangePage();
    })
});

document.querySelector("#save-bookmark").addEventListener('click' , ()=>{
    localStorage.setItem("bookmark" , pageIndex.toString());
});

document.querySelector("#load-bookmark").addEventListener('click' , () => {
    if(localStorage.getItem("bookmark") === null) alert("No bookmark has been saved.");
    else {
        pageIndex = parseInt(localStorage.getItem("bookmark"));
        ChangePage();
    }
})
readTextFile("Baskerville.txt");
ChangePage();







