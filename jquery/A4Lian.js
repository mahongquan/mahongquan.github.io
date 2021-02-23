import React from './react-me.js';
import sprintf from './sprintf.js';
export default class A4Lian extends React.Component {
    renderCard=(start,lian)=>{
      return `<div style="position:relative;width:210mm;height:148mm;left:0px;top:0px;
      ">
      <div style="padding:100px 100px 0px 100px;">
      <p style="text-align:center;font-size:20px">
              <font face="SimHei">北京科技大学预收款凭条&emsp;&emsp;&emsp;No&emsp;${start}</font>
      </p>
      <p style="text-align:center;font-size:15px">
         (不作报销凭证)
      </p>
      <div style="height:1em"></div>
      <p>
          <span>今收到</span>
         <input type="text"  class="line_input"  style="width:130mm"/>
      </p>
      <p>
          <span>交&emsp;来</span>
          <input type="text"  class="line_input"  style="width:130mm" />
      </p>
      <p>
          <span>人民币（大写）</span>
          <input type="text"  class="line_input"   style="width:54mm" />
          <span>￥</span>
          <input type="text"  class="line_input"   style="width:52mm" />
      </p>
      <div style="height:2em"></div>
      <p>
          <span>收款单位</span>
          <span style="margin:0 0 0 38mm">收款人</span>
      </p>
      <p>
          <span>(公章)</span>
          <input type="text"  class="line_input"/>
          <span >(签章)</span>
          <input type="text"  class="line_input"/>
          <span >&emsp;&emsp;&emsp;年&emsp;月&emsp;日</span>
       </p>
       </div>
       <div style="padding:3px 3px 3px 3px;
               writing-mode:tb-rl;
               position:absolute;
               width:1em;
               top:50mm;left:190mm">
       ${lian}
       </div>
    </div>`;
    }
    _onChange=()=> {
      // console.log("_onChange");
      localStorage.setItem("a4_print",JSON.stringify(this.state));
      console.log(this.state);
      var a4=document.getElementById("id_a4");
      while(a4.firstChild)  a4.removeChild(a4.firstChild);
      let start=this.state.start;
      for(var i=0;i<this.state.num;i++){
        // console.log("append");
        let str_start=sprintf("%04d%04d",this.state.year,start);
        let lian="第一联　存根联";
        let card1=this.renderCard(str_start,lian);
        lian="第二联　交款方收执";
        let card2=this.renderCard(str_start,lian);
        let page=`<div key={i} class="sheet">
            ${card1}
            ${card2}
        </div>`;
        // window.$("#id_a4").append(page);
        a4.innerHTML+=page;
        start+=1;
      }
  }
 
  componentDidMount=()=>{
    console.log("didmount");
    document.getElementById("id_start").addEventListener("input",this.onChange);
    document.getElementById("id_num").addEventListener("input",this.onChange_num);
    document.getElementById("id_year").addEventListener("input",this.onChange_year);
    let todos=localStorage.getItem("a4_print");
    let cfg={};
    if (todos) {
      try{
        cfg=JSON.parse(todos);
      }
      catch(SyntaxError){
        // cfg={};
      }
    }
    if(!cfg.start) cfg.start=1;
    if(!cfg.num) cfg.num=1;
    if(!cfg.year) {
      let d=new Date();
      let y=d.getFullYear();
      cfg.year=y-2000;
    }
    this.state=cfg;
    document.getElementById("id_year").value=this.state.year;
    document.getElementById("id_start").value=this.state.start;
    document.getElementById("id_num").value=this.state.num;
    this._onChange();
  }
  constructor() {
    super();
  }
  onClick=()=>{
    console.log("click");
  }
  onChange=(event)=>{
    console.log(event.target.value);
    let start=parseInt(event.target.value,10);
    console.log(start);
    this.state.start=start;
    this._onChange();
    
    // myredux.ItemActionCreators.start_change(start)
  }
  onChange_num=(event)=>{
    let start=parseInt(event.target.value,10);
    this.state.num=start;
    this._onChange();
    // myredux.ItemActionCreators.num_change(start)
    // this.setState({num:start});
  }
  onChange_year=(event)=>{

    console.log("onChange_year")
    let start=parseInt(event.target.value,10);
    this.state.year=start;
    this._onChange();
    // myredux.ItemActionCreators.year_change(start)
    // this.setState({year:start});
  }
  render=()=>{
    return (`
<div>
  <div class="only_screen">
    <div style="display:flex;justify-content:space-between">
       <div>
        <label>起始号码</label><input id="id_start" ></input>
        <label>页数</label><input id="id_num" ></input>
       </div>
       <div>
        <label>year</label><input id="id_year"></input>
       </div>
    </div>
  </div>
  <div id="id_a4" class="A4">
  </div>
</div>`);
  }
};
