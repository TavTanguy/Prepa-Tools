export function oneCall(timeWait: number, fn: (...args: any[])=>void){
  let nbTimer: null | number = null;
  
  return (function (this: any, ...args: any[]){
    if(nbTimer){
      clearTimeout(nbTimer);
      nbTimer = null;
    }
    nbTimer = setTimeout(()=>{
      nbTimer = null;
      fn.apply(this, args)
    }, timeWait)
  })
}