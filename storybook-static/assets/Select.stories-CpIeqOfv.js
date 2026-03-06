import{r}from"./iframe-Zdi-dMOP.js";import m from"./Select-Bhdp3GPy.js";import c from"./SelectContent-DU_5lz6g.js";import"./SelectGroup-Bv-36Ere.js";import i from"./SelectItem-DzRpoWgP.js";import"./SelectItemText-DMjS0ouI.js";import"./SelectLabel-Crs6oDWJ.js";import"./SelectScrollDownButton-MD-0wXFE.js";import"./SelectScrollUpButton-DjGkUIrJ.js";import"./SelectSeparator-CBXV0vqp.js";import p from"./SelectTrigger-C78DFBvq.js";import n from"./SelectValue-vtmP4TyG.js";import"./preload-helper-C1FmrZbK.js";import"./useForwardPropsEmits-B-vztXC0.js";import"./useForwardProps-A8ih6vWR.js";import"./BubbleSelect-CZUBV0rM.js";import"./VisuallyHidden-BV-q35jK.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./Primitive-CJPFcwce.js";import"./createContext-DpoLpYbb.js";import"./nullish-CHIgUVhi.js";import"./useDirection-D0wdnUFu.js";import"./ConfigProvider-CrTWlrV3.js";import"./Collection-CLWOzb8_.js";import"./usePrimitiveElement-BUPO_jML.js";import"./PopperRoot-D7BtqFnI.js";import"./ohash.D__AXeF1-DHF4M4F_.js";import"./Presence-DYRffevL.js";import"./index-BagMrIyG.js";import"./SelectItemAlignedPosition-D0mswa2-.js";import"./clamp-BstbYvQo.js";import"./useForwardExpose-5aLqJNSJ.js";import"./utils-0WrtVzBS.js";import"./getActiveElement-FUKBWQwh.js";import"./PopperContent-Cklbm8FS.js";import"./useTypeahead-CQqhZvX6.js";import"./Teleport-DP36IEx2.js";import"./useNonce-BcoG8iY_.js";import"./utils-BLSKlp9E.js";import"./SelectGroup-Cv3_IvuX.js";import"./useId-DNlRE_eH.js";import"./PhCheck.vue-C7cbOf8i.js";import"./SelectItemText-Bs_ttCiW.js";import"./PhCaretDown.vue-C5-6zkFY.js";import"./SelectScrollButtonImpl-KZgV3CNk.js";import"./PopperAnchor-bbe30IrU.js";const me={title:"UI/Select",component:m,tags:["autodocs"]},e={render:()=>({components:{Select:m,SelectTrigger:p,SelectValue:n,SelectContent:c,SelectItem:i},setup(){return{value:r("all")}},template:`
      <div class="w-72 space-y-2">
        <Select v-model="value">
          <SelectTrigger>
            <SelectValue placeholder="Choose document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
        <p class="text-label-small text-muted-foreground">Value: {{ value }}</p>
      </div>
    `})};var t,l,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Select,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem
    },
    setup() {
      const value = ref("all");
      return {
        value
      };
    },
    template: \`
      <div class="w-72 space-y-2">
        <Select v-model="value">
          <SelectTrigger>
            <SelectValue placeholder="Choose document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
          </SelectContent>
        </Select>
        <p class="text-label-small text-muted-foreground">Value: {{ value }}</p>
      </div>
    \`
  })
}`,...(o=(l=e.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const re=["Playground"];export{e as Playground,re as __namedExportsOrder,me as default};
