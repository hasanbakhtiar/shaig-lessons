


const { default: mongoose } = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb+srv://shaiqlesson:shaiq12345@cluster.xbcazqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;


