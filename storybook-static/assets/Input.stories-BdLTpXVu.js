import{r as u}from"./iframe-Zdi-dMOP.js";import t from"./Input-DuSM1wx_.js";import"./preload-helper-C1FmrZbK.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./utils-BLSKlp9E.js";const g={title:"UI/Input",component:t,tags:["autodocs"]},e={render:()=>({components:{Input:t},setup(){return{value:u("")}},template:`
      <div class="w-80 space-y-2">
        <Input v-model="value" placeholder="Search documents..." />
        <p class="text-label-small text-muted-foreground">Value: {{ value || "—" }}</p>
      </div>
    `})},n={render:()=>({components:{Input:t},template:'<Input class="w-80" disabled model-value="Locked input value" />'})};var a,r,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Input
    },
    setup() {
      const value = ref("");
      return {
        value
      };
    },
    template: \`
      <div class="w-80 space-y-2">
        <Input v-model="value" placeholder="Search documents..." />
        <p class="text-label-small text-muted-foreground">Value: {{ value || "—" }}</p>
      </div>
    \`
  })
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var s,l,p;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Input
    },
    template: \`<Input class="w-80" disabled model-value="Locked input value" />\`
  })
}`,...(p=(l=n.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const b=["Playground","Disabled"];export{n as Disabled,e as Playground,b as __namedExportsOrder,g as default};
