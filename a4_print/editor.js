import Card from './Card2.js';
import sprintf from './sprintf.js';
let fs,path,ipcRenderer,remote;
if(window.require){
  fs=window.require("fs");
  path=window.require("path");
  remote = window.require('electron').remote; //
  ipcRenderer = window.require('electron').ipcRenderer; //
}
const jsx=React.createElement("style", {
      jsx: "true",
    }, `
  .only_screen{
    width:100%;
    position:fixed;
    top:0px;
    left:0px;
    z-index:1;
    background-color:#aaa;
  }
.line_input{
 border:none;
 border-bottom:1px solid #000;
}
@page { margin: 0 }
body { margin: 0px 0px 0px 0px;}
.sheet {
  margin: 0;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  page-break-after: always;
}

/** Paper sizes **/
.A3               .sheet { width: 297mm; height: 419mm }
.A3.landscape     .sheet { width: 420mm; height: 296mm }
.A4               .sheet { width: 210mm; height: 296mm }
.A4.landscape     .sheet { width: 297mm; height: 209mm }
.A5               .sheet { width: 148mm; height: 209mm }
.A5.landscape     .sheet { width: 210mm; height: 147mm }
.letter           .sheet { width: 216mm; height: 279mm }
.letter.landscape .sheet { width: 280mm; height: 215mm }
.legal            .sheet { width: 216mm; height: 356mm }
.legal.landscape  .sheet { width: 357mm; height: 215mm }

/** Padding area **/
.sheet.padding-10mm { padding: 10mm }
.sheet.padding-15mm { padding: 15mm }
.sheet.padding-20mm { padding: 20mm }
.sheet.padding-25mm { padding: 25mm }

/** For screen preview **/
@media screen {
  body { background: #e0e0e0 }
  .sheet {
    background: white;
    box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
    margin: 5mm auto;
  }
}

/** Fix for Chrome issue #273306 **/
@media print {
  .only_screen{display: none}
           .A3.landscape { width: 420mm }
  .A3, .A4.landscape { width: 297mm }
  .A4, .A5.landscape { width: 210mm }
  .A5                    { width: 148mm }
  .letter, .legal    { width: 216mm }
  .letter.landscape      { width: 280mm }
  .legal.landscape       { width: 357mm }
}
`);
let initpath=null;
const getconfig=()=>{
  if(window.require){
    try{
      const configName = 'config.json';
      let configPath = path.join(initpath, configName);
      let data=fs.readFileSync(configPath, { enconding: 'utf-8' });
      return JSON.parse(data);
    }
    catch(e){
      console.log(e);
      return {};
    }
  }
  else{
    let todos=localStorage.getItem("a4_print");
    let initialState={};
    if (todos) {
      try{
        initialState=JSON.parse(todos);
      }
      catch(SyntaxError){
        initialState={};
      }
    }
    return initialState
  }
}
const saveconfig=(data)=>{
  if(window.require){
    const configName = 'config.json';
    let configPath = path.join(initpath, configName);
    fs.writeFileSync(configPath, JSON.stringify(data));
  }
  else{
    localStorage.setItem("a4_print",JSON.stringify(data));
  }
}
export default function A4Lian(props){
    if(window.require){
      initpath=window.require('electron').ipcRenderer.sendSync('getpath');
    }
    let cfg=getconfig();
    if(!cfg.start) cfg.start=1;
    if(!cfg.num) cfg.num=1;
    if(!cfg.year) {
      let d=new Date();
      let y=d.getFullYear();
      cfg.year=y-2000;
    }
    const [state,setState]=React.useState(cfg);
    if(ipcRenderer){
      ipcRenderer.on("request_close",()=>{
        saveconfig(state);
        ipcRenderer.send("close");
      })
    }
  const onClick=()=>{
    if(remote) remote.getCurrentWebContents().print();
  }
  const onChange=(event)=>{
    let start=parseInt(event.target.value,10);
    if(isNaN(start)) {
        start=0;
    }
    setState({start:start,num:state.num,year:state.year});
  }
  const onChange_num=(event)=>{
    let start=parseInt(event.target.value,10);
    if(isNaN(start)) {
        start=1;
    }
    if(start<1) start=1;
      setState({num:start,start:state.start,year:state.year});
  }
  const onChange_year=(event)=>{
    let start=parseInt(event.target.value,10);
    if(isNaN(start)) {
        start=0;
    }
      setState({year:start,num:state.num,start:state.start});
  }
    let start=state.start;
    let pages=[];
    for(var i=0;i<state.num;i++){
        let str_start=sprintf("%04d%04d",state.year,start);
        var card1=React.createElement(Card,
          {key:"1",start:str_start,lian:"第一联　存根联"},
          null);
        var card2=React.createElement(Card,
          {key:"2",start:str_start,lian:"第二联　交款方收执"},
          null);
        var a=React.createElement("div",{key:i,className:"sheet"},[card1,card2]);
        pages.push(a);
        start+=1;
    }
    const input_start_num=React.createElement("div", {
    }, React.createElement("span", {
    }, "起始号码"), React.createElement("input", {
      value: state.start,
      onChange: onChange,
    }), React.createElement("span", {
    }, "页数"), React.createElement("input", {
      value: state.num,
      onChange: onChange_num,
    }), React.createElement("button", {
      style:{display:remote?"inline":"none"},
      onClick: onClick,
    }, "打印"));
    const input_year=React.createElement("div", {
    }, React.createElement("span", {
    }, "年"), React.createElement("input", {
      value: state.year,
      onChange: onChange_year,
    }));
    const flex=React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between"
      },
    },input_start_num , input_year
    );//div flex
    const input=React.createElement("div", {
      className: "only_screen",
    }, flex)
    const a4=React.createElement("div", {
      className: "A4",
    }, pages);
    return React.createElement("div", {
      style: {
        position: "relative"
      },
    }, input, a4, jsx);
}
