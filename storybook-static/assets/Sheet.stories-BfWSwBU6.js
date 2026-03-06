import i from"./Sheet-DwJ4kKto.js";import"./SheetClose-BLmefe5m.js";import m from"./SheetContent-Dar-TvQL.js";import p from"./SheetDescription-1187JNJ_.js";import"./SheetFooter-DcfDlhHb.js";import s from"./SheetHeader-DhM3YLUD.js";import a from"./SheetTitle-C5uP1d06.js";import h from"./SheetTrigger-Bve2IKDU.js";import S from"./Button-CPg87rVA.js";import"./iframe-Zdi-dMOP.js";import"./preload-helper-C1FmrZbK.js";import"./useForwardPropsEmits-B-vztXC0.js";import"./useForwardProps-A8ih6vWR.js";import"./DialogRoot-Db0efwNM.js";import"./createContext-DpoLpYbb.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./DialogClose-CEALT2ce.js";import"./useForwardExpose-5aLqJNSJ.js";import"./Primitive-CJPFcwce.js";import"./index-1evVQkiP.js";import"./utils-BLSKlp9E.js";import"./DialogPortal-Ci9rSlGl.js";import"./Presence-DYRffevL.js";import"./index-BagMrIyG.js";import"./utils-0WrtVzBS.js";import"./ConfigProvider-CrTWlrV3.js";import"./nullish-CHIgUVhi.js";import"./getActiveElement-FUKBWQwh.js";import"./useId-DNlRE_eH.js";import"./Teleport-DP36IEx2.js";import"./DialogDescription-Bl_CyhBe.js";import"./DialogTitle-CKkdr2ii.js";import"./DialogTrigger-45pp9KJn.js";const N={title:"UI/Sheet",component:i,tags:["autodocs"],argTypes:{side:{control:"select",options:["top","right","bottom","left"]}}},e={args:{side:"right"},render:n=>({components:{Sheet:i,SheetTrigger:h,SheetContent:m,SheetHeader:s,SheetTitle:a,SheetDescription:p,Button:S},setup(){return{args:n}},template:`
      <Sheet>
        <SheetTrigger as-child>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent :side="args.side">
          <SheetHeader>
            <SheetTitle>Filter sidebar</SheetTitle>
            <SheetDescription>Use this panel for compact mobile filters.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    `})};var t,r,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    side: "right"
  },
  render: args => ({
    components: {
      Sheet,
      SheetTrigger,
      SheetContent,
      SheetHeader,
      SheetTitle,
      SheetDescription,
      Button
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Sheet>
        <SheetTrigger as-child>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent :side="args.side">
          <SheetHeader>
            <SheetTitle>Filter sidebar</SheetTitle>
            <SheetDescription>Use this panel for compact mobile filters.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    \`
  })
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const Q=["Playground"];export{e as Playground,Q as __namedExportsOrder,N as default};
