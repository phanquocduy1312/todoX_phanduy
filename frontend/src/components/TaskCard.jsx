import React from 'react'
import {cn} from "@/lib/utils"
import { Button } from './ui/button';
import {Card} from './ui/card'
import { Calendar, CheckCircle2, Circle, SquarePen,Trash2 } from 'lucide-react';
import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { useState } from 'react';



const TaskCard = ({task,index,handleTaskChanged}) => {
  let [isEditing,setIsEditing]=useState(false);
   const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');
   const deleteTask = async () => {
  try {
    console.log("Đang xóa task có ID:", task._id); // Để debug
     await api.delete(`/tasks/${task._id}`);
    
    // Nếu API trả về thành công (200, 201, 204)
    toast.success(`Nhiệm vụ "${task.title}" đã được xóa`);
    handleTaskChanged(); // Gọi hàm này để báo HomePage load lại data
  } catch (error) {
    console.error('Lỗi chi tiết:', error.response || error);
    // Thông báo lỗi để biết tại sao nó không xóa thành công trên giao diện
    toast.error(error.response?.data?.message || "Lỗi xảy ra khi xóa task");
  }
  
};
const toggleTaskCompleteButton= async()=>{
  try {
     if(task.status==='active'){
      await api.put(`tasks/${task._id}`,{
        status:'complete',
        completeAt:new Date().toISOString(),
      })
      toast.success(`${task.title} đã hoàn thành .` )
     }
     else{
      await api.put(`tasks/${task._id}`,{
        status:'active',
        completeAt:null,
      })
      toast.success(`${task.title} đã đổi sang chưa hoàn thành .` )
     }
     handleTaskChanged()
  } catch (error) {
    console.error('Lỗi chi tiết:', error.response || error);
    // Thông báo lỗi để biết tại sao nó không xóa thành công trên giao diện
    toast.error(error.response?.data?.message || "Lỗi xảy ra khi thay đổi trạng thái task");
  }
}
const updateTask= async ()=>{
    try {
      setIsEditing(false)
      await api.put(`/tasks/${task._id}`,{
        title:updateTaskTitle
      })
      handleTaskChanged(); 
      toast.success(`nhiệm vụ đã đổi thành ${updateTaskTitle}`)
    } catch (error) {
      console.error('Lỗi xảy ra khi update task', error.response || error);
    // Thông báo lỗi để biết tại sao nó không xóa thành công trên giao diện
    toast.error(error.response?.data?.message || "Lỗi xảy ra khi cập nhật task");
    }
  }
 const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    updateTask();
  }
};

  
  return (
    <Card className={cn(
      "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
      task.status==='complete' &&'opacity-75'
    )}
    style={{animationDelay:`${index*50}ms`}}
    >
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
          task.status==='complete'?'text-success hover:text-success/80':'text-muted-foreground hover:text-primary'
        )
        }  onClick={toggleTaskCompleteButton}>
          {task.status==='complete'?(
            <CheckCircle2 className='size-5'/>) :(
            <Circle className='size-5'/>
          )}
        </Button>
        {/* hien thi haoc chinh sua tieu de */}
        <div className='flex-1 min-w-0'>
          {isEditing?(<Input placeholder="Cần phải làm gì?" className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20" type="text" value={updateTaskTitle} onChange={(e)=>{setUpdateTaskTitle(e.target.value) }}
         onKeyDown={handleKeyDown}
          onBlur={()=>{
            setIsEditing(false)
            setUpdateTaskTitle(task.title||"")
          }}/>):(
            <p className={cn('text-base transition-all duration-200' ,task.status==='complete' ?"line-through text-muted-foreground":'text-foreground')}>{task.title}</p>
          )}
           {/* ngay tao va ngay hian thanh */}
       <div className='flex items-center gap-2 mt-1'>
        <Calendar className='size-3 text-muted-foreground'/>
        <span className='text-xs text-muted-foreground'>
          {new Date(task.createdAt).toLocaleString()}
        </span>
        {task.completeAt&&(
          <>
          <span className='text-xs text-muted-foreground'>-</span>
           <Calendar className='size-3 text-muted-foreground'/>
           <span className='text-xs text-muted-foreground'>{new Date(task.completeAt).toLocaleString()}</span>
          </>
        )}
       </div>
        </div>
       
{/* nut chinh va xoa */}
<div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
  {/* nut edit */}
  <Button 
  variant='ghost'
  size='icon'
  className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
  onClick={()=>
    {setIsEditing(!isEditing) 
  setUpdateTaskTitle(task.title ||'')}}>
    
    <SquarePen className='size-4'/>
    
  </Button>
  {/* nut xoa */}
  <Button 
  onClick={()=>{
    deleteTask()
  }}
  variant='ghost'
  size='icon'
  className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive">
    <Trash2 className='size-4'/>
    
  </Button>
</div>
      </div>
    </Card>
  )
}

export default TaskCard
