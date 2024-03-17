<script lang="ts">
	import { PUBLIC_BASE_URL } from '$lib/config';
	import { _ } from 'svelte-i18n';
	import { Button, Card, CardBody, CardHeader, CardTitle, Col } from 'sveltestrap';

	export let settings = {};

	const restartClock = () => {
		fetch(`${PUBLIC_BASE_URL}/api/restart`).catch(() => {});
	};

	const forceFullRefresh = () => {
		fetch(`${PUBLIC_BASE_URL}/api/full_refresh`).catch(() => {});
	};
</script>

<Col>
	<Card>
		<CardHeader>
			<CardTitle>{$_('section.control.title', { default: 'Control' })}</CardTitle>
		</CardHeader>
		<CardBody>
			<h3>{$_('section.control.systemInfo')}</h3>
			<ul class="small system_info">
				<li>{$_('section.control.version')}: {$settings.gitRev}</li>
				<li>
					{$_('section.control.buildTime')}: {new Date(
						$settings.lastBuildTime * 1000
					).toLocaleString()}
				</li>
				<li>IP: {$settings.ip}</li>
				<li>{$_('section.control.hostname')}: {$settings.hostname}</li>
			</ul>
			<Button color="danger" id="restartBtn" on:click={restartClock}>{$_('button.restart')}</Button>
			<Button color="warning" id="forceFullRefresh" on:click={forceFullRefresh}
				>{$_('button.forceFullRefresh')}</Button
			>
		</CardBody>
	</Card>
</Col>
