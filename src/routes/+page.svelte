<script lang="ts">
	import { PUBLIC_BASE_URL } from '$lib/config';

	import { Container, Row, Toast, ToastBody } from 'sveltestrap';
	import Settings from './Settings.svelte';
	import Status from './Status.svelte';
	import Control from './Control.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let settings = writable({
		fgColor: '0'
	});

	let status = writable({});

	let statusPollInterval;

	const fetchSettingsData = () => {
		fetch(PUBLIC_BASE_URL + `/api/settings`)
			.then((res) => res.json())
			.then((data) => {
				settings.set(data);
			});
	};

	const fetchStatusData = () => {
		fetch(`${PUBLIC_BASE_URL}/api/status`)
			.then((res) => res.json())
			.then((data) => {
				status.set(data);
			});
	};

	onMount(() => {
		fetchSettingsData();
		fetchStatusData();
		statusPollInterval = setInterval(fetchStatusData, 10000);
	});

	let toastIsOpen = false;
	let toastColor = 'success';
	let toastBody = '';

	export const showToast = (event) => {
		toastIsOpen = true;
		toastColor = event.detail.color;
		toastBody = event.detail.text;
	};

	onDestroy(() => {
		clearInterval(statusPollInterval); // Cleanup interval when component is destroyed
	});
</script>

<svelte:head>
	<title>OrangeBTClock</title>
</svelte:head>

<Container fluid>
	<Row>
		<Control bind:settings></Control>
		<Status bind:status></Status>
		<Settings bind:settings on:showToast={showToast} on:formReset={fetchSettingsData}></Settings>
	</Row>
</Container>
<div class="position-fixed bottom-0 end-0 p-2">
	<div class="">
		<Toast
			isOpen={toastIsOpen}
			class="me-1 bg-{toastColor}"
			autohide
			on:close={() => (toastIsOpen = false)}
		>
			<ToastBody>
				{toastBody}
			</ToastBody>
		</Toast>
	</div>
</div>
