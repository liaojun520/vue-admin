const checkFun = (value)=>{
  if(value.username && value.username!='' && value.password && value.password!=''){
    if(value.password.length<6){
       return false
    }
    return true
  }
  return false
}

module.exports = {
  checkFun  
}