<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status}</h1>

<p>{page.error?.message}</p>

{#if page.error?.url}
	<a href={page.error.url}>{page.error.url}</a>
{/if}
