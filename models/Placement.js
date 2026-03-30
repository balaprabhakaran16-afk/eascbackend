import { Schema, model } from "mongoose"

const placementSchema = new Schema({

student:{
type:Schema.Types.ObjectId,
ref:"Student"
},

company:{
type:Schema.Types.ObjectId,
ref:"Company"
},

package:{
type:String
},

role:{
type:String
},

status:{
type:String,
enum:["selected","rejected","pending"],
default:"pending"
}

},{timestamps:true})

export default model("Placement", placementSchema)