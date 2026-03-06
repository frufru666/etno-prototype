import s from"./Tabs-butecEAH.js";import o from"./TabsContent-DYjf09YX.js";import n from"./TabsList-BFIp6SKo.js";import i from"./TabsTrigger-C811v7Ov.js";import"./iframe-Zdi-dMOP.js";import"./preload-helper-C1FmrZbK.js";import"./useForwardPropsEmits-B-vztXC0.js";import"./useForwardProps-A8ih6vWR.js";import"./TabsRoot-D1ujXdSf.js";import"./createContext-DpoLpYbb.js";import"./useDirection-D0wdnUFu.js";import"./ConfigProvider-CrTWlrV3.js";import"./useForwardExpose-5aLqJNSJ.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./useId-DNlRE_eH.js";import"./Primitive-CJPFcwce.js";import"./Presence-DYRffevL.js";import"./index-BagMrIyG.js";import"./utils-BjPRurQ8.js";import"./utils-BLSKlp9E.js";import"./RovingFocusGroup-Dfnf0pXb.js";import"./Collection-CLWOzb8_.js";import"./usePrimitiveElement-BUPO_jML.js";import"./getActiveElement-FUKBWQwh.js";import"./RovingFocusItem-Bl9YnyXX.js";const U={title:"UI/Tabs",component:s,tags:["autodocs"]},r={render:()=>({components:{Tabs:s,TabsList:n,TabsTrigger:i,TabsContent:o},template:`
      <Tabs default-value="metadata" class="w-[420px]">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="metadata" class="rounded-lg border border-border p-3 text-sm">
          Core fields, tags, and collection links.
        </TabsContent>
        <TabsContent value="transcript" class="rounded-lg border border-border p-3 text-sm">
          Time-coded transcript lines for media.
        </TabsContent>
        <TabsContent value="map" class="rounded-lg border border-border p-3 text-sm">
          Geo-linked references and locality markers.
        </TabsContent>
      </Tabs>
    `})};var a,e,t;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Tabs,
      TabsList,
      TabsTrigger,
      TabsContent
    },
    template: \`
      <Tabs default-value="metadata" class="w-[420px]">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="metadata" class="rounded-lg border border-border p-3 text-sm">
          Core fields, tags, and collection links.
        </TabsContent>
        <TabsContent value="transcript" class="rounded-lg border border-border p-3 text-sm">
          Time-coded transcript lines for media.
        </TabsContent>
        <TabsContent value="map" class="rounded-lg border border-border p-3 text-sm">
          Geo-linked references and locality markers.
        </TabsContent>
      </Tabs>
    \`
  })
}`,...(t=(e=r.parameters)==null?void 0:e.docs)==null?void 0:t.source}}};const h=["Default"];export{r as Default,h as __namedExportsOrder,U as default};
