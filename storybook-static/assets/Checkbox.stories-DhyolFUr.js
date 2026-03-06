import{r as p}from"./iframe-Zdi-dMOP.js";import o from"./Checkbox-DivzB_mn.js";import"./preload-helper-C1FmrZbK.js";import"./PhCheck.vue-C7cbOf8i.js";import"./useForwardPropsEmits-B-vztXC0.js";import"./useForwardProps-A8ih6vWR.js";import"./createContext-DpoLpYbb.js";import"./nullish-CHIgUVhi.js";import"./ohash.D__AXeF1-DHF4M4F_.js";import"./VisuallyHidden-BV-q35jK.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./Primitive-CJPFcwce.js";import"./useForwardExpose-5aLqJNSJ.js";import"./VisuallyHiddenInput-Dvzr6aqK.js";import"./usePrimitiveElement-BUPO_jML.js";import"./RovingFocusItem-Bl9YnyXX.js";import"./useId-DNlRE_eH.js";import"./Collection-CLWOzb8_.js";import"./RovingFocusGroup-Dfnf0pXb.js";import"./useDirection-D0wdnUFu.js";import"./ConfigProvider-CrTWlrV3.js";import"./getActiveElement-FUKBWQwh.js";import"./Presence-DYRffevL.js";import"./index-BagMrIyG.js";import"./utils-BLSKlp9E.js";const F={title:"UI/Checkbox",component:o,tags:["autodocs"]},e={render:()=>({components:{Checkbox:o},setup(){return{checked:p(!1)}},template:`
      <label class="flex items-center gap-2 text-sm">
        <Checkbox v-model:checked="checked" />
        <span>Show only documents with map data</span>
      </label>
    `})},t={render:()=>({components:{Checkbox:o},template:`
      <label class="flex items-center gap-2 text-sm">
        <Checkbox :checked="true" />
        <span>Preset checked state</span>
      </label>
    `})};var r,n,c;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox
    },
    setup() {
      const checked = ref(false);
      return {
        checked
      };
    },
    template: \`
      <label class="flex items-center gap-2 text-sm">
        <Checkbox v-model:checked="checked" />
        <span>Show only documents with map data</span>
      </label>
    \`
  })
}`,...(c=(n=e.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};var s,a,m;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Checkbox
    },
    template: \`
      <label class="flex items-center gap-2 text-sm">
        <Checkbox :checked="true" />
        <span>Preset checked state</span>
      </label>
    \`
  })
}`,...(m=(a=t.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const G=["Playground","Checked"];export{t as Checked,e as Playground,G as __namedExportsOrder,F as default};
