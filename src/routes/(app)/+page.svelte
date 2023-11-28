<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { cn, getStatusColor } from '$lib/utils';

  import type { PageServerData } from './$types';
  export let data: PageServerData;
</script>

<svelte:head>
  <title>Shizu</title>
</svelte:head>

<h2 class="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Server List</h2>

<div class="grid gap-3 xl:grid-cols-4">
  {#each data.servers as server}
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <Badge>{server.serverType.toUpperCase()}</Badge>
          <a href={`/server/${server.id}`} class="truncate pl-0.5 hover:underline">{server.name}</a>
        </Card.Title>
        <Card.Description class="truncate">
          ID: {server.id}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex h-4 flex-row-reverse flex-wrap gap-1 overflow-hidden">
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each { length: 40 } as _, i}
            {@const reversedRecord = server.records.reverse()}
            {@const statusColor = getStatusColor(reversedRecord[i])}
            <div
              data-value={reversedRecord?.[i]}
              style={`--status-color: ${statusColor}`}
              class={cn(
                'aspect-square h-4 w-1 rounded-xl',
                i >= reversedRecord.length ? 'bg-muted' : 'bg-[--status-color]'
              )}
            />
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
