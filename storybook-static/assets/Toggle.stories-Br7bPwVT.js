import{d as A,i as l,o as e,c as a,a as w,b as B,m as P,e as s,f as o,r as b}from"./iframe-Zdi-dMOP.js";import p from"./Toggle-NTVOdljn.js";import"./preload-helper-C1FmrZbK.js";import"./index-1evVQkiP.js";import"./utils-BLSKlp9E.js";import"./useForwardPropsEmits-B-vztXC0.js";import"./useForwardProps-A8ih6vWR.js";import"./VisuallyHidden-BV-q35jK.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./Primitive-CJPFcwce.js";import"./useForwardExpose-5aLqJNSJ.js";import"./VisuallyHiddenInput-Dvzr6aqK.js";import"./usePrimitiveElement-BUPO_jML.js";import"./createContext-DpoLpYbb.js";const k=["width","height","fill","transform"],S={key:0},z=o("path",{d:"M185.08,114.46A48,48,0,0,0,148,36H80A12,12,0,0,0,68,48V200a12,12,0,0,0,12,12h80a52,52,0,0,0,25.08-97.54ZM92,60h56a24,24,0,0,1,0,48H92Zm68,128H92V132h68a28,28,0,0,1,0,56Z"},null,-1),_=[z],C={key:1},N=o("path",{d:"M200,160a40,40,0,0,1-40,40H80V48h68a36,36,0,0,1,0,72h12A40,40,0,0,1,200,160Z",opacity:"0.2"},null,-1),D=o("path",{d:"M178.48,115.7A44,44,0,0,0,148,40H80a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM88,56h60a28,28,0,0,1,0,56H88Zm72,136H88V128h72a32,32,0,0,1,0,64Z"},null,-1),E=[N,D],O={key:2},$=o("path",{d:"M168,156a20,20,0,0,1-20,20H96V136h52A20,20,0,0,1,168,156ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM184,156a36,36,0,0,0-18-31.15A36,36,0,0,0,140,64H88a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8h60A36,36,0,0,0,184,156Zm-24-56a20,20,0,0,0-20-20H96v40h44A20,20,0,0,0,160,100Z"},null,-1),j=[$],L={key:3},q=o("path",{d:"M174.69,116.41A42,42,0,0,0,148,42H80a6,6,0,0,0-6,6V200a6,6,0,0,0,6,6h80a46,46,0,0,0,14.69-89.59ZM86,54h62a30,30,0,0,1,0,60H86Zm74,140H86V126h74a34,34,0,0,1,0,68Z"},null,-1),G=[q],I={key:4},U=o("path",{d:"M178.48,115.7A44,44,0,0,0,148,40H80a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM88,56h60a28,28,0,0,1,0,56H88Zm72,136H88V128h72a32,32,0,0,1,0,64Z"},null,-1),W=[U],F={key:5},J=o("path",{d:"M170.27,117.21A40,40,0,0,0,148,44H80a4,4,0,0,0-4,4V200a4,4,0,0,0,4,4h80a44,44,0,0,0,10.27-86.79ZM84,52h64a32,32,0,0,1,0,64H84Zm76,144H84V124h76a36,36,0,0,1,0,72Z"},null,-1),K=[J],Q={name:"PhTextB"},R=A({...Q,props:{weight:{type:String},size:{type:[String,Number]},color:{type:String},mirrored:{type:Boolean}},setup(i){const t=i,H=l("weight","regular"),V=l("size","1em"),Z=l("color","currentColor"),x=l("mirrored",!1),r=s(()=>t.weight??H),m=s(()=>t.size??V),y=s(()=>t.color??Z),M=s(()=>t.mirrored!==void 0?t.mirrored?"scale(-1, 1)":void 0:x?"scale(-1, 1)":void 0);return(d,X)=>(e(),a("svg",P({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256",width:m.value,height:m.value,fill:y.value,transform:M.value},d.$attrs),[w(d.$slots,"default"),r.value==="bold"?(e(),a("g",S,_)):r.value==="duotone"?(e(),a("g",C,E)):r.value==="fill"?(e(),a("g",O,j)):r.value==="light"?(e(),a("g",L,G)):r.value==="regular"?(e(),a("g",I,W)):r.value==="thin"?(e(),a("g",F,K)):B("",!0)],16,k))}}),ue={title:"UI/Toggle",component:p,tags:["autodocs"]},n={render:()=>({components:{Toggle:p,PhTextB:R},setup(){return{pressed:b(!1)}},template:`
      <div class="space-y-2">
        <Toggle v-model:pressed="pressed" aria-label="Toggle bold">
          <PhTextB class="h-4 w-4" />
        </Toggle>
        <p class="text-label-small text-muted-foreground">Pressed: {{ pressed }}</p>
      </div>
    `})},g={render:()=>({components:{Toggle:p},template:`
      <div class="flex gap-2">
        <Toggle>Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle size="sm">Small</Toggle>
        <Toggle size="lg">Large</Toggle>
      </div>
    `})};var c,u,h;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Toggle,
      PhTextB
    },
    setup() {
      const pressed = ref(false);
      return {
        pressed
      };
    },
    template: \`
      <div class="space-y-2">
        <Toggle v-model:pressed="pressed" aria-label="Toggle bold">
          <PhTextB class="h-4 w-4" />
        </Toggle>
        <p class="text-label-small text-muted-foreground">Pressed: {{ pressed }}</p>
      </div>
    \`
  })
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var T,v,f;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Toggle
    },
    template: \`
      <div class="flex gap-2">
        <Toggle>Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle size="sm">Small</Toggle>
        <Toggle size="lg">Large</Toggle>
      </div>
    \`
  })
}`,...(f=(v=g.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const he=["Playground","Variants"];export{n as Playground,g as Variants,he as __namedExportsOrder,ue as default};
