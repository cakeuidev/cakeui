import{j as e,c as R,a as Lt,r as l,b as le,d as ze,e as Xt,f as Jt,g as At,h as _t}from"./index-BQgeAjAP.js";import{u as Ge,a as ht,r as ft,i as Bt,I as U,b as ie,P as gt,c as He,C as We,B as G,U as Vt,d as Ht,D as _e,S as st,e as Wt,f as zt,R as ct,g as ut,h as Gt,F as h,T as Ce,j as Se,k as dt,l as Ie,m as Ut,n as Kt,O as qt,M as Be,o as Ve,p as je,q as Re,s as Yt,L as M}from"./index-C9Nnhnm1.js";function mt(o){const{type:r="horizontal",...i}=o;return e.jsx("div",{...i,className:R("ui-divider",{[`ui-divider-${r}`]:r},i.className)})}function Qt(o){const{onChangeOpen:r,...i}=o,u=Lt(),f=l.useRef(null),[m,g]=Ge(i.ref),[x,T]=l.useState([0,0]),p=()=>{if(!f.current||!m.current||!Bt(f.current)){v.close();return}const[b,_]=x,{height:L,width:X}=m.current.getBoundingClientRect(),D={top:_,left:b};D.top+L>window.innerHeight&&(D.top-=L),D.top<0&&(D.top=0),D.left+X>window.innerWidth&&(D.left-=X),D.left<0&&(D.left=0),m.current.style.top=`${D.top}px`,m.current.style.left=`${D.left}px`},[y,v]=ht(m,void 0,r,p);return l.useEffect(()=>{if(f.current=m.current?.parentElement??null,!f.current)return;const b=_=>{_.preventDefault(),v.open(),T([_.clientX,_.clientY])};return f.current.addEventListener("contextmenu",b),()=>f.current?.removeEventListener("contextmenu",b)},[]),l.useEffect(()=>{!u&&m.current&&p()},[x]),le("resize",v.close),le("scroll",v.close,void 0,!0),ze(f,v.close),Xt(m,v.close),u?e.jsx("div",{ref:m,hidden:!0}):!y.remove&&ft.createPortal(e.jsx("div",{...i,className:R("ui-context-menu",{"ui-context-menu-close":y.close},i.className),ref:g,children:i.children}),document.body)}function Zt(o){const{open:r,onClose:i,position:u="top",type:f,duration:m=3e3,...g}=o,[x,T]=Ge(g.ref),[p,y]=ht(x,r,v=>!v&&i?.(),()=>x.current?.getBoundingClientRect());return l.useEffect(()=>{if(p.open&&m){const v=setTimeout(y.close,m);return()=>clearTimeout(v)}},[p.open]),!p.remove&&ft.createPortal(e.jsxs("div",{...g,className:R("ui-message",{[`ui-message-${u}`]:u,[`ui-message-${f}`]:f,"ui-message-close":p.close},g.className),ref:T,children:[f&&e.jsx(U,{className:"ui-message-icon",children:{info:"info",success:"check_circle",error:"cancel",warning:"error",loading:"progress_activity"}[f]}),e.jsx("span",{children:g.children})]}),document.body)}function pt(o){const[r,i]=l.useState(!1),[u,f]=l.useState();return[l.useMemo(()=>({open:(g,x,T)=>{i(!0),f(void 0),setTimeout(()=>f({type:g,message:x,duration:T}))},close:()=>i(!1)}),[]),u&&e.jsx(Zt,{open:r,onClose:()=>i(!1),position:o?.position,type:u.type,duration:u.duration,children:u.message})]}function yt(o){const{total:r=10,page:i,onChangePage:u,...f}=o,[m,g]=ie(i,u,1),x=l.useMemo(()=>{const p=[];let y=m??1;const v=y<1||y>r?1:y;for(let b=v-4;b<=r;b++){if(p.length===5){if(v<b-2)break;p.shift()}b>0&&p.push(b)}return p[0]!==1&&p.unshift(1),p[p.length-1]!==r&&r>0&&p.push(r),p.length<=5||(p[0]+1!==p[1]&&p.splice(1,0,"prev"),p[p.length-1]-1!==p[p.length-2]&&p.splice(p.length-1,0,"next")),p},[r,m]);l.useEffect(()=>{(!m||m<1||m>r)&&g(1)},[m,r]);const T=p=>{let y=(m??1)+p;y<1?y=1:y>r&&(y=r),g(y)};return e.jsxs("div",{...f,className:R("ui-pagination",f.className),children:[e.jsx(U,{className:R("ui-pagination-icon .ui-pagination-ellipsis",{"ui-disabled":m===1}),onClick:()=>T(-1),children:"keyboard_arrow_left"}),e.jsx("span",{className:"ui-pagination-group",children:x.map((p,y)=>typeof p=="string"?e.jsx(U,{className:"ui-pagination-icon",onClick:()=>g(p==="prev"?x[y+1]-1:x[y-1]+1),children:"more_horiz"},p):e.jsx("span",{className:R("ui-pagination-item",{"ui-pagination-active":p===m}),onClick:()=>g(p),children:p},p))}),e.jsx(U,{className:R("ui-pagination-icon",{"ui-disabled":m===r}),onClick:()=>T(1),children:"keyboard_arrow_right"})]})}function xt(o){return e.jsx("table",{...o,className:R("ui-table",o.className),children:o.children})}function bt(o){const{rowLength:r=1,colLength:i=1,rowHeight:u,colWidth:f,children:m,overscan:g=0,...x}=o,[T,p]=Ge(x.ref),[y,v]=l.useState({height:0,width:0}),[b,_]=l.useState({top:0,left:0}),[L,X,D,Fe]=l.useMemo(()=>{const F=Array.from({length:r}).map((E,S)=>u?.(S)),P=Array.from({length:i}).map((E,S)=>f?.(S)),w=F.reduce((E,S)=>E+(S??0),0),N=P.reduce((E,S)=>E+(S??0),0);return[F,P,w,N]},[r,i,u,f]),[we,pe]=l.useMemo(()=>{let F=[],P=0,w=-1,N=-1;for(let C=0;C<L.length;C++){const K=P+(L[C]??1/0);F.push({rowIndex:C,top:P,height:L[C]}),b.top+y.height>P&&b.top<K&&(w===-1&&(w=Math.max(C-g,0)),N=Math.min(C+g+1,L.length)),P=K}F=F.slice(w,N);let E=[],S=0;w=-1,N=-1;for(let C=0;C<X.length;C++){const K=S+(X[C]??1/0);E.push({colIndex:C,left:S,width:X[C]}),b.left+y.width>S&&b.left<K&&(w===-1&&(w=Math.max(C-g,0)),N=Math.min(C+g+1,X.length)),S=K}return E=E.slice(w,N),[F,E]},[y.height,y.width,b.top,b.left,L,X,g]);return ze(T,()=>{T.current&&v({height:T.current.clientHeight,width:T.current.clientWidth})}),e.jsx("div",{...x,className:R("ui-virtual-scroll",x.className),ref:p,onScroll:F=>{const P=F.target;_({top:P.scrollTop,left:P.scrollLeft}),x.onScroll?.(F)},children:e.jsx("div",{style:{height:D||void 0,width:Fe||void 0},children:we.map(({rowIndex:F,top:P,height:w})=>pe.map(({colIndex:N,left:E,width:S})=>e.jsx("div",{style:{top:P,left:E,height:w,width:S||"100%"},children:m?.(F,N)},`${F}-${N}`)))})})}const ee=o=>typeof o=="string"?o:JSON.stringify(o)??"";function Te(o){const{fields:r,data:i,idKey:u="id",gridlines:f=!0,pageSize:m,page:g,onChangePage:x,virtualScroll:T=!1,overscan:p=0,fieldHeight:y=32,fieldWidth:v,itemHeight:b,selection:_,onSelect:L,onHover:X,defaultSort:D,sort:Fe,onSort:we,defaultFilter:pe,filter:F,onFilter:P,filterMode:w="and",onResize:N,onDragField:E,fieldRender:S,cellRender:C,footer:K,...De}=o,k=l.useRef(null),B=l.useRef({}),Pe=l.useRef(null),he=l.useRef(null),se=l.useRef(0),V=l.useRef(null),q=l.useRef(null),[te,Ue]=l.useState(!0),[H,kt]=l.useState({height:0,width:0}),[vt,Ct]=l.useState({height:0,width:0}),[re,St]=l.useState({top:0,left:0}),[ae,It]=l.useState({}),[ce,jt]=l.useState({}),[Ke,qe]=l.useState(),[Ee,Rt]=l.useState({}),[ue,Ye]=ie(g,x,1),[$,Qe]=ie(_,L),[Me,fe]=ie(void 0,X),[J,Ze]=ie(Fe,we,D),[W,Oe]=ie(F,P,pe),[Tt,Ne]=l.useState(""),[$e,Ft]=l.useState(""),[Le,ge]=l.useState([]),[et,ne]=l.useState(),[Xe,tt]=l.useState(),[wt,rt]=l.useState(!1),[Dt,at]=l.useState(!1),ye=l.useMemo(()=>$e?Le.filter(a=>ee(a.value).toUpperCase().includes($e.toUpperCase())):Le,[Le,$e]),de=l.useMemo(()=>{if(!i)return[];let a=[...i];if(r&&W&&Object.values(W).find(s=>s.length)){const s=new Map(r.map(t=>[t.key,t]));a=a.filter(t=>{let c=!0;for(let[n,d]of Object.entries(W)){const O=s.get(n);if(O&&d.length){c=!1;const A=new Map(O.filterOptions?.map(I=>[I.value,I.rule]));for(let I=0;I<d.length;I++){const Z=d[I],Y=A.get(Z);if(c=Y?Y(t):ee(Z)===ee(t[n]),c)break}if(w==="and"&&!c||w==="or"&&c)break}}return c})}return J?.key&&J?.order&&a.sort((s,t)=>{let c=s[J.key],n=t[J.key],d;return typeof c=="string"&&typeof n=="string"?d=c.localeCompare(n):(Number.isFinite(c)&&(Number.isFinite(n)||typeof n=="string")||Number.isFinite(n)&&(Number.isFinite(c)||typeof n=="string")||typeof c=="boolean"&&typeof n=="boolean")&&(d=c-n),d!==void 0?J.order==="desc"?d*-1:d:(c=ee(c),n=ee(n),+(!c||c==="null")-+(!n||n==="null"))}),a},[r,i,W,w,J]),xe=l.useMemo(()=>{let a=de;if(m&&m>0&&ue&&ue>0){const s=(ue-1)*m;a=a.slice(s,s+m)}return a},[de,m,ue]),nt=l.useMemo(()=>{if(!r)return{};const a={};for(let s=0;s<r.length;s++)a[r[s].key]=v?.(r[s]);return a},[r,v]),[me,Pt]=l.useMemo(()=>{const a=xe.map(t=>Math.max(b?.(t)??32,24)),s=a.reduce((t,c)=>t+c,0);return[a,s]},[xe,b]),be=l.useMemo(()=>Math.max(y,24),[y]),oe=l.useMemo(()=>{if(!r)return{};const a={};for(let s=0;s<r.length;s++){const t=r[s].key;a[t]=Math.max(nt[t]??Ee[t]??Ke?.[t]??ae[t]??0,ce[t]??0)}return a},[r,nt,ae,ce,Ke,Ee]),[Je,Ae,Q]=l.useMemo(()=>{if(!r)return[[],[],[]];let a=[],s=[],t=[];for(let c=0;c<r.length;c++){const n=r[c],d=oe[n.key];n.fixed==="left"?a.push({field:n,width:d}):n.fixed==="right"?t.push({field:n,width:d}):s.push({field:n,width:d})}return[a,s,t]},[r,oe]),Et=l.useMemo(()=>{let a=[],s=be,t=-1,c=-1;for(let n=0;n<me.length;n++){const d=s+me[n];a.push({item:xe[n],top:s-be,height:me[n]}),(!T||(te?n<10+p:re.top+H.height>s&&re.top<d))&&(t===-1&&(t=Math.max(n-p,0)),c=Math.min(n+p+1,me.length)),s=d}return a.slice(t,c)},[xe,H.height,re.top,be,me,p,te]);l.useEffect(()=>{it()},[r]),l.useEffect(()=>{Ne("")},[r,i]),l.useEffect(()=>{const a=Object.keys(ae),s=a.reduce((c,n)=>c+ae[n],0),t={};if(s<H.width){let c=H.width;for(let n=0;n<a.length;n++)t[a[n]]=Math.floor(ae[a[n]]*H.width/s),c-=t[a[n]],n===a.length-1&&(t[a[n]]+=c);qe(t)}else qe(void 0)},[H.width,ae,te]),l.useEffect(()=>{Ye(1),k.current?.scrollTo({top:0})},[de]);const ot=()=>{if(!k.current)return;const{clientHeight:a,clientWidth:s,scrollWidth:t,scrollHeight:c}=k.current;a&&s&&(kt({height:a,width:s}),Ct({height:c,width:t}))},it=()=>{k.current?.clientWidth&&(Ue(!0),setTimeout(()=>{const a={},s={};for(let[t,c]of Object.entries(B.current))c&&(a[t]=c.offsetWidth,s[t]=c.firstElementChild.offsetWidth);It(a),jt(s),Ue(!1)}))},Mt=a=>{if(!i){ge([]);return}_t(100).then(()=>{if(a.filterOptions)ge(a.filterOptions);else{const s=[],t=[];for(let c=0;c<i.length;c++){const n=i[c][a.key],d=ee(i[c][a.key]);d&&!t.includes(d)&&(s.push(n),t.push(d))}ge(s.map((c,n)=>({value:c,label:t[n]})))}})},Ot=(a,s)=>{const t={[a]:[],...W},c=t[a];t[a]=c.includes(s)?c.filter(n=>n!==s):[...c,s],Oe(t)},ke=a=>{if(se.current)return;function s(){k.current&&(k.current.scrollLeft+=a,se.current=requestAnimationFrame(s))}se.current=requestAnimationFrame(s)},ve=()=>{cancelAnimationFrame(se.current),se.current=0};return ze(k,ot),Jt(k,ot,{childList:!0}),At(k,([a])=>a.isIntersecting&&te&&it()),le("mousemove",a=>{if(!V.current||!k.current)return;const s=a,{field:t,startX:c,scrollLeft:n}=V.current,d=k.current.scrollLeft-n,O=s.clientX-(c-d),A=t.fixed!=="right"?1:-1;if(V.current.width=Math.max(oe[t.key]+O*A,ce[t.key]),Pe.current){const Z=Math[A>0?"max":"min"](O,(ce[t.key]-oe[t.key])*A);Pe.current.style.translate=`${Z-d}px`}const I=k.current.getBoundingClientRect();V.current.width>ce[t.key]&&(s.clientX>I.right?ke(5):s.clientX<I.left?ke(-5):ve())},void 0,!0),le("mouseup",()=>{if(!V.current)return;const{field:a,width:s}=V.current;s!==oe[a.key]&&(Rt({...Ee,[a.key]:s}),N?.(a,s)),ve(),ne(void 0),rt(!1),V.current=null},void 0,!0),le("mousemove",a=>{if(!q.current||!k.current||!r)return;const s=a,{field:t,startX:c}=q.current,n=s.clientX-c,d=k.current.getBoundingClientRect(),O=B.current[t.key];if(!Xe&&O){const A=O.getBoundingClientRect();tt({left:A.left-d.left,width:oe[t.key]})}if(he.current){he.current.style.translate=`${n}px`;const A=he.current.getBoundingClientRect(),I=r.filter(j=>j.fixed===t.fixed),Z=I.indexOf(t);let Y=-1;if(n<0)for(let j=0;j<Z;j++){const z=B.current[I[j].key]?.getBoundingClientRect();if(z&&z.left>=A.left){Y=j;break}}else for(let j=I.length-1;j>Z;j--){const z=B.current[I[j].key]?.getBoundingClientRect();if(z&&z.right<=A.right){Y=j;break}}if(Y!==-1){const j=I[Y],z=B.current[j.key]?.getBoundingClientRect();if(z){let Nt=k.current.clientTop,lt=n<0?z.left-d.left:z.right-d.left,$t=j.fixed?10:9;j.fixed!=="left"&&Y===I.length-1&&(lt-=2),ne({top:Nt,left:lt,zIndex:$t}),q.current.targetIndex=r.indexOf(j)}}else ne(void 0),q.current.targetIndex=-1}s.clientX>d.right?ke(5):s.clientX<d.left?ke(-5):ve()},void 0,!0),le("mouseup",()=>{if(!q.current||!r)return;const{field:a,targetIndex:s}=q.current;if(s!==-1){const t=r.indexOf(a),c=[...r];c.splice(t,1),c.splice(s,0,a),E?.({sourceField:a,sourceIndex:t,targetIndex:s,newFields:c})}ve(),ne(void 0),tt(void 0),at(!1),q.current=null},void 0,!0),e.jsxs("div",{...De,className:R("ui-data-table",{"ui-data-table-gridlines":f,"ui-data-table-rendering":te,"ui-data-table-resizing":wt,"ui-data-table-dragging":Dt},De.className),children:[e.jsx("div",{ref:k,className:"ui-data-table-group",onScroll:a=>{const s=a.target;St({top:s.scrollTop,left:s.scrollLeft}),De.onScroll?.(a)},children:[Je,Ae,Q].map((a,s)=>!!a.length&&e.jsx("div",{className:R({"ui-data-table-left":a===Je,"ui-data-table-right":a===Q,"ui-data-table-main":a===Ae,"ui-data-table-shadow":a===Je&&re.left>=1||a===Q&&re.left+H.width<=vt.width-1}),children:e.jsxs(xt,{children:[e.jsx("thead",{children:e.jsx("tr",{children:a.map(({field:t,width:c})=>e.jsxs("th",{ref:n=>{B.current[t.key]=n},align:t.align,className:R({"ui-data-table-hover":t.key===Me?.key&&Me.id===void 0,"ui-data-table-selected":t.key===$?.key&&$.id===void 0}),style:{cursor:t.draggable&&t.key===$?.key&&$.id===void 0?"grab":""},children:[e.jsxs("div",{className:"ui-data-table-field",style:{height:be,width:c},onClick:()=>Qe({key:t.key}),onMouseEnter:()=>fe({key:t.key}),onMouseLeave:()=>fe({}),onMouseDown:n=>{const d=B.current[t.key];!t.draggable||!d||!(t.key===$?.key&&$.id===void 0)||(q.current={field:t,startX:n.clientX,targetIndex:-1},at(!0))},children:[e.jsx("div",{children:S?S(t):t.name}),t.sortable!==!1&&e.jsxs("div",{className:"ui-data-table-sort","data-sort":t.key===J?.key?J?.order:void 0,onMouseDown:n=>n.stopPropagation(),onClick:n=>{if(n.stopPropagation(),t.key===J?.key){const d=[void 0,"asc","desc"];Ze({key:t.key,order:d[d.indexOf(J.order)+1]})}else Ze({key:t.key,order:"asc"})},children:[e.jsx(U,{children:"arrow_drop_up"}),e.jsx(U,{children:"arrow_drop_down"})]}),t.filterable!==!1&&e.jsxs("div",{className:R("ui-data-table-filter",{"ui-data-table-filter-active":W?.[t.key]?.length}),onMouseDown:n=>n.stopPropagation(),onClick:n=>n.stopPropagation(),children:[e.jsx(U,{size:16,children:"filter_alt"}),e.jsxs(gt,{className:"ui-data-table-filter-popover",open:t.key===Tt,onChangeOpen:n=>{Ne(n?t.key:""),n?Mt(t):ge([])},trigger:"click",position:"bottom",children:[e.jsxs("div",{className:"ui-data-table-filter-body",children:[e.jsx(He,{onChange:n=>Ft(n.detail.value),placeholder:"Search"}),e.jsx(bt,{style:{height:140},rowLength:ye.length,rowHeight:()=>28,overscan:10,children:n=>e.jsx(We,{checked:W?.[t.key]?.includes(ye[n].value),onChange:()=>Ot(t.key,ye[n].value),children:ye[n].label})})]}),e.jsxs("div",{className:"ui-data-table-filter-action",children:[e.jsx(G,{onClick:()=>{Oe({...W,[t.key]:pe?.[t.key]??[]})},children:"Reset"}),e.jsx(G,{onClick:()=>{Oe({...W}),Ne("")},children:"OK"})]})]})]})]}),t.resizable&&e.jsx("div",{className:"ui-data-table-resize",style:{left:a===Q?-7:void 0,right:a!==Q?-7:void 0,width:15},onMouseEnter:()=>{const n=B.current[t.key];if(!k.current||!n)return;const d=k.current.getBoundingClientRect(),O=n.getBoundingClientRect();ne({top:k.current.clientTop,left:a!==Q?O.right-d.left-2:O.left-d.left,zIndex:a!==Ae?10:9})},onMouseLeave:()=>!V.current&&ne(void 0),onMouseDown:()=>{const n=B.current[t.key];if(!n)return;const d=n.getBoundingClientRect();V.current={field:t,startX:a!==Q?d.right-1:d.left+1,scrollLeft:re.left,width:c},rt(!0)}})]},t.key))})}),e.jsx("tbody",{style:te?void 0:{height:Pt},children:Et.map(({item:t,top:c,height:n})=>e.jsx("tr",{className:R({"ui-data-table-hover":t[u]===Me?.id,"ui-data-table-selected":t[u]===$?.id}),style:{top:c},children:a.map(({field:d,width:O})=>e.jsx("td",{align:d.align,className:R({"ui-data-table-selected":d.key===$?.key&&$.id===void 0}),onClick:()=>Qe({key:d.key,id:t[u]}),onMouseEnter:()=>fe({key:d.key,id:t[u]}),onMouseLeave:()=>fe({}),children:e.jsx("div",{className:"ui-data-table-cell",style:{height:n,width:O},children:C?C(d,t):ee(t[d.key])})},d.key))},t[u]))}),K&&e.jsx("tfoot",{children:e.jsx("tr",{children:a.map(({field:t,width:c})=>e.jsx("td",{align:t.align,className:R({"ui-data-table-selected":t.key===$?.key&&$.id===void 0}),children:e.jsx("div",{style:{width:c},children:K(t)})},t.key))})})]})},["left","main","right"][s]))}),et&&e.jsx("div",{ref:Pe,className:"ui-data-table-split-line",style:{height:H.height,width:2,...et}}),Xe&&e.jsx("div",{ref:he,className:"ui-data-table-drag-block",style:{height:H.height,...Xe}}),m&&e.jsx(yt,{total:de.length&&m?Math.ceil(de.length/m):1,page:ue,onChangePage:Ye})]})}const rr={Button:{examples:[{name:"Example",Component:()=>e.jsx(G,{children:"Button"}),code:`
import { Button } from '@cakeui/react'

export default () => {
  return (
    <Button>Button</Button>
  )
}
        `}],props:`
type ButtonProps = React.JSX.IntrinsicElements['button']
    `},Divider:{examples:[{name:"Horizontal",Component:()=>e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{children:"Item 1"}),e.jsx(mt,{}),e.jsx("div",{children:"Item 2"})]}),code:`
import { Divider } from '@cakeui/react'

export default () => {
  return (
    <>
      <div>Item 1</div>
      <Divider />
      <div>Item 2</div>
    </>
  )
}
        `},{name:"Vertical",Component:()=>e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Item 1"}),e.jsx(mt,{type:"vertical"}),e.jsx("span",{children:"Item 2"})]}),code:`
import { Divider } from '@cakeui/react'

export default () => {
  return (
    <>
      <div>Item 1</div>
      <Divider type='vertical' />
      <div>Item 2</div>
    </>
  )
}
        `}],props:`
type DividerProps = React.JSX.IntrinsicElements['div'] & {
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
}
    `},Icon:{examples:[{name:"Example",Component:()=>e.jsx(U,{children:"home"}),code:`
import { Icon } from '@cakeui/react'

export default () => {
  return (
    <Icon>home</Icon>
  )
}
        `}],props:`
// https://fonts.google.com/icons
type IconProps = React.JSX.IntrinsicElements['span'] & {
  family?: string // default: 'Material Symbols Rounded'
  size?: number   // default: 20
}
    `},Layout:{examples:[{name:"Example 1",Component:()=>e.jsxs(M,{style:{height:300,border:"1px solid lightgray"},children:[e.jsx(M.Header,{children:"Header"}),e.jsxs(M,{children:[e.jsx(M.Sider,{children:"Sider"}),e.jsx(M.Main,{children:"Main"}),e.jsx(M.Sider,{children:"Sider"})]}),e.jsx(M.Footer,{children:"Footer"})]}),code:`
import { Layout } from '@cakeui/react'

export default () => {
  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Main>Main</Layout.Main>
        <Layout.Sider>Sider</Layout.Sider>
      </Layout>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  )
}
        `},{name:"Example 2",Component:()=>e.jsxs(M,{style:{height:300,border:"1px solid lightgray"},children:[e.jsx(M.Sider,{children:"Sider"}),e.jsxs(M,{children:[e.jsx(M.Header,{children:"Header"}),e.jsx(M.Main,{children:"Main"}),e.jsx(M.Footer,{children:"Footer"})]}),e.jsx(M.Sider,{children:"Sider"})]}),code:`
import { Layout } from '@cakeui/react'

export default () => {
  return (
    <Layout>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout.Main>Main</Layout.Main>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <Layout.Sider>Sider</Layout.Sider>
    </Layout>
  )
}
        `}],props:`
type LayoutProps = React.JSX.IntrinsicElements['div']
type LayoutHeaderProps = React.JSX.IntrinsicElements['header']
type LayoutMainProps = React.JSX.IntrinsicElements['main']
type LayoutFooterProps = React.JSX.IntrinsicElements['header']
type LayoutSiderProps = React.JSX.IntrinsicElements['div']
    `},ThemeToggle:{examples:[{name:"Example",Component:()=>{const[o,r]=Yt();return e.jsx(U,{style:{cursor:"pointer"},onClick:r,children:o==="light"?"light_mode":"dark_mode"})},code:`
import { Icon, useThemeToggle } from '@cakeui/react'

export default () => {
  const [theme, toggle] = useThemeToggle()

  return (
    <Icon style={{ cursor: 'pointer' }} onClick={toggle}>
      {theme === 'light' ? 'light_mode' : 'dark_mode'}
    </Icon>
  )
}
        `}],props:`
function useThemeToggle(
  localStorageKey?: string // default: 'theme'
): [ThemeToggleValue, ThemeToggleFunction]

type ThemeToggleValue = 'light' | 'dark'
type ThemeToggleFunction = () => void
    `},ContextMenu:{examples:[{name:"Example",Component:()=>{const o={height:200,width:300,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray"};return e.jsxs("div",{style:o,children:["Right click me",e.jsx(Qt,{children:"Content"})]})},code:`
import { ContextMenu } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    height: 200,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    border: '1px solid lightgray'
  }

  return (
    <div style={style}>
      Right click me
      <ContextMenu>Content</ContextMenu>
    </div>
  )
}
        `}],props:`
type ContextMenuProps = React.JSX.IntrinsicElements['div'] & {
  onChangeOpen?: (open: boolean) => any
}
    `},Dialog:{examples:[{name:"Example",Component:()=>{const[o,r]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(G,{onClick:()=>r(!0),children:"Open Dialog"}),e.jsxs(Re,{open:o,onClose:()=>r(!1),children:[e.jsx(Re.Title,{children:"Title"}),e.jsx(Re.Content,{children:"Content"}),e.jsx(Re.Footer,{children:"Footer"})]})]})},code:`
import { useState } from 'react'
import { Button, Dialog } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Dialog.Title>Title</Dialog.Title>
        <Dialog.Content>Content</Dialog.Content>
        <Dialog.Footer>Footer</Dialog.Footer>
      </Dialog>
    </>
  )
}
        `}],props:`
type DialogProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  overlay?: boolean         // default: true
  outsideClosable?: boolean // default: true
}
type DialogTitleProps = React.JSX.IntrinsicElements['div']
type DialogContentProps = React.JSX.IntrinsicElements['div']
type DialogFooterProps = React.JSX.IntrinsicElements['div']
    `},Drawer:{examples:[{name:"Example",Component:()=>{const[o,r]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(G,{onClick:()=>r(!0),children:"Open Drawer"}),e.jsxs(je,{open:o,onClose:()=>r(!1),children:[e.jsx(je.Title,{children:"Title"}),e.jsx(je.Content,{children:"Content"}),e.jsx(je.Footer,{children:"Footer"})]})]})},code:`
import { useState } from 'react'
import { Button, Drawer } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Title>Title</Drawer.Title>
        <Drawer.Content>Content</Drawer.Content>
        <Drawer.Footer>Footer</Drawer.Footer>
      </Drawer>
    </>
  )
}
        `}],props:`
type DrawerProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onClose?: () => any
  position?: 'left' | 'right' | 'top' | 'bottom' // default: 'right'
  overlay?: boolean                              // default: true
  outsideClosable?: boolean                      // default: true
}
type DrawerTitleProps = React.JSX.IntrinsicElements['div']
type DrawerContentProps = React.JSX.IntrinsicElements['div']
type DrawerFooterProps = React.JSX.IntrinsicElements['div']
    `},Dropdown:{examples:[{name:"Example",Component:()=>e.jsxs(Ve,{children:[e.jsx(Ve.Trigger,{children:"Hover me"}),e.jsx(Ve.Content,{children:"Content"})]}),code:`
import { Dropdown } from '@cakeui/react'

export default () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>Hover me</Dropdown.Trigger>
      <Dropdown.Content>Content</Dropdown.Content>
    </Dropdown>
  )
}
        `}],props:`
type DropdownProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click'            // default: 'hover'
  position?: 'left' | 'right' | 'center' // default: 'left'
  offset?: number                        // default: 4
}
type DropdownTriggerProps = React.JSX.IntrinsicElements['div']
type DropdownContentProps = React.JSX.IntrinsicElements['div']
    `},Menu:{examples:[{name:"Horizontal",Component:()=>{const o={border:"1px solid lightgray"},r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",children:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(Be,{style:o,menus:r})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} />
  )
}
        `},{name:"Vertical",Component:()=>{const o={border:"1px solid lightgray"},r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",children:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(Be,{style:o,menus:r,type:"vertical"})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} type='vertical' />
  )
}
        `},{name:"Inline",Component:()=>{const o={border:"1px solid lightgray"},r=[{key:"1",name:"Item 1"},{key:"2",name:"Item 2"},{key:"3",name:"Group 3",children:[{key:"3-1",name:"Item 3-1"},{key:"3-2",name:"Item 3-2"},{key:"3-3",name:"Item 3-3"}]}];return e.jsx(Be,{style:o,menus:r,type:"vertical",inline:!0})},code:`
import { Menu, MenuItem } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    border: '1px solid lightgray'
  }
  const menus: MenuItem[] = [
    { key: '1', name: 'Item 1' },
    { key: '2', name: 'Item 2' },
    {
      key: '3',
      name: 'Group 3',
      children: [
        { key: '3-1', name: 'Item 3-1' },
        { key: '3-2', name: 'Item 3-2' },
        { key: '3-3', name: 'Item 3-3' }
      ]
    }
  ]

  return (
    <Menu style={style} menus={menus} type='vertical' inline />
  )
}
        `}],props:`
type MenuProps = React.JSX.IntrinsicElements['div'] & {
  menus?: MenuItem[]
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  type?: 'horizontal' | 'vertical' // default: 'horizontal'
  inline?: boolean                 // default: false
  indent?: number                  // default: 16
}
type MenuItem = {
  key: string
  name: React.ReactNode
  children?: MenuItem[]
  disabled?: boolean
}
    `},Message:{examples:[{name:"Example",Component:()=>{const[o,r]=pt();return e.jsxs(e.Fragment,{children:[r,e.jsx(G,{onClick:()=>o.open("info","Message"),children:"Show Message"})]})},code:`
import { Button, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Button onClick={() => message.open('info', 'Message')}>
        Show Message
      </Button>
    </>
  )
}
        `}],props:`
function useMessage(options?: MessageOptions): [MessageAPI, React.ReactNode]

type MessageOptions = {
  position?: MessagePosition  // default: 'top
}
type MessageAPI = {
  open: (
    type: MessageType,        // default: ''
    message: React.ReactNode,
    duration?: number         // default: 3000
  ) => void
  close: () => void
}
type MessagePosition = 'top' | 'bottom'
type MessageType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
    `},Overlay:{examples:[{name:"Example",Component:()=>{const[o,r]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(G,{onClick:()=>r(!0),children:"Open Overlay"}),e.jsx(qt,{open:o,onClick:()=>r(!1)})]})},code:`
import { useState } from 'react'
import { Button, Overlay } from '@cakeui/react'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Overlay</Button>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </>
  )
}
        `}],props:`
type OverlayProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
}
    `},Popover:{examples:[{name:"Example",Component:()=>e.jsxs(G,{children:["Hover me",e.jsx(gt,{children:"Content"})]}),code:`
import { Button, Popover } from '@cakeui/react'

export default () => {
  return (
    <Button>
      Hover me
      <Popover>Content</Popover>
    </Button>
  )
}
        `}],props:`
type PopoverProps = React.JSX.IntrinsicElements['div'] & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  trigger?: 'hover' | 'click'                   // default: 'hover'
  position?:                                    // default: 'top'
    'top' | 'top-left' | 'top-right' |
    'bottom' | 'bottom-left' | 'bottom-right' |
    'left' | 'left-top' | 'left-bottom' |
    'right' | 'right-top' | 'right-bottom'
  offset?: number                               // default: 4
}
    `},Toast:{examples:[{name:"Example",Component:()=>{const[o,r]=Kt();return e.jsxs(e.Fragment,{children:[r,e.jsx(G,{onClick:()=>o.open("info",{title:"Toast",description:"Description"}),children:"Show Toast"})]})},code:`
import { Button, useToast } from '@cakeui/react'

export default () => {
  const [toast, element] = useToast()

  return (
    <>
      {element}
      <Button onClick={() => toast.open('info', {
        title: 'Toast',
        description: 'Description'
      })}>
        Show Toast
      </Button>
    </>
  )
}
        `}],props:`
function useToast(options?: ToastOptions): [ToastAPI, React.ReactNode]

type ToastOptions = {
  position?: ToastPosition // default: 'top-right'
}
type ToastAPI = {
  open: (
    type: ToastType,       // default: ''
    body: ToastBody,
    duration?: number      // default: 5000
  ) => number
  close: (id: number) => void,
  clear: () => void
}
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type ToastType = '' | 'info' | 'success' | 'error' | 'warning' | 'loading'
type ToastBody = {
  title?: React.ReactNode
  description?: React.ReactNode
}
    `},Calendar:{examples:[{name:"Example",Component:()=>e.jsx(Ut,{}),code:`
import { Calendar } from '@cakeui/react'

export default () => {
  return (
    <Calendar />
  )
}
        `}],props:`
type CalendarProps = React.JSX.IntrinsicElements['div'] & {
  date?: dayjs.ConfigType
  onChangeDate?: (date: dayjs.Dayjs) => any
  arrows?: boolean // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  monthRender?: (year: number, month: number) => React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
}
    `},Card:{examples:[{name:"Example",Component:()=>e.jsxs(Ie,{children:[e.jsx(Ie.Title,{children:"Title"}),e.jsx(Ie.Content,{children:"Content"}),e.jsx(Ie.Footer,{children:"Footer"})]}),code:`
import { Card } from '@cakeui/react'

export default () => {
  return (
    <Card>
      <Card.Title>Title</Card.Title>
      <Card.Content>Content</Card.Content>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  )
}
        `}],props:`
type CardProps = React.JSX.IntrinsicElements['div']
type CardTitleProps = React.JSX.IntrinsicElements['div']
type CardContentProps = React.JSX.IntrinsicElements['div']
type CardFooterProps = React.JSX.IntrinsicElements['div']
    `},Carousel:{examples:[{name:"Example",Component:()=>{const[o]=l.useState(()=>Array.from({length:5}).map((r,i)=>({key:`${i+1}`,content:`item ${i+1}`})));return e.jsx(dt,{style:{height:200},infinite:!0,arrows:!0,draggable:!0,children:o.map(r=>e.jsx(dt.Item,{style:{width:"50%"},children:r.content},r.key))})},code:`
import { useState } from 'react'
import { Carousel } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from(({ length: 5 })).map((_, i) => ({
      key: \`\${i + 1}\`,
      content: \`item \${i + 1}\`
    }))
  ))

  return (
    <Carousel style={{ height: 200 }} infinite arrows draggable>
      {items.map((item) => (
        <Carousel.Item key={item.key} style={{ width: '50%' }}>
          {item.content}
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
        `}],props:`
type CarouselProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  infinite?: boolean     // default: false
  arrows?: boolean       // default: false
  dots?: boolean         // default: true
  draggable?: boolean    // default: false
  autoplay?: boolean     // default: false
  autoplayDelay?: number // default: 3000
}
type CarouselItemProps = React.JSX.IntrinsicElements['div']
    `},Collapse:{examples:[{name:"Example",Component:()=>{const[o]=l.useState(()=>Array.from({length:3}).map((r,i)=>({key:`${i+1}`,trigger:`Trigger ${i+1}`,content:`Content ${i+1}`})));return e.jsx(Se,{children:o.map(r=>e.jsxs(Se.Item,{children:[e.jsx(Se.Trigger,{children:r.trigger}),e.jsx(Se.Content,{children:r.content})]},r.key))})},code:`
import { useState } from 'react'
import { Collapse } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`\${i + 1}\`,
      trigger: \`Trigger \${i + 1}\`,
      content: \`Content \${i + 1}\`
    }))
  ))

  return (
    <Collapse>
      {items.map((item) => (
        <Collapse.Item key={item.key}>
          <Collapse.Trigger>{item.trigger}</Collapse.Trigger>
          <Collapse.Content>{item.content}</Collapse.Content>
        </Collapse.Item>
      ))}
    </Collapse>
  )
}
        `}],props:`
type CollapseProps = React.JSX.IntrinsicElements['div'] & {
  openKeys?: string[]
  onChangeOpenKeys?: (keys: string[]) => any
}
type CollapseItemProps = React.JSX.IntrinsicElements['div']
type CollapseTriggerProps = React.JSX.IntrinsicElements['div']
type CollapseContentProps = React.JSX.IntrinsicElements['div']
    `},Pagination:{examples:[{name:"Example",Component:()=>e.jsx(yt,{}),code:`
import { Pagination } from '@cakeui/react'

export default () => {
  return (
    <Pagination />
  )
}
        `}],props:`
type PaginationProps = React.JSX.IntrinsicElements['div'] & {
  total?: number // default: 10
  page?: number
  onChangePage?: (page: number) => any
}
    `},Table:{examples:[{name:"Example",Component:()=>{const[o]=l.useState(()=>Array.from({length:3}).map((i,u)=>({key:`key${u+1}`,name:`col ${u+1}`}))),[r]=l.useState(()=>Array.from({length:3}).map((i,u)=>({id:u,...o.reduce((f,m,g)=>({...f,[m.key]:`data ${u+1}-${g+1}`}),{})})));return e.jsxs(xt,{children:[e.jsx("thead",{children:e.jsx("tr",{children:o.map(i=>e.jsx("th",{children:i.name},i.key))})}),e.jsx("tbody",{children:r.map(i=>e.jsx("tr",{children:o.map(u=>e.jsx("td",{children:i[u.key]},u.key))},i.id))}),e.jsx("tfoot",{children:e.jsx("tr",{children:e.jsx("td",{colSpan:3,align:"center",children:"footer"})})})]})},code:`
import { useState } from 'react'
import { Table } from '@cakeui/react'

export default () => {
  const [cols] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`
    }))
  ))
  const [data] = useState<{ [k: string]: any }[]>(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      ...cols.reduce((prev, curr, j) => ({
        ...prev,
        [curr.key]: \`data \${i + 1}-\${j + 1}\`
      }), {})
    }))
  ))

  return (
    <Table>
      <thead>
        <tr>
          {cols.map((col) => (
            <th key={col.key}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {cols.map((col) => (
              <td key={col.key}>{item[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} align='center'>footer</td>
        </tr>
      </tfoot>
    </Table>
  )
}
        `}],props:`
type TableProps = React.JSX.IntrinsicElements['table']
    `},Tabs:{examples:[{name:"Example",Component:()=>{const[o]=l.useState(()=>Array.from({length:3}).map((r,i)=>({key:`${i+1}`,trigger:`Tab ${i+1}`,content:`Content ${i+1}`})));return e.jsxs(Ce,{children:[e.jsx(Ce.List,{children:o.map(r=>e.jsx(Ce.Trigger,{children:r.trigger},r.key))}),o.map(r=>e.jsx(Ce.Content,{children:r.content},r.key))]})},code:`
import { useState } from 'react'
import { Tabs } from '@cakeui/react'

export default () => {
  const [items] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      key: \`\${i + 1}\`,
      trigger: \`Tab \${i + 1}\`,
      content: \`Content \${i + 1}\`
    }))
  ))

  return (
    <Tabs>
      <Tabs.List>
        {items.map((item) => (
          <Tabs.Trigger key={item.key}>{item.trigger}</Tabs.Trigger>
        ))}
      </Tabs.List>
      {items.map((item) => (
        <Tabs.Content key={item.key}>{item.content}</Tabs.Content>
      ))}
    </Tabs>
  )
}
        `}],props:`
type TabsProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  destroyInactive?: boolean // default: false
}
type TabsListProps = React.JSX.IntrinsicElements['div']
type TabsTriggerProps = React.JSX.IntrinsicElements['div']
type TabsContentProps = React.JSX.IntrinsicElements['div']
    `},VirtualScroll:{examples:[{name:"Example",Component:()=>{const o={height:300,width:300,border:"1px solid lightgray"},r=l.useCallback(()=>60,[]),i=l.useCallback(()=>60,[]);return e.jsx(bt,{style:o,rowLength:100,colLength:100,rowHeight:r,colWidth:i,children:(u,f)=>`${u}-${f}`})},code:`
import { useCallback } from 'react'
import { VirtualScroll } from '@cakeui/react'

export default () => {
  const style: React.CSSProperties = {
    height: 300,
    width: 300,
    border: '1px solid lightgray'
  }
  const rowHeight = useCallback(() => 60, [])
  const colWidth = useCallback(() => 60, [])

  return (
    <VirtualScroll
      style={style}
      rowLength={100}
      colLength={100}
      rowHeight={rowHeight}
      colWidth={colWidth}
    >
      {(rowIndex, colIndex) => \`\${rowIndex}-\${colIndex}\`}
    </VirtualScroll>
  )
}
        `}],props:`
type VirtualScrollProps = Omit<
  React.JSX.IntrinsicElements['div'], 'children'
> & {
  rowLength?: number
  colLength?: number
  rowHeight?: (index: number) => number
  colWidth?: (index: number) => number
  children?: (rowIndex: number, colIndex: number) => React.ReactNode
  overscan?: number
}
    `},DataTable:{examples:[{name:"Example",Component:()=>{const[o]=l.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((i,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[r]=l.useState(()=>Array.from({length:10}).map((i,u)=>({...o.reduce((f,m,g)=>({...f,[m.key]:`data ${u}-${g}`}),{}),id:u})));return e.jsx(Te,{style:{height:364},fields:o,data:r})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i}-\${j}\`
      }), {}),
      id: i
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
    />
  )
}
        `},{name:"Pagination",Component:()=>{const[o]=l.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((i,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[r]=l.useState(()=>Array.from({length:100}).map((i,u)=>({...o.reduce((f,m,g)=>({...f,[m.key]:`data ${u}-${g}`}),{}),id:u})));return e.jsx(Te,{style:{height:404},fields:o,data:r,pageSize:10})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 100 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i}-\${j}\`
      }), {}),
      id: i
    }))
  ))

  return (
    <DataTable
      style={{ height: 404 }}
      fields={fields}
      data={data}
      pageSize={10}
    />
  )
}
        `},{name:"VirtualScroll",Component:()=>{const[o]=l.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((i,u)=>({key:`key${u+1}`,name:`col ${u+1}`,resizable:!0}))]),[r]=l.useState(()=>Array.from({length:2e4}).map((i,u)=>({...o.reduce((f,m,g)=>({...f,[m.key]:`data ${u}-${g}`}),{}),id:u})));return e.jsx(Te,{style:{height:364},fields:o,data:r,virtualScroll:!0})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 1000 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      resizable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i}-\${j}\`
      }), {}),
      id: i
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
      virtualScroll
    />
  )
}
        `},{name:"Draggable",Component:()=>{const[o,r]=l.useState(()=>[{key:"id",name:"id",fixed:"left"},...Array.from({length:10}).map((u,f)=>({key:`key${f+1}`,name:`col ${f+1}`,draggable:!0}))]),[i]=l.useState(()=>Array.from({length:10}).map((u,f)=>({...o.reduce((m,g,x)=>({...m,[g.key]:`data ${f}-${x}`}),{}),id:f})));return e.jsx(Te,{style:{height:364},fields:o,data:i,onDragField:u=>r(u.newFields)})},code:`
import { useState } from 'react'
import { DataTable } from '@cakeui/react'

export default () => {
  const [fields, setFields] = useState<DataTable.Field[]>(() => [
    {
      key: 'id',
      name: 'id',
      fixed: 'left'
    },
    ...Array.from({ length: 10 }).map((_, i) => ({
      key: \`key\${i + 1}\`,
      name: \`col \${i + 1}\`,
      draggable: true
    }))
  ])
  const [data] = useState<DataTable.DataItem[]>(() => (
    Array.from({ length: 10 }).map((_, i) => ({
      ...fields.reduce((prev, field, j) => ({
        ...prev,
        [field.key]: \`data \${i}-\${j}\`
      }), {}),
      id: i
    }))
  ))

  return (
    <DataTable
      style={{ height: 364 }}
      fields={fields}
      data={data}
      onDragField={(result) => setFields(result.newFields)}
    />
  )
}
        `}],props:`
type DataTableProps = React.JSX.IntrinsicElements['div'] & {
  fields?: DataTableField[]
  data?: DataTableItem[]
  idKey?: string                      // default: 'id'
  gridlines?: boolean                 // default: true
  pageSize?: number
  page?: number
  onChangePage?: (page: number) => any
  virtualScroll?: boolean             // default: false
  overscan?: number
  fieldHeight?: number                // default: 32
  fieldWidth?: (field: DataTableField) => number
  itemHeight?: (item: DataTableItem) => number
  selection?: DataTableTarget
  onSelect?: (selection: DataTableTarget) => any
  onHover?: (hover: DataTableTarget) => any
  defaultSort?: DataTableSort
  sort?: DataTableSort
  onSort?: (sort: DataTableSort) => any
  defaultFilter?: DataTableFilter
  filter?: DataTableFilter
  onFilter?: (filter: DataTableFilter) => any
  filterMode?: 'and' | 'or'           // default: 'and'
  onResize?: (field: DataTableField, width: number) => any
  onDragField?: (result: DataTableDragResult) => any
  fieldRender?: (field: DataTableField) => React.ReactNode
  cellRender?: (field: DataTableField, item: DataTableItem) => React.ReactNode
  footer?: (field: DataTableField) => React.ReactNode
}
type DataTableField = {
  key: string
  name: string
  fixed?: 'left' | 'right'
  align?: 'left' | 'right' | 'center' // default: 'left'
  sortable?: boolean                  // default: true
  filterable?: boolean                // default: true
  filterOptions?: DataTableFilterOption[]
  resizable?: boolean                 // default: false
  draggable?: boolean                 // default: false
}
type DataTableItem = {
  [k: string]: any
}
type DataTableTarget = {
  key?: string
  id?: any
}
type DataTableSort = {
  key?: string
  order?: 'asc' | 'desc'
}
type DataTableFilter = {
  [k: string]: any[]
}
type DataTableFilterOption = {
  value: any,
  label: React.ReactNode
  rule?: (item: DataTableItem) => boolean
}
type DataTableDragResult = {
  newFields: DataTableField[]
  sourceField: DataTableField
  sourceIndex: number
  targetIndex: number
}
    `},Form:{examples:[{name:"All Fields",Component:()=>e.jsxs(h,{cols:2,children:[e.jsx(h.Item,{title:"Text",children:e.jsx(h.Input,{name:"text"})}),e.jsx(h.Item,{title:"Password",children:e.jsx(h.Password,{name:"password"})}),e.jsx(h.Item,{title:"Number",children:e.jsx(h.InputNumber,{name:"number"})}),e.jsx(h.Item,{title:"Textarea",children:e.jsx(h.Textarea,{name:"textarea",autoRows:!0})}),e.jsx(h.Item,{title:"Radio",children:e.jsx(h.Radio,{name:"radio",children:"Radio"})}),e.jsx(h.Item,{title:"Radio Group",children:e.jsx(h.RadioGroup,{name:"radioGroup",options:[{value:"1",label:"radio 1"},{value:"2",label:"radio 2"},{value:"3",label:"radio 3"}]})}),e.jsx(h.Item,{title:"Checkbox",children:e.jsx(h.Checkbox,{name:"checkbox",children:"checkbox"})}),e.jsx(h.Item,{title:"Checkbox Group",children:e.jsx(h.CheckboxGroup,{name:"checkboxGroup",options:[{value:"1",label:"checkbox 1"},{value:"2",label:"checkbox 2"},{value:"3",label:"checkbox 3"}]})}),e.jsx(h.Item,{title:"Switch",children:e.jsx(h.Switch,{name:"switch"})}),e.jsx(h.Item,{title:"Slider",children:e.jsx(h.Slider,{name:"slider"})}),e.jsx(h.Item,{title:"Select",children:e.jsx(h.Select,{name:"select",options:[{value:"1",label:"option 1"},{value:"2",label:"option 2"},{value:"3",label:"option 3"}]})}),e.jsx(h.Item,{title:"Select Multiple",children:e.jsx(h.Select,{name:"selectMultiple",options:[{value:"1",label:"option 1"},{value:"2",label:"option 2"},{value:"3",label:"option 3"}],multiple:!0})}),e.jsx(h.Item,{title:"Date",children:e.jsx(h.DatePicker,{name:"date"})}),e.jsx(h.Item,{title:"Datetime",children:e.jsx(h.DatePicker,{name:"datetime",type:"datetime"})}),e.jsx(h.Item,{title:"Time",children:e.jsx(h.DatePicker,{name:"time",type:"time"})}),e.jsx(h.Item,{title:"Color",children:e.jsx(h.ColorPicker,{name:"color"})}),e.jsx(h.Item,{title:"Upload",children:e.jsx(h.Upload,{name:"upload"})}),e.jsx(h.Item,{colSpan:2,style:{textAlign:"center"},children:e.jsx(h.Button,{children:"Submit"})})]}),code:`
import { Form } from '@cakeui/react'

export default () => {
  return (
    <Form cols={2}>
      <Form.Item title='Text'>
        <Form.Input name='text' />
      </Form.Item>
      <Form.Item title='Password'>
        <Form.Password name='password' />
      </Form.Item>
      <Form.Item title='Number'>
        <Form.InputNumber name='number' />
      </Form.Item>
      <Form.Item title='Textarea'>
        <Form.Textarea name='textarea' autoRows />
      </Form.Item>
      <Form.Item title='Radio'>
        <Form.Radio name='radio' />
      </Form.Item>
      <Form.Item title='Radio Group'>
        <Form.RadioGroup
          name='radioGroup'
          options={[
            { value: '1', label: 'radio 1' },
            { value: '2', label: 'radio 2' },
            { value: '3', label: 'radio 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Checkbox'>
        <Form.Checkbox name='checkbox'>checkbox</Form.Checkbox>
      </Form.Item>
      <Form.Item title='Checkbox Group'>
        <Form.CheckboxGroup
          name='checkboxGroup'
          options={[
            { value: '1', label: 'checkbox 1' },
            { value: '2', label: 'checkbox 2' },
            { value: '3', label: 'checkbox 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Switch'>
        <Form.Switch name='switch' />
      </Form.Item>
      <Form.Item title='Slider'>
        <Form.Slider name='slider' />
      </Form.Item>
      <Form.Item title='Select'>
        <Form.Select
          name='select'
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' }
          ]}
        />
      </Form.Item>
      <Form.Item title='Select Multiple'>
        <Form.Select
          name='selectMultiple'
          options={[
            { value: '1', label: 'option 1' },
            { value: '2', label: 'option 2' },
            { value: '3', label: 'option 3' }
          ]}
          multiple
        />
      </Form.Item>
      <Form.Item title='Date'>
        <Form.DatePicker name='date' />
      </Form.Item>
      <Form.Item title='Datetime'>
        <Form.DatePicker name='datetime' type='datetime' />
      </Form.Item>
      <Form.Item title='Time'>
        <Form.DatePicker name='time' type='time' />
      </Form.Item>
      <Form.Item title='Color'>
        <Form.ColorPicker name='color' />
      </Form.Item>
      <Form.Item title='Upload'>
        <Form.Upload name='upload' />
      </Form.Item>
      <Form.Item colSpan={2} style={{ textAlign: 'center' }}>
        <Form.Button>Submit</Form.Button>
      </Form.Item>
    </Form>
  )
}
        `},{name:"Validation",Component:()=>{const[o,r]=pt();return e.jsxs(e.Fragment,{children:[r,e.jsxs(h,{onSubmit:()=>o.open("success","Form submitted!"),children:[e.jsx(h.Item,{title:"Username",validate:i=>{if(i){if(i.length<8)return"Username must be at least 8 characters."}else return"Username is required."},children:e.jsx(h.Input,{name:"username"})}),e.jsx(h.Item,{title:"Password",validate:i=>{if(i){if(i.length<8)return"Password must be at least 8 characters."}else return"Password is required."},children:e.jsx(h.Password,{name:"password"})}),e.jsx(h.Item,{colSpan:2,style:{textAlign:"center"},children:e.jsx(h.Button,{children:"Submit"})})]})]})},code:`
import { Form, useMessage } from '@cakeui/react'

export default () => {
  const [message, element] = useMessage()

  return (
    <>
      {element}
      <Form onSubmit={() => message.open('success', 'Form submitted!')}>
        <Form.Item
          title='Username'
          validate={(v: string) => {
            if (!v) {
              return 'Username is required.'
            } else if (v.length < 8) {
              return 'Username must be at least 8 characters.'
            }
          }}
        >
          <Form.Input name='username' />
        </Form.Item>
        <Form.Item
          title='Password'
          validate={(v: string) => {
            if (!v) {
              return 'Password is required.'
            } else if (v.length < 8) {
              return 'Password must be at least 8 characters.'
            }
          }}
        >
          <Form.Password name='password' />
        </Form.Item>
        <Form.Item colSpan={2} style={{ textAlign: 'center' }}>
          <Form.Button>Submit</Form.Button>
        </Form.Item>
      </Form>
    </>
  )
}
        `}],props:`
type FormProps = Omit<
  React.JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'
> & {
  defaultValues?: FormValues
  values?: FormValues
  onChange?: (key: string, value: any) => any
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, values: FormValues) => any
  cols?: number        // default: 1
  rowGap?: number      // default: 0
  colGap?: number      // default: 16
  colMinWidth?: number // default: 160
}
type FormItemProps = Omit<
  React.JSX.IntrinsicElements['div'], 'title'
> & {
  title?: React.ReactNode
  info?: React.ReactNode
  rowSpan?: number     // default: 1
  colSpan?: number     // default: 1
  validate?: (value: any) => string | undefined
}
type FormValues<T = { [k: string]: any }> = T
    `},Input:{examples:[{name:"Text",Component:()=>e.jsx(He,{}),code:`
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input />
  )
}
        `},{name:"Password",Component:()=>e.jsx(He.Password,{}),code:`
import { Input } from '@cakeui/react'

export default () => {
  return (
    <Input.Password />
  )
}
        `}],props:`
type InputProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  before?: React.ReactNode
  after?: React.ReactNode
}
type InputPasswordProps = Props & {
  visibilityToggle?: boolean // default: true
}
    `},InputNumber:{examples:[{name:"Example",Component:()=>e.jsx(Gt,{}),code:`
import { InputNumber } from '@cakeui/react'

export default () => {
  return (
    <InputNumber />
  )
}
        `}],props:`
type InputNumberProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
  controls?: boolean // default: true
  before?: React.ReactNode
  after?: React.ReactNode
}
    `},Textarea:{examples:[{name:"Example",Component:()=>e.jsx(ut,{}),code:`
import { Textarea } from '@cakeui/react'

export default () => {
  return (
    <Textarea autoRows />
  )
}
        `},{name:"Auto Rows",Component:()=>e.jsx(ut,{autoRows:!0}),code:`
import { Textarea } from '@cakeui/react'

export default () => {
  return (
    <Textarea />
  )
}
        `}],props:`
type TextareaProps = Omit<
  React.JSX.IntrinsicElements['textarea'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  autoRows?: boolean // default: false
}
    `},Radio:{examples:[{name:"Example",Component:()=>e.jsx(ct,{children:"radio"}),code:`
import { Radio } from '@cakeui/react'

export default () => {
  return (
    <Radio>radio</Radio>
  )
}
        `},{name:"Group",Component:()=>{const[o]=l.useState(()=>Array.from({length:3}).map((r,i)=>({value:`${i+1}`,label:`radio ${i+1}`})));return e.jsx(ct.Group,{options:o})},code:`
import { useState } from 'react'
import { Radio } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`radio \${i + 1}\`
    }))
  ))

  return (
    <Radio.Group options={options} />
  )
}
        `}],props:`
type RadioProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
type RadioGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  options?: RadioOption[]
}
type RadioOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}
    `},Checkbox:{examples:[{name:"Example",Component:()=>e.jsx(We,{children:"checkbox"}),code:`
import { Checkbox } from '@cakeui/react'

export default () => {
  return (
    <Checkbox>checkbox</Checkbox>
  )
}
        `},{name:"Group",Component:()=>{const[o]=l.useState(()=>Array.from({length:3}).map((r,i)=>({value:`${i+1}`,label:`checkbox ${i+1}`})));return e.jsx(We.Group,{options:o})},code:`
import { useState } from 'react'
import { Checkbox } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 3 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`checkbox \${i + 1}\`
    }))
  ))

  return (
    <Checkbox.Group options={options} />
  )
}
        `}],props:`
type CheckboxProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
  indeterminate?: boolean // default: false
}
type CheckboxGroupProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
  options?: CheckboxOption[]
}
type CheckboxOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}
    `},Switch:{examples:[{name:"Example",Component:()=>e.jsx(zt,{}),code:`
import { Switch } from '@cakeui/react'

export default () => {
  return (
    <Switch />
  )
}
        `}],props:`
type SwitchProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: boolean
  value?: boolean
  onChange?: (event: CustomEvent<{ value: boolean }>) => any
}
    `},Slider:{examples:[{name:"Example",Component:()=>e.jsx(Wt,{}),code:`
import { Slider } from '@cakeui/react'

export default () => {
  return (
    <Slider />
  )
}
        `}],props:`
type SliderProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: number
  value?: number
  onChange?: (event: CustomEvent<{ value: number }>) => any
}
    `},Select:{examples:[{name:"Single",Component:()=>{const[o]=l.useState(()=>Array.from({length:5}).map((r,i)=>({value:`${i+1}`,label:`Option ${i+1}`})));return e.jsx(st,{options:o})},code:`
import { useState } from 'react'
import { Select } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`Option \${i + 1}\`
    }))
  ))

  return (
    <Select options={options} />
  )
}
        `},{name:"Multiple",Component:()=>{const[o]=l.useState(()=>Array.from({length:5}).map((r,i)=>({value:`${i+1}`,label:`Option ${i+1}`})));return e.jsx(st,{options:o,multiple:!0})},code:`
import { useState } from 'react'
import { Select } from '@cakeui/react'

export default () => {
  const [options] = useState(() => (
    Array.from({ length: 5 }).map((_, i) => ({
      value: \`\${i + 1}\`,
      label: \`Option \${i + 1}\`
    }))
  ))

  return (
    <Select options={options} multiple />
  )
}
        `}],props:`
type SelectProps = SelectCommonProps & (SelectSingleProps | SelectMultipleProps)
type SelectCommonProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  options?: SelectOption[]
  optionsMaxHeight?: number
  clearable?: boolean
  before?: React.ReactNode
  after?: React.ReactNode
  optionRender?: (option: SelectOption) => React.ReactNode
  tagRender?: (option: SelectOption) => React.ReactNode
}
type SelectSingleProps = {
  multiple?: false
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
type SelectMultipleProps = {
  multiple: true
  defaultValue?: string[]
  value?: string[]
  onChange?: (event: CustomEvent<{ value: string[] }>) => any
}
type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}
    `},DatePicker:{examples:[{name:"Date",Component:()=>e.jsx(_e,{}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker />
  )
}
        `},{name:"Datetime",Component:()=>e.jsx(_e,{type:"datetime"}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='datetime' />
  )
}
        `},{name:"Time",Component:()=>e.jsx(_e,{type:"time"}),code:`
import { DatePicker } from '@cakeui/react'

export default () => {
  return (
    <DatePicker type='time' />
  )
}
        `}],props:`
type DatePickerProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: dayjs.ConfigType
  value?: dayjs.ConfigType
  onChange?: (event: CustomEvent<{ value: dayjs.Dayjs | null }>) => any
  open?: boolean
  onChangeOpen?: (open: boolean) => any
  type?: 'date' | 'datetime' | 'time' // default: 'date'
  format?: string
  showSeconds?: boolean               // default: false
  use12Hour?: boolean                 // default: true
  minDate?: dayjs.ConfigType
  maxDate?: dayjs.ConfigType
  disabledDate?: (date: dayjs.Dayjs) => boolean
  disabledHours?: () => number[]
  disabledMinutes?: (hour?: number) => number[]
  disabledSeconds?: (hour?: number, minute?: number) => number[]
  hideDisabled?: boolean              // default: false
  clearable?: boolean                 // default: true
  before?: React.ReactNode
  after?: React.ReactNode
  footer?: React.ReactNode
  monthRender?: (year: number, month: number) => React.ReactNode
  weekRender?: (week: number) => React.ReactNode
  dateRender?: (date: dayjs.Dayjs) => React.ReactNode
  timeRender?: (type: 'hour' | 'minute' | 'second', n: number) => React.ReactNode
}
    `},ColorPicker:{examples:[{name:"Example",Component:()=>e.jsx(Ht,{}),code:`
import { ColorPicker } from '@cakeui/react'

export default () => {
  return (
    <ColorPicker />
  )
}
        `}],props:`
type ColorPickerProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  onChange?: (event: CustomEvent<{ value: string }>) => any
}
    `},Upload:{examples:[{name:"Example",Component:()=>e.jsx(Vt,{}),code:`
import { Upload } from '@cakeui/react'

export default () => {
  return (
    <Upload />
  )
}
        `}],props:`
type UploadProps = Omit<
  React.JSX.IntrinsicElements['input'], 'defaultValue' | 'value' | 'onChange'
> & {
  defaultValue?: File[]
  value?: File[]
  onChange?: (event: CustomEvent<{ value: File[] }>) => any
  max?: number
  trigger?: React.ReactNode
  fileRender?: (file: File) => React.ReactNode
}
    `}};export{rr as default};
