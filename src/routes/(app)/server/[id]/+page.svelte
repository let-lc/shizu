<script lang="ts">
  import { toString } from 'cronstrue';
  import dayjs from 'dayjs';

  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as HoverCard from '$lib/components/ui/hover-card';
  import { getStatusColor, getStatusLevel, ignoreSvelteTsError } from '$lib/utils';

  import type { PageServerData } from './$types';
  import HttpRecordDataTable from './HttpRecordDataTable.svelte';
  import ResponseTimeChart from './ResponseTimeChart.svelte';
  import TcpRecordDataTable from './TcpRecordDataTable.svelte';

  export let data: PageServerData;
  const revRecords = data.records.slice().reverse();
</script>

<svelte:head>
  <title>{data.server.name || data.server.id}</title>
</svelte:head>

<div class="mb-2 flex justify-between border-b pb-2">
  <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">
    {data.server.name || data.server.id}
  </h2>
  {#if dev}
    <a href={`${$page.url.pathname}/edit`}>
      <Button variant="default">Edit</Button>
    </a>
  {/if}
</div>

<div class="space-y-4">
  <div class="my-4 flex gap-x-2">
    <Badge>
      {data.server.serverType.toUpperCase()}
    </Badge>
    <Badge variant="secondary">
      ID: {data.server.id}
    </Badge>
  </div>

  <Card.Root>
    <Card.Header>
      <Card.Title>Status</Card.Title>
      <Card.Description></Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="flex h-8 flex-row-reverse flex-wrap justify-end gap-0.5">
        <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
        {#each { length: 128 } as _, i}
          {#if i < revRecords.length}
            {@const { result, ranAt, time } = revRecords[i]}
            {@const successCount = result.reduce((count, { success }) => count + +success, 0)}
            {@const failCount = result.length - successCount}
            {@const percent = successCount / result.length}
            {@const statusColor = getStatusColor(percent)}
            <HoverCard.Root openDelay={0} closeDelay={0} positioning={{ placement: 'top' }}>
              <HoverCard.Trigger>
                <div
                  style={`--status-color: ${statusColor}`}
                  class="aspect-square h-8 w-2 rounded-xl bg-[--status-color]"
                />
              </HoverCard.Trigger>
              <HoverCard.Content class="w-max" style={`--status-color: ${statusColor}`}>
                <p class="whitespace-nowrap text-center text-xs">
                  {dayjs(ranAt).format('YYYY-MM-DD HH:mm:ss')}
                </p>
                <div class="flex items-center justify-between gap-1 rounded font-mono text-xs">
                  <span class="font-medium text-green-500">
                    {successCount}
                  </span>
                  <div class="relative flex h-0.5 flex-grow gap-0.5">
                    <div
                      style={`--percent:${percent * 100}%`}
                      class="h-full w-[--percent] flex-shrink-0 rounded bg-green-500"
                    />
                    <div class="h-full w-full flex-grow rounded bg-red-500" />
                  </div>
                  <span class="font-medium text-red-500">
                    {failCount}
                  </span>
                </div>
                <p class="text-center text-xs font-medium text-[--status-color]">
                  {getStatusLevel(percent)}
                </p>
                <div class="grid grid-cols-3 divide-x text-xs">
                  <div class="px-4 py-2 text-center">
                    <p class="font-semibold">Min</p>
                    <p>{time.min} ms</p>
                  </div>
                  <td class="px-4 py-2 text-center">
                    <p class="font-semibold">Avg</p>
                    <p>{time.avg} ms</p>
                  </td>
                  <td class="px-4 py-2 text-center">
                    <p class="font-semibold">Max</p>
                    <p>{time.max} ms</p>
                  </td>
                </div>
              </HoverCard.Content>
            </HoverCard.Root>
          {:else}
            <div class="aspect-square h-8 w-2 rounded-xl bg-muted" />
          {/if}
        {/each}
      </div>
    </Card.Content>
    <Card.Footer>
      <p>Check {toString(data.server.pingCron, { verbose: true })}</p>
    </Card.Footer>
  </Card.Root>

  <ResponseTimeChart data={data.records} />

  <Card.Root>
    <Card.Header>
      <Card.Title>Ping Record Table</Card.Title>
      <Card.Description>
        All historical ping revRecords, click <span class="rounded-sm bg-accent px-2">show</span> to
        view all the ping events from each revRecords.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      {#if data.server.serverType === 'http'}
        <HttpRecordDataTable records={ignoreSvelteTsError(revRecords)} />
      {:else if data.server.serverType === 'tcp'}
        <TcpRecordDataTable records={ignoreSvelteTsError(revRecords)} />
      {/if}
    </Card.Content>
  </Card.Root>
</div>
