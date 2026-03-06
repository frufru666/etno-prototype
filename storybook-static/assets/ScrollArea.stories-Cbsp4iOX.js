import n from"./ScrollArea-D4rHO24z.js";import"./ScrollBar-gFkkIcO2.js";import"./iframe-Zdi-dMOP.js";import"./preload-helper-C1FmrZbK.js";import"./useForwardExpose-5aLqJNSJ.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./Primitive-CJPFcwce.js";import"./useNonce-BcoG8iY_.js";import"./ConfigProvider-CrTWlrV3.js";import"./createContext-DpoLpYbb.js";import"./utils-BLSKlp9E.js";import"./useDirection-D0wdnUFu.js";import"./clamp-BstbYvQo.js";import"./Presence-DYRffevL.js";import"./index-BagMrIyG.js";const a=Array.from({length:20}).map((s,m)=>`Metadata row ${m+1}`),w={title:"UI/ScrollArea",component:n,tags:["autodocs"]},r={render:()=>({components:{ScrollArea:n},setup(){return{items:a}},template:`
      <ScrollArea class="h-60 w-80 rounded-lg border border-border p-2">
        <ul class="space-y-1">
          <li
            v-for="item in items"
            :key="item"
            class="rounded-md border border-border bg-background px-2 py-1 text-sm"
          >
            {{ item }}
          </li>
        </ul>
      </ScrollArea>
    `})};var e,o,t;r.parameters={...r.parameters,docs:{...(e=r.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScrollArea
    },
    setup() {
      return {
        items
      };
    },
    template: \`
      <ScrollArea class="h-60 w-80 rounded-lg border border-border p-2">
        <ul class="space-y-1">
          <li
            v-for="item in items"
            :key="item"
            class="rounded-md border border-border bg-background px-2 py-1 text-sm"
          >
            {{ item }}
          </li>
        </ul>
      </ScrollArea>
    \`
  })
}`,...(t=(o=r.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};const v=["Default"];export{r as Default,v as __namedExportsOrder,w as default};
