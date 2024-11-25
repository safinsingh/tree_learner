<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import SettingsForm from './form.svelte';
	import { type FlattenedMindTreeNode } from '$lib/utils';

	let writing = $state(false);
	let tree = $state([] as FlattenedMindTreeNode[]);
</script>

<SettingsForm bind:writing bind:tree />
<Separator class="mb-5 mt-5" />

{#if writing && tree.length === 0}
	<Skeleton class="mb-4 h-4 w-[250px]" />
	<Skeleton class="h-4 w-[200px]" />
{/if}
{#if tree.length !== 0}
	{#each tree as node, index}
		<div
			style="
					margin-left: {node.depth * 50}px; opacity: 0; 
					animation: fade-in 1s ease-in-out forwards; 
					animation-delay: {index * 500}ms;
					margin-bottom: 1rem;
				"
		>
			<p>
				{node.curiosityExpression} <b>{node.topic}</b>. {node.explainerExpression}
				{node.summary}
			</p>
			<br />
			<i><b>{'understandingExpression' in node ? node.understandingExpression : ''}</b></i>
		</div>
	{/each}
{/if}

<style>
	@keyframes -global-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
