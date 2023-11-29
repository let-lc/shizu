<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { SERVER_TYPE_COLOR } from '$lib/constants';
  import { cn, getStatusColor } from '$lib/utils';

  import type { PageServerData } from './$types';
  export let data: PageServerData;
</script>

<svelte:head>
  <title>Shizu</title>
</svelte:head>

<h2 class="mb-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Server List</h2>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {#each data.servers as server}
    {@const serverColor = SERVER_TYPE_COLOR?.[server.serverType]}
    <Card.Root>
      <Card.Header>
        <div class="flex items-center gap-x-1">
          <Badge
            style="--server-color: {serverColor}"
            class={cn(
              server.serverType in SERVER_TYPE_COLOR &&
                'bg-[--server-color] hover:bg-[--server-color] hover:brightness-95 dark:hover:brightness-110'
            )}
          >
            {server.serverType.toUpperCase()}
          </Badge>
          <Card.Title>
            <a href={`/server/${server.id}`} class="truncate pl-0.5 hover:underline">
              {server.name}
            </a>
          </Card.Title>
        </div>
        <Card.Description class="truncate">
          ID: {server.id}
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div class="flex h-4 flex-row-reverse flex-wrap justify-end gap-1 overflow-hidden">
          <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
          {#each { length: 72 } as _, i}
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
