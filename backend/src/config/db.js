import mongoose, { connect } from 'mongoose';
export const connectDB = async ()=>{
try{
     await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING)
     console.log('lien ket thanh cong');
     
}
catch(error){
console.error('lien ket that bai',error);
process.exit(1);
}
}