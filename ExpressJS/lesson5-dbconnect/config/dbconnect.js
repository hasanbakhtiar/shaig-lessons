const mongoose= require('mongoose');

const connectdb = async()=>{
  try {
   await mongoose.connect("mongodb+srv://shaiqlesson:shaiq12345@cluster.y9zwipj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"); 
    console.log("mongodb connact is successfully");
  } catch (error) {
   console.log(error); 
  }
}

module.exports = connectdb;
