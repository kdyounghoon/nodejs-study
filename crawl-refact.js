const dotenv = require('dotenv');
dotenv.config();

const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const mongoose = require("mongoose")

//Connect to mongoDB
if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required')
try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connection Successful!")
} catch(err){
    console.log(err);
    throw new Error('database error!');
}

// Define nameSchema
const nameSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    en_name: {
        type: String,
    },
    gender: {
        type: String,
    },
});

async function getDomByUrl(year, gender, lang = "") {
  const url = `https://www.namechart.kr/${lang}chart/${year}?gender=${gender}`;
  const html = await axios.get(url);
  return cheerio.load(html.data);
}



async function main() {
    const Name = mongoose.model('Name', nameSchema);
    const result = [];

    //Start crawling
    let gender_list = ['m', 'f'] // Gender list
    for (var g of gender_list) { // Loop through each gender
        for (var y = 2020; y <= 2023 ; y++){ // Loop through each year
            const $_kr = await getDomByUrl(y, g);
            const $_en = await getDomByUrl(y, g, "en/");

            const kr_table = $_kr("table tbody tr")
            const en_table = $_en("table tbody tr")

             /*
                [
                  {
                    kn_name: 곽영훈,
                    en_name: Younghoon,
                    gender:
                    year,
                    ranking
                }, ..., .. .. .. ]
            */

            const nameGetter = elem => String($_kr(elem).find('td:nth-of-type(2)').text());
            const result = kr_table.map((idx, elem) => {
                en_table.filter(

                )
              const enElem = en_table[idx];
              return {
                kn_name: nameGetter(elem),
                en_name: nameGetter(enElem),
                gender: g,
                year: y,
                ranking: i
              }
            })

            const kr_namesList = kr_table.map((i,element) => {
                const nameToAdd = String($_kr(element).find('td:nth-of-type(2)').text())
                return {
                    name: nameToAdd,
                    gender: g,
                    year: y,
                    ranking: i
                }
            }).toArray()

            const en_namesList = en_table.map((i,element) => {
                const nameToAdd = String($_en(element).find('td:nth-of-type(2)').text())
                return {
                    name: nameToAdd,
                    gender: g,
                    year: y,
                    ranking: i
                }
            }).toArray()

            console.log(kr_namesList)
            console.log(en_namesList)


            for (const obj of kr_namesList){
                const enName = en_namesList.filter((x) => {
                    if( x.year == obj.year && x.ranking == obj.ranking){
                        return x.name
                    }
                })
                console.log("Matching Name Found: " + enName[0].name)
                result.push({
                  name: obj.name,
                  en_name: enName[0].name
                })


                // await Name.findOneAndUpdate({name: obj.name}, {en_name: enName[0].name}, {new: true, upsert: true})
                // .then(() => {
                //     console.log("Name inserted/updated in DB: " + obj.name
                //                 + " Gender: " + g
                //                 + " Year: " + y
                //                 + " English Name " + enName[0].name
                //                 )
                // })
                // .catch((err)=> { console.log("DB Insertion failed" + err)})
            }


            // for (const obj of kr_namesList){
            //     let genderToBecome = g;
            //     let nameToSearch = await Name.find({name: obj.name})
            //     console.log(nameToSearch[0])
            //     if(nameToSearch.length !== 0){
            //         console.log("Name Already Exists!:  " + nameToSearch[0].name + " Gender: " + nameToSearch[0].gender)
            //         if (nameToSearch[0].gender !== g || nameToSearch[0].gender !== 'both'){
            //             genderToBecome = 'both'
            //             console.log("Name exists for both gender, New gender is " + genderToBecome)
            //             await Name.findOneAndUpdate(
            //                 //{name: obj.name}, {gender: genderToBecome, $push: { ranking_info: { year: i, ranking: obj.ranking_info[0].ranking}}}, {new: true, upsert: true}
            //                 {name: obj.name}, {gender: genderToBecome}, {new: true, upsert: true}
            //             )
            //             .then(() => {
            //                 console.log("Name inserted in DB: " + obj.name
            //                             + " Gender: " + genderToBecome
            //                             + " Year: " + i
            //                             )
            //             })
            //             .catch((err)=> { console.log("DB Insertion failed" + err)})
            //         }
            //     }else{
            //         await Name.create(obj)
            //         .then(() => {
            //             console.log("Name inserted in DB: " + obj.name
            //                         + " Gender: " + genderToBecome
            //                         + " Year: " + i
            //                         )
            //         })
            //         .catch((err)=> { console.log("DB Insertion failed" + err)})
            //     }
            // }
        }
    }


              await Name.findOneAndUpdate({name: obj.name}, {en_name: enName[0].name}, {new: true, upsert: true})
              .then(() => {
                  console.log("Name inserted/updated in DB: " + obj.name
                              + " Gender: " + g
                              + " Year: " + y
                              + " English Name " + enName[0].name
                              )
              })
              .catch((err)=> { console.log("DB Insertion failed" + err)})
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        // logging the error message
        console.error(e);
        process.exit(1);
    })
