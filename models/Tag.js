const mongoose = require('mongoose')
const { Schema } = mongoose

const tagSchema = new Schema({
    name: { type: String, trim: true, required: true, unique: true },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }], //isme sare uploaded videos show honge
    channels: [{ type: Schema.Types.ObjectId, ref: "Channel" }], //this line show the kis kis channel n upload kiya h
})

const Tag = mongoose.model("Tag", tagSchema)

module.exports = Tag 