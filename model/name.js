// const mongoose = require('mongooses')

// const nameSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: true,
//     },

//     gender: {
//         type: String,
//         require: true
//     },

//     ranking: {
//         type: Object,
//         require: false
//     }

// })

const Name = mongoose.model('Name', nameSchema);

export default Name;