import o from"./Button-CPg87rVA.js";import"./index-1evVQkiP.js";import"./utils-BLSKlp9E.js";import"./iframe-Zdi-dMOP.js";import"./preload-helper-C1FmrZbK.js";import"./Primitive-CJPFcwce.js";const g={title:"UI/Button",component:o,tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","destructive","outline","secondary","ghost","link"]},size:{control:"select",options:["default","xs","sm","lg","icon","icon-sm","icon-lg"]}}},t={args:{variant:"default",size:"default"},render:c=>({components:{Button:o},setup(){return{args:c}},template:'<Button v-bind="args">CTA Button</Button>'})},n={render:()=>({components:{Button:o},template:`
      <div class="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    `})};var e,a,r;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    variant: "default",
    size: "default"
  },
  render: args => ({
    components: {
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: \`<Button v-bind="args">CTA Button</Button>\`
  })
}`,...(r=(a=t.parameters)==null?void 0:a.docs)==null?void 0:r.source}}};var s,u,i;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button
    },
    template: \`
      <div class="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    \`
  })
}`,...(i=(u=n.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};const f=["Playground","Variants"];export{t as Playground,n as Variants,f as __namedExportsOrder,g as default};
