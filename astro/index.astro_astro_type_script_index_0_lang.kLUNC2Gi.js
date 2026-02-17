function ct({from:n=0,to:c=1,mass:p=1,stiffness:l=120,damping:u=14,velocity:v=0,tolerance:w=.001,resumeOnTarget:T=!0}={}){function y(){return De(t)}function I(b){if(g)return y();if(V(t)&&V(i)&&V(s)){let P=!0;for(let _=0;_<t.length;_+=1){const L=t[_]-i[_],X=(-l*L-u*s[_])/p;s[_]+=X*b,t[_]+=s[_]*b;const te=t[_]-i[_];(Math.abs(s[_])>=w||Math.abs(te)>=w)&&(P=!1)}if(P){for(let _=0;_<t.length;_+=1)t[_]=i[_],s[_]=0;g=!0}return h.value=t,h.velocity=s,De(t)}if(J(t)&&J(i)&&J(s)){const P=h.objectKeys??Object.keys(t);let _=!0;for(const L of P){const X=t[L]-i[L],te=(-l*X-u*s[L])/p;s[L]+=te*b,t[L]+=s[L]*b;const j=t[L]-i[L];(Math.abs(s[L])>=w||Math.abs(j)>=w)&&(_=!1)}if(_){for(const L of P)t[L]=i[L],s[L]=0;g=!0}return h.value=t,h.velocity=s,De(t)}const M=i;let x=s;x+=(-l*(t-M)-u*x)/p*b,t+=x*b,s=x,h.value=t,h.velocity=s;const B=t-M;return Math.abs(x)<w&&Math.abs(B)<w&&(t=M,s=0,h.value=t,h.velocity=s,g=!0),t}const h=yn({from:n,to:c,velocity:v,label:"Spring"}),r=h.normalizeInput;let t=h.value,s=h.velocity??v,i=h.target,o=null,g=!1;const A=new Set;return{setTarget:function(b){const M=r(b),x=!dt(M,i);if(i=M,h.target=M,t=h.value,T&&g&&x){g=!1,o=null;for(const B of A)B(i)}},setValue:function(b,M={}){const{resetVelocity:x=!0,resetTime:B=!0,setTarget:P=!1,markDone:_=!1}=M;t=r(b),h.value=t,P&&(i=De(t),h.target=i);const L=g||!dt(t,i);if(x&&(s=h.arrayLength!=null?Te(0,h.arrayLength):h.objectKeys!=null?Me(0,h.objectKeys):0,h.velocity=s),B&&(o=null),_&&(g=!0),L&&!_){g=!1,o=null;for(const X of A)X(i)}},getValue:y,isDone:function(){return g},onResume:function(b){return A.add(b),()=>{A.delete(b)}},step:I,next:function(b=performance.now()){if(o==null)return o=b,y();const M=(b-o)/1e3;o=b;const x=1/30;let B=M,P=y();for(;B>0&&!g;){const _=Math.min(B,x);P=I(_),B-=_}return P}}}function lt(n,c){if(!c||typeof c!="object"||c.type==null)return n??c;const{type:p,default:l}=c;if(n==null)return l;try{switch(p){case String:return String(n);case Number:{const u=Number(n);return Number.isNaN(u)?l:u}case Boolean:return n===""||n==="true"||n!=="false"&&n!=="0"&&n!=null;case Object:try{return typeof n=="string"?JSON.parse(n):n}catch{return l}case Array:try{return typeof n=="string"?JSON.parse(n):n}catch{return Array.isArray(l)?l:[]}default:return n}}catch{return l}}function ut(n,c,p,l){if(!l||typeof l!="object"||!l.reflect)return;let u=null;const v=l.type;if(v===Boolean)return p?void n.setAttribute(c,""):void n.removeAttribute(c);if(v===Object||v===Array)try{u=p==null?null:JSON.stringify(p)}catch{u=null}else u=p==null?null:String(p);u==null?n.removeAttribute(c):n.setAttribute(c,u)}function Pe(n,c={},p){const{props:l={},shadow:u=!1,styles:v,plugins:w}=c,T=w??[],y=()=>{};class I extends HTMLElement{constructor(){super(),this.version=vn,this.t={};for(const r of Object.keys(l)){const t=l[r];this.t[r]=t&&typeof t=="object"&&("type"in t||"default"in t)?t:{type:void 0,default:t,reflect:!1}}this.props={},this.state={},this.actions={},this.refs={},this.emit=this.emit.bind(this),this.listen=this.listen.bind(this),this.setState=this.setState.bind(this),this.updateState=this.updateState.bind(this),this.setProps=this.setProps.bind(this),this.scheduleUpdate=this.scheduleUpdate.bind(this),this.update=this.update.bind(this),this.forceRender=this.forceRender.bind(this),this.destroy=this.destroy.bind(this),this.i=null,this.o=null,this.h=!1,this.u=!1,this.l=u,this.m=u?this.attachShadow({mode:"open"}):this,this.p=null,this.S=[],this.j=[],this.M=[],this.O=[],this._=[],this.$=[],this.A=[],this.T=[],this.k=new Map,this.L=!1,this.F=!1,this.I={},this.R=!1,this.V=n,this.C=!1,this.H=new Set,this.D=!1,this.U=new Map,this.q=0,this.B=!1}N(r){const t=this.l?this.m.host:this;let s=r.parentElement;for(;s;){if(s===t)return!1;if(s.tagName.includes("-"))return!0;s=s.parentElement}return!1}static get observedAttributes(){return Object.keys(l)}attributeChangedCallback(r,t,s){if(t===s)return;const i=this.t[r],o=this.I[r],g=lt(s,i);if(this.props[r]=g,this.L&&o!==g)for(const A of this.T)try{A(r,o,g)}catch(b){y(String(b?.message||b))}this.I[r]=g,this.H.has(r)?this.H.delete(r):this.i&&this.isConnected?this.D?this.C=!0:this.update(!0):this.C=!0}connectedCallback(){for(const t in this.t){if(!this.t.hasOwnProperty(t))continue;const s=lt(this.getAttribute(t),this.t[t]);this.props[t]=s,this.I[t]=s}u||this.p||(this.p=this.W());let r=null;try{if(p){const t={props:this.props,state:this.state,actions:this.actions,refs:this.refs,emit:this.emit,listen:this.listen,updateState:this.updateState.bind(this),host:this,onMount:s=>this.M.push(s),onDestroy:s=>this.O.push(s),onUpdate:s=>this._.push(s),onBeforeUpdate:s=>this.$.push(s),onFirstUpdate:s=>this.A.push(s),onPropsChanged:s=>this.T.push(s),link:(s,i)=>{const o=i||s;this.state[o]=this.props[s],this.T.push((A,b,M)=>{A===s&&(Object.is(this.state[o],M)||(this.state[o]=M))});const g={fn:()=>{const A=this.state[o];if(Object.is(this.props[s],A))return;this.props[s]=A,this.I[s]=A;const b=this.t[s],M=b&&{...b,reflect:!0},x=this.getAttribute(s);this.H.add(s),ut(this,s,A,M),x===this.getAttribute(s)&&this.H.delete(s)},deps:()=>[this.state[o]]};this.S.push(g)},computed:(s,i)=>{let o;if(i!==void 0)try{const b=typeof i=="function"?i():i;Array.isArray(b)&&(o=b)}catch(b){String(b?.message||b)}const g={getter:s,deps:i,value:i!==void 0?s(o):s()};this.j.push(g);const A=()=>g.value;return A.P=g,this.J(A),A},effect:(s,i)=>{const o={fn:s,deps:i};return this.S.push(o),()=>this.K(o)},delegate:(s,i,o)=>(this.Z(s,i,o),()=>this.G(s,i,o))};for(const s of T)if(s)try{const i=s.extend(t,this);i&&typeof i=="object"&&Object.assign(t,i)}catch(i){y(String(i?.message||i))}r=p(t)}}catch(t){String(t?.message||t)}if(this.i=typeof r!="function"?()=>"":r,this.D=!0,this.update(!0),this.D=!1,this.C&&(this.C=!1,this.update(!0)),!this.L){this.L=!0;for(const t of this.M)try{t()}catch(s){y(String(s?.message||s))}}}disconnectedCallback(){this.destroy()}remove(){super.remove()}destroy(){for(const r of this.O)try{r()}catch(t){y(String(t?.message||t))}for(const r of this.S)if(r.cleanup){try{r.cleanup()}catch(t){y(String(t?.message||t))}r.cleanup=void 0}for(const[,r]of this.k)try{this.m.removeEventListener(r.eventType,r.listener)}catch{}this.k.clear(),this.L=!1}emit(r,t){this.dispatchEvent(new CustomEvent(r,{detail:t,bubbles:!0,composed:!0}))}listen(r,t,s,i){const o=s;r.addEventListener(t,o,i);const g=()=>{try{r.removeEventListener(t,o,i)}catch{}};return this.O.push(g),g}setState(r){let t=!1;const s=r,i=this.state;for(const o in s){if(!Object.prototype.hasOwnProperty.call(s,o))continue;const g=s[o];Object.is(i[o],g)||(i[o]=g,t=!0)}if(t)if(this.D||!this.L)this.update(!0);else{if(!this.i||!this.isConnected||this.h)return;this.h=!0,requestAnimationFrame(()=>{this.h=!1,this.i&&this.isConnected&&this.update(!0)})}}updateState(r){Object.assign(this.state,r),this.i&&this.isConnected&&this.X()}setProps(r){const t=Object.keys(r);if(t.length===0)return;const s=[];for(const i of t){const o=r[i],g=this.I[i];this.props[i]=o,this.L&&g!==o&&s.push(i);const A=this.t[i];A&&A.reflect&&ut(this,i,o,A),this.L&&g===o||(this.I[i]=o)}if(this.L&&s.length>0)for(const i of s){const o=this.I[i],g=r[i];for(const A of this.T)try{A(i,o,g)}catch(b){y(String(b?.message||b))}}this.i&&this.isConnected?this.update(!0):this.C=!0}scheduleUpdate(){this.i&&this.isConnected&&this.X()}X(){this.u||this.h||(this.u=!0,(typeof queueMicrotask=="function"?queueMicrotask:r=>Promise.resolve().then(r))(()=>{this.u=!1,this.i&&this.isConnected&&(this.h||this.update(!1))}))}update(r){if(this.i){if(r&&this.L)for(const t of this.$)try{t()}catch(s){y(String(s?.message||s))}if(r){this.Y();let t="";try{t=this.i()}catch(o){String(o?.message||o),t=""}if(typeof t!="string"&&(t=t==null?"":String(t)),t=((o,g)=>{const A={...this.props,...g};return o.replace(_n,(b,M)=>{const x=A[M];return x==null?"":String(x)})})(t,this.state),!this.l){const o=`data-scope-owner="${this.V}"`;t=t.replace(/<slot(?![^>]*data-scope-owner)(\s|>)/g,`<slot ${o}$1`)}this.B=!1;const s=this.o!==null&&Object.is(this.o,t);let i=!1;s&&this.L||(this.l,this.m.innerHTML=t,this.o=t,i=!0),this.D?(this.tt(),(typeof requestAnimationFrame=="function"?requestAnimationFrame:o=>setTimeout(o,0))(()=>{this.i&&this.isConnected&&(i&&!u&&this.projectSlots(),i&&this.et(),this.nt(),this.st())})):(i&&!u&&this.projectSlots(),i&&this.it(),this.nt(),this.st())}else this.B&&this.Y(),this.nt(),this.L&&this.st()}}forceRender(){this.o=null,this.i&&this.isConnected?this.D?this.C=!0:this.update(!0):this.C=!0}st(){if(!this.F){this.F=!0;for(const r of this.A)try{r()}catch(t){y(String(t?.message||t))}}for(const r of this._)try{r()}catch(t){y(String(t?.message||t))}this.ot()}ot(){const r=(this.l?this.m:this).querySelectorAll("*"),t=Object.prototype.hasOwnProperty,s=this.state,i=this.props;this.actions;for(let o=0;o<r.length;o++){const g=r[o];if(this.N(g)||g.attributes.length===0)continue;const A=g.attributes;for(let b=A.length-1;b>=0;b--){const M=A[b];if(!M.name.startsWith(Sn))continue;const x=M.name.slice(5),B=M.value,P=B?B.trim():"";let _,L=!1;if(P){const j=this.U.get(P);if(j){j.P&&(this.B=!0);try{_=j()}catch{}L=!0}}if(!L){const j=P||x,de=t.call(s,j),fe=!de&&t.call(i,j);de?_=s[j]:fe&&(_=i[j])}if(x==="text"){const j=_==null?"":String(_);g.textContent!==j&&(g.textContent=j)}else if(x==="html"){const j=_==null?"":String(_);g.innerHTML!==j&&(g.innerHTML=j)}else if(x in g){if(!Object.is(g[x],_))try{g[x]=_}catch{}if(x==="value")try{_==null?g.removeAttribute("value"):g.setAttribute("value",String(_))}catch{}}else if(_!=null)try{g.setAttribute(x,String(_))}catch{}const X=`__scopeBind_${x}`,te=g[X];if(te){const j=te.rt;j&&g.removeEventListener(j,te),delete g[X]}}}}Y(){for(const r of this.j){let t,s=!0;if(r.deps!==void 0)try{const i=typeof r.deps=="function"?r.deps():r.deps;if(Array.isArray(i)&&(t=i,r.prevDeps&&r.prevDeps.length===t.length)){s=!1;for(let o=0;o<t.length;o++)if(!Object.is(r.prevDeps[o],t[o])){s=!0;break}}}catch(i){y(String(i?.message||i)),s=!0,t=void 0}if(s){try{r.value=r.deps!==void 0?r.getter(t):r.getter()}catch(i){y(String(i?.message||i))}t&&(r.prevDeps=t.slice())}}}nt(){for(const r of this.S){let t,s=!0;if(r.deps!==void 0)try{const i=typeof r.deps=="function"?r.deps():r.deps;if(Array.isArray(i)&&(t=i,r.prevDeps&&r.prevDeps.length===t.length)){s=!1;for(let o=0;o<t.length;o++)if(!Object.is(r.prevDeps[o],t[o])){s=!0;break}}}catch(i){y(String(i?.message||i)),s=!0,t=void 0}if(s){if(r.cleanup){try{r.cleanup()}catch{}r.cleanup=void 0}try{const i=r.deps!==void 0?r.fn(t):r.fn();typeof i=="function"&&(r.cleanup=i)}catch{}t&&(r.prevDeps=t.slice())}}}K(r){const t=this.S.indexOf(r);if(t!==-1){if(r.cleanup)try{r.cleanup()}catch{}this.S.splice(t,1)}}J(r){const t=r.ct;if(t&&typeof t=="string")return this.U.set(t,r),t;const s=`__scope_bind_${++this.q}__`;this.U.set(s,r);try{r.ct=s,r.toString=()=>s}catch{}return s}tt(){const r=(this.l?this.m:this).querySelectorAll("[ref]"),t=this.refs;for(const s in t)t.hasOwnProperty(s)&&delete t[s];if(r.length!==0)for(let s=0;s<r.length;s++){const i=r[s];if(this.N(i))continue;const o=i.getAttribute("ref");o&&(t[o]?Array.isArray(t[o])?t[o].push(i):t[o]=[t[o],i]:t[o]=i)}}et(){const r=(this.l?this.m:this).querySelectorAll("*");for(let t=0;t<r.length;t++){const s=r[t];if(this.N(s)||s.attributes.length===0)continue;const i=s.attributes;for(let o=i.length-1;o>=0;o--){const g=i[o];if(!g.name.startsWith("on:"))continue;const A=g.name.slice(3),b=g.value,M=`__tinyHandler_${A}`,x=s[M];x&&s.removeEventListener(A,x),s.removeAttribute(g.name);const B=this.actions[b];if(B&&typeof B=="function"){const P=_=>{B.call(this.actions,_)};s[M]=P,s.addEventListener(A,P)}}}}it(){const r=(this.l?this.m:this).querySelectorAll("*"),t=this.refs;for(const s in t)t.hasOwnProperty(s)&&delete t[s];for(let s=0;s<r.length;s++){const i=r[s];if(this.N(i))continue;const o=i.getAttribute("ref");if(o&&(t[o]?Array.isArray(t[o])?t[o].push(i):t[o]=[t[o],i]:t[o]=i),i.attributes.length>0){const g=i.attributes;for(let A=g.length-1;A>=0;A--){const b=g[A];if(!b.name.startsWith("on:"))continue;const M=b.name.slice(3),x=b.value,B=`__tinyHandler_${M}`,P=i[B];P&&i.removeEventListener(M,P),i.removeAttribute(b.name);const _=this.actions[x];if(_&&typeof _=="function"){const L=X=>{_.call(this.actions,X)};i[B]=L,i.addEventListener(M,L)}}}}}W(){const r=new Map,t=this.childNodes,s=[];for(let i=0;i<t.length;i++)s.push(t[i]);for(let i=0;i<s.length;i++){const o=s[i];let g="";o.nodeType===1&&o.getAttribute&&(g=o.getAttribute("slot")||""),r.has(g)||r.set(g,[]),r.get(g).push(o)}for(let i=0;i<s.length;i++){const o=s[i];o.parentNode&&o.parentNode.removeChild(o)}return r}projectSlots(){const r=this.p||new Map,t=(this.l?this.m:this).querySelectorAll(`slot[data-scope-owner="${this.V}"]`);if(t.length!==0)for(let s=0;s<t.length;s++){const i=t[s],o=i.getAttribute("name")||"",g=r.get(o)||[];if(g.length){const A=document.createDocumentFragment();for(let b=0;b<g.length;b++){const M=g[b];let x;if(M.nodeType===1&&M.tagName.includes("-")&&M.p instanceof Map){const B=M,P=document.createElement(B.tagName.toLowerCase());for(let _=0;_<B.attributes.length;_++){const L=B.attributes[_];P.setAttribute(L.name,L.value)}for(const _ of B.p.values())for(let L=0;L<_.length;L++)P.appendChild(_[L].cloneNode(!0));x=P}else x=M.cloneNode(!0);A.appendChild(x)}i.replaceWith(A)}else{const A=i.childNodes,b=[];for(let M=0;M<A.length;M++)b.push(A[M]);if(b.length>0){const M=document.createDocumentFragment();for(let x=0;x<b.length;x++)M.appendChild(b[x]);i.replaceWith(M)}}}}Z(r,t,s){const i=`${r}::${t}`;let o=this.k.get(i);if(!o){const g=A=>{const b=A.target&&A.target.closest?A.target.closest(t):null;if(b)for(const M of o.handlers)try{M(A,b)}catch{}};o={eventType:r,selector:t,listener:g,handlers:new Set},this.k.set(i,o),this.m.addEventListener(r,g)}o.handlers.add(s)}G(r,t,s){const i=`${r}::${t}`,o=this.k.get(i);if(o&&(o.handlers.delete(s),o.handlers.size===0)){try{this.m.removeEventListener(r,o.listener)}catch{}this.k.delete(i)}}}if(!customElements.get(n)){if(v&&typeof document<"u"){const h=`scope-${n}-styles`;if(!document.getElementById(h)){const r=document.createElement("style");r.id=h,r.textContent=v,document.head.appendChild(r)}}try{customElements.define(n,I)}catch(h){String(h?.message||h)}}return I}const bn=()=>({name:"timer",extend:n=>{const c=new Set,p=new Set,l=new Set,u={setTimeout:(v,w,...T)=>{let y;return y=setTimeout((...I)=>{c.delete(y),v(...I)},w,...T),c.add(y),y},setInterval:(v,w,...T)=>{const y=setInterval(v,w,...T);return p.add(y),y},raf:(v,w)=>{let T=0,y=!0,I=0;const h=typeof w=="number"&&w>0?1e3/w:0,r=t=>{if(l.delete(T),y){if(h){if(t-I>=h){const s=I?t-I:h;I=t,v(t,s)}}else{const s=I?t-I:0;I=t,v(t,s)}T=requestAnimationFrame(r),l.add(T)}};return T=requestAnimationFrame(r),l.add(T),()=>{y&&(y=!1,l.delete(T),cancelAnimationFrame(T))}}};return n.onDestroy(()=>{for(const v of c)clearTimeout(v);c.clear();for(const v of p)clearInterval(v);p.clear();for(const v of l)cancelAnimationFrame(v);l.clear()}),{timer:u}}}),mn=()=>({name:"mouse",extend:n=>{const c=new Map,p=(l,u)=>{if(typeof window>"u")return()=>{};const v=T=>{const y=T;u(y.clientX,y.clientY,y)};window.addEventListener(l,v);let w=c.get(l);return w||(w=new Set,c.set(l,w)),w.add(v),()=>{window.removeEventListener(l,v),w?.delete(v)}};return n.onDestroy(()=>{if(typeof window<"u"){for(const[l,u]of c){for(const v of u)window.removeEventListener(l,v);u.clear()}c.clear()}}),{onMouseMove:l=>p("mousemove",l),onMouseDown:l=>p("mousedown",l),onMouseUp:l=>p("mouseup",l),onMouseWheel:l=>(u=>{if(typeof window>"u")return()=>{};const v=T=>{const y=T;u(y.clientX,y.clientY,y.deltaY,y)};window.addEventListener("wheel",v);let w=c.get("wheel");return w||(w=new Set,c.set("wheel",w)),w.add(v),()=>{window.removeEventListener("wheel",v),w?.delete(v)}})(l)}}}),V=n=>Array.isArray(n),J=n=>n!=null&&typeof n=="object"&&!Array.isArray(n),De=n=>V(n)?n.slice():J(n)?{...n}:n,dt=(n,c)=>{if(V(n)&&V(c)){if(n.length!==c.length)return!1;for(let p=0;p<n.length;p+=1)if(!Object.is(n[p],c[p]))return!1;return!0}if(J(n)&&J(c)){const p=Object.keys(n),l=Object.keys(c);if(p.length!==l.length)return!1;for(const u of p)if(!(u in c)||!Object.is(n[u],c[u]))return!1;return!0}return!(V(n)||V(c)||J(n)||J(c))&&Object.is(n,c)},Te=(n,c)=>Array.from({length:c},()=>n),Me=(n,c)=>c.reduce((p,l)=>(p[l]=n,p),{}),yn=({from:n,to:c,velocity:p,label:l})=>{const u={value:n,target:c,velocity:p,arrayLength:null,objectKeys:null,normalizeInput:h=>h},v=h=>{if(u.arrayLength==null){if(u.objectKeys!=null)throw new Error(`${l} value shape mismatch (array vs object).`);u.arrayLength=h,V(u.value)||(u.value=Te(u.value,h)),V(u.target)||(u.target=Te(u.target,h)),u.velocity===void 0||V(u.velocity)||(u.velocity=Te(u.velocity,h))}},w=h=>{if(u.objectKeys==null){if(u.arrayLength!=null)throw new Error(`${l} value shape mismatch (object vs array).`);u.objectKeys=h,J(u.value)||(u.value=Me(u.value,h)),J(u.target)||(u.target=Me(u.target,h)),u.velocity===void 0||J(u.velocity)||(u.velocity=Me(u.velocity,h))}},T=h=>{if(V(h)){if(u.objectKeys!=null)throw new Error(`${l} value shape mismatch (array vs object).`);if(u.arrayLength==null&&v(h.length),h.length!==u.arrayLength)throw new Error(`${l} value length mismatch (expected ${u.arrayLength}, got ${h.length}).`);return h.slice()}if(J(h)){if(u.arrayLength!=null)throw new Error(`${l} value shape mismatch (object vs array).`);const r=Object.keys(h);if(u.objectKeys==null&&w(r),u.objectKeys&&r.length!==u.objectKeys.length)throw new Error(`${l} value keys mismatch (expected ${u.objectKeys.length}, got ${r.length}).`);if(u.objectKeys){for(const t of u.objectKeys)if(!(t in h))throw new Error(`${l} value keys mismatch (missing key "${t}").`)}return{...h}}return u.arrayLength!=null?Te(h,u.arrayLength):u.objectKeys!=null?Me(h,u.objectKeys):h};u.normalizeInput=T;const y=V(n)||V(c)||p!==void 0&&V(p),I=J(n)||J(c)||p!==void 0&&J(p);if(y&&I)throw new Error(`${l} value shape mismatch (array vs object).`);if(y){const h=V(n)?n.length:V(c)?c.length:p.length;v(h),u.value=T(n),u.target=T(c),u.velocity!==void 0&&(u.velocity=T(u.velocity))}else if(I){const h=J(n)?Object.keys(n):J(c)?Object.keys(c):Object.keys(p);w(h),u.value=T(n),u.target=T(c),u.velocity!==void 0&&(u.velocity=T(u.velocity))}return u};let pe={x:-1,y:-1};const gt={stiffness:300,damping:30,mass:1},En=()=>({name:"pointer",extend:n=>{const{onMouseMove:c}=mn().extend(n,n.host),{timer:p}=bn().extend(n,n.host);pe.x=window.innerWidth/2,pe.y=window.innerHeight/2;const l={x:ct({from:pe.x,to:pe.x,...gt}),y:ct({from:pe.y,to:pe.y,...gt})};return c((u,v)=>{l.x.setTarget(u),l.y.setTarget(v)}),{onPointerMove:u=>{let v=pe.x,w=pe.y;p.raf(T=>{const y=l.x.next(T),I=l.y.next(T);var h,r;v===y&&w===I||(u({x:y,y:I,v:(h={x:y,y:I},r={x:v,y:w},{x:h.x-r.x,y:h.y-r.y,magnitude:Math.sqrt((h.x-r.x)*(h.x-r.x)+(h.y-r.y)*(h.y-r.y))}).magnitude}),v=y,w=I)})},onMouseMove:c}}}),vn="0.0.1",_n=/\{([A-Za-z_$][\w$]*)\}/g,Sn="bind:";Pe("c-logo",{props:{size:{type:Number,default:100}}},()=>()=>`
      <div class="relative z-10 scale-75 md:scale-100">
        <svg
          width="300"
          height="300"
          viewBox="0 0 749 749"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.00098"
            y="3.00195"
            width="744"
            height="744"
            rx="15"
            fill="#222730"></rect>
          <circle cx="374.5" cy="374.5" r="374.5" fill="#F0F6FC"></circle>
        </svg>

        <h1
          class="big-title leading-none tracking-tighter mt-5"
          style="font-family: var(--font-poppins); font-size: 85px;"
        >
          Scoped
        </h1>
      </div>
    `);const ft=[{Title:"Introduction",content:`
      <strong>Scoped</strong> is a lightweight library designed to simplify the creation of web components.
      <br />
      <br />
      Its main idea is to provide a minimal, framework-agnostic layer over the Custom Elements API, letting you build encapsulated, reusable UI components using a concise template syntax, reactive state, and straightforward binding mechanisms. With built-in lifecycle hooks and an extensible plugin system, Scoped empowers developers to efficiently build modern, reactive interfaces.
      <br />
      <br />
      It encourages expressiveness and rapid prototyping, giving you fine-grained control and flexibility over your components without the overhead and complexity of traditional frameworks. Scoped lets you stay close to the platform while benefiting from reactivity, simple data flow, and composable patterns for creative and productive development.
    `},{Title:"Installation",content:`
      To install <strong>Scoped</strong>, you can use your favorite package manager.
      <br />
      <pre>
        <code class="language-bash">npm install @petit-kit/scoped
# or
yarn add @petit-kit/scoped
# or
pnpm install @petit-kit/scoped</code>
      </pre>
    `},{Title:"Getting started",content:`
      To get started with <strong>Scoped</strong>, you can create a new component using the <strong>define</strong> function.
      <br />
      <pre>
        <code class="language-typescript">import { define } from '@petit-kit/scoped';

define(
  'c-slider',
  {
    props: { value: { type: Number, default: 0 } },
  },
  ({ link, emit, actions, host }) => {
    link('value', 'value');

    actions.handleChange = (event) => {
      host.updateState({ value: event.target.valueAsNumber });
      emit('on-change', { value: event.target.valueAsNumber });
    };

    return () => \` 
      &lt;div&gt;
        &lt;input
          type="range" min="0" max="100" step="1"
          bind:value="value"
          on:input="handleChange"
        /&gt;
        &lt;c-number ref="number" bind:value="value"&gt;&lt;/c-number&gt;
      &lt;/div&gt;
    \`;
  });</code>
    </pre>

    The <strong>define()</strong> function is used to declare a new component.
    <pre>
      <code class="language-typescript">function define(
  tagName: string,
  options: ComponentOptions,
  setup: SetupFunction
);</code>
      </pre>
      It takes a <strong>tagName</strong> for naming the used tag, I recommend to prefix it with <strong>c-</strong> before.
    `,children:[{Title:"Component options",content:`
          The <strong>ComponentOptions</strong> is the options for the component:

          <pre>
            <code class="language-typescript">{
  props: {
    attributeName: {
      type: Number&#124;String&#124;Boolean,
      default: 0 // default value
    }
  },
  styles: \`c-slider { color: red; }\`,
  plugins: [lenisPlugin()], // an array of plugins
  shadow: false // activate shadow DOM
}</code>
          </pre>
        `},{Title:"Setup function",content:`
          The <strong>SetupFunction</strong> is run only once on mount and should return a function that return a template string.

          <pre>
            <code class="language-typescript">({ host, props, state, actions, refs, link }) => {
  link('name', 'name)
  host.setState('date', new Date())

  actions.onMouseEnter = () => {
    console.log('mouseEnter')
  }

  return () => \`
    &lt;div
      ref="container"
      on:mouseEnter="onMouseEnter"
    &gt;
      Hi \${props.name}, it&apos;s actually \${state.date}
    &lt;/div&gt;
  \`;
}</code>
          </pre>

          <strong>host</strong> is the component itself, it got those methods:
          <br />
          <br />

          <table class="doc-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>host.setState(partial)</strong></td>
                <td>Update state + full re-render</td>
              </tr>
              <tr>
                <td><strong>host.updateState(partial)</strong></td>
                <td>Update state, effects only (no re-render)</td>
              </tr>
              <tr>
                <td><strong>host.setProps(partial)</strong></td>
                <td>Update props programmatically</td>
              </tr>
              <tr>
                <td><strong>host.scheduleUpdate()	</strong></td>
                <td>Schedule effects on next RAF</td>
              </tr>
              <tr>
                <td><strong>host.update(fullRender)</strong></td>
                <td>Force update (full or partial)</td>
              </tr>
              <tr>
                <td><strong>host.forceRender()</strong></td>
                <td>Force re-render even if template unchanged</td>
              </tr>
              <tr>
                <td><strong>host.destroy()</strong></td>
                <td>Clean up and run destroy callbacks</td>
              </tr>
              <tr>
                <td><strong>host.remove()</strong></td>
                <td>Remove the component from the DOM</td>
              </tr>
            </tbody>
          </table>
        `},{Title:"Templating",content:`
          Inside your setup function, you can return a function that uses template literals for HTML generation.

          <br />
          <br />
          <p class="sub-title-small">
            Basic Example
          </p>

          <pre>
            <code class="language-typescript">() => {
  return () => \`
    &lt;div&gt;
      &lt;h2&gt;Hello, \${props.name}!&lt;/h2&gt;
    &lt;/div&gt;
  \`;
}</code>
          </pre>

          <p class="sub-title-small">
            Dynamic Content
          </p>
          <br />

          Interpolation with <strong>\${...}</strong> gives you access to state, props, or anything in closure:

          <pre>
          <code class="language-typescript">() => {
  return () => \`
    &lt;ul&gt;
      \${state.items.map((item) => \`
        &lt;li&gt;\${item.title}&lt;/li&gt;
      \`).join('')}
    &lt;/ul&gt;
  \`;
}</code>
          </pre>

          <p class="sub-title-small">
            Event Handlers
          </p>
          <br />

          Use <strong>on:eventName="handler"</strong> to bind events, where <strong>handler</strong> is a function from your <strong>actions</strong> object or setup context:

          <pre>
            <code class="language-typescript">({ actions }) => {
  actions.addThing = () => console.log('addThing');
  return () => \`
    &lt;button on:click="addThing"&gt;Add thing&lt;/button&gt;
  \`;
}</code>
          </pre>

          Arrow functions or direct expressions are not supported; you must use named action references.

          <br />
          <br />
          <p class="sub-title-small">
            Referencing DOM Elements
          </p>
          <br />

          Use the <strong>ref</strong> attribute to assign references:

          <pre>
            <code class="language-typescript">({ onMount, refs }) => {
  onMount(() => console.log(refs.inputElement))
  return () => \`
    &lt;input ref="inputElement" type="text"&gt&lt;/input&gt
  \`;
}</code>
          </pre>

          You can then access the element as <strong>refs.inputElement</strong> in your setup code or methods.

          <br />
          <br />
          <p class="sub-title-small">
            Bindings
          </p>
          <br />

          Bindings let you connect the value of a DOM property or attribute to your component's state or props, making the element update reactively when the state changes, and optionally syncing changes back to your state.
          <br />
          <br />
          <strong>Supported Bindings:</strong>
          <br />
          <br />

          <div class="ml-4">
            <strong>bind:text="stateKey"</strong> - Binds textContent<br />
            <strong>bind:html="stateKey"</strong> - Binds innerHTML<br />
            <strong>bind:value="stateKey"</strong> — Binds the value property<br />
            <strong>bind:checked="isChecked"</strong> — Binds the checked property of checkbox/radio<br />
            <strong>bind:prop="key"</strong> — Generic property binding (any property, e.g. bind:min, bind:max)<br />
          </div>
          <br />

          <pre>
            <code class="language-typescript">({ state }) => {
  state.textValue = 'Hello, world!';
  state.htmlValue = \`&lt;strong&gt;Hello, world!&lt;/strong&gt;\`;
  state.isChecked = true;
  state.styleValue = \`background-color: red;\`;

  return () => \`
    &lt;p bind:text="textValue"&gt;&lt;/p&gt;
    &lt;p bind:html="htmlValue"&gt;&lt;/p&gt;
    &lt;input type="checkbox" bind:checked="isChecked"&gt;
    &lt;div bind:style="styleValue"&gt;&lt;/div&gt;
  \`;
}</code>
          </pre>
        `},{Title:"State & props",content:`
          <br />
          <p class="sub-title-small">
            State
          </p>
          <br />
          State is a plain object that belongs to your component instance. It is fully reactive and any time you update the state, your component can re-render or trigger effects.
          <br />
          <br />
          You can update state in two main ways:
          <br />
          <br />

          <div class="ml-4">
            <strong>host.setState(partial)</strong><br />
            Merges the partial state and triggers a full re-render.
            <br />
            <br />
            <strong>host.updateState(partial)</strong><br />
            Merges the partial state and only schedules effects/computed, but does NOT re-render the template.
            <br />
            <br />
          </div>

          <pre>
            <code class="language-typescript">// Initialize state in setup (no re-render)
state.count = 0;
state.status = 'idle';
            
// Initialize state in setup (optional)
host.setState({ count: 0, status: 'idle' });

// Update state & trigger re-render
actions.increment = () => {
  host.setState({ count: state.count + 1 });
};

// Only update state silently without re-render
host.updateState({ status: 'busy' });</code>
          </pre>
          State is always available via the <strong>state</strong> object you get in your setup function:
          <pre>
            <code class="language-typescript">({ state, host }) => {
  // Access current state values
  const current = state.count;
  // Set state
  host.setState({ count: current + 1 });
  // ...
};</code>
          </pre>

          <br />
          <p class="sub-title-small">
            Props
          </p>
          <br />
          Props are values passed into your custom element as attributes or via programmatic updates. You define prop types/defaults in <strong>props</strong> on the component options.
          <br />
          <br />
          Props are available as the <strong>props</strong> object in the setup function:
          <br />

          <pre>
            <code class="language-typescript">define(
  'c-my-component',
  {
    props: {
      value: { type: Number, default: 10 },
      label: { type: String, default: 'Untitled' },
    },
  },
  ({ props }) => {
    return () => \`
      &lt;p&gt;Value: \${props.value}&lt;/p&gt;
      <span>\${props.label}</span>
    \`;
  }
);</code>
          </pre>
          Props are always kept up to date with attribute changes, and updating props from the outside (or via <strong>host.setProps(...)</strong>) will trigger updates in your component.
          <br />
          <br />
          <strong>Two-way Binding:</strong>
          <br />
          <br />
          Scoped allows props <=> state syncing using the <strong>link</strong> helper:
          <br />
          <pre>
            <code class="language-typescript">({ link }) => {
  link('value', 'value'); // Binds prop 'value' with state 'value'
};</code>
          </pre>
          This makes sure that when <strong>props.value</strong> changes from outside, your state updates, and when you change <strong>state.value</strong>, the prop and attribute reflect if configured.
          <br />
          <br />
          <strong>Programmatic prop updates:</strong>
          <br />
          <br />
          You can also change props from inside or outside the component:
          <pre>
            <code class="language-typescript">host.setProps({ value: 42 });</code>
          </pre>
          This updates the prop, reflects it as an attribute if needed, and triggers all update lifecycle hooks.
          <br />
          <br />
          Props are also automatically parsed from their attribute string values into the appropriate type, based on your definition (Number, Boolean, etc.), so you always work with type-safe values in your setup and template logic.
          <br />
          <br />
          <strong>Setting large objects/arrays as props:</strong>
          <br />
          <br />
          You can set large objects/arrays as props by using the <strong>host.setProps(...)</strong> method:
          <pre>
            <code class="language-typescript">const component = document.querySelector('c-my-component');
component.setProps({ data: largeArray, config: complexObject });</code>
          </pre>
        `},{Title:"Effects",content:`
          Effects are functions that run in response to reactive changes and can be used for side effects, subscriptions, or manual cleanup logic within your components.
          <br />
          <pre>
            <code class="language-typescript">({ effect }) => {
  // Run on every render
  effect(() => console.log('Rendered'));

  // Run once (empty deps)
  effect(() => {
    const sub = api.subscribe();
    return () => sub.unsubscribe();
  }, []);

  // Run when deps change
  effect(
    (deps) => console.log('Count:', deps[0]),
    () => [state.count]
  );

  // Manual cleanup
  const cleanup = effect(() => {
    /* ... */
  });
  cleanup();
};</code>
          </pre>
        `},{Title:"Computed",content:`
          Computed values are memoized values used to derive data from state or props and automatically update when their dependencies change.
          <br />
          <br />
          <pre>
            <code class="language-typescript">({ computed }) => {
  const fullName = computed(
    () => \`\${state.firstName} \${state.lastName}\`, // getter
    () => [state.firstName, state.lastName] // dependencies
  );
  return () => \`&lt;p&gt;Name: \${fullName()}&lt;/p&gt;\`;
};</code>
          </pre>
        `},{Title:"Custom events",content:`
          Custom events are a way to communicate between components.
          <br />
          <br />
          <p class="sub-title-small">
            Emit
          </p>
          <br />
          To emit a custom event from your component, use <strong>emit(name, detail?)</strong>:
          <pre>
            <code class="language-typescript">({ emit }) => {
  emit('my-event', { message: 'Hello from the component!' });
};</code>
          </pre>
          Listening to custom events in parent:
          <pre>
            <code class="language-javascript">const component = document.querySelector('c-my-component');
component.addEventListener('my-event', (e) => {
  console.log('Received:', e.detail.message);
});</code>
          </pre>

          <br />
          <p class="sub-title-small">
            Listen
          </p>
          <br />
          You can use <strong>listen</strong> to subscribe to events on any EventTarget (automatically cleaned up on destroy):
          <pre>
            <code class="language-typescript">({ listen }) => {
  listen(window, 'my-event', (e) => {
    console.log('Received:', e.detail.message);
  });
};</code>
          </pre>
        `},{Title:"Event delegation",content:`
          <strong>delegate</strong> lets you efficiently handle events on descendants matching a selector:
          <br />
          <br />
          <pre>
            <code class="language-typescript">({ onMount, delegate }) => {
  onMount(() => {
    delegate('click', '.item', (e, target) => {
      console.log('Clicked item:', target.textContent);
      target.classList.toggle('active');
    });
  });

  return () => \`
    &lt;ul&gt;
      &lt;li class="item"&gt;Apple&lt;/li&gt;
      &lt;li class="item"&gt;Banana&lt;/li&gt;
      &lt;li class="item"&gt;Cherry&lt;/li&gt;
    &lt;/ul&gt;
  \`;
}</code>
          </pre>
        `},{Title:"Slots",content:`
          Slots allow you to render children inside your custom element, making it easy to compose interfaces or pass in dynamic content.
          <br />
          <br />
          <strong>Basic Usage</strong>
          <br />
          <br />
          By default, any child content placed inside your component tag will be rendered in the default slot:
          <pre>
            <code class="language-html">&lt;my-card&gt;
  &lt;h2 slot="title"&gt;Title goes here&lt;/h2&gt;
  &lt;p slot="description"&gt;Some description or content.&lt;/p&gt;
&lt;/my-card&gt;</code>
          </pre>
          In your component:
          <br />
          <pre>
            <code class="language-typescript">define('my-card', {}, () => {
  return () => \`
    &lt;aside&gt;&lt;slot name="title"&gt;&lt;/slot&gt;&lt;/aside&gt;
    &lt;main&gt;&lt;slot name="description"&gt;&lt;/slot&gt;&lt;/main&gt;
    &lt;slot&gt;&lt;/slot&gt;
  \`;
});</code>
          </pre>
        `},{Title:"Lifecycle ",content:`
          Lifecycle hooks let you run code at specific moments in the component's life, such as mount, update, or destruction.
          <br />
          <br />
          <table class="doc-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>onMount(cb)</strong></td>
                <td>After mount</td>
              </tr>
              <tr>
                <td><strong>onDestroy(cb)</strong></td>
                <td>On destroy</td>
              </tr>
            <tbody>
              <tr>
                <td><strong>onUpdate(cb)</strong></td>
                <td>After each update</td>
              </tr>
              <tr>
                <td><strong>onBeforeUpdate(cb)</strong></td>
                <td>Before each update</td>
              </tr>
              <tr>
                <td><strong>onFirstUpdate(cb)</strong></td>
                <td>Once, after first render</td>
              </tr>
              <tr>
                <td><strong>onPropsChanged(cb)</strong></td>
                <td>When props change</td>
              </tr>
            </tbody>
          </table>
        `}]},{Title:"Plugins",content:`
      Plugins are a way to extend the functionality of your component.
      <br />
      <br />
      <strong>Available Plugins:</strong>
      <br />
      <br />
      <div class="ml-4">
        <strong>lerpPlugin & springPlugin</strong> - Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by <a href="https://github.com/petit-kit/animate">@petit-kit/animate</a>. Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.
        <br />
        <br />
        <strong>morphPlugin</strong> - Provides idiomorph-based DOM morphing for efficient, non-destructive updates.
        <br />
        <br />
        <strong>devicePlugin</strong> - Detects and reacts to device and input type changes (e.g., pointer type, hover support).
        <br />
        <br />
        <strong>lenisPlugin</strong> - Integrates the <a href="https://github.com/studio-freight/lenis">Lenis</a> smooth scrolling library.
        <br />
        <br />
        <strong>timerPlugin</strong> - Adds easy interval, timeout, and requestAnimationFrame timers to your component logic.
        <br />
        <br />
        <strong>windowPlugin</strong> - Supplies window-level utilities such as window resize and scroll event listeners.
        <br />
        <br />
        <strong>inViewPlugin</strong> - Detects when an element is within the viewport and triggers handlers (uses IntersectionObserver).
        <br />
        <br />
        <strong>mousePlugin</strong> - Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity.
        <br />
        <br />
        <strong>pointerPlugin</strong> - Lerp mouse position
      </div>
      <br />
      <strong class="italic">⏲ Document is working in progress</strong>
      <br />
      <br />
      <br />
      <p class="sub-title-small">
        Usage Example:
      </p>
      <br />
      <pre>
        <code class="language-typescript">import { define } from '@petit-kit/scoped';
import { inViewPlugin, timerPlugin } from '@petit-kit/scoped/plugins';

define(
  'my-component',
  {
    plugins: [inViewPlugin(), timerPlugin()],
  },
  ({ inView, timer }) => {
    // Use provided plugin APIs in your setup function
    // ...
  }
);</code>
      </pre>
      All plugins are tree-shakeable—import only what you need.
      <br />
      <br />
      See each plugin's README for API docs, options, and usage examples.
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    `}];Pe("c-table-content",{},()=>()=>`
    <div class="flex flex-col gap-2 w-[180px] mt-5">
      ${ft.map(n=>`
        <div>
          <a href="#${n.Title}" class="hover:font-bold inline-block w-full">
            ${n.Title}
          </a>
          ${n.children?n.children.map(c=>`
            <div class="ml-5 mt-2">
              <a href="#${c.Title}" class="hover:font-bold inline-block w-full">
                ${c.Title}
              </a>
            </div>
          `).join(""):""}
        </div>
      `).join("")}
      </div>
    `);Pe("c-content",{},()=>{const n=ft.reduce((c,p)=>(c.push(p),p.children&&c.push(...p.children),c),[]);return()=>`
    <div class="max-w-[calc(100vw-20px)]">
      ${n.map(c=>`
        <div>
          <h2 class="sub-title" id="${c.Title}">${c.Title}</h2>
          <br />
          <div>${c.content}</div>
        </div>
      `).join("<br />")}
    </div>
  `});Pe("c-pointer",{plugins:[En()]},({state:n,onPointerMove:c,host:p,computed:l})=>{n.position={x:0,y:0},c(({x:T,y})=>{p.updateState({position:{x:T,y}})});const u=l(()=>`transform: translateX(${n.position.x}px);`),v=l(()=>`transform: translateY(${n.position.y}px);`),w=l(()=>`transform: translate(${n.position.x}px, ${n.position.y}px);`);return()=>`
    <div class="fixed w-screen h-screen pointer-events-none">
      <div
        class="absolute w-px h-screen bg-black rounded-full opacity-5" bind:style="${u}"></div>
      <div
        class="absolute w-screen h-px bg-black rounded-full opacity-5" bind:style="${v}"></div>
      <div
        class="absolute w-2 h-2 -ml-1 -mt-1 bg-[#BF5735] rounded-full" bind:style="${w}"></div>
    </div>
  `});function wn(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ke,ht;function An(){if(ht)return Ke;ht=1;function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(a=>{const f=e[a],k=typeof f;(k==="object"||k==="function")&&!Object.isFrozen(f)&&n(f)}),e}class c{constructor(a){a.data===void 0&&(a.data={}),this.data=a.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function p(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function l(e,...a){const f=Object.create(null);for(const k in e)f[k]=e[k];return a.forEach(function(k){for(const G in k)f[G]=k[G]}),f}const u="</span>",v=e=>!!e.scope,w=(e,{prefix:a})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const f=e.split(".");return[`${a}${f.shift()}`,...f.map((k,G)=>`${k}${"_".repeat(G+1)}`)].join(" ")}return`${a}${e}`};class T{constructor(a,f){this.buffer="",this.classPrefix=f.classPrefix,a.walk(this)}addText(a){this.buffer+=p(a)}openNode(a){if(!v(a))return;const f=w(a.scope,{prefix:this.classPrefix});this.span(f)}closeNode(a){v(a)&&(this.buffer+=u)}value(){return this.buffer}span(a){this.buffer+=`<span class="${a}">`}}const y=(e={})=>{const a={children:[]};return Object.assign(a,e),a};class I{constructor(){this.rootNode=y(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(a){this.top.children.push(a)}openNode(a){const f=y({scope:a});this.add(f),this.stack.push(f)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(a){return this.constructor._walk(a,this.rootNode)}static _walk(a,f){return typeof f=="string"?a.addText(f):f.children&&(a.openNode(f),f.children.forEach(k=>this._walk(a,k)),a.closeNode(f)),a}static _collapse(a){typeof a!="string"&&a.children&&(a.children.every(f=>typeof f=="string")?a.children=[a.children.join("")]:a.children.forEach(f=>{I._collapse(f)}))}}class h extends I{constructor(a){super(),this.options=a}addText(a){a!==""&&this.add(a)}startScope(a){this.openNode(a)}endScope(){this.closeNode()}__addSublanguage(a,f){const k=a.root;f&&(k.scope=`language:${f}`),this.add(k)}toHTML(){return new T(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function r(e){return e?typeof e=="string"?e:e.source:null}function t(e){return o("(?=",e,")")}function s(e){return o("(?:",e,")*")}function i(e){return o("(?:",e,")?")}function o(...e){return e.map(f=>r(f)).join("")}function g(e){const a=e[e.length-1];return typeof a=="object"&&a.constructor===Object?(e.splice(e.length-1,1),a):{}}function A(...e){return"("+(g(e).capture?"":"?:")+e.map(k=>r(k)).join("|")+")"}function b(e){return new RegExp(e.toString()+"|").exec("").length-1}function M(e,a){const f=e&&e.exec(a);return f&&f.index===0}const x=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function B(e,{joinWith:a}){let f=0;return e.map(k=>{f+=1;const G=f;let K=r(k),S="";for(;K.length>0;){const E=x.exec(K);if(!E){S+=K;break}S+=K.substring(0,E.index),K=K.substring(E.index+E[0].length),E[0][0]==="\\"&&E[1]?S+="\\"+String(Number(E[1])+G):(S+=E[0],E[0]==="("&&f++)}return S}).map(k=>`(${k})`).join(a)}const P=/\b\B/,_="[a-zA-Z]\\w*",L="[a-zA-Z_]\\w*",X="\\b\\d+(\\.\\d+)?",te="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",j="\\b(0b[01]+)",de="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",fe=(e={})=>{const a=/^#![ ]*\//;return e.binary&&(e.begin=o(a,/.*\b/,e.binary,/\b.*/)),l({scope:"meta",begin:a,end:/$/,relevance:0,"on:begin":(f,k)=>{f.index!==0&&k.ignoreMatch()}},e)},ce={begin:"\\\\[\\s\\S]",relevance:0},we={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ce]},be={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ce]},Ae={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},U=function(e,a,f={}){const k=l({scope:"comment",begin:e,end:a,contains:[]},f);k.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const G=A("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return k.contains.push({begin:o(/[ ]+/,"(",G,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),k},ee=U("//","$"),ne=U("/\\*","\\*/"),re=U("#","$"),le={scope:"number",begin:X,relevance:0},me={scope:"number",begin:te,relevance:0},Tt={scope:"number",begin:j,relevance:0},Mt={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ce,{begin:/\[/,end:/\]/,relevance:0,contains:[ce]}]},Ot={scope:"title",begin:_,relevance:0},xt={scope:"title",begin:L,relevance:0},Rt={begin:"\\.\\s*"+L,relevance:0};var Oe=Object.freeze({__proto__:null,APOS_STRING_MODE:we,BACKSLASH_ESCAPE:ce,BINARY_NUMBER_MODE:Tt,BINARY_NUMBER_RE:j,COMMENT:U,C_BLOCK_COMMENT_MODE:ne,C_LINE_COMMENT_MODE:ee,C_NUMBER_MODE:me,C_NUMBER_RE:te,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(a,f)=>{f.data._beginMatch=a[1]},"on:end":(a,f)=>{f.data._beginMatch!==a[1]&&f.ignoreMatch()}})},HASH_COMMENT_MODE:re,IDENT_RE:_,MATCH_NOTHING_RE:P,METHOD_GUARD:Rt,NUMBER_MODE:le,NUMBER_RE:X,PHRASAL_WORDS_MODE:Ae,QUOTE_STRING_MODE:be,REGEXP_MODE:Mt,RE_STARTERS_RE:de,SHEBANG:fe,TITLE_MODE:Ot,UNDERSCORE_IDENT_RE:L,UNDERSCORE_TITLE_MODE:xt});function It(e,a){e.input[e.index-1]==="."&&a.ignoreMatch()}function kt(e,a){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Ct(e,a){a&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=It,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Lt(e,a){Array.isArray(e.illegal)&&(e.illegal=A(...e.illegal))}function Dt(e,a){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Bt(e,a){e.relevance===void 0&&(e.relevance=1)}const Pt=(e,a)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const f=Object.assign({},e);Object.keys(e).forEach(k=>{delete e[k]}),e.keywords=f.keywords,e.begin=o(f.beforeMatch,t(f.begin)),e.starts={relevance:0,contains:[Object.assign(f,{endsParent:!0})]},e.relevance=0,delete f.beforeMatch},$t=["of","and","for","in","not","or","if","then","parent","list","value"],Ut="keyword";function Ze(e,a,f=Ut){const k=Object.create(null);return typeof e=="string"?G(f,e.split(" ")):Array.isArray(e)?G(f,e):Object.keys(e).forEach(function(K){Object.assign(k,Ze(e[K],a,K))}),k;function G(K,S){a&&(S=S.map(E=>E.toLowerCase())),S.forEach(function(E){const R=E.split("|");k[R[0]]=[K,Ht(R[0],R[1])]})}}function Ht(e,a){return a?Number(a):jt(e)?0:1}function jt(e){return $t.includes(e.toLowerCase())}const We={},ye=e=>{console.error(e)},Ye=(e,...a)=>{console.log(`WARN: ${e}`,...a)},ve=(e,a)=>{We[`${e}/${a}`]||(console.log(`Deprecated as of ${e}. ${a}`),We[`${e}/${a}`]=!0)},xe=new Error;function Xe(e,a,{key:f}){let k=0;const G=e[f],K={},S={};for(let E=1;E<=a.length;E++)S[E+k]=G[E],K[E+k]=!0,k+=b(a[E-1]);e[f]=S,e[f]._emit=K,e[f]._multi=!0}function zt(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ye("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),xe;if(typeof e.beginScope!="object"||e.beginScope===null)throw ye("beginScope must be object"),xe;Xe(e,e.begin,{key:"beginScope"}),e.begin=B(e.begin,{joinWith:""})}}function Ft(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ye("skip, excludeEnd, returnEnd not compatible with endScope: {}"),xe;if(typeof e.endScope!="object"||e.endScope===null)throw ye("endScope must be object"),xe;Xe(e,e.end,{key:"endScope"}),e.end=B(e.end,{joinWith:""})}}function Gt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Kt(e){Gt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),zt(e),Ft(e)}function Zt(e){function a(S,E){return new RegExp(r(S),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(E?"g":""))}class f{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(E,R){R.position=this.position++,this.matchIndexes[this.matchAt]=R,this.regexes.push([R,E]),this.matchAt+=b(E)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const E=this.regexes.map(R=>R[1]);this.matcherRe=a(B(E,{joinWith:"|"}),!0),this.lastIndex=0}exec(E){this.matcherRe.lastIndex=this.lastIndex;const R=this.matcherRe.exec(E);if(!R)return null;const Y=R.findIndex((Ne,Ue)=>Ue>0&&Ne!==void 0),Z=this.matchIndexes[Y];return R.splice(0,Y),Object.assign(R,Z)}}class k{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(E){if(this.multiRegexes[E])return this.multiRegexes[E];const R=new f;return this.rules.slice(E).forEach(([Y,Z])=>R.addRule(Y,Z)),R.compile(),this.multiRegexes[E]=R,R}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(E,R){this.rules.push([E,R]),R.type==="begin"&&this.count++}exec(E){const R=this.getMatcher(this.regexIndex);R.lastIndex=this.lastIndex;let Y=R.exec(E);if(this.resumingScanAtSamePosition()&&!(Y&&Y.index===this.lastIndex)){const Z=this.getMatcher(0);Z.lastIndex=this.lastIndex+1,Y=Z.exec(E)}return Y&&(this.regexIndex+=Y.position+1,this.regexIndex===this.count&&this.considerAll()),Y}}function G(S){const E=new k;return S.contains.forEach(R=>E.addRule(R.begin,{rule:R,type:"begin"})),S.terminatorEnd&&E.addRule(S.terminatorEnd,{type:"end"}),S.illegal&&E.addRule(S.illegal,{type:"illegal"}),E}function K(S,E){const R=S;if(S.isCompiled)return R;[kt,Dt,Kt,Pt].forEach(Z=>Z(S,E)),e.compilerExtensions.forEach(Z=>Z(S,E)),S.__beforeBegin=null,[Ct,Lt,Bt].forEach(Z=>Z(S,E)),S.isCompiled=!0;let Y=null;return typeof S.keywords=="object"&&S.keywords.$pattern&&(S.keywords=Object.assign({},S.keywords),Y=S.keywords.$pattern,delete S.keywords.$pattern),Y=Y||/\w+/,S.keywords&&(S.keywords=Ze(S.keywords,e.case_insensitive)),R.keywordPatternRe=a(Y,!0),E&&(S.begin||(S.begin=/\B|\b/),R.beginRe=a(R.begin),!S.end&&!S.endsWithParent&&(S.end=/\B|\b/),S.end&&(R.endRe=a(R.end)),R.terminatorEnd=r(R.end)||"",S.endsWithParent&&E.terminatorEnd&&(R.terminatorEnd+=(S.end?"|":"")+E.terminatorEnd)),S.illegal&&(R.illegalRe=a(S.illegal)),S.contains||(S.contains=[]),S.contains=[].concat(...S.contains.map(function(Z){return Wt(Z==="self"?S:Z)})),S.contains.forEach(function(Z){K(Z,R)}),S.starts&&K(S.starts,E),R.matcher=G(R),R}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=l(e.classNameAliases||{}),K(e)}function qe(e){return e?e.endsWithParent||qe(e.starts):!1}function Wt(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(a){return l(e,{variants:null},a)})),e.cachedVariants?e.cachedVariants:qe(e)?l(e,{starts:e.starts?l(e.starts):null}):Object.isFrozen(e)?l(e):e}var Yt="11.11.1";class Xt extends Error{constructor(a,f){super(a),this.name="HTMLInjectionError",this.html=f}}const $e=p,Ve=l,Je=Symbol("nomatch"),qt=7,Qe=function(e){const a=Object.create(null),f=Object.create(null),k=[];let G=!0;const K="Could not find the language '{}', did you forget to load/include a language module?",S={disableAutodetect:!0,name:"Plain text",contains:[]};let E={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:h};function R(d){return E.noHighlightRe.test(d)}function Y(d){let O=d.className+" ";O+=d.parentNode?d.parentNode.className:"";const $=E.languageDetectRe.exec(O);if($){const z=ge($[1]);return z||(Ye(K.replace("{}",$[1])),Ye("Falling back to no-highlight mode for this block.",d)),z?$[1]:"no-highlight"}return O.split(/\s+/).find(z=>R(z)||ge(z))}function Z(d,O,$){let z="",W="";typeof O=="object"?(z=d,$=O.ignoreIllegals,W=O.language):(ve("10.7.0","highlight(lang, code, ...args) has been deprecated."),ve("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),W=d,z=O),$===void 0&&($=!0);const ie={code:z,language:W};Ie("before:highlight",ie);const he=ie.result?ie.result:Ne(ie.language,ie.code,$);return he.code=ie.code,Ie("after:highlight",he),he}function Ne(d,O,$,z){const W=Object.create(null);function ie(m,N){return m.keywords[N]}function he(){if(!C.keywords){q.addText(F);return}let m=0;C.keywordPatternRe.lastIndex=0;let N=C.keywordPatternRe.exec(F),D="";for(;N;){D+=F.substring(m,N.index);const H=ae.case_insensitive?N[0].toLowerCase():N[0],Q=ie(C,H);if(Q){const[ue,pn]=Q;if(q.addText(D),D="",W[H]=(W[H]||0)+1,W[H]<=qt&&(Le+=pn),ue.startsWith("_"))D+=N[0];else{const fn=ae.classNameAliases[ue]||ue;oe(N[0],fn)}}else D+=N[0];m=C.keywordPatternRe.lastIndex,N=C.keywordPatternRe.exec(F)}D+=F.substring(m),q.addText(D)}function ke(){if(F==="")return;let m=null;if(typeof C.subLanguage=="string"){if(!a[C.subLanguage]){q.addText(F);return}m=Ne(C.subLanguage,F,!0,at[C.subLanguage]),at[C.subLanguage]=m._top}else m=He(F,C.subLanguage.length?C.subLanguage:null);C.relevance>0&&(Le+=m.relevance),q.__addSublanguage(m._emitter,m.language)}function se(){C.subLanguage!=null?ke():he(),F=""}function oe(m,N){m!==""&&(q.startScope(N),q.addText(m),q.endScope())}function st(m,N){let D=1;const H=N.length-1;for(;D<=H;){if(!m._emit[D]){D++;continue}const Q=ae.classNameAliases[m[D]]||m[D],ue=N[D];Q?oe(ue,Q):(F=ue,he(),F=""),D++}}function rt(m,N){return m.scope&&typeof m.scope=="string"&&q.openNode(ae.classNameAliases[m.scope]||m.scope),m.beginScope&&(m.beginScope._wrap?(oe(F,ae.classNameAliases[m.beginScope._wrap]||m.beginScope._wrap),F=""):m.beginScope._multi&&(st(m.beginScope,N),F="")),C=Object.create(m,{parent:{value:C}}),C}function it(m,N,D){let H=M(m.endRe,D);if(H){if(m["on:end"]){const Q=new c(m);m["on:end"](N,Q),Q.isMatchIgnored&&(H=!1)}if(H){for(;m.endsParent&&m.parent;)m=m.parent;return m}}if(m.endsWithParent)return it(m.parent,N,D)}function ln(m){return C.matcher.regexIndex===0?(F+=m[0],1):(Ge=!0,0)}function un(m){const N=m[0],D=m.rule,H=new c(D),Q=[D.__beforeBegin,D["on:begin"]];for(const ue of Q)if(ue&&(ue(m,H),H.isMatchIgnored))return ln(N);return D.skip?F+=N:(D.excludeBegin&&(F+=N),se(),!D.returnBegin&&!D.excludeBegin&&(F=N)),rt(D,m),D.returnBegin?0:N.length}function dn(m){const N=m[0],D=O.substring(m.index),H=it(C,m,D);if(!H)return Je;const Q=C;C.endScope&&C.endScope._wrap?(se(),oe(N,C.endScope._wrap)):C.endScope&&C.endScope._multi?(se(),st(C.endScope,m)):Q.skip?F+=N:(Q.returnEnd||Q.excludeEnd||(F+=N),se(),Q.excludeEnd&&(F=N));do C.scope&&q.closeNode(),!C.skip&&!C.subLanguage&&(Le+=C.relevance),C=C.parent;while(C!==H.parent);return H.starts&&rt(H.starts,m),Q.returnEnd?0:N.length}function gn(){const m=[];for(let N=C;N!==ae;N=N.parent)N.scope&&m.unshift(N.scope);m.forEach(N=>q.openNode(N))}let Ce={};function ot(m,N){const D=N&&N[0];if(F+=m,D==null)return se(),0;if(Ce.type==="begin"&&N.type==="end"&&Ce.index===N.index&&D===""){if(F+=O.slice(N.index,N.index+1),!G){const H=new Error(`0 width match regex (${d})`);throw H.languageName=d,H.badRule=Ce.rule,H}return 1}if(Ce=N,N.type==="begin")return un(N);if(N.type==="illegal"&&!$){const H=new Error('Illegal lexeme "'+D+'" for mode "'+(C.scope||"<unnamed>")+'"');throw H.mode=C,H}else if(N.type==="end"){const H=dn(N);if(H!==Je)return H}if(N.type==="illegal"&&D==="")return F+=`
`,1;if(Fe>1e5&&Fe>N.index*3)throw new Error("potential infinite loop, way more iterations than matches");return F+=D,D.length}const ae=ge(d);if(!ae)throw ye(K.replace("{}",d)),new Error('Unknown language: "'+d+'"');const hn=Zt(ae);let ze="",C=z||hn;const at={},q=new E.__emitter(E);gn();let F="",Le=0,Ee=0,Fe=0,Ge=!1;try{if(ae.__emitTokens)ae.__emitTokens(O,q);else{for(C.matcher.considerAll();;){Fe++,Ge?Ge=!1:C.matcher.considerAll(),C.matcher.lastIndex=Ee;const m=C.matcher.exec(O);if(!m)break;const N=O.substring(Ee,m.index),D=ot(N,m);Ee=m.index+D}ot(O.substring(Ee))}return q.finalize(),ze=q.toHTML(),{language:d,value:ze,relevance:Le,illegal:!1,_emitter:q,_top:C}}catch(m){if(m.message&&m.message.includes("Illegal"))return{language:d,value:$e(O),illegal:!0,relevance:0,_illegalBy:{message:m.message,index:Ee,context:O.slice(Ee-100,Ee+100),mode:m.mode,resultSoFar:ze},_emitter:q};if(G)return{language:d,value:$e(O),illegal:!1,relevance:0,errorRaised:m,_emitter:q,_top:C};throw m}}function Ue(d){const O={value:$e(d),illegal:!1,relevance:0,_top:S,_emitter:new E.__emitter(E)};return O._emitter.addText(d),O}function He(d,O){O=O||E.languages||Object.keys(a);const $=Ue(d),z=O.filter(ge).filter(nt).map(se=>Ne(se,d,!1));z.unshift($);const W=z.sort((se,oe)=>{if(se.relevance!==oe.relevance)return oe.relevance-se.relevance;if(se.language&&oe.language){if(ge(se.language).supersetOf===oe.language)return 1;if(ge(oe.language).supersetOf===se.language)return-1}return 0}),[ie,he]=W,ke=ie;return ke.secondBest=he,ke}function Vt(d,O,$){const z=O&&f[O]||$;d.classList.add("hljs"),d.classList.add(`language-${z}`)}function je(d){let O=null;const $=Y(d);if(R($))return;if(Ie("before:highlightElement",{el:d,language:$}),d.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",d);return}if(d.children.length>0&&(E.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(d)),E.throwUnescapedHTML))throw new Xt("One of your code blocks includes unescaped HTML.",d.innerHTML);O=d;const z=O.textContent,W=$?Z(z,{language:$,ignoreIllegals:!0}):He(z);d.innerHTML=W.value,d.dataset.highlighted="yes",Vt(d,$,W.language),d.result={language:W.language,re:W.relevance,relevance:W.relevance},W.secondBest&&(d.secondBest={language:W.secondBest.language,relevance:W.secondBest.relevance}),Ie("after:highlightElement",{el:d,result:W,text:z})}function Jt(d){E=Ve(E,d)}const Qt=()=>{Re(),ve("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function en(){Re(),ve("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let et=!1;function Re(){function d(){Re()}if(document.readyState==="loading"){et||window.addEventListener("DOMContentLoaded",d,!1),et=!0;return}document.querySelectorAll(E.cssSelector).forEach(je)}function tn(d,O){let $=null;try{$=O(e)}catch(z){if(ye("Language definition for '{}' could not be registered.".replace("{}",d)),G)ye(z);else throw z;$=S}$.name||($.name=d),a[d]=$,$.rawDefinition=O.bind(null,e),$.aliases&&tt($.aliases,{languageName:d})}function nn(d){delete a[d];for(const O of Object.keys(f))f[O]===d&&delete f[O]}function sn(){return Object.keys(a)}function ge(d){return d=(d||"").toLowerCase(),a[d]||a[f[d]]}function tt(d,{languageName:O}){typeof d=="string"&&(d=[d]),d.forEach($=>{f[$.toLowerCase()]=O})}function nt(d){const O=ge(d);return O&&!O.disableAutodetect}function rn(d){d["before:highlightBlock"]&&!d["before:highlightElement"]&&(d["before:highlightElement"]=O=>{d["before:highlightBlock"](Object.assign({block:O.el},O))}),d["after:highlightBlock"]&&!d["after:highlightElement"]&&(d["after:highlightElement"]=O=>{d["after:highlightBlock"](Object.assign({block:O.el},O))})}function on(d){rn(d),k.push(d)}function an(d){const O=k.indexOf(d);O!==-1&&k.splice(O,1)}function Ie(d,O){const $=d;k.forEach(function(z){z[$]&&z[$](O)})}function cn(d){return ve("10.7.0","highlightBlock will be removed entirely in v12.0"),ve("10.7.0","Please use highlightElement now."),je(d)}Object.assign(e,{highlight:Z,highlightAuto:He,highlightAll:Re,highlightElement:je,highlightBlock:cn,configure:Jt,initHighlighting:Qt,initHighlightingOnLoad:en,registerLanguage:tn,unregisterLanguage:nn,listLanguages:sn,getLanguage:ge,registerAliases:tt,autoDetection:nt,inherit:Ve,addPlugin:on,removePlugin:an}),e.debugMode=function(){G=!1},e.safeMode=function(){G=!0},e.versionString=Yt,e.regex={concat:o,lookahead:t,either:A,optional:i,anyNumberOfTimes:s};for(const d in Oe)typeof Oe[d]=="object"&&n(Oe[d]);return Object.assign(e,Oe),e},_e=Qe({});return _e.newInstance=()=>Qe({}),Ke=_e,_e.HighlightJS=_e,_e.default=_e,Ke}var Nn=An();const Se=wn(Nn),Be="[A-Za-z$_][0-9A-Za-z$_]*",bt=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],mt=["true","false","null","undefined","NaN","Infinity"],yt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Et=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],vt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],_t=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],St=[].concat(vt,yt,Et);function Tn(n){const c=n.regex,p=(U,{after:ee})=>{const ne="</"+U[0].slice(1);return U.input.indexOf(ne,ee)!==-1},l=Be,u={begin:"<>",end:"</>"},v=/<[A-Za-z0-9\\._:-]+\s*\/>/,w={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(U,ee)=>{const ne=U[0].length+U.index,re=U.input[ne];if(re==="<"||re===","){ee.ignoreMatch();return}re===">"&&(p(U,{after:ne})||ee.ignoreMatch());let le;const me=U.input.substring(ne);if(le=me.match(/^\s*=/)){ee.ignoreMatch();return}if((le=me.match(/^\s+extends\s+/))&&le.index===0){ee.ignoreMatch();return}}},T={$pattern:Be,keyword:bt,literal:mt,built_in:St,"variable.language":_t},y="[0-9](_?[0-9])*",I=`\\.(${y})`,h="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",r={className:"number",variants:[{begin:`(\\b(${h})((${I})|\\.)?|(${I}))[eE][+-]?(${y})\\b`},{begin:`\\b(${h})\\b((${I})\\b|\\.)?|(${I})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},t={className:"subst",begin:"\\$\\{",end:"\\}",keywords:T,contains:[]},s={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"xml"}},i={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"css"}},o={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[n.BACKSLASH_ESCAPE,t]},b={className:"comment",variants:[n.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:l+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),n.C_BLOCK_COMMENT_MODE,n.C_LINE_COMMENT_MODE]},M=[n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,g,{match:/\$\d+/},r];t.contains=M.concat({begin:/\{/,end:/\}/,keywords:T,contains:["self"].concat(M)});const x=[].concat(b,t.contains),B=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:T,contains:["self"].concat(x)}]),P={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:T,contains:B},_={variants:[{match:[/class/,/\s+/,l,/\s+/,/extends/,/\s+/,c.concat(l,"(",c.concat(/\./,l),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,l],scope:{1:"keyword",3:"title.class"}}]},L={relevance:0,match:c.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...yt,...Et]}},X={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},te={variants:[{match:[/function/,/\s+/,l,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},j={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function de(U){return c.concat("(?!",U.join("|"),")")}const fe={match:c.concat(/\b/,de([...vt,"super","import"].map(U=>`${U}\\s*\\(`)),l,c.lookahead(/\s*\(/)),className:"title.function",relevance:0},ce={begin:c.concat(/\./,c.lookahead(c.concat(l,/(?![0-9A-Za-z$_(])/))),end:l,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},we={match:[/get|set/,/\s+/,l,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},be="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+n.UNDERSCORE_IDENT_RE+")\\s*=>",Ae={match:[/const|var|let/,/\s+/,l,/\s*/,/=\s*/,/(async\s*)?/,c.lookahead(be)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:T,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:L},illegal:/#(?![$_A-z])/,contains:[n.SHEBANG({label:"shebang",binary:"node",relevance:5}),X,n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,g,b,{match:/\$\d+/},r,L,{scope:"attr",match:l+c.lookahead(":"),relevance:0},Ae,{begin:"("+n.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[b,n.REGEXP_MODE,{className:"function",begin:be,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:T,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:u.begin,end:u.end},{match:v},{begin:w.begin,"on:begin":w.isTrulyOpeningTag,end:w.end}],subLanguage:"xml",contains:[{begin:w.begin,end:w.end,skip:!0,contains:["self"]}]}]},te,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+n.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,n.inherit(n.TITLE_MODE,{begin:l,className:"title.function"})]},{match:/\.\.\./,relevance:0},ce,{match:"\\$"+l,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},fe,j,_,we,{match:/\$[(.]/}]}}function Mn(n){const c=n.regex,p=Tn(n),l=Be,u=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],v={begin:[/namespace/,/\s+/,n.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},w={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:u},contains:[p.exports.CLASS_REFERENCE]},T={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},y=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],I={$pattern:Be,keyword:bt.concat(y),literal:mt,built_in:St.concat(u),"variable.language":_t},h={className:"meta",begin:"@"+l},r=(o,g,A)=>{const b=o.contains.findIndex(M=>M.label===g);if(b===-1)throw new Error("can not find mode to replace");o.contains.splice(b,1,A)};Object.assign(p.keywords,I),p.exports.PARAMS_CONTAINS.push(h);const t=p.contains.find(o=>o.scope==="attr"),s=Object.assign({},t,{match:c.concat(l,c.lookahead(/\s*\?:/))});p.exports.PARAMS_CONTAINS.push([p.exports.CLASS_REFERENCE,t,s]),p.contains=p.contains.concat([h,v,w,s]),r(p,"shebang",n.SHEBANG()),r(p,"use_strict",T);const i=p.contains.find(o=>o.label==="func.def");return i.relevance=0,Object.assign(p,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),p}function On(n){const c=n.regex,p={},l={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[p]}]};Object.assign(p,{className:"variable",variants:[{begin:c.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},l]});const u={className:"subst",begin:/\$\(/,end:/\)/,contains:[n.BACKSLASH_ESCAPE]},v=n.inherit(n.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),w={begin:/<<-?\s*(?=\w+)/,starts:{contains:[n.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},T={className:"string",begin:/"/,end:/"/,contains:[n.BACKSLASH_ESCAPE,p,u]};u.contains.push(T);const y={match:/\\"/},I={className:"string",begin:/'/,end:/'/},h={match:/\\'/},r={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},n.NUMBER_MODE,p]},t=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],s=n.SHEBANG({binary:`(${t.join("|")})`,relevance:10}),i={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[n.inherit(n.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},o=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],g=["true","false"],A={match:/(\/[a-z._-]+)+/},b=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],M=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],x=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],B=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:o,literal:g,built_in:[...b,...M,"set","shopt",...x,...B]},contains:[s,n.SHEBANG(),i,r,v,w,A,T,y,I,h,p]}}const pt="[A-Za-z$_][0-9A-Za-z$_]*",xn=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Rn=["true","false","null","undefined","NaN","Infinity"],wt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],At=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Nt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],In=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],kn=[].concat(Nt,wt,At);function Cn(n){const c=n.regex,p=(U,{after:ee})=>{const ne="</"+U[0].slice(1);return U.input.indexOf(ne,ee)!==-1},l=pt,u={begin:"<>",end:"</>"},v=/<[A-Za-z0-9\\._:-]+\s*\/>/,w={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(U,ee)=>{const ne=U[0].length+U.index,re=U.input[ne];if(re==="<"||re===","){ee.ignoreMatch();return}re===">"&&(p(U,{after:ne})||ee.ignoreMatch());let le;const me=U.input.substring(ne);if(le=me.match(/^\s*=/)){ee.ignoreMatch();return}if((le=me.match(/^\s+extends\s+/))&&le.index===0){ee.ignoreMatch();return}}},T={$pattern:pt,keyword:xn,literal:Rn,built_in:kn,"variable.language":In},y="[0-9](_?[0-9])*",I=`\\.(${y})`,h="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",r={className:"number",variants:[{begin:`(\\b(${h})((${I})|\\.)?|(${I}))[eE][+-]?(${y})\\b`},{begin:`\\b(${h})\\b((${I})\\b|\\.)?|(${I})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},t={className:"subst",begin:"\\$\\{",end:"\\}",keywords:T,contains:[]},s={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"xml"}},i={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"css"}},o={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[n.BACKSLASH_ESCAPE,t]},b={className:"comment",variants:[n.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:l+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),n.C_BLOCK_COMMENT_MODE,n.C_LINE_COMMENT_MODE]},M=[n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,g,{match:/\$\d+/},r];t.contains=M.concat({begin:/\{/,end:/\}/,keywords:T,contains:["self"].concat(M)});const x=[].concat(b,t.contains),B=x.concat([{begin:/(\s*)\(/,end:/\)/,keywords:T,contains:["self"].concat(x)}]),P={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:T,contains:B},_={variants:[{match:[/class/,/\s+/,l,/\s+/,/extends/,/\s+/,c.concat(l,"(",c.concat(/\./,l),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,l],scope:{1:"keyword",3:"title.class"}}]},L={relevance:0,match:c.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...wt,...At]}},X={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},te={variants:[{match:[/function/,/\s+/,l,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},j={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function de(U){return c.concat("(?!",U.join("|"),")")}const fe={match:c.concat(/\b/,de([...Nt,"super","import"].map(U=>`${U}\\s*\\(`)),l,c.lookahead(/\s*\(/)),className:"title.function",relevance:0},ce={begin:c.concat(/\./,c.lookahead(c.concat(l,/(?![0-9A-Za-z$_(])/))),end:l,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},we={match:[/get|set/,/\s+/,l,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},be="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+n.UNDERSCORE_IDENT_RE+")\\s*=>",Ae={match:[/const|var|let/,/\s+/,l,/\s*/,/=\s*/,/(async\s*)?/,c.lookahead(be)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:T,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:L},illegal:/#(?![$_A-z])/,contains:[n.SHEBANG({label:"shebang",binary:"node",relevance:5}),X,n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,g,b,{match:/\$\d+/},r,L,{scope:"attr",match:l+c.lookahead(":"),relevance:0},Ae,{begin:"("+n.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[b,n.REGEXP_MODE,{className:"function",begin:be,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:T,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:u.begin,end:u.end},{match:v},{begin:w.begin,"on:begin":w.isTrulyOpeningTag,end:w.end}],subLanguage:"xml",contains:[{begin:w.begin,end:w.end,skip:!0,contains:["self"]}]}]},te,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+n.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,n.inherit(n.TITLE_MODE,{begin:l,className:"title.function"})]},{match:/\.\.\./,relevance:0},ce,{match:"\\$"+l,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},fe,j,_,we,{match:/\$[(.]/}]}}function Ln(n){const c=n.regex,p=c.concat(/[\p{L}_]/u,c.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),l=/[\p{L}0-9._:-]+/u,u={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},v={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},w=n.inherit(v,{begin:/\(/,end:/\)/}),T=n.inherit(n.APOS_STRING_MODE,{className:"string"}),y=n.inherit(n.QUOTE_STRING_MODE,{className:"string"}),I={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:l,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[u]},{begin:/'/,end:/'/,contains:[u]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[v,y,T,w,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[v,w,y,T]}]}]},n.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},u,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[y]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[I],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[I],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:c.concat(/</,c.lookahead(c.concat(p,c.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:p,relevance:0,starts:I}]},{className:"tag",begin:c.concat(/<\//,c.lookahead(c.concat(p,/>/))),contains:[{className:"name",begin:p,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}Se.registerLanguage("typescript",Mn);Se.registerLanguage("javascript",Cn);Se.registerLanguage("bash",On);Se.registerLanguage("xml",Ln);Se.configure({languages:["typescript","ts","javascript","js","bash","sh"],ignoreUnescapedHTML:!0,cssSelector:"pre code"});Se.highlightAll();
