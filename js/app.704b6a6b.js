(function(){"use strict";var e={27:function(e,t,n){var i=n(9242),o=n(3396);const r={key:0,class:"ide-wrappers"},s=(0,o._)("div",{class:"vertical-line"},null,-1),a={class:"output-wrapper"},l={key:1,class:"mobile"};function u(e,t,n,i,u,c){const d=(0,o.up)("JanninScriptTextEditor"),h=(0,o.up)("CppText"),p=(0,o.up)("JanninScriptOutput");return(0,o.wg)(),(0,o.iD)(o.HY,null,[e.isMobile()?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",r,[(0,o.Wm)(d,{onClicked:e.runBuild,outputTabHeight:e.outputTabSize},null,8,["onClicked","outputTabHeight"]),s,(0,o.Wm)(h,{text:e.cppOutput,outputTabHeight:e.outputTabSize,onClear:e.clearCPP},null,8,["text","outputTabHeight","onClear"])])),(0,o._)("div",a,[(0,o.Wm)(p,{text:e.jsOutput,ref:"outputWrapper"},null,8,["text"])]),e.isMobile()?((0,o.wg)(),(0,o.iD)("div",l," Unfortunately the mobile version of the JanninScript online compiler is not yet supported. ")):(0,o.kq)("",!0)],64)}var c=n(7139);const d=e=>((0,o.dD)("data-v-f3a65016"),e=e(),(0,o.Cn)(),e),h={class:"header"},p=d((()=>(0,o._)("div",null,[(0,o._)("p",{class:"file-name"},"Build.jannin")],-1))),v={class:"button-wrapper"},f={class:"text-editor",tabindex:"-1"};function w(e,t,n,i,r,s){const a=(0,o.up)("TextCursor"),l=(0,o.up)("ScriptLine");return(0,o.wg)(),(0,o.iD)("div",{class:"wrapper",style:(0,c.j5)({height:e.height+"px"})},[(0,o._)("div",h,[p,(0,o._)("div",v,[(0,o._)("button",{class:"run-btn",onClick:t[0]||(t[0]=(...t)=>e.run&&e.run(...t))},"Run")])]),(0,o._)("div",f,[(0,o.Wm)(a,{linePosition:e.linePosition,activeLine:e.activeLine},null,8,["linePosition","activeLine"]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.lines,((t,n)=>((0,o.wg)(),(0,o.iD)("div",{key:n+Date.now()},[(0,o.Wm)(l,{text:t,activeLine:e.activeLine===n,lineNumber:n,onSetActiveLine:e.setActiveLine},null,8,["text","activeLine","lineNumber","onSetActiveLine"])])))),128))])],4)}function g(e,t){let n=0;for(let i=0;i<t[e].length;i++){if(" "!==t[e][i])break;n++}return n}function m(e,t,n,i){return t<0&&(t=e.length+t,t<0&&(t=0)),e.slice(0,t)+(i||"")+e.slice(t+n)}const b=e=>{const t=e.lines[e.activeLine];let n="";for(let i=0;i<t.length;i++)i!==e.linePosition-1&&(n+=t[i]);if(e.lines[e.activeLine]=n,0===e.linePosition){if(0===e.activeLine)return;const t=e.lines[e.activeLine-1].length;e.lines[e.activeLine-1]+=e.lines[e.activeLine],e.lines.splice(e.activeLine,1),e.linePosition=t,e.activeLine--}else e.linePosition--;return e},x=e=>{const t=e.lines[e.activeLine];let n="";for(let i=0;i<t.length;i++)i!==e.linePosition&&(n+=t[i]);if(e.lines[e.activeLine]=n,e.linePosition===t.length){if(e.activeLine===e.lines.length-1)return;e.lines[e.activeLine]+=e.lines[e.activeLine+1],e.lines.splice(e.activeLine+1,1)}return e},L=e=>{const t=e.lines[e.activeLine].slice(e.linePosition);e.lines[e.activeLine]=e.lines[e.activeLine].slice(0,e.linePosition),e.lines.splice(e.activeLine+1,0,t);const n=g(e.activeLine,e.lines);return e.activeLine=Math.min(e.activeLine+1,e.lines.length-1),e.lines[e.activeLine]=" ".repeat(n)+e.lines[e.activeLine],e.linePosition=n,e},y=e=>(e.lines[e.activeLine]=m(e.lines[e.activeLine],e.linePosition,0,"    "),e.linePosition+=4,e),k=e=>{if(0===e.linePosition){if(0===e.activeLine)return e;e.activeLine--,e.linePosition=e.lines[e.activeLine].length}else e.linePosition--;return e.currentMaxPosition=e.linePosition,e},P=e=>{if(e.linePosition===e.lines[e.activeLine].length){if(e.activeLine===e.lines.length-1)return e;e.activeLine++,e.linePosition=0}else e.linePosition++;return e.currentMaxPosition=e.linePosition,e},S=e=>{if(0===e.activeLine)return e;e.activeLine--;const t=e.lines[e.activeLine],n=t.length;return e.linePosition=Math.min(e.currentMaxPosition,n),e.linePosition>n&&(e.linePosition=n),e},_=e=>{if(e.activeLine===e.lines.length-1)return e;e.activeLine++;const t=e.lines[e.activeLine],n=t.length;return e.linePosition=Math.min(e.currentMaxPosition,n),e.linePosition>n&&(e.linePosition=n),e},C=e=>({...e,linePosition:0,currentMaxPosition:0}),T=e=>({...e,linePosition:e.lines[e.activeLine].length,currentMaxPosition:e.lines[e.activeLine].length});function D(e,t){return"Backspace"===e.key?b(t):"Delete"===e.key?x(t):"Enter"===e.key?L(t):"Tab"===e.key?y(t):"ArrowLeft"===e.key?k(t):"ArrowRight"===e.key?P(t):"ArrowUp"===e.key?S(t):"ArrowDown"===e.key?_(t):"Home"===e.key?C(t):"End"===e.key?T(t):t}const O={normal:new Set([" ","End","Home","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Tab"]),ctrl:new Set(["c","v","x","a"])},B=e=>((0,o.dD)("data-v-3d27c3c1"),e=e(),(0,o.Cn)(),e),z={class:"line-number"},M=B((()=>(0,o._)("div",{class:"line-content"},null,-1))),H={class:"line-content"};function N(e,t,n,i,r,s){return(0,o.wg)(),(0,o.iD)("div",{class:(0,c.C_)(["line",{"line-select":e.activeLine}]),onMousedown:t[0]||(t[0]=t=>e.updateLine(e.lineNumber))},[(0,o._)("div",z,(0,c.zw)(e.lineNumber+1),1),M,(0,o._)("div",H,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.parseLine(e.text),(e=>((0,o.wg)(),(0,o.iD)("span",{class:(0,c.C_)(e.className),key:e.key},(0,c.zw)(e.text),3)))),128))])],34)}n(7658);var E=(0,o.aZ)({data(){return{keywords:{for:"operator",while:"operator",var:"keyword",fn:"keyword",new:"keyword",class:"keyword",if:"operator",else:"operator",return:"keyword","+":"operator","=":"operator","-":"operator","*":"operator","/":"operator","<":"operator",">":"operator",";":"grey","{":"operator","}":"operator","(":"keyword",")":"keyword","[":"value","]":"value",",":"grey"," ":"space"}}},methods:{updateLine(e){this.$emit("setActiveLine",e)},parseLine(e){let t=0;const n=[];let i="";for(let o=0;o<e.length;o++){t++;const r=e[o];if(o<e.length-1){const i=e[o+1];"/"===r&&"/"===i&&n.push({key:o,text:e.slice(o),className:"grey",index:t})}if(" "===r||";"===r||"("===r||")"===r||"+"===r||"-"===r||"*"===r||"/"===r||"{"===r||"}"===r||'"'===r||"["===r||"]"===r||","===r){let e="variable";isNaN(parseInt(i))?this.keywords[i]&&(e=this.keywords[i]):e="value",n.push({key:o,text:i,className:e,index:t}),i="",n.push({key:o,text:r,className:this.keywords[r]||"variable",index:t})}else i+=r}return i.length>0&&n.push({key:e.length,text:i,className:this.keywords[i]||"variable",index:t}),n}},name:"ScriptLine",props:{text:String,activeLine:Boolean,lineNumber:{type:Number,required:!0},setActiveLine:Function},computed:{console:()=>console}}),A=n(89);const j=(0,A.Z)(E,[["render",N],["__scopeId","data-v-3d27c3c1"]]);var F=j;function R(e,t,n,i,r,s){return(0,o.wg)(),(0,o.iD)("div",{class:"cursor",style:(0,c.j5)({position:"absolute",top:e.activeLine*e.lineHeight+e.headerHeight+"px",left:(e.linePosition+1)*e.letterSize+e.lineNumberWidth+"px",opacity:e.counter>=e.maxCounter?0:1})},null,4)}var Z=(0,o.aZ)({name:"TextCursor",watch:{counter:function(e){e>=2*this.maxCounter&&(this.counter=0)}},methods:{resetBlink(){this.counter=0}},mounted(){window.addEventListener("keydown",this.resetBlink),this.interval=setInterval((()=>{this.counter+=this.maxCounter/2}),this.maxCounter/2)},unmounted(){window.addEventListener("keydown",this.resetBlink),clearInterval(this.interval)},data(){return{lineHeight:24,headerHeight:52,letterSize:9.61,lineNumberWidth:24,counter:0,maxCounter:500,interval:0}},props:{activeLine:{type:Number,required:!0},linePosition:{type:Number,required:!0}}});const I=(0,A.Z)(Z,[["render",R],["__scopeId","data-v-4c585cdd"]]);var q=I;const W="function main() {\nlet output = [];\nfunction addToOutput(arr) {for(let i=0;i<arr.length;i++)output.push(arr[i])}";let V="",J=W;function K(e,t){for(let n=0;n<e.length;n++)if(t==e[n])return!0;return!1}function $(e,t){while(" "==e[t]||"\n"==e[t])t++;return t}function Y(e,t,n){while(e[t]!=n)t++;return t}const U=[];function G(){V="",J=W}function Q(){V+="#include <iostream>\n",V+="#include <string>\n",V+="#include <fstream>\n",V+="#include <vector>\n\n"}function X(){const e="const double PI = 3.14159265358979323846\nconst double E = 2.71828182845904523536;\n\nint floor(double x) {\n    return (int) x;\n}\n\nint ceil(double x) {\n    if (x - (int) x == 0) return (int) x;\n    else return (int) x + 1;\n}\n\nint round(double x) {\n    if (x - (int) x >= 0.5) return (int) x + 1;\n    else return (int) x;\n}\n\ndouble round(double x, int decimals) {\n    double multiplier = 1;\n    for (int i = 0; i < decimals; i++) multiplier *= 10;\n    return round(x * multiplier) / multiplier;\n}\n\ndouble abs(double x) {\n    return x < 0 ? -x : x;\n}\n\ndouble square(double x) {\n    return x * x;\n}\n\ndouble pow(double x, double y) {\n    double result = 1;\n    for (int i = 0; i < y; i++) {\n        result *= x;\n    }\n    return result;\n}\n\ndouble log(double x) {\n    return log(x);\n}",t='\n\nvoid print() {\n    std::cout << "";\n}\n\ntemplate<typename First, typename ... Strings>\nvoid print(First arg, const Strings&... rest) {\n    std::cout << std::boolalpha << arg  << " ";\n    print(rest...);\n}\n',n="const PI = 3.14159265358979323846;const E = 2.71828182845904523536;";V+=e,V+=t,J+=n}function ee(){V+="\nint main() {\n"}function te(){V+="    return 0;\n}\n",J+="return output}\n return main()"}function ne(e){V+=e,J+=e}function ie(e){V+=e}function oe(e){J+=e}function re(){const e="class VectorBool {\npublic:\n    std::vector<bool> data;\n    VectorBool(std::vector<bool> data) {\n        this->data = data;\n    }\n\n    bool operator[](int index) {\n        return data[index];\n    }\n\n};\n\n",t="class VectorDouble {\npublic:\n    std::vector<double> data;\n    VectorDouble(std::vector<double> data) {\n        this->data = data;\n    }\n    double operator[](int index) {\n        return data[index];\n    }\n};\n\n",n="class VectorString {\npublic:\n    std::vector<std::string> data;\n    VectorString(std::vector<std::string> data) {\n        this->data = data;\n    }\n    std::string operator[](int index) {\n        return data[index];\n    }\n};\n\n";V+=e,V+=t,V+=n}function se(e,t){ne("\n    ");let n=t+1;n=$(e,n);const i=e[n];let o="";if(n=$(e,n+1),":"==e[n]&&(n=$(e,n+1),o=e[n],n=$(e,n+1)),n=Y(e,n,"="),n=$(e,n+1),"["==e[n]){"number"==o?ie("VectorDouble "+i+";"):"string"==o?ie("VectorString "+i+";"):"bool"==o&&ie("VectorBool "+i+";"),U.push(i),ie("    "+i+".value = {\n");while("]"!=e[n])n=$(e,n+1),"]"!=e[n]&&ne(e[n]);ne("};\n    ")}else{const t=e[n];ie("auto "+i+"="+t)}return t+=n-t,t}function ae(e,t){if(ie("auto "),t=$(e,t+1),ie(e[t]+" = []"),t=$(e,t+1),ie("("),t=$(e,t+1),")"==e[t])ie(")");else while(")"!=e[t]){if(ie("auto "+e[t]),t=$(e,t+1),")"==e[t]){ie(")");break}ie(","),t=$(e,t+1)}return ie("\n"),t}function le(e){const t=[];for(let n=0;n<e.length;n++){let i="";for(const o of e[n])" "==o||";"==o||"{"==o||"}"==o||"("==o||")"==o||"\n"==o||"["==o||"]"==o||","==o||"+"==o||"-"==o||"*"==o||"/"==o||"="==o||":"==o?(""!=i&&(t.push(i),i=""),t.push(o)):"."==o?(t.push(i),i="",i+=o):i+=o}for(let n=0;n<t.length;n++){const e=t[n],i=K(U,e)&&"."!=t[n+1][0];"var"==e?n=se(t,n):";"==e?ie(";\n    "):"{"==e?ie("{\n    "):"}"==e?ie("};\n    "):"fn"==e?n=ae(t,n):i?ie(e+".value"):"fn"!=e&&ie(e)}for(let n=0;n<t.length;n++){const e=t[n];if("var"==e)oe("let ");else if(";"==e)oe(";\n    ");else if("{"==e)oe("{\n    ");else if("}"==e)oe("}\n    ");else if("fn"==e)oe("function ");else if("print"===e){oe("addToOutput(["),n+=2;while(")"!=t[n])oe(t[n]),n++;oe("])")}else oe(e)}}function ue(e){return G(),Q(),re(),X(),ee(),le(e),te(),[V,J]}let ce=0;function de(){return ce++}var he=(0,o.aZ)({data(){return{activeLine:0,linePosition:0,lines:["","fn printMessage(message) {","    print(message)","}","","for (var i = 0; i < 10; i++) {",'    printMessage("Hello JanninScript!")',"}",""],currentMaxPosition:0,height:window.innerHeight-this.$props.outputTabHeight,phantomBracket:0,id:de()}},mounted(){window.addEventListener("keydown",(e=>this.handleKeydown(e)))},unmounted(){window.removeEventListener("keydown",(e=>this.handleKeydown(e)))},emits:["clicked"],methods:{run(){const e=ue(this.lines);this.$emit("clicked",e)},setActiveLine(e){this.linePosition=Math.min(this.currentMaxPosition,this.lines[e].length),this.activeLine=e},spliceSlice(e,t,n,i){return t<0&&(t=e.length+t,t<0&&(t=0)),e.slice(0,t)+(i||"")+e.slice(t+n)},handleKeydown(e){const{key:t}=e;this.id=de();const n=isNaN(t.charCodeAt(1))&&t.charCodeAt(0);if(e.ctrlKey?O.ctrl.has(t)&&e.preventDefault():O.normal.has(t)&&e.preventDefault(),"}"===t||")"===t||"]"===t)return this.lines[this.activeLine][this.linePosition]===t&&this.phantomBracket?(this.linePosition++,void this.phantomBracket--):(this.lines[this.activeLine]=this.spliceSlice(this.lines[this.activeLine],this.linePosition,0,t),void this.linePosition++);if("("===t&&(this.lines[this.activeLine]+=")",this.phantomBracket++),"{"===t&&(this.lines[this.activeLine]+="}",this.phantomBracket++),"["===t&&(this.lines[this.activeLine]+="]",this.phantomBracket++),n)this.currentMaxPosition=this.linePosition+1,this.lines[this.activeLine]=this.spliceSlice(this.lines[this.activeLine],this.linePosition,0,t),this.linePosition+=1;else{const t=D(e,{lines:this.lines,activeLine:this.activeLine,linePosition:this.linePosition,phantomBracket:this.phantomBracket,currentMaxPosition:this.currentMaxPosition});this.lines=t?.lines??this.lines,this.activeLine=t?.activeLine??this.activeLine,this.linePosition=t?.linePosition??this.linePosition,this.phantomBracket=t?.phantomBracket??this.phantomBracket,this.currentMaxPosition=t?.currentMaxPosition??this.currentMaxPosition}}},components:{ScriptLine:F,TextCursor:q},props:{outputTabHeight:{type:Number,required:!0}},name:"JanninScriptTextEditor"});const pe=(0,A.Z)(he,[["render",w],["__scopeId","data-v-f3a65016"]]);var ve=pe;const fe=e=>((0,o.dD)("data-v-5415954c"),e=e(),(0,o.Cn)(),e),we={class:"wrapper"},ge=fe((()=>(0,o._)("p",null,"Output",-1))),me={class:"output"},be=fe((()=>(0,o._)("span",{class:"chevron-right"},null,-1)));function xe(e,t,n,i,r,s){return(0,o.wg)(),(0,o.iD)("div",we,[ge,(0,o._)("div",me,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.format(e.text),(e=>((0,o.wg)(),(0,o.iD)("p",{key:e.key},[be,(0,o.Uk)(" "+(0,c.zw)(e.text),1)])))),128))])])}var Le=(0,o.aZ)({methods:{format(e){const t=e.map((e=>({text:e,key:de()})));return t}},name:"JanninScriptOutput",props:{text:{type:Array,required:!0}}});const ye=(0,A.Z)(Le,[["render",xe],["__scopeId","data-v-5415954c"]]);var ke=ye;const Pe=e=>((0,o.dD)("data-v-8500b55e"),e=e(),(0,o.Cn)(),e),Se={class:"header"},_e=Pe((()=>(0,o._)("div",null,[(0,o._)("p",{class:"file-name"},"C++ Output")],-1))),Ce={class:"button-wrapper"},Te=Pe((()=>(0,o._)("label",{for:"include-base"},"Include Base File",-1)));function De(e,t,n,r,s,a){const l=(0,o.up)("CppLine");return(0,o.wg)(),(0,o.iD)("div",{class:"wrapper",style:(0,c.j5)({height:e.height+"px"})},[(0,o._)("div",Se,[_e,(0,o._)("div",Ce,[Te,(0,o.wy)((0,o._)("input",{type:"checkbox",id:"include-base","onUpdate:modelValue":t[0]||(t[0]=t=>e.toggleShowBase=t)},null,512),[[i.e8,e.toggleShowBase]]),(0,o._)("button",{class:"run-btn",onClick:t[1]||(t[1]=(...t)=>e.clear&&e.clear(...t))},"Clear")])]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.formatText(e.totalFile),((e,t)=>((0,o.wg)(),(0,o.iD)("div",{key:t},[((0,o.wg)(),(0,o.j4)(l,{text:e,key:t},null,8,["text"]))])))),128))],4)}const Oe={class:"wrapper"};function Be(e,t,n,i,r,s){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("div",Oe,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.formatText(e.text),(e=>((0,o.wg)(),(0,o.iD)("span",{key:e.key,class:(0,c.C_)(e.className)},(0,c.zw)(e.text),3)))),128))])])}var ze=(0,o.aZ)({name:"CppLine",data(){return{keywords:new Set(["auto","break","case","char","class","continue","default","double","else","enum","extern","float","for","goto","int","long","register","return","short","signed","sizeof","static","struct","switch","typedef","union","unsigned","void","volatile","vector"]),operators:new Set(["+","-","*","/","%","++","--","==","!=",">","<",">=","<=","&&","||","!","&","|","^","~","<<",">>","=","+=","-=","*=","/=","%=","&=","|=","^=","<<=",">>=","const","for","while","if","else","return","new","public","private","protected","#include"]),brackets:new Set(["(",")","{","}","[","]"]),punctuation:new Set([";",",",".",":","?"]),endOfWord:new Set([" ",";","\t","\n","(",")","{","}","[","]",",",".",":","?","-","+","=",":","<",">","&","|","^","~","!","*","/","%"])}},methods:{formatText(e){const t=[];let n="";if(0===e.length)return[{text:" ",className:"line",key:de()}];for(let o=0;o<e.length;o++){const i=e[o];this.endOfWord.has(i)?(t.push(n),n="",t.push(i)):n+=e[o]}t.push(n);const i=[];return t.forEach(((e,t)=>{let n="variable";" "===e?i.push({text:" ",className:"space",key:de()}):"\t"===e?i.push({text:"&nbsp&nbsp&nbsp&nbsp",className:"space",key:de()}):this.operators.has(e)?n="operator":this.keywords.has(e)?n="keyword":this.brackets.has(e)?n="operator":this.punctuation.has(e)?n="punctuation":"\n"===e&&(n="line"),i.push({text:e,className:n,key:de()})})),i}},props:{text:{type:String,required:!0}}});const Me=(0,A.Z)(ze,[["render",Be],["__scopeId","data-v-dd09bd12"]]);var He=Me,Ne=(0,o.aZ)({name:"CppText",data(){return{toggleShowBase:!1,baseFile:"",file:"",totalFile:"",height:window.innerHeight-this.$props.outputTabHeight}},mounted(){window.addEventListener("resize",this.handleResize),window.addEventListener("onfullscreenchange",this.handleResize)},unmounted(){window.removeEventListener("resize",this.handleResize),window.removeEventListener("onfullscreenchange",this.handleResize)},watch:{toggleShowBase:function(e){this.totalFile=e?this.baseFile+this.file:this.file,this.handleResize()},text:function(e){let t="";for(let n=0;n<this.text.length;n++)if(t+=this.text[n],t.includes("int main()")){this.baseFile=this.text.substring(0,n),this.file=this.text.substring(n-9);break}this.toggleShowBase?this.totalFile=this.baseFile+this.file:this.totalFile=this.file}},methods:{handleResize(){this.height=window.innerHeight-this.$props.outputTabHeight},formatText(e){const t=e.split("\n");return t},clear(){this.$emit("clear")}},props:{text:{type:String,required:!0},outputTabHeight:{type:Number,required:!0}},components:{CppLine:He}});const Ee=(0,A.Z)(Ne,[["render",De],["__scopeId","data-v-8500b55e"]]);var Ae=Ee,je=(0,o.aZ)({name:"App",mounted:function(){document.title="JanninScript Online Compiler",window.addEventListener("resize",this.handleResize),window.addEventListener("onfullscreenchange",this.handleResize)},unmount:function(){window.removeEventListener("resize",this.handleResize),window.removeEventListener("onfullscreenchange",this.handleResize)},data(){return{cppOutput:"",jsOutput:[],outputTabSize:40}},methods:{clearCPP(){this.cppOutput=""},isMobile(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},handleResize(){this.$nextTick((()=>{const e=this.$refs,t=e.outputWrapper.$el;this.outputTabSize=t.clientHeight}))},runBuild(e){this.cppOutput=e[0];const t=new Function(e[1]);let n;try{n=t()}catch(i){n=[i+""]}this.jsOutput=n}},watch:{jsOutput:function(){this.handleResize()}},components:{JanninScriptTextEditor:ve,CppText:Ae,JanninScriptOutput:ke}});const Fe=(0,A.Z)(je,[["render",u]]);var Re=Fe;(0,i.ri)(Re).mount("#app")}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,i,o,r){if(!i){var s=1/0;for(c=0;c<e.length;c++){i=e[c][0],o=e[c][1],r=e[c][2];for(var a=!0,l=0;l<i.length;l++)(!1&r||s>=r)&&Object.keys(n.O).every((function(e){return n.O[e](i[l])}))?i.splice(l--,1):(a=!1,r<s&&(s=r));if(a){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[i,o,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var o,r,s=i[0],a=i[1],l=i[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(l)var c=l(n)}for(t&&t(i);u<s.length;u++)r=s[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},i=self["webpackChunkjanninscript_online"]=self["webpackChunkjanninscript_online"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(27)}));i=n.O(i)})();
//# sourceMappingURL=app.704b6a6b.js.map