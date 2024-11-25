<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { schema } from './schema';
	import { valibot } from 'sveltekit-superforms/adapters';
	import { defaults, intProxy, superForm } from 'sveltekit-superforms';
	import { explore, formatMindTree } from 'tree_learner';
	import { LoaderCircle } from 'lucide-svelte';
	import { flattenMindTree, type FlattenedMindTreeNode } from '$lib/utils';

	interface Props {
		writing: boolean;
		tree: FlattenedMindTreeNode[];
	}

	let { writing = $bindable(), tree = $bindable() }: Props = $props();

	const form = superForm(defaults(valibot(schema)), {
		SPA: true,
		resetForm: false,
		clearOnSubmit: 'errors-and-message',
		validators: valibot(schema),
		async onUpdate({ form }) {
			if (form.valid) {
				writing = true;
				tree = [];
				const rawTree = await explore(form.data);
				const formattedTree = formatMindTree(rawTree);
				tree = flattenMindTree(formattedTree);
				await new Promise((r) => setTimeout(r, tree.length * 500)).then(() => {
					writing = false;
				});
			}
		}
	});

	const { form: formData, enhance } = form;
	const depthProxy = intProxy(form, 'depth');
	const breadthProxy = intProxy(form, 'breadth');
</script>

<form use:enhance>
	<Form.Field {form} name="topic">
		<Form.Control>
			<Form.Label>Topic</Form.Label>
			<Textarea bind:value={$formData.topic} />
		</Form.Control>
		<Form.FormDescription>What are you curious about?</Form.FormDescription>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="depth">
		<Form.Control>
			<Form.Label>Maximum Depth</Form.Label>
			<Input bind:value={$depthProxy} />
		</Form.Control>
		<Form.Description>How deep should my learning tree grow?</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="breadth">
		<Form.Control>
			<Form.Label>Maximum Breadth</Form.Label>
			<Input bind:value={$breadthProxy} />
		</Form.Control>
		<Form.Description>How many times should I stop and explore per topic?</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	{#if writing}
		<Form.Button disabled>
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			Thinking
		</Form.Button>
	{:else}
		<Form.Button>Submit</Form.Button>
	{/if}
</form>
