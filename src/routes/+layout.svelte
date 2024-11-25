<script lang="ts">
	import '../app.pcss';
	let { children } = $props();
</script>

<div
	class="relative mx-auto mt-10 flex min-h-screen max-w-screen-lg flex-col bg-background"
	id="page"
	data-vaul-drawer-wrapper
>
	{@render children?.()}
</div>
