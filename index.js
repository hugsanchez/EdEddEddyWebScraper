const PORT = 3000;

const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const e = require('express');

const app = express();

const url = 'https://ed.fandom.com/wiki/Category:Scripts';
const titles = [];

axios(url).then(res => {
  const html1 = res.data;
  const money = cheerio.load(html1);

  money(".category-page__member-link", html1).each(function(){
    const title = money(this).text();
    const link = money(this).attr('href');
    titles.push({
      title,
      link
    });
  });

  const quotes = [];

  for(let i = 0; i < 20; i++){
    const test = titles[i];
    let scriptUrl = `https://ed.fandom.com${test.link}`;
  
    axios(scriptUrl).then(res => {
      const html2 = res.data;
      const money2 = cheerio.load(html2);
  
      money2("p",html2).each(function(){
        const text = money2(this).html().split('<br>')
        //mystring.match(/\'(.*?)\'/);
        let arrayTest = text;
        //console.log(arrayTest)

        for(let i = 0; i < arrayTest.length; i++){
          let quoteArr = money2(arrayTest[i]).text().split('Rolf:');
          if(quoteArr.length === 2 && quoteArr[0] === ''){
            quotes.push(quoteArr[1]);
          }
        }
      })
      console.log(quotes)
    })
  }

}).catch(err => console.log(err));




//console.log('"'.charCodeAt())

app.listen(PORT, () => console.log(`Server on ${PORT}`));