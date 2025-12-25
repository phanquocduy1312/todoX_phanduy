import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from '@/lib/utils'
const TaskListPagination = ({handleNext,handlePrev,handlePageChange,page,totalPages}) => {
 const generatePage=()=>{
  const pages=[]
  if(totalPages<4){
    // hien toan bo
    for(let i=1;i<=totalPages;i++){
      pages.push(i)
    }
  }
  else{
    if(page<2){
      pages.push(1,2,3,'...',totalPages)
    }
    else if(page>=totalPages-1){
      pages.push(1,'...',totalPages-2,totalPages-1,totalPages)
    }else{
      pages.push(1,'...',page,'...',totalPages)
    }
  }
  return pages
 }
 const pagesToShow=generatePage()
  return (
    <div className='flex justify-center mt--4'>
      <Pagination>
      <PaginationContent>
        {/* truoc */}
        <PaginationItem>
          <PaginationPrevious
          onClick={page===1?undefined:handlePrev}
          className={cn("pointer-events-none opacity-50 ")}
           />
        </PaginationItem>
       {
        pagesToShow.map((p,index)=>{
          return <PaginationItem key={index}>
            {p==='...'?(<PaginationEllipsis/>):(<PaginationLink isActive={p===page} onClick={()=>{
              if(p!==page)handlePageChange(p)
            }} className=''>
              {p}
            </PaginationLink>)}

          </PaginationItem>
        })
       }
        {/* sau */}
        <PaginationItem>
          <PaginationNext   onClick={page===totalPages?undefined:handleNext}
          className={cn("cursor",page===totalPages&& "opacity-50 pointer-events-none")}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  )
}

export default TaskListPagination
