import a from"./Badge-CjH8Zm2H.js";import n from"./Button-CPg87rVA.js";import l from"./Checkbox-DivzB_mn.js";import i from"./Input-DuSM1wx_.js";import c from"./Select-Bhdp3GPy.js";import m from"./SelectContent-DU_5lz6g.js";import"./SelectGroup-Bv-36Ere.js";import d from"./SelectItem-DzRpoWgP.js";import"./SelectItemText-DMjS0ouI.js";import"./SelectLabel-Crs6oDWJ.js";import"./SelectScrollDownButton-MD-0wXFE.js";import"./SelectScrollUpButton-DjGkUIrJ.js";import"./SelectSeparator-CBXV0vqp.js";import s from"./SelectTrigger-C78DFBvq.js";import p from"./SelectValue-vtmP4TyG.js";import g from"./Toggle-NTVOdljn.js";import"./index-1evVQkiP.js";import"./utils-BLSKlp9E.js";import"./iframe-Zdi-dMOP.js";import"./preload-helper-C1FmrZbK.js";import"./Primitive-CJPFcwce.js";import"./PhCheck.vue-C7cbOf8i.js";import"./useForwardPropsEmits-B-vztXC0.js";import"./useForwardProps-A8ih6vWR.js";import"./createContext-DpoLpYbb.js";import"./nullish-CHIgUVhi.js";import"./ohash.D__AXeF1-DHF4M4F_.js";import"./VisuallyHidden-BV-q35jK.js";import"./index-B6mZJ3-0.js";import"./index-DNOLD3Nw.js";import"./useForwardExpose-5aLqJNSJ.js";import"./VisuallyHiddenInput-Dvzr6aqK.js";import"./usePrimitiveElement-BUPO_jML.js";import"./RovingFocusItem-Bl9YnyXX.js";import"./useId-DNlRE_eH.js";import"./Collection-CLWOzb8_.js";import"./RovingFocusGroup-Dfnf0pXb.js";import"./useDirection-D0wdnUFu.js";import"./ConfigProvider-CrTWlrV3.js";import"./getActiveElement-FUKBWQwh.js";import"./Presence-DYRffevL.js";import"./index-BagMrIyG.js";import"./BubbleSelect-CZUBV0rM.js";import"./PopperRoot-D7BtqFnI.js";import"./SelectItemAlignedPosition-D0mswa2-.js";import"./clamp-BstbYvQo.js";import"./utils-0WrtVzBS.js";import"./PopperContent-Cklbm8FS.js";import"./useTypeahead-CQqhZvX6.js";import"./Teleport-DP36IEx2.js";import"./useNonce-BcoG8iY_.js";import"./SelectGroup-Cv3_IvuX.js";import"./SelectItemText-Bs_ttCiW.js";import"./PhCaretDown.vue-C5-6zkFY.js";import"./SelectScrollButtonImpl-KZgV3CNk.js";import"./PopperAnchor-bbe30IrU.js";const be={title:"UI/Primitives Gallery",tags:["autodocs"],parameters:{layout:"fullscreen"}},e={render:()=>({components:{Button:n,Input:i,Checkbox:l,Toggle:g,Badge:a,Select:c,SelectTrigger:s,SelectValue:p,SelectContent:m,SelectItem:d},template:`
      <main class="min-h-screen w-full bg-background p-6 text-foreground md:p-10">
        <section class="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Buttons</h2>
            <div class="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Form controls</h2>
            <Input placeholder="Search..." />
            <label class="flex items-center gap-2 text-sm">
              <Checkbox />
              Include archived items
            </label>
            <Toggle>Toggle</Toggle>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Status</h2>
            <div class="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Select</h2>
            <Select default-value="image">
              <SelectTrigger>
                <SelectValue placeholder="Typ dokumentu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </article>
        </section>
      </main>
    `})};var t,r,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => ({
    components: {
      Button,
      Input,
      Checkbox,
      Toggle,
      Badge,
      Select,
      SelectTrigger,
      SelectValue,
      SelectContent,
      SelectItem
    },
    template: \`
      <main class="min-h-screen w-full bg-background p-6 text-foreground md:p-10">
        <section class="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Buttons</h2>
            <div class="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Form controls</h2>
            <Input placeholder="Search..." />
            <label class="flex items-center gap-2 text-sm">
              <Checkbox />
              Include archived items
            </label>
            <Toggle>Toggle</Toggle>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Status</h2>
            <div class="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </article>

          <article class="rounded-lg border border-border bg-card p-4 space-y-3">
            <h2 class="text-heading-4">Select</h2>
            <Select default-value="image">
              <SelectTrigger>
                <SelectValue placeholder="Typ dokumentu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </article>
        </section>
      </main>
    \`
  })
}`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const fe=["AllAtOnce"];export{e as AllAtOnce,fe as __namedExportsOrder,be as default};
