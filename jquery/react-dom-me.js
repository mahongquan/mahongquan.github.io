function isString(str){
    return str instanceof String || typeof str=='string';
}
export default class ReactDOM{
  static render=(obj,ele)=>{
  	let r=obj.render();
  	if(isString(r)){
  		ele.innerHTML=r;	
  		obj.componentDidMount();
  	}
  }
}