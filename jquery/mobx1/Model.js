import { decorate, observable,action,autorun} from "mobx"
export default class Todo {
  @observable year=19;
  @observable num=5;
  @observable start=1;
  constructor() {
    autorun(() => {
	  console.log(this.year+" "+this.start+" "+this.num);
	});
  }
  @action set_year=(year)=>{
  	this.year=year;
  }
  @action set_num=(year)=>{
  	this.num=year;
  }
  @action set_start=(year)=>{
  	this.start=year;
  }
}
