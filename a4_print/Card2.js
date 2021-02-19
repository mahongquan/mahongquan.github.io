export default function Card(props){
      return React.createElement("div", {
        style: {
          position: "relative",
          width: "210mm",
          height: "148mm",
          border: "solid 1px"
        },
      }, React.createElement("div", {
        style: {
          padding: "100px 100px 100px 100px"
        },
      }, React.createElement("p", {
        style: {
          marginTop: "40px",
          textAlign: "center",
          fontSize: "20px"
        },
      }, React.createElement("font", {
        face: "SimHei",
      },"北京科技大学预收款凭条      No ", props.start)), React.createElement("p", {
        style: {
          textAlign: "center",
          fontSize: "15px"
        },
      }, "（不作报销凭证）"), React.createElement("div", {
        style: {
          height: "1em"
        },
      }), React.createElement("p", {
      }, React.createElement("span", {
      }, "今收到"), React.createElement("input", {
        type: "text",
        className: "line_input",
        style: {
          width: "130mm"
        },
      })), React.createElement("p", {
      }, React.createElement("span", {
      }, "交  来"), React.createElement("input", {
        type: "text",
        className: "line_input",
        style: {
          width: "130mm"
        },
      })), React.createElement("p", {
      }, React.createElement("span", {
      }, "人民币（大写）"), React.createElement("input", {
        type: "text",
        className: "line_input",
        style: {
          width: "54mm"
        },
      }), React.createElement("span", {
      }, "￥"), React.createElement("input", {
        type: "text",
        className: "line_input",
        style: {
          width: "52mm"
        },
      })), React.createElement("div", {
        style: {
          height: "2em"
        },
      }), React.createElement("p", {
      }, React.createElement("span", {
      }, "收款单位"), React.createElement("span", {
        style: {
          margin: "0 0 0 38mm"
        },
      }, "收款人")), React.createElement("p", {
      }, React.createElement("span", {
      }, "(公章)"), React.createElement("input", {
        type: "text",
        className: "line_input",
      }), React.createElement("span", {
      }, "(签章)"), React.createElement("input", {
        type: "text",
        className: "line_input",
      }), React.createElement("span", {
      }, "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0年\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0月\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0日"))), React.createElement("div", {
        style: {
          padding: "3px 3px 3px 3px",
          writingMode: "tb-rl",
          position: "absolute",
          width: "1em",
          top: "50mm",
          left: "190mm"
        },
      }, props.lian));
}

