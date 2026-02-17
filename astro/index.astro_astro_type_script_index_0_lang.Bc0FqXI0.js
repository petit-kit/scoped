function ct({from:n=0,to:a=1,mass:h=1,stiffness:c=120,damping:u=14,velocity:m=0,tolerance:v=.001,resumeOnTarget:S=!0}={}){function f(){return De(t)}function O(y){if(p)return f();if(V(t)&&V(i)&&V(s)){let P=!0;for(let w=0;w<t.length;w+=1){const L=t[w]-i[w],X=(-c*L-u*s[w])/h;s[w]+=X*y,t[w]+=s[w]*y;const te=t[w]-i[w];(Math.abs(s[w])>=v||Math.abs(te)>=v)&&(P=!1)}if(P){for(let w=0;w<t.length;w+=1)t[w]=i[w],s[w]=0;p=!0}return d.value=t,d.velocity=s,De(t)}if(J(t)&&J(i)&&J(s)){const P=d.objectKeys??Object.keys(t);let w=!0;for(const L of P){const X=t[L]-i[L],te=(-c*X-u*s[L])/h;s[L]+=te*y,t[L]+=s[L]*y;const z=t[L]-i[L];(Math.abs(s[L])>=v||Math.abs(z)>=v)&&(w=!1)}if(w){for(const L of P)t[L]=i[L],s[L]=0;p=!0}return d.value=t,d.velocity=s,De(t)}const M=i;let R=s;R+=(-c*(t-M)-u*R)/h*y,t+=R*y,s=R,d.value=t,d.velocity=s;const B=t-M;return Math.abs(R)<v&&Math.abs(B)<v&&(t=M,s=0,d.value=t,d.velocity=s,p=!0),t}const d=vn({from:n,to:a,velocity:m,label:"Spring"}),r=d.normalizeInput;let t=d.value,s=d.velocity??m,i=d.target,o=null,p=!1;const N=new Set;return{setTarget:function(y){const M=r(y),R=!dt(M,i);if(i=M,d.target=M,t=d.value,S&&p&&R){p=!1,o=null;for(const B of N)B(i)}},setValue:function(y,M={}){const{resetVelocity:R=!0,resetTime:B=!0,setTarget:P=!1,markDone:w=!1}=M;t=r(y),d.value=t,P&&(i=De(t),d.target=i);const L=p||!dt(t,i);if(R&&(s=d.arrayLength!=null?Te(0,d.arrayLength):d.objectKeys!=null?Me(0,d.objectKeys):0,d.velocity=s),B&&(o=null),w&&(p=!0),L&&!w){p=!1,o=null;for(const X of N)X(i)}},getValue:f,isDone:function(){return p},onResume:function(y){return N.add(y),()=>{N.delete(y)}},step:O,next:function(y=performance.now()){if(o==null)return o=y,f();const M=(y-o)/1e3;o=y;const R=1/30;let B=M,P=f();for(;B>0&&!p;){const w=Math.min(B,R);P=O(w),B-=w}return P}}}function lt(n,a){if(!a||typeof a!="object"||a.type==null)return n??a;const{type:h,default:c}=a;if(n==null)return c;try{switch(h){case String:return String(n);case Number:{const u=Number(n);return Number.isNaN(u)?c:u}case Boolean:return n===""||n==="true"||n!=="false"&&n!=="0"&&n!=null;case Object:try{return typeof n=="string"?JSON.parse(n):n}catch{return c}case Array:try{return typeof n=="string"?JSON.parse(n):n}catch{return Array.isArray(c)?c:[]}default:return n}}catch{return c}}function ut(n,a,h,c){if(!c||typeof c!="object"||!c.reflect)return;let u=null;const m=c.type;if(m===Boolean)return h?void n.setAttribute(a,""):void n.removeAttribute(a);if(m===Object||m===Array)try{u=h==null?null:JSON.stringify(h)}catch{u=null}else u=h==null?null:String(h);u==null?n.removeAttribute(a):n.setAttribute(a,u)}function Ke(n,a={},h){const{props:c={},shadow:u=!1,styles:m,plugins:v}=a,S=v??[],f=()=>{};class O extends HTMLElement{constructor(){super(),this.version=ft,this.t={};for(const r of Object.keys(c)){const t=c[r];this.t[r]=t&&typeof t=="object"&&("type"in t||"default"in t)?t:{type:void 0,default:t,reflect:!1}}this.props={},this.state={},this.actions={},this.refs={},this.emit=this.emit.bind(this),this.listen=this.listen.bind(this),this.setState=this.setState.bind(this),this.updateState=this.updateState.bind(this),this.setProps=this.setProps.bind(this),this.scheduleUpdate=this.scheduleUpdate.bind(this),this.update=this.update.bind(this),this.forceRender=this.forceRender.bind(this),this.destroy=this.destroy.bind(this),this.i=null,this.o=null,this.h=!1,this.l=!1,this.u=u,this.m=u?this.attachShadow({mode:"open"}):this,this.p=null,this.S=[],this.j=[],this.M=[],this.O=[],this._=[],this.$=[],this.A=[],this.T=[],this.k=new Map,this.L=!1,this.F=!1,this.I={},this.R=!1,this.V=n,this.C=!1,this.H=new Set,this.D=!1,this.U=new Map,this.q=0,this.B=!1}N(r){const t=this.u?this.m.host:this;let s=r.parentElement;for(;s;){if(s===t)return!1;if(s.tagName.includes("-"))return!0;s=s.parentElement}return!1}static get observedAttributes(){return Object.keys(c)}attributeChangedCallback(r,t,s){if(t===s)return;const i=this.t[r],o=this.I[r],p=lt(s,i);if(this.props[r]=p,this.L&&o!==p)for(const N of this.T)try{N(r,o,p)}catch(y){f(String(y?.message||y))}this.I[r]=p,this.H.has(r)?this.H.delete(r):this.i&&this.isConnected?this.D?this.C=!0:this.update(!0):this.C=!0}connectedCallback(){for(const t in this.t){if(!this.t.hasOwnProperty(t))continue;const s=lt(this.getAttribute(t),this.t[t]);this.props[t]=s,this.I[t]=s}u||this.p||(this.p=this.W());let r=null;try{if(h){const t={props:this.props,state:this.state,actions:this.actions,refs:this.refs,emit:this.emit,listen:this.listen,updateState:this.updateState.bind(this),host:this,onMount:s=>this.M.push(s),onDestroy:s=>this.O.push(s),onUpdate:s=>this._.push(s),onBeforeUpdate:s=>this.$.push(s),onFirstUpdate:s=>this.A.push(s),onPropsChanged:s=>this.T.push(s),link:(s,i)=>{const o=i||s;this.state[o]=this.props[s],this.T.push((N,y,M)=>{N===s&&(Object.is(this.state[o],M)||(this.state[o]=M))});const p={fn:()=>{const N=this.state[o];if(Object.is(this.props[s],N))return;this.props[s]=N,this.I[s]=N;const y=this.t[s],M=y&&{...y,reflect:!0},R=this.getAttribute(s);this.H.add(s),ut(this,s,N,M),R===this.getAttribute(s)&&this.H.delete(s)},deps:()=>[this.state[o]]};this.S.push(p)},computed:(s,i)=>{let o;if(i!==void 0)try{const y=typeof i=="function"?i():i;Array.isArray(y)&&(o=y)}catch(y){String(y?.message||y)}const p={getter:s,deps:i,value:i!==void 0?s(o):s()};this.j.push(p);const N=()=>p.value;return N.P=p,this.J(N),N},effect:(s,i)=>{const o={fn:s,deps:i};return this.S.push(o),()=>this.K(o)},delegate:(s,i,o)=>(this.Z(s,i,o),()=>this.G(s,i,o))};for(const s of S)if(s)try{const i=s.extend(t,this);i&&typeof i=="object"&&Object.assign(t,i)}catch(i){f(String(i?.message||i))}r=h(t)}}catch(t){String(t?.message||t)}if(this.i=typeof r!="function"?()=>"":r,this.D=!0,this.update(!0),this.D=!1,this.C&&(this.C=!1,this.update(!0)),!this.L){this.L=!0;for(const t of this.M)try{t()}catch(s){f(String(s?.message||s))}}}disconnectedCallback(){this.destroy()}remove(){super.remove()}destroy(){for(const r of this.O)try{r()}catch(t){f(String(t?.message||t))}for(const r of this.S)if(r.cleanup){try{r.cleanup()}catch(t){f(String(t?.message||t))}r.cleanup=void 0}for(const[,r]of this.k)try{this.m.removeEventListener(r.eventType,r.listener)}catch{}this.k.clear(),this.L=!1}emit(r,t){this.dispatchEvent(new CustomEvent(r,{detail:t,bubbles:!0,composed:!0}))}listen(r,t,s,i){const o=s;r.addEventListener(t,o,i);const p=()=>{try{r.removeEventListener(t,o,i)}catch{}};return this.O.push(p),p}setState(r){let t=!1;const s=r,i=this.state;for(const o in s){if(!Object.prototype.hasOwnProperty.call(s,o))continue;const p=s[o];Object.is(i[o],p)||(i[o]=p,t=!0)}if(t)if(this.D||!this.L)this.update(!0);else{if(!this.i||!this.isConnected||this.h)return;this.h=!0,requestAnimationFrame(()=>{this.h=!1,this.i&&this.isConnected&&this.update(!0)})}}updateState(r){Object.assign(this.state,r),this.i&&this.isConnected&&this.X()}setProps(r){const t=Object.keys(r);if(t.length===0)return;const s=[];for(const i of t){const o=r[i],p=this.I[i];this.props[i]=o,this.L&&p!==o&&s.push(i);const N=this.t[i];N&&N.reflect&&ut(this,i,o,N),this.L&&p===o||(this.I[i]=o)}if(this.L&&s.length>0)for(const i of s){const o=this.I[i],p=r[i];for(const N of this.T)try{N(i,o,p)}catch(y){f(String(y?.message||y))}}this.i&&this.isConnected?this.update(!0):this.C=!0}scheduleUpdate(){this.i&&this.isConnected&&this.X()}X(){this.l||this.h||(this.l=!0,(typeof queueMicrotask=="function"?queueMicrotask:r=>Promise.resolve().then(r))(()=>{this.l=!1,this.i&&this.isConnected&&(this.h||this.update(!1))}))}update(r){if(this.i){if(r&&this.L)for(const t of this.$)try{t()}catch(s){f(String(s?.message||s))}if(r){this.Y();let t="";try{t=this.i()}catch(o){String(o?.message||o),t=""}if(typeof t!="string"&&(t=t==null?"":String(t)),t=((o,p)=>{const N={...this.props,...p};return o.replace(wn,(y,M)=>{const R=N[M];return R==null?"":String(R)})})(t,this.state),!this.u){const o=`data-scope-owner="${this.V}"`;t=t.replace(/<slot(?![^>]*data-scope-owner)(\s|>)/g,`<slot ${o}$1`)}this.B=!1;const s=this.o!==null&&Object.is(this.o,t);let i=!1;s&&this.L||(this.u,this.m.innerHTML=t,this.o=t,i=!0),this.D?(this.tt(),(typeof requestAnimationFrame=="function"?requestAnimationFrame:o=>setTimeout(o,0))(()=>{this.i&&this.isConnected&&(i&&!u&&this.projectSlots(),i&&this.et(),this.nt(),this.it())})):(i&&!u&&this.projectSlots(),i&&this.st(),this.nt(),this.it())}else this.B&&this.Y(),this.nt(),this.L&&this.it()}}forceRender(){this.o=null,this.i&&this.isConnected?this.D?this.C=!0:this.update(!0):this.C=!0}it(){if(!this.F){this.F=!0;for(const r of this.A)try{r()}catch(t){f(String(t?.message||t))}}for(const r of this._)try{r()}catch(t){f(String(t?.message||t))}this.ot()}ot(){const r=(this.u?this.m:this).querySelectorAll("*"),t=Object.prototype.hasOwnProperty,s=this.state,i=this.props;this.actions;for(let o=0;o<r.length;o++){const p=r[o];if(this.N(p)||p.attributes.length===0)continue;const N=p.attributes;for(let y=N.length-1;y>=0;y--){const M=N[y];if(!M.name.startsWith(An))continue;const R=M.name.slice(5),B=M.value,P=B?B.trim():"";let w,L=!1;if(P){const z=this.U.get(P);if(z){z.P&&(this.B=!0);try{w=z()}catch{}L=!0}}if(!L){const z=P||R,de=t.call(s,z),fe=!de&&t.call(i,z);de?w=s[z]:fe&&(w=i[z])}if(R==="text"){const z=w==null?"":String(w);p.textContent!==z&&(p.textContent=z)}else if(R==="html"){const z=w==null?"":String(w);p.innerHTML!==z&&(p.innerHTML=z)}else if(R in p){if(!Object.is(p[R],w))try{p[R]=w}catch{}if(R==="value")try{w==null?p.removeAttribute("value"):p.setAttribute("value",String(w))}catch{}}else if(w!=null)try{p.setAttribute(R,String(w))}catch{}const X=`__scopeBind_${R}`,te=p[X];if(te){const z=te.rt;z&&p.removeEventListener(z,te),delete p[X]}}}}Y(){for(const r of this.j){let t,s=!0;if(r.deps!==void 0)try{const i=typeof r.deps=="function"?r.deps():r.deps;if(Array.isArray(i)&&(t=i,r.prevDeps&&r.prevDeps.length===t.length)){s=!1;for(let o=0;o<t.length;o++)if(!Object.is(r.prevDeps[o],t[o])){s=!0;break}}}catch(i){f(String(i?.message||i)),s=!0,t=void 0}if(s){try{r.value=r.deps!==void 0?r.getter(t):r.getter()}catch(i){f(String(i?.message||i))}t&&(r.prevDeps=t.slice())}}}nt(){for(const r of this.S){let t,s=!0;if(r.deps!==void 0)try{const i=typeof r.deps=="function"?r.deps():r.deps;if(Array.isArray(i)&&(t=i,r.prevDeps&&r.prevDeps.length===t.length)){s=!1;for(let o=0;o<t.length;o++)if(!Object.is(r.prevDeps[o],t[o])){s=!0;break}}}catch(i){f(String(i?.message||i)),s=!0,t=void 0}if(s){if(r.cleanup){try{r.cleanup()}catch{}r.cleanup=void 0}try{const i=r.deps!==void 0?r.fn(t):r.fn();typeof i=="function"&&(r.cleanup=i)}catch{}t&&(r.prevDeps=t.slice())}}}K(r){const t=this.S.indexOf(r);if(t!==-1){if(r.cleanup)try{r.cleanup()}catch{}this.S.splice(t,1)}}J(r){const t=r.ct;if(t&&typeof t=="string")return this.U.set(t,r),t;const s=`__scope_bind_${++this.q}__`;this.U.set(s,r);try{r.ct=s,r.toString=()=>s}catch{}return s}tt(){const r=(this.u?this.m:this).querySelectorAll("[ref]"),t=this.refs;for(const s in t)t.hasOwnProperty(s)&&delete t[s];if(r.length!==0)for(let s=0;s<r.length;s++){const i=r[s];if(this.N(i))continue;const o=i.getAttribute("ref");o&&(t[o]?Array.isArray(t[o])?t[o].push(i):t[o]=[t[o],i]:t[o]=i)}}et(){const r=(this.u?this.m:this).querySelectorAll("*");for(let t=0;t<r.length;t++){const s=r[t];if(this.N(s)||s.attributes.length===0)continue;const i=s.attributes;for(let o=i.length-1;o>=0;o--){const p=i[o];if(!p.name.startsWith("on:"))continue;const N=p.name.slice(3),y=p.value,M=`__tinyHandler_${N}`,R=s[M];R&&s.removeEventListener(N,R),s.removeAttribute(p.name);const B=this.actions[y];if(B&&typeof B=="function"){const P=w=>{B.call(this.actions,w)};s[M]=P,s.addEventListener(N,P)}}}}st(){const r=(this.u?this.m:this).querySelectorAll("*"),t=this.refs;for(const s in t)t.hasOwnProperty(s)&&delete t[s];for(let s=0;s<r.length;s++){const i=r[s];if(this.N(i))continue;const o=i.getAttribute("ref");if(o&&(t[o]?Array.isArray(t[o])?t[o].push(i):t[o]=[t[o],i]:t[o]=i),i.attributes.length>0){const p=i.attributes;for(let N=p.length-1;N>=0;N--){const y=p[N];if(!y.name.startsWith("on:"))continue;const M=y.name.slice(3),R=y.value,B=`__tinyHandler_${M}`,P=i[B];P&&i.removeEventListener(M,P),i.removeAttribute(y.name);const w=this.actions[R];if(w&&typeof w=="function"){const L=X=>{w.call(this.actions,X)};i[B]=L,i.addEventListener(M,L)}}}}}W(){const r=new Map,t=this.childNodes,s=[];for(let i=0;i<t.length;i++)s.push(t[i]);for(let i=0;i<s.length;i++){const o=s[i];let p="";o.nodeType===1&&o.getAttribute&&(p=o.getAttribute("slot")||""),r.has(p)||r.set(p,[]),r.get(p).push(o)}for(let i=0;i<s.length;i++){const o=s[i];o.parentNode&&o.parentNode.removeChild(o)}return r}projectSlots(){const r=this.p||new Map,t=(this.u?this.m:this).querySelectorAll(`slot[data-scope-owner="${this.V}"]`);if(t.length!==0)for(let s=0;s<t.length;s++){const i=t[s],o=i.getAttribute("name")||"",p=r.get(o)||[];if(p.length){const N=document.createDocumentFragment();for(let y=0;y<p.length;y++){const M=p[y];let R;if(M.nodeType===1&&M.tagName.includes("-")&&M.p instanceof Map){const B=M,P=document.createElement(B.tagName.toLowerCase());for(let w=0;w<B.attributes.length;w++){const L=B.attributes[w];P.setAttribute(L.name,L.value)}for(const w of B.p.values())for(let L=0;L<w.length;L++)P.appendChild(w[L].cloneNode(!0));R=P}else R=M.cloneNode(!0);N.appendChild(R)}i.replaceWith(N)}else{const N=i.childNodes,y=[];for(let M=0;M<N.length;M++)y.push(N[M]);if(y.length>0){const M=document.createDocumentFragment();for(let R=0;R<y.length;R++)M.appendChild(y[R]);i.replaceWith(M)}}}}Z(r,t,s){const i=`${r}::${t}`;let o=this.k.get(i);if(!o){const p=N=>{const y=N.target&&N.target.closest?N.target.closest(t):null;if(y)for(const M of o.handlers)try{M(N,y)}catch{}};o={eventType:r,selector:t,listener:p,handlers:new Set},this.k.set(i,o),this.m.addEventListener(r,p)}o.handlers.add(s)}G(r,t,s){const i=`${r}::${t}`,o=this.k.get(i);if(o&&(o.handlers.delete(s),o.handlers.size===0)){try{this.m.removeEventListener(r,o.listener)}catch{}this.k.delete(i)}}}if(!customElements.get(n)){if(m&&typeof document<"u"){const d=`scope-${n}-styles`;if(!document.getElementById(d)){const r=document.createElement("style");r.id=d,r.textContent=m,document.head.appendChild(r)}}try{customElements.define(n,O)}catch(d){String(d?.message||d)}}return O}const mn=()=>({name:"window",extend:n=>{const a=new Set,h=new Set,c=new Set,u=(m,v={})=>{if(typeof window>"u")return()=>{};const{immediate:S=!0}=v,f=O=>{m(window.innerWidth,window.innerHeight,O)};return window.addEventListener("resize",f),a.add(f),S&&f(new UIEvent("resize")),()=>{window.removeEventListener("resize",f),a.delete(f)}};return n.onDestroy(()=>{if(typeof window<"u"){for(const m of a)window.removeEventListener("resize",m);a.clear();for(const m of c)m.disconnect();c.clear();for(const m of h)window.removeEventListener("scroll",m);h.clear()}}),{onViewportResize:u,onWindowResize:(m,v={})=>{if(typeof window>"u")return()=>{};if(typeof ResizeObserver>"u")return u((d,r,t)=>m(d,r,t),v);const{immediate:S=!0}=v,f=document.documentElement,O=new ResizeObserver(d=>{const r=d[0];if(!r)return;const{width:t,height:s}=r.contentRect;m(t,s,r)});if(O.observe(f),c.add(O),S){const d=f.getBoundingClientRect();m(d.width,d.height,new UIEvent("resize"))}return()=>{O.disconnect(),c.delete(O)}},onWindowScroll:(m,v={})=>{if(typeof window>"u")return()=>{};const{immediate:S=!0}=v,f=O=>{m(window.scrollX,window.scrollY,O)};return window.addEventListener("scroll",f,{passive:!0}),h.add(f),S&&f(new Event("scroll")),()=>{window.removeEventListener("scroll",f),h.delete(f)}}}}}),yn=()=>({name:"timer",extend:n=>{const a=new Set,h=new Set,c=new Set,u={setTimeout:(m,v,...S)=>{let f;return f=setTimeout((...O)=>{a.delete(f),m(...O)},v,...S),a.add(f),f},setInterval:(m,v,...S)=>{const f=setInterval(m,v,...S);return h.add(f),f},raf:(m,v)=>{let S=0,f=!0,O=0;const d=typeof v=="number"&&v>0?1e3/v:0,r=t=>{if(c.delete(S),f){if(d){if(t-O>=d){const s=O?t-O:d;O=t,m(t,s)}}else{const s=O?t-O:0;O=t,m(t,s)}S=requestAnimationFrame(r),c.add(S)}};return S=requestAnimationFrame(r),c.add(S),()=>{f&&(f=!1,c.delete(S),cancelAnimationFrame(S))}}};return n.onDestroy(()=>{for(const m of a)clearTimeout(m);a.clear();for(const m of h)clearInterval(m);h.clear();for(const m of c)cancelAnimationFrame(m);c.clear()}),{timer:u}}}),En=()=>({name:"mouse",extend:n=>{const a=new Map,h=(c,u)=>{if(typeof window>"u")return()=>{};const m=S=>{const f=S;u(f.clientX,f.clientY,f)};window.addEventListener(c,m);let v=a.get(c);return v||(v=new Set,a.set(c,v)),v.add(m),()=>{window.removeEventListener(c,m),v?.delete(m)}};return n.onDestroy(()=>{if(typeof window<"u"){for(const[c,u]of a){for(const m of u)window.removeEventListener(c,m);u.clear()}a.clear()}}),{onMouseMove:c=>h("mousemove",c),onMouseDown:c=>h("mousedown",c),onMouseUp:c=>h("mouseup",c),onMouseWheel:c=>(u=>{if(typeof window>"u")return()=>{};const m=S=>{const f=S;u(f.clientX,f.clientY,f.deltaY,f)};window.addEventListener("wheel",m);let v=a.get("wheel");return v||(v=new Set,a.set("wheel",v)),v.add(m),()=>{window.removeEventListener("wheel",m),v?.delete(m)}})(c)}}}),V=n=>Array.isArray(n),J=n=>n!=null&&typeof n=="object"&&!Array.isArray(n),De=n=>V(n)?n.slice():J(n)?{...n}:n,dt=(n,a)=>{if(V(n)&&V(a)){if(n.length!==a.length)return!1;for(let h=0;h<n.length;h+=1)if(!Object.is(n[h],a[h]))return!1;return!0}if(J(n)&&J(a)){const h=Object.keys(n),c=Object.keys(a);if(h.length!==c.length)return!1;for(const u of h)if(!(u in a)||!Object.is(n[u],a[u]))return!1;return!0}return!(V(n)||V(a)||J(n)||J(a))&&Object.is(n,a)},Te=(n,a)=>Array.from({length:a},()=>n),Me=(n,a)=>a.reduce((h,c)=>(h[c]=n,h),{}),vn=({from:n,to:a,velocity:h,label:c})=>{const u={value:n,target:a,velocity:h,arrayLength:null,objectKeys:null,normalizeInput:d=>d},m=d=>{if(u.arrayLength==null){if(u.objectKeys!=null)throw new Error(`${c} value shape mismatch (array vs object).`);u.arrayLength=d,V(u.value)||(u.value=Te(u.value,d)),V(u.target)||(u.target=Te(u.target,d)),u.velocity===void 0||V(u.velocity)||(u.velocity=Te(u.velocity,d))}},v=d=>{if(u.objectKeys==null){if(u.arrayLength!=null)throw new Error(`${c} value shape mismatch (object vs array).`);u.objectKeys=d,J(u.value)||(u.value=Me(u.value,d)),J(u.target)||(u.target=Me(u.target,d)),u.velocity===void 0||J(u.velocity)||(u.velocity=Me(u.velocity,d))}},S=d=>{if(V(d)){if(u.objectKeys!=null)throw new Error(`${c} value shape mismatch (array vs object).`);if(u.arrayLength==null&&m(d.length),d.length!==u.arrayLength)throw new Error(`${c} value length mismatch (expected ${u.arrayLength}, got ${d.length}).`);return d.slice()}if(J(d)){if(u.arrayLength!=null)throw new Error(`${c} value shape mismatch (object vs array).`);const r=Object.keys(d);if(u.objectKeys==null&&v(r),u.objectKeys&&r.length!==u.objectKeys.length)throw new Error(`${c} value keys mismatch (expected ${u.objectKeys.length}, got ${r.length}).`);if(u.objectKeys){for(const t of u.objectKeys)if(!(t in d))throw new Error(`${c} value keys mismatch (missing key "${t}").`)}return{...d}}return u.arrayLength!=null?Te(d,u.arrayLength):u.objectKeys!=null?Me(d,u.objectKeys):d};u.normalizeInput=S;const f=V(n)||V(a)||h!==void 0&&V(h),O=J(n)||J(a)||h!==void 0&&J(h);if(f&&O)throw new Error(`${c} value shape mismatch (array vs object).`);if(f){const d=V(n)?n.length:V(a)?a.length:h.length;m(d),u.value=S(n),u.target=S(a),u.velocity!==void 0&&(u.velocity=S(u.velocity))}else if(O){const d=J(n)?Object.keys(n):J(a)?Object.keys(a):Object.keys(h);v(d),u.value=S(n),u.target=S(a),u.velocity!==void 0&&(u.velocity=S(u.velocity))}return u};let pe={x:-1,y:-1};const gt={stiffness:300,damping:30,mass:1},_n=()=>({name:"pointer",extend:n=>{const{onMouseMove:a}=En().extend(n,n.host),{timer:h}=yn().extend(n,n.host);pe.x=window.innerWidth/2,pe.y=window.innerHeight/2;const c={x:ct({from:pe.x,to:pe.x,...gt}),y:ct({from:pe.y,to:pe.y,...gt})};return a((u,m)=>{c.x.setTarget(u),c.y.setTarget(m)}),{onPointerMove:u=>{let m=pe.x,v=pe.y;h.raf(S=>{const f=c.x.next(S),O=c.y.next(S);var d,r;m===f&&v===O||(u({x:f,y:O,v:(d={x:f,y:O},r={x:m,y:v},{x:d.x-r.x,y:d.y-r.y,magnitude:Math.sqrt((d.x-r.x)*(d.x-r.x)+(d.y-r.y)*(d.y-r.y))}).magnitude}),m=f,v=O)})},onMouseMove:a}}}),ft="0.0.5",Sn=()=>{console.info("The website is using @petit-kit/scoped v"+ft),console.info("https://github.com/petit-kit/scoped")},wn=/\{([A-Za-z_$][\w$]*)\}/g,An="bind:",bt=[{Title:"Introduction",content:`
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
    `}];Ke("c-table-content",{plugins:[mn()]},({})=>()=>`
    <div class="flex flex-col gap-2 w-[180px] mt-5">
      ${bt.map(n=>`
        <div>
          <a href="#${n.Title}" class="hover:font-bold inline-block w-full">
            ${n.Title}
          </a>
          ${n.children?n.children.map(a=>`
            <div class="ml-5 mt-2">
              <a href="#${a.Title}" class="hover:font-bold inline-block w-full">
                ${a.Title}
              </a>
            </div>
          `).join(""):""}
        </div>
      `).join("")}
      </div>
    `);Ke("c-content",{},()=>{const n=bt.reduce((a,h)=>(a.push(h),h.children&&a.push(...h.children),a),[]);return()=>`
    <div class="max-w-[calc(100vw-20px)]">
      ${n.map(a=>`
        <div>
          <h2 class="sub-title" id="${a.Title}">
            ${a.Title}
          </h2>
          <br />
          <div>${a.content}</div>
        </div>
      `).join("<br />")}
    </div>
  `});Ke("c-pointer",{plugins:[_n()]},({state:n,onPointerMove:a,host:h,computed:c})=>{n.position={x:0,y:0},a(({x:S,y:f})=>{h.updateState({position:{x:S,y:f}})});const u=c(()=>`transform: translateX(${n.position.x}px);`),m=c(()=>`transform: translateY(${n.position.y}px);`),v=c(()=>`transform: translate(${n.position.x}px, ${n.position.y}px);`);return()=>`
    <div class="fixed w-screen h-screen pointer-events-none">
      <div
        class="absolute w-px h-screen bg-black rounded-full opacity-5" bind:style="${u}"></div>
      <div
        class="absolute w-screen h-px bg-black rounded-full opacity-5" bind:style="${m}"></div>
      <div
        class="absolute w-2 h-2 -ml-1 -mt-1 bg-[#BF5735] rounded-full" bind:style="${v}"></div>
    </div>
  `});function Nn(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ge,ht;function Tn(){if(ht)return Ge;ht=1;function n(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(l=>{const b=e[l],k=typeof b;(k==="object"||k==="function")&&!Object.isFrozen(b)&&n(b)}),e}class a{constructor(l){l.data===void 0&&(l.data={}),this.data=l.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function h(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function c(e,...l){const b=Object.create(null);for(const k in e)b[k]=e[k];return l.forEach(function(k){for(const G in k)b[G]=k[G]}),b}const u="</span>",m=e=>!!e.scope,v=(e,{prefix:l})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const b=e.split(".");return[`${l}${b.shift()}`,...b.map((k,G)=>`${k}${"_".repeat(G+1)}`)].join(" ")}return`${l}${e}`};class S{constructor(l,b){this.buffer="",this.classPrefix=b.classPrefix,l.walk(this)}addText(l){this.buffer+=h(l)}openNode(l){if(!m(l))return;const b=v(l.scope,{prefix:this.classPrefix});this.span(b)}closeNode(l){m(l)&&(this.buffer+=u)}value(){return this.buffer}span(l){this.buffer+=`<span class="${l}">`}}const f=(e={})=>{const l={children:[]};return Object.assign(l,e),l};class O{constructor(){this.rootNode=f(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(l){this.top.children.push(l)}openNode(l){const b=f({scope:l});this.add(b),this.stack.push(b)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(l){return this.constructor._walk(l,this.rootNode)}static _walk(l,b){return typeof b=="string"?l.addText(b):b.children&&(l.openNode(b),b.children.forEach(k=>this._walk(l,k)),l.closeNode(b)),l}static _collapse(l){typeof l!="string"&&l.children&&(l.children.every(b=>typeof b=="string")?l.children=[l.children.join("")]:l.children.forEach(b=>{O._collapse(b)}))}}class d extends O{constructor(l){super(),this.options=l}addText(l){l!==""&&this.add(l)}startScope(l){this.openNode(l)}endScope(){this.closeNode()}__addSublanguage(l,b){const k=l.root;b&&(k.scope=`language:${b}`),this.add(k)}toHTML(){return new S(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function r(e){return e?typeof e=="string"?e:e.source:null}function t(e){return o("(?=",e,")")}function s(e){return o("(?:",e,")*")}function i(e){return o("(?:",e,")?")}function o(...e){return e.map(b=>r(b)).join("")}function p(e){const l=e[e.length-1];return typeof l=="object"&&l.constructor===Object?(e.splice(e.length-1,1),l):{}}function N(...e){return"("+(p(e).capture?"":"?:")+e.map(k=>r(k)).join("|")+")"}function y(e){return new RegExp(e.toString()+"|").exec("").length-1}function M(e,l){const b=e&&e.exec(l);return b&&b.index===0}const R=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function B(e,{joinWith:l}){let b=0;return e.map(k=>{b+=1;const G=b;let K=r(k),A="";for(;K.length>0;){const _=R.exec(K);if(!_){A+=K;break}A+=K.substring(0,_.index),K=K.substring(_.index+_[0].length),_[0][0]==="\\"&&_[1]?A+="\\"+String(Number(_[1])+G):(A+=_[0],_[0]==="("&&b++)}return A}).map(k=>`(${k})`).join(l)}const P=/\b\B/,w="[a-zA-Z]\\w*",L="[a-zA-Z_]\\w*",X="\\b\\d+(\\.\\d+)?",te="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",z="\\b(0b[01]+)",de="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",fe=(e={})=>{const l=/^#![ ]*\//;return e.binary&&(e.begin=o(l,/.*\b/,e.binary,/\b.*/)),c({scope:"meta",begin:l,end:/$/,relevance:0,"on:begin":(b,k)=>{b.index!==0&&k.ignoreMatch()}},e)},ce={begin:"\\\\[\\s\\S]",relevance:0},we={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ce]},be={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ce]},Ae={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},U=function(e,l,b={}){const k=c({scope:"comment",begin:e,end:l,contains:[]},b);k.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const G=N("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return k.contains.push({begin:o(/[ ]+/,"(",G,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),k},ee=U("//","$"),ne=U("/\\*","\\*/"),re=U("#","$"),le={scope:"number",begin:X,relevance:0},me={scope:"number",begin:te,relevance:0},Mt={scope:"number",begin:z,relevance:0},Ot={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[ce,{begin:/\[/,end:/\]/,relevance:0,contains:[ce]}]},xt={scope:"title",begin:w,relevance:0},Rt={scope:"title",begin:L,relevance:0},It={begin:"\\.\\s*"+L,relevance:0};var Oe=Object.freeze({__proto__:null,APOS_STRING_MODE:we,BACKSLASH_ESCAPE:ce,BINARY_NUMBER_MODE:Mt,BINARY_NUMBER_RE:z,COMMENT:U,C_BLOCK_COMMENT_MODE:ne,C_LINE_COMMENT_MODE:ee,C_NUMBER_MODE:me,C_NUMBER_RE:te,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(l,b)=>{b.data._beginMatch=l[1]},"on:end":(l,b)=>{b.data._beginMatch!==l[1]&&b.ignoreMatch()}})},HASH_COMMENT_MODE:re,IDENT_RE:w,MATCH_NOTHING_RE:P,METHOD_GUARD:It,NUMBER_MODE:le,NUMBER_RE:X,PHRASAL_WORDS_MODE:Ae,QUOTE_STRING_MODE:be,REGEXP_MODE:Ot,RE_STARTERS_RE:de,SHEBANG:fe,TITLE_MODE:xt,UNDERSCORE_IDENT_RE:L,UNDERSCORE_TITLE_MODE:Rt});function kt(e,l){e.input[e.index-1]==="."&&l.ignoreMatch()}function Ct(e,l){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Lt(e,l){l&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=kt,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Dt(e,l){Array.isArray(e.illegal)&&(e.illegal=N(...e.illegal))}function Bt(e,l){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Pt(e,l){e.relevance===void 0&&(e.relevance=1)}const $t=(e,l)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const b=Object.assign({},e);Object.keys(e).forEach(k=>{delete e[k]}),e.keywords=b.keywords,e.begin=o(b.beforeMatch,t(b.begin)),e.starts={relevance:0,contains:[Object.assign(b,{endsParent:!0})]},e.relevance=0,delete b.beforeMatch},Ut=["of","and","for","in","not","or","if","then","parent","list","value"],Ht="keyword";function We(e,l,b=Ht){const k=Object.create(null);return typeof e=="string"?G(b,e.split(" ")):Array.isArray(e)?G(b,e):Object.keys(e).forEach(function(K){Object.assign(k,We(e[K],l,K))}),k;function G(K,A){l&&(A=A.map(_=>_.toLowerCase())),A.forEach(function(_){const I=_.split("|");k[I[0]]=[K,zt(I[0],I[1])]})}}function zt(e,l){return l?Number(l):jt(e)?0:1}function jt(e){return Ut.includes(e.toLowerCase())}const Ze={},ye=e=>{console.error(e)},Ye=(e,...l)=>{console.log(`WARN: ${e}`,...l)},ve=(e,l)=>{Ze[`${e}/${l}`]||(console.log(`Deprecated as of ${e}. ${l}`),Ze[`${e}/${l}`]=!0)},xe=new Error;function Xe(e,l,{key:b}){let k=0;const G=e[b],K={},A={};for(let _=1;_<=l.length;_++)A[_+k]=G[_],K[_+k]=!0,k+=y(l[_-1]);e[b]=A,e[b]._emit=K,e[b]._multi=!0}function Ft(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ye("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),xe;if(typeof e.beginScope!="object"||e.beginScope===null)throw ye("beginScope must be object"),xe;Xe(e,e.begin,{key:"beginScope"}),e.begin=B(e.begin,{joinWith:""})}}function Gt(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ye("skip, excludeEnd, returnEnd not compatible with endScope: {}"),xe;if(typeof e.endScope!="object"||e.endScope===null)throw ye("endScope must be object"),xe;Xe(e,e.end,{key:"endScope"}),e.end=B(e.end,{joinWith:""})}}function Kt(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Wt(e){Kt(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Ft(e),Gt(e)}function Zt(e){function l(A,_){return new RegExp(r(A),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(_?"g":""))}class b{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(_,I){I.position=this.position++,this.matchIndexes[this.matchAt]=I,this.regexes.push([I,_]),this.matchAt+=y(_)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const _=this.regexes.map(I=>I[1]);this.matcherRe=l(B(_,{joinWith:"|"}),!0),this.lastIndex=0}exec(_){this.matcherRe.lastIndex=this.lastIndex;const I=this.matcherRe.exec(_);if(!I)return null;const Y=I.findIndex((Ne,$e)=>$e>0&&Ne!==void 0),W=this.matchIndexes[Y];return I.splice(0,Y),Object.assign(I,W)}}class k{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(_){if(this.multiRegexes[_])return this.multiRegexes[_];const I=new b;return this.rules.slice(_).forEach(([Y,W])=>I.addRule(Y,W)),I.compile(),this.multiRegexes[_]=I,I}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(_,I){this.rules.push([_,I]),I.type==="begin"&&this.count++}exec(_){const I=this.getMatcher(this.regexIndex);I.lastIndex=this.lastIndex;let Y=I.exec(_);if(this.resumingScanAtSamePosition()&&!(Y&&Y.index===this.lastIndex)){const W=this.getMatcher(0);W.lastIndex=this.lastIndex+1,Y=W.exec(_)}return Y&&(this.regexIndex+=Y.position+1,this.regexIndex===this.count&&this.considerAll()),Y}}function G(A){const _=new k;return A.contains.forEach(I=>_.addRule(I.begin,{rule:I,type:"begin"})),A.terminatorEnd&&_.addRule(A.terminatorEnd,{type:"end"}),A.illegal&&_.addRule(A.illegal,{type:"illegal"}),_}function K(A,_){const I=A;if(A.isCompiled)return I;[Ct,Bt,Wt,$t].forEach(W=>W(A,_)),e.compilerExtensions.forEach(W=>W(A,_)),A.__beforeBegin=null,[Lt,Dt,Pt].forEach(W=>W(A,_)),A.isCompiled=!0;let Y=null;return typeof A.keywords=="object"&&A.keywords.$pattern&&(A.keywords=Object.assign({},A.keywords),Y=A.keywords.$pattern,delete A.keywords.$pattern),Y=Y||/\w+/,A.keywords&&(A.keywords=We(A.keywords,e.case_insensitive)),I.keywordPatternRe=l(Y,!0),_&&(A.begin||(A.begin=/\B|\b/),I.beginRe=l(I.begin),!A.end&&!A.endsWithParent&&(A.end=/\B|\b/),A.end&&(I.endRe=l(I.end)),I.terminatorEnd=r(I.end)||"",A.endsWithParent&&_.terminatorEnd&&(I.terminatorEnd+=(A.end?"|":"")+_.terminatorEnd)),A.illegal&&(I.illegalRe=l(A.illegal)),A.contains||(A.contains=[]),A.contains=[].concat(...A.contains.map(function(W){return Yt(W==="self"?A:W)})),A.contains.forEach(function(W){K(W,I)}),A.starts&&K(A.starts,_),I.matcher=G(I),I}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=c(e.classNameAliases||{}),K(e)}function qe(e){return e?e.endsWithParent||qe(e.starts):!1}function Yt(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(l){return c(e,{variants:null},l)})),e.cachedVariants?e.cachedVariants:qe(e)?c(e,{starts:e.starts?c(e.starts):null}):Object.isFrozen(e)?c(e):e}var Xt="11.11.1";class qt extends Error{constructor(l,b){super(l),this.name="HTMLInjectionError",this.html=b}}const Pe=h,Ve=c,Je=Symbol("nomatch"),Vt=7,Qe=function(e){const l=Object.create(null),b=Object.create(null),k=[];let G=!0;const K="Could not find the language '{}', did you forget to load/include a language module?",A={disableAutodetect:!0,name:"Plain text",contains:[]};let _={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:d};function I(g){return _.noHighlightRe.test(g)}function Y(g){let x=g.className+" ";x+=g.parentNode?g.parentNode.className:"";const $=_.languageDetectRe.exec(x);if($){const j=ge($[1]);return j||(Ye(K.replace("{}",$[1])),Ye("Falling back to no-highlight mode for this block.",g)),j?$[1]:"no-highlight"}return x.split(/\s+/).find(j=>I(j)||ge(j))}function W(g,x,$){let j="",Z="";typeof x=="object"?(j=g,$=x.ignoreIllegals,Z=x.language):(ve("10.7.0","highlight(lang, code, ...args) has been deprecated."),ve("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),Z=g,j=x),$===void 0&&($=!0);const ie={code:j,language:Z};Ie("before:highlight",ie);const he=ie.result?ie.result:Ne(ie.language,ie.code,$);return he.code=ie.code,Ie("after:highlight",he),he}function Ne(g,x,$,j){const Z=Object.create(null);function ie(E,T){return E.keywords[T]}function he(){if(!C.keywords){q.addText(F);return}let E=0;C.keywordPatternRe.lastIndex=0;let T=C.keywordPatternRe.exec(F),D="";for(;T;){D+=F.substring(E,T.index);const H=ae.case_insensitive?T[0].toLowerCase():T[0],Q=ie(C,H);if(Q){const[ue,fn]=Q;if(q.addText(D),D="",Z[H]=(Z[H]||0)+1,Z[H]<=Vt&&(Le+=fn),ue.startsWith("_"))D+=T[0];else{const bn=ae.classNameAliases[ue]||ue;oe(T[0],bn)}}else D+=T[0];E=C.keywordPatternRe.lastIndex,T=C.keywordPatternRe.exec(F)}D+=F.substring(E),q.addText(D)}function ke(){if(F==="")return;let E=null;if(typeof C.subLanguage=="string"){if(!l[C.subLanguage]){q.addText(F);return}E=Ne(C.subLanguage,F,!0,at[C.subLanguage]),at[C.subLanguage]=E._top}else E=Ue(F,C.subLanguage.length?C.subLanguage:null);C.relevance>0&&(Le+=E.relevance),q.__addSublanguage(E._emitter,E.language)}function se(){C.subLanguage!=null?ke():he(),F=""}function oe(E,T){E!==""&&(q.startScope(T),q.addText(E),q.endScope())}function st(E,T){let D=1;const H=T.length-1;for(;D<=H;){if(!E._emit[D]){D++;continue}const Q=ae.classNameAliases[E[D]]||E[D],ue=T[D];Q?oe(ue,Q):(F=ue,he(),F=""),D++}}function rt(E,T){return E.scope&&typeof E.scope=="string"&&q.openNode(ae.classNameAliases[E.scope]||E.scope),E.beginScope&&(E.beginScope._wrap?(oe(F,ae.classNameAliases[E.beginScope._wrap]||E.beginScope._wrap),F=""):E.beginScope._multi&&(st(E.beginScope,T),F="")),C=Object.create(E,{parent:{value:C}}),C}function it(E,T,D){let H=M(E.endRe,D);if(H){if(E["on:end"]){const Q=new a(E);E["on:end"](T,Q),Q.isMatchIgnored&&(H=!1)}if(H){for(;E.endsParent&&E.parent;)E=E.parent;return E}}if(E.endsWithParent)return it(E.parent,T,D)}function un(E){return C.matcher.regexIndex===0?(F+=E[0],1):(Fe=!0,0)}function dn(E){const T=E[0],D=E.rule,H=new a(D),Q=[D.__beforeBegin,D["on:begin"]];for(const ue of Q)if(ue&&(ue(E,H),H.isMatchIgnored))return un(T);return D.skip?F+=T:(D.excludeBegin&&(F+=T),se(),!D.returnBegin&&!D.excludeBegin&&(F=T)),rt(D,E),D.returnBegin?0:T.length}function gn(E){const T=E[0],D=x.substring(E.index),H=it(C,E,D);if(!H)return Je;const Q=C;C.endScope&&C.endScope._wrap?(se(),oe(T,C.endScope._wrap)):C.endScope&&C.endScope._multi?(se(),st(C.endScope,E)):Q.skip?F+=T:(Q.returnEnd||Q.excludeEnd||(F+=T),se(),Q.excludeEnd&&(F=T));do C.scope&&q.closeNode(),!C.skip&&!C.subLanguage&&(Le+=C.relevance),C=C.parent;while(C!==H.parent);return H.starts&&rt(H.starts,E),Q.returnEnd?0:T.length}function hn(){const E=[];for(let T=C;T!==ae;T=T.parent)T.scope&&E.unshift(T.scope);E.forEach(T=>q.openNode(T))}let Ce={};function ot(E,T){const D=T&&T[0];if(F+=E,D==null)return se(),0;if(Ce.type==="begin"&&T.type==="end"&&Ce.index===T.index&&D===""){if(F+=x.slice(T.index,T.index+1),!G){const H=new Error(`0 width match regex (${g})`);throw H.languageName=g,H.badRule=Ce.rule,H}return 1}if(Ce=T,T.type==="begin")return dn(T);if(T.type==="illegal"&&!$){const H=new Error('Illegal lexeme "'+D+'" for mode "'+(C.scope||"<unnamed>")+'"');throw H.mode=C,H}else if(T.type==="end"){const H=gn(T);if(H!==Je)return H}if(T.type==="illegal"&&D==="")return F+=`
`,1;if(je>1e5&&je>T.index*3)throw new Error("potential infinite loop, way more iterations than matches");return F+=D,D.length}const ae=ge(g);if(!ae)throw ye(K.replace("{}",g)),new Error('Unknown language: "'+g+'"');const pn=Zt(ae);let ze="",C=j||pn;const at={},q=new _.__emitter(_);hn();let F="",Le=0,Ee=0,je=0,Fe=!1;try{if(ae.__emitTokens)ae.__emitTokens(x,q);else{for(C.matcher.considerAll();;){je++,Fe?Fe=!1:C.matcher.considerAll(),C.matcher.lastIndex=Ee;const E=C.matcher.exec(x);if(!E)break;const T=x.substring(Ee,E.index),D=ot(T,E);Ee=E.index+D}ot(x.substring(Ee))}return q.finalize(),ze=q.toHTML(),{language:g,value:ze,relevance:Le,illegal:!1,_emitter:q,_top:C}}catch(E){if(E.message&&E.message.includes("Illegal"))return{language:g,value:Pe(x),illegal:!0,relevance:0,_illegalBy:{message:E.message,index:Ee,context:x.slice(Ee-100,Ee+100),mode:E.mode,resultSoFar:ze},_emitter:q};if(G)return{language:g,value:Pe(x),illegal:!1,relevance:0,errorRaised:E,_emitter:q,_top:C};throw E}}function $e(g){const x={value:Pe(g),illegal:!1,relevance:0,_top:A,_emitter:new _.__emitter(_)};return x._emitter.addText(g),x}function Ue(g,x){x=x||_.languages||Object.keys(l);const $=$e(g),j=x.filter(ge).filter(nt).map(se=>Ne(se,g,!1));j.unshift($);const Z=j.sort((se,oe)=>{if(se.relevance!==oe.relevance)return oe.relevance-se.relevance;if(se.language&&oe.language){if(ge(se.language).supersetOf===oe.language)return 1;if(ge(oe.language).supersetOf===se.language)return-1}return 0}),[ie,he]=Z,ke=ie;return ke.secondBest=he,ke}function Jt(g,x,$){const j=x&&b[x]||$;g.classList.add("hljs"),g.classList.add(`language-${j}`)}function He(g){let x=null;const $=Y(g);if(I($))return;if(Ie("before:highlightElement",{el:g,language:$}),g.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",g);return}if(g.children.length>0&&(_.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),_.throwUnescapedHTML))throw new qt("One of your code blocks includes unescaped HTML.",g.innerHTML);x=g;const j=x.textContent,Z=$?W(j,{language:$,ignoreIllegals:!0}):Ue(j);g.innerHTML=Z.value,g.dataset.highlighted="yes",Jt(g,$,Z.language),g.result={language:Z.language,re:Z.relevance,relevance:Z.relevance},Z.secondBest&&(g.secondBest={language:Z.secondBest.language,relevance:Z.secondBest.relevance}),Ie("after:highlightElement",{el:g,result:Z,text:j})}function Qt(g){_=Ve(_,g)}const en=()=>{Re(),ve("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function tn(){Re(),ve("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let et=!1;function Re(){function g(){Re()}if(document.readyState==="loading"){et||window.addEventListener("DOMContentLoaded",g,!1),et=!0;return}document.querySelectorAll(_.cssSelector).forEach(He)}function nn(g,x){let $=null;try{$=x(e)}catch(j){if(ye("Language definition for '{}' could not be registered.".replace("{}",g)),G)ye(j);else throw j;$=A}$.name||($.name=g),l[g]=$,$.rawDefinition=x.bind(null,e),$.aliases&&tt($.aliases,{languageName:g})}function sn(g){delete l[g];for(const x of Object.keys(b))b[x]===g&&delete b[x]}function rn(){return Object.keys(l)}function ge(g){return g=(g||"").toLowerCase(),l[g]||l[b[g]]}function tt(g,{languageName:x}){typeof g=="string"&&(g=[g]),g.forEach($=>{b[$.toLowerCase()]=x})}function nt(g){const x=ge(g);return x&&!x.disableAutodetect}function on(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=x=>{g["before:highlightBlock"](Object.assign({block:x.el},x))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=x=>{g["after:highlightBlock"](Object.assign({block:x.el},x))})}function an(g){on(g),k.push(g)}function cn(g){const x=k.indexOf(g);x!==-1&&k.splice(x,1)}function Ie(g,x){const $=g;k.forEach(function(j){j[$]&&j[$](x)})}function ln(g){return ve("10.7.0","highlightBlock will be removed entirely in v12.0"),ve("10.7.0","Please use highlightElement now."),He(g)}Object.assign(e,{highlight:W,highlightAuto:Ue,highlightAll:Re,highlightElement:He,highlightBlock:ln,configure:Qt,initHighlighting:en,initHighlightingOnLoad:tn,registerLanguage:nn,unregisterLanguage:sn,listLanguages:rn,getLanguage:ge,registerAliases:tt,autoDetection:nt,inherit:Ve,addPlugin:an,removePlugin:cn}),e.debugMode=function(){G=!1},e.safeMode=function(){G=!0},e.versionString=Xt,e.regex={concat:o,lookahead:t,either:N,optional:i,anyNumberOfTimes:s};for(const g in Oe)typeof Oe[g]=="object"&&n(Oe[g]);return Object.assign(e,Oe),e},_e=Qe({});return _e.newInstance=()=>Qe({}),Ge=_e,_e.HighlightJS=_e,_e.default=_e,Ge}var Mn=Tn();const Se=Nn(Mn),Be="[A-Za-z$_][0-9A-Za-z$_]*",mt=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],yt=["true","false","null","undefined","NaN","Infinity"],Et=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],vt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],_t=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],St=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],wt=[].concat(_t,Et,vt);function On(n){const a=n.regex,h=(U,{after:ee})=>{const ne="</"+U[0].slice(1);return U.input.indexOf(ne,ee)!==-1},c=Be,u={begin:"<>",end:"</>"},m=/<[A-Za-z0-9\\._:-]+\s*\/>/,v={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(U,ee)=>{const ne=U[0].length+U.index,re=U.input[ne];if(re==="<"||re===","){ee.ignoreMatch();return}re===">"&&(h(U,{after:ne})||ee.ignoreMatch());let le;const me=U.input.substring(ne);if(le=me.match(/^\s*=/)){ee.ignoreMatch();return}if((le=me.match(/^\s+extends\s+/))&&le.index===0){ee.ignoreMatch();return}}},S={$pattern:Be,keyword:mt,literal:yt,built_in:wt,"variable.language":St},f="[0-9](_?[0-9])*",O=`\\.(${f})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",r={className:"number",variants:[{begin:`(\\b(${d})((${O})|\\.)?|(${O}))[eE][+-]?(${f})\\b`},{begin:`\\b(${d})\\b((${O})\\b|\\.)?|(${O})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},t={className:"subst",begin:"\\$\\{",end:"\\}",keywords:S,contains:[]},s={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"xml"}},i={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"css"}},o={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"graphql"}},p={className:"string",begin:"`",end:"`",contains:[n.BACKSLASH_ESCAPE,t]},y={className:"comment",variants:[n.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:c+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),n.C_BLOCK_COMMENT_MODE,n.C_LINE_COMMENT_MODE]},M=[n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,p,{match:/\$\d+/},r];t.contains=M.concat({begin:/\{/,end:/\}/,keywords:S,contains:["self"].concat(M)});const R=[].concat(y,t.contains),B=R.concat([{begin:/(\s*)\(/,end:/\)/,keywords:S,contains:["self"].concat(R)}]),P={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:S,contains:B},w={variants:[{match:[/class/,/\s+/,c,/\s+/,/extends/,/\s+/,a.concat(c,"(",a.concat(/\./,c),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,c],scope:{1:"keyword",3:"title.class"}}]},L={relevance:0,match:a.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Et,...vt]}},X={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},te={variants:[{match:[/function/,/\s+/,c,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function de(U){return a.concat("(?!",U.join("|"),")")}const fe={match:a.concat(/\b/,de([..._t,"super","import"].map(U=>`${U}\\s*\\(`)),c,a.lookahead(/\s*\(/)),className:"title.function",relevance:0},ce={begin:a.concat(/\./,a.lookahead(a.concat(c,/(?![0-9A-Za-z$_(])/))),end:c,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},we={match:[/get|set/,/\s+/,c,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},be="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+n.UNDERSCORE_IDENT_RE+")\\s*=>",Ae={match:[/const|var|let/,/\s+/,c,/\s*/,/=\s*/,/(async\s*)?/,a.lookahead(be)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:S,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:L},illegal:/#(?![$_A-z])/,contains:[n.SHEBANG({label:"shebang",binary:"node",relevance:5}),X,n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,p,y,{match:/\$\d+/},r,L,{scope:"attr",match:c+a.lookahead(":"),relevance:0},Ae,{begin:"("+n.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[y,n.REGEXP_MODE,{className:"function",begin:be,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:S,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:u.begin,end:u.end},{match:m},{begin:v.begin,"on:begin":v.isTrulyOpeningTag,end:v.end}],subLanguage:"xml",contains:[{begin:v.begin,end:v.end,skip:!0,contains:["self"]}]}]},te,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+n.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,n.inherit(n.TITLE_MODE,{begin:c,className:"title.function"})]},{match:/\.\.\./,relevance:0},ce,{match:"\\$"+c,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},fe,z,w,we,{match:/\$[(.]/}]}}function xn(n){const a=n.regex,h=On(n),c=Be,u=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],m={begin:[/namespace/,/\s+/,n.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},v={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:u},contains:[h.exports.CLASS_REFERENCE]},S={className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/},f=["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"],O={$pattern:Be,keyword:mt.concat(f),literal:yt,built_in:wt.concat(u),"variable.language":St},d={className:"meta",begin:"@"+c},r=(o,p,N)=>{const y=o.contains.findIndex(M=>M.label===p);if(y===-1)throw new Error("can not find mode to replace");o.contains.splice(y,1,N)};Object.assign(h.keywords,O),h.exports.PARAMS_CONTAINS.push(d);const t=h.contains.find(o=>o.scope==="attr"),s=Object.assign({},t,{match:a.concat(c,a.lookahead(/\s*\?:/))});h.exports.PARAMS_CONTAINS.push([h.exports.CLASS_REFERENCE,t,s]),h.contains=h.contains.concat([d,m,v,s]),r(h,"shebang",n.SHEBANG()),r(h,"use_strict",S);const i=h.contains.find(o=>o.label==="func.def");return i.relevance=0,Object.assign(h,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),h}function Rn(n){const a=n.regex,h={},c={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[h]}]};Object.assign(h,{className:"variable",variants:[{begin:a.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},c]});const u={className:"subst",begin:/\$\(/,end:/\)/,contains:[n.BACKSLASH_ESCAPE]},m=n.inherit(n.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),v={begin:/<<-?\s*(?=\w+)/,starts:{contains:[n.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},S={className:"string",begin:/"/,end:/"/,contains:[n.BACKSLASH_ESCAPE,h,u]};u.contains.push(S);const f={match:/\\"/},O={className:"string",begin:/'/,end:/'/},d={match:/\\'/},r={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},n.NUMBER_MODE,h]},t=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],s=n.SHEBANG({binary:`(${t.join("|")})`,relevance:10}),i={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[n.inherit(n.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},o=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],p=["true","false"],N={match:/(\/[a-z._-]+)+/},y=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],M=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],R=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],B=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:o,literal:p,built_in:[...y,...M,"set","shopt",...R,...B]},contains:[s,n.SHEBANG(),i,r,m,v,N,S,f,O,d,h]}}const pt="[A-Za-z$_][0-9A-Za-z$_]*",In=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],kn=["true","false","null","undefined","NaN","Infinity"],At=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Nt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Tt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Cn=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ln=[].concat(Tt,At,Nt);function Dn(n){const a=n.regex,h=(U,{after:ee})=>{const ne="</"+U[0].slice(1);return U.input.indexOf(ne,ee)!==-1},c=pt,u={begin:"<>",end:"</>"},m=/<[A-Za-z0-9\\._:-]+\s*\/>/,v={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(U,ee)=>{const ne=U[0].length+U.index,re=U.input[ne];if(re==="<"||re===","){ee.ignoreMatch();return}re===">"&&(h(U,{after:ne})||ee.ignoreMatch());let le;const me=U.input.substring(ne);if(le=me.match(/^\s*=/)){ee.ignoreMatch();return}if((le=me.match(/^\s+extends\s+/))&&le.index===0){ee.ignoreMatch();return}}},S={$pattern:pt,keyword:In,literal:kn,built_in:Ln,"variable.language":Cn},f="[0-9](_?[0-9])*",O=`\\.(${f})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",r={className:"number",variants:[{begin:`(\\b(${d})((${O})|\\.)?|(${O}))[eE][+-]?(${f})\\b`},{begin:`\\b(${d})\\b((${O})\\b|\\.)?|(${O})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},t={className:"subst",begin:"\\$\\{",end:"\\}",keywords:S,contains:[]},s={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"xml"}},i={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"css"}},o={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,t],subLanguage:"graphql"}},p={className:"string",begin:"`",end:"`",contains:[n.BACKSLASH_ESCAPE,t]},y={className:"comment",variants:[n.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:c+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),n.C_BLOCK_COMMENT_MODE,n.C_LINE_COMMENT_MODE]},M=[n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,p,{match:/\$\d+/},r];t.contains=M.concat({begin:/\{/,end:/\}/,keywords:S,contains:["self"].concat(M)});const R=[].concat(y,t.contains),B=R.concat([{begin:/(\s*)\(/,end:/\)/,keywords:S,contains:["self"].concat(R)}]),P={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:S,contains:B},w={variants:[{match:[/class/,/\s+/,c,/\s+/,/extends/,/\s+/,a.concat(c,"(",a.concat(/\./,c),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,c],scope:{1:"keyword",3:"title.class"}}]},L={relevance:0,match:a.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...At,...Nt]}},X={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},te={variants:[{match:[/function/,/\s+/,c,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function de(U){return a.concat("(?!",U.join("|"),")")}const fe={match:a.concat(/\b/,de([...Tt,"super","import"].map(U=>`${U}\\s*\\(`)),c,a.lookahead(/\s*\(/)),className:"title.function",relevance:0},ce={begin:a.concat(/\./,a.lookahead(a.concat(c,/(?![0-9A-Za-z$_(])/))),end:c,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},we={match:[/get|set/,/\s+/,c,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},be="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+n.UNDERSCORE_IDENT_RE+")\\s*=>",Ae={match:[/const|var|let/,/\s+/,c,/\s*/,/=\s*/,/(async\s*)?/,a.lookahead(be)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:S,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:L},illegal:/#(?![$_A-z])/,contains:[n.SHEBANG({label:"shebang",binary:"node",relevance:5}),X,n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,s,i,o,p,y,{match:/\$\d+/},r,L,{scope:"attr",match:c+a.lookahead(":"),relevance:0},Ae,{begin:"("+n.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[y,n.REGEXP_MODE,{className:"function",begin:be,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:S,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:u.begin,end:u.end},{match:m},{begin:v.begin,"on:begin":v.isTrulyOpeningTag,end:v.end}],subLanguage:"xml",contains:[{begin:v.begin,end:v.end,skip:!0,contains:["self"]}]}]},te,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+n.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,n.inherit(n.TITLE_MODE,{begin:c,className:"title.function"})]},{match:/\.\.\./,relevance:0},ce,{match:"\\$"+c,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},fe,z,w,we,{match:/\$[(.]/}]}}function Bn(n){const a=n.regex,h=a.concat(/[\p{L}_]/u,a.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),c=/[\p{L}0-9._:-]+/u,u={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},m={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},v=n.inherit(m,{begin:/\(/,end:/\)/}),S=n.inherit(n.APOS_STRING_MODE,{className:"string"}),f=n.inherit(n.QUOTE_STRING_MODE,{className:"string"}),O={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:c,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[u]},{begin:/'/,end:/'/,contains:[u]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[m,f,S,v,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[m,v,f,S]}]}]},n.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},u,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[f]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[O],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[O],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:a.concat(/</,a.lookahead(a.concat(h,a.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:h,relevance:0,starts:O}]},{className:"tag",begin:a.concat(/<\//,a.lookahead(a.concat(h,/>/))),contains:[{className:"name",begin:h,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}Se.registerLanguage("typescript",xn);Se.registerLanguage("javascript",Dn);Se.registerLanguage("bash",Rn);Se.registerLanguage("xml",Bn);Se.configure({languages:["typescript","ts","javascript","js","bash","sh"],ignoreUnescapedHTML:!0,cssSelector:"pre code"});Se.highlightAll();Sn();
