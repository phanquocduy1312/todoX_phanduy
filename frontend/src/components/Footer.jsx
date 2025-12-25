import React from 'react'

const Footer = (  {completedTaskCount=0,activeTaskCount=0}) => {
  return (
    <>
    {
      completedTaskCount+activeTaskCount>0&&(
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>
            {
              completedTaskCount>0&&(
                <>
                🎉 tuyệt vời bạn đã hoàn thành {completedTaskCount} việc {activeTaskCount>0&&`,còn ${activeTaskCount} việc nữa thôi. cố lên!`}
                </>
              )
            }
           {completedTaskCount===0 && activeTaskCount>0 &&
           <>
           hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào !
           </>
           }
          </p>
        </div>
      )
    }
    </>
  )
}

export default Footer
