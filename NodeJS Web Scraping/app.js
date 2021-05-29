const yargs = require('yargs')
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const fs = require('fs');
const Model = require("./model/model");
const mongoose = require("mongoose");
async function sleep(Milliseconds) {     
    return new Promise(resolve => setTimeout(resolve, Milliseconds));
 }
let params = yargs.argv

if (params.all)
fs.writeFile('linkler.txt', `
https://www.8notes.com/piano/classical/sheet_music/
https://www.8notes.com/guitar/classical/sheet_music/
https://www.8notes.com/violin/classical/sheet_music/
https://www.8notes.com/flute/classical/sheet_music/
https://www.8notes.com/saxophone/classical/sheet_music/
https://www.8notes.com/voice/classical/sheet_music/
https://www.8notes.com/clarinet/classical/sheet_music/
https://www.8notes.com/trumpet/classical/sheet_music/
https://www.8notes.com/instruments/
https://www.8notes.com/all/classical/sheet_music/
https://www.8notes.com/jazz/
https://www.8notes.com/traditional/
https://www.8notes.com/all/rock_and_pop/sheet_music/
https://www.8notes.com/all/christmas/sheet_music/
https://www.8notes.com/world/
https://www.8notes.com/styles/
https://www.8notes.com/bach.asp
https://www.8notes.com/beethoven.asp
https://www.8notes.com/mozart.asp
https://www.8notes.com/tchaikovsky.asp
https://www.8notes.com/joplin.asp
https://www.8notes.com/chopin.asp
https://www.8notes.com/artists/
`, function (err) {
    if (err) return console.log(err)    
  });

//console.log(yargs.argv)
if (params.enstruman =='piano'){
    console.log('Piyano türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/piano/classical/sheet_music/')
} else if (params.enstruman == 'guitar') {
    console.log('Gitar türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/guitar/classical/sheet_music/')
} else if (params.enstruman == 'violin') {
    console.log('Violin türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/violin/classical/sheet_music/')
} else if (params.enstruman == 'Flute') {
    console.log('Flüt türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/flute/classical/sheet_music/')
} else if (params.enstruman == 'altoSax') {
    console.log('Saksafon türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/saxophone/classical/sheet_music/')
} else if (params.enstruman == 'voice') {
    console.log('Voice türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/voice/classical/sheet_music/')
} else if (params.enstruman == 'clarinet') {
    console.log('Klarnet türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/clarinet/classical/sheet_music/')
} else if (params.enstrumanand == 'trumpet') {
    console.log('Trampet türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/trumpet/classical/sheet_music/')
} else if (params.enstruman == 'others') {
    console.log('Diğer enstrüman türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/instruments/')
} else {
    console.log('ilk parametre tanımlanmadı')
}

if (params.stil =='classical'){
    console.log('Klasik türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/all/classical/sheet_music/')
} else if (params.stil == 'jazz') {
    console.log('jazz türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/jazz/')
} else if (params.stil == 'traditional') {
    console.log('Geleneksel türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/traditional/')
} else if (params.stil == 'rockandpop') {
    console.log('Rock ve Pop türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/all/rock_and_pop/sheet_music/')
} else if (params.stil == 'christmas') {
    console.log('Christmas türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/all/christmas/sheet_music/')
} else if (params.stil == 'world') {
    console.log('World türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/world/')
} else if (params.stil == 'others') {
    console.log('Diğer türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/styles/')
}  else if (params.bestekar =='bach'){
    console.log('Bach türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/bach.asp')
} else if (params.bestekar == 'beethoven') {
    console.log('beethoven türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/beethoven.asp')
} else if (params.bestekar == 'mozart') {
    console.log('mozart türünde arama yapılmaktadır Aranacak sayfa : https://www.8notes.com/mozart.asp')
} else if (params.bestekar == 'tchai') {
    console.log('tchaikovsky türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/tchaikovsky.asp')
} else if (params.bestekar == 'scott') {
    console.log('Scott Joplin türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/joplin.asp')
} else if (params.bestekar == 'chopin') {
    console.log('Chopin türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/chopin.asp')
} else if (params.bestekar == 'others') {
    console.log('Diğer türünde arama yapılmaktadır. Aranacak sayfa : https://www.8notes.com/artists/')
}  else {
    console.log('Üçüncü parametre tanımlanmadı')
}



 async function scrapePieces(params) {
    console.log(scrapedData)
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    var allPieces = [];
    for (var i = 0; i < scrapedData.length; i++) {
        await page.goto(scrapedData[i]);
        var html = await page.content();
        var $ = cheerio.load(html);
        var pieces= [];
        var nextButton1 = $($("#centercontent > div.pagination > ul > li").last()).find("a");
        var nextButton2 = $($("#centercontent > div.table-responsive > div > ul > li").last()).find("a");
        var next = true
        do{
            html = await page.content();
            $ = cheerio.load(html);
            nextButton1 = $($("#centercontent > div.pagination > ul > li").last()).find("a");
            nextButton2 = $($("#centercontent > div.table-responsive > div > ul > li").last()).find("a");
            $("#centercontent > div.table-responsive > table > tbody > tr").each((index, Element) => {
                const artist = $($(Element).find("td")[1]).text();
                const name = $($(Element).find("td")[2]).text();
                var row = $(Element).find("td")[3]
                var img = $(row).find("img")
                const difficulty = $(img).attr("alt");
                var url = "https://www.8notes.com/"+$(Element).attr("onclick").substring(20).slice(0, -1);
                pieces.push({artist, name, difficulty, url});
            });
            sleep(1000);
            if($(nextButton1).attr("class") === "prevnext"){
                console.log($(nextButton1).attr("href"))
                await page.goto("https://www.8notes.com/"+$(nextButton1).attr("href"));
            }
            else if($(nextButton2).attr("class") === "prevnext"){
                console.log($(nextButton2).attr("href"))
                await page.goto("https://www.8notes.com/"+$(nextButton2).attr("href"));
            }
            else{
                next = false
            }
        }while(next)
    allPieces = allPieces.concat(pieces)
    }
    fs.writeFile("pieces.txt", JSON.stringify(allPieces), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
    browser.close()}

    var scrapedData = ["https://www.8notes.com/piano/classical/sheet_music/",
        "https://www.8notes.com/guitar/classical/sheet_music/",
       "https://www.8notes.com/violin/classical/sheet_music/",
        "https://www.8notes.com/flute/classical/sheet_music/",
        "https://www.8notes.com/saxophone/classical/sheet_music/",
        "https://www.8notes.com/voice/classical/sheet_music/",
        "https://www.8notes.com/clarinet/classical/sheet_music/",
        "https://www.8notes.com/trumpet/classical/sheet_music/",
        "https://www.8notes.com/instruments/",
        "https://www.8notes.com/all/classical/sheet_music/",
        "https://www.8notes.com/jazz/",
        "https://www.8notes.com/traditional/",
       "https://www.8notes.com/all/rock_and_pop/sheet_music/",
        "https://www.8notes.com/all/christmas/sheet_music/",
        "https://www.8notes.com/world/",
        "https://www.8notes.com/styles/",
       "https://www.8notes.com/bach.asp",
        "https://www.8notes.com/beethoven.asp",
        "https://www.8notes.com/mozart.asp",
        "https://www.8notes.com/tchaikovsky.asp",
        "https://www.8notes.com/joplin.asp",
        "https://www.8notes.com/chopin.asp",
        "https://www.8notes.com/artists/"]

        async function scrapeDetails() {
            var piecesDetails = fs.readFileSync('pieces.txt')
            piecesDetails = JSON.parse(piecesDetails)
            
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0);
            for (var i = 0; i < piecesDetails.length-8750; i++) {
                console.log("step : "+( i+1));
                await page.goto(piecesDetails[i].url);
                var html = await page.content();
                var $ = cheerio.load(html);
                piecesDetails[i].img1 = $($("#score")).attr("src")
                piecesDetails[i].img2 = $($("#score2")).attr("src")                
                piecesDetails[i].midi = $($("#midi_container > div > div > ul > li:nth-child(4) > a")).attr("href")
                piecesDetails[i].about = $("#compinfodetails").text()
                sleep(1000);
            }
            fs.writeFile("piecesDetails.txt", JSON.stringify(piecesDetails), 'utf8', function (err) {
                
                console.log(chalk.green.inverse("The file was saved!"));
            });
        }

        async function connectToMongo(){
            await mongoose.connect(
                "mongodb+srv://sa:sa@cluster0.zxlvz.mongodb.net/myFirstDatabase?",
                { useNewUrlParser: true,
                 useUnifiedTopology: true }
                );
                console.log("connected to db")
            var data = fs.readFileSync('piecesDetails.txt')
            data = JSON.parse(data)
            for(var i = 0 ; i < data.length; i++ ){
                console.log(data[i]);
                const listingModel = new Model(data[i])
                await listingModel.save();
            }
            console.log("all data saved to db")
        }
    
        //connectToMongo(); 
        scrapeDetails();