 import Task from '../model/Task.js';
 export const getAllTasks= async (req,res)=>{   
    const {filter='today'}=req.query;
    const now =new Date()
    let startDate;

    switch(filter){
        case 'today':{
            startDate=new Date(now.getFullYear(),now.getMonth(),now.getDate())
            break;
        }
 case 'week':{
    const mondayDate=now.getDate()-(now.getDay()-1)-(now.getDay()===0?7:0)
    startDate =new Date(now.getFullYear(),now.getMonth(),mondayDate);
    break;
 }
 case 'month':{
    startDate= new Date(now.getFullYear(),now.getMonth(),1)
    break;
 }
case 'all':
    default:{
        startDate=null
    }
    }
    const query=startDate?{createdAt:{$gte:startDate}}:{};
   try{
   
   const result= await Task.aggregate([
    {$match:query},
    {
        $facet:{
            tasks:[
                {
                    $sort:{
                        createdAt:-1
                    }
                }
            ]
                ,
                activeCount: [
                    {
                        $match:{
                            status:'active'
                        }

                    },
                    {
                        $count:"count"
                    }
                ],
                 completeCount: [
                    {
                        $match:{
                            status:'complete'
                        }

                    },
                    {
                        $count:"count"
                    }
                ]

            
        }
    }
   ])
   const tasks=result[0].tasks
   const activeCount=result[0].activeCount[0]?.count||0
   const completeCount=result[0].completeCount[0]?.count||0
    res.status(200).json({tasks,activeCount,completeCount})
   }
   catch(err){
    console.error("error when called getAllTask",err);
    res.status.json({
        message:"loi he thong"
    })
    
   }
}
 export const createTask= async (req,res)=>{
  try{
    const {title}=req.body;
    const task= new Task({title});
    const newTask=await task.save();
    res.status(201).json(newTask)
  }
  catch(err){
 console.error("error when called createTask",err);
    res.status(500).json({
        message:"loi he thong"
    })
  }
}
 export const updateTask= async(req,res)=>{
   try{
        const{title,status,completeAt}=req.body
        const updatedTask= await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completeAt
            },
            {
                new:true
            }
        );
        if(!updatedTask){
            return res.status(404).json({
                message:'the task is not exist'
            })
        }
        res.status(200).json(updateTask)

   }catch(err){
 console.error("error when called updateTask",err);
    res.status(500).json({
        message:"loi he thong"
    })
   }
}
 export const deleteTask= async(req,res)=>{
   try{
const deleteTask=await Task.findByIdAndDelete(req.params.id)
if(!deleteTask){
    return res.status(404).json({message:"the task is not exist"})
    
}
res.status(201).json(deleteTask)
   }catch(err){
 console.error("error when called deleteTask",err);
    res.status(500).json({
        message:"loi he thong"
    })
   }

}