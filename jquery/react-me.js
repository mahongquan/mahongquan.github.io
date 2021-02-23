export class Component{
    constructor(){
    	this.state={};
    }
    setState=(newState)=>{
        this.state=newState;
    }
}
export default class React{
}
React.Component=Component;