<script lang="ts">
  import type { Label as LabelPrimitive } from 'bits-ui';
  import { getFormField } from 'formsnap';

  import { Label } from '$lib/components/ui/label';
  import { cn } from '$lib/utils';

  type $$Props = LabelPrimitive.Props;

  let className: $$Props['class'] = undefined;
  export { className as class };

  const { errors, ids } = getFormField();
</script>

<Label for={$ids.input} class={cn($errors && 'text-destructive', className)} {...$$restProps}>
  <slot />
</Label>
