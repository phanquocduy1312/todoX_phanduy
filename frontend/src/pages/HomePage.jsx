  import Header from '@/components/Header'
  import AddTask from '@/components/AddTask'
  import { useState } from 'react'
  import StatsAndFilters from '@/components/StatsAndFilters'
  import TaskList from '@/components/TaskList'
  import TaskListPagination from '@/components/TaskListPagination'
  import DateTimeFilter from '@/components/DateTimeFilter'
  import Footer from '@/components/Footer'
  import { toast } from 'sonner'
  import { useEffect } from 'react'
  import api from '@/lib/axios.js'
  import { visibleTaskLimit } from '@/lib/data'
  const HomePage = () => {
    const [taskBuffer,settaskBuffer]=useState([]);
    const [activeTaskCount,setActiveTaskCount]=useState(0);
    const [completeTaskCount,setCompleteTaskCount]=useState(0);
    const [filter,setFilter]=useState('all');
    const [dataQuery,setDataQuery]=useState('today')
    const [page,setPage]=useState(1)
  const fetchTask= async()=>{
  try{
    const res=await api.get(`/tasks?filter=${dataQuery}`)
    settaskBuffer(res.data.tasks)
    setActiveTaskCount(res.data.activeCount)
    setCompleteTaskCount(res.data.completeCount)
    console.log("Dữ liệu đã nạp vào State:", res.data );

  }catch(err){
    console.error('Lỗi xảy ra khi truy vấn tasks:',err)
    toast.error('Lỗi xảy ra khi truy xuất tasks')
  }

    }
   
// useEffect 1: Chỉ chạy khi đổi mốc thời gian (truy vấn database mới)
useEffect(() => {
  fetchTask();
}, [dataQuery]); 

// useEffect 2: Chạy khi đổi mốc thời gian HOẶC đổi bộ lọc (để đưa về trang 1)
useEffect(() => {
  setPage(1);
}, [dataQuery, filter]); // LUÔN ĐỂ MẢNG RỖNG NẾU CHỈ FETCH KHI LOAD TRANG
    // bien
    const filteredTasks=taskBuffer.filter((task)=>{
      switch (filter){
        case 'active':
        return task.status==='active';
        case 'completed':
          return task.status=== 'complete'
          default:
            return true;
      }
    })
    const handleNext=()=>{
      if(page<totalPage){
        setPage(page+1)
      }
    }
    const handlePrev=()=>{
      if(page>1){
        setPage(page-1)
      }
    }
    const handlePageChange=(newPage)=>{
      setPage(newPage)
    }
    const visibleTask=filteredTasks.slice((page-1)*visibleTaskLimit,page*visibleTaskLimit)
    if(visibleTask.length==0){
      handlePrev()
    }
    const totalPage=Math.ceil(filteredTasks.length/visibleTaskLimit)||1
    const handleTaskChanged=()=>{
      fetchTask()
    }
    return (

      <div className="min-h-screen w-full bg-[#fefcff] relative">
    {/* Dreamy Sky Pink Glow */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
          radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
      }}
    />
      {/* Your Content/Components */}
      <div>
        <div className='container pt-8 mx-auto relative z-10'>
          {/* SỬA: Đổi "-6" thành "p-6" hoặc "px-4" để không bị dính lề trên mobile */}
          <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
              
              {/* Header Section */}
              <Header/>
              
              {/* Create Task Input */}
              <AddTask handleNewTaskAdded={handleTaskChanged}/>
              
              {/* Stats & Filter Controls */}
              <StatsAndFilters activeTaskCount={activeTaskCount} completedTaskCount={completeTaskCount} filter={filter} setFilter={setFilter}/>
              
              {/* Main Task List */}
              <TaskList filteredTasks={visibleTask} filter={filter} handleTaskChanged={handleTaskChanged}/>
              
              {/* Bottom Controls */}
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                  <TaskListPagination handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} page={page} totalPages={totalPage}/>
                  <DateTimeFilter dataQuery={dataQuery} setDataQuery={setDataQuery}/>
              </div>

              {/* Footer - Nếu muốn thẳng hàng với content thì để ở đây */}
              <Footer activeTaskCount={activeTaskCount} completedTaskCount={completeTaskCount}/>
          </div>
          
          {/* Footer - Nếu để ở đây nó sẽ rộng theo container */}
          {/* <Footer/> */}
        </div>
      </div>
  </div>
    
    )
  }   
  export default HomePage



