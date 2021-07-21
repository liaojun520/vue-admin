import moment from 'moment'



//时间格式转换
export const Time = (time,type="YYYY-MM-DD HH:mm:ss")=>{   // YYYY-MM-DD
   if(time){
      return moment(time).format(type)
   }
   return null

}