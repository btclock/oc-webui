<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Card, CardBody, CardHeader, CardTitle, Col, Progress, Tooltip } from 'sveltestrap';
	import Rendered from './Rendered.svelte';
	import { writable } from 'svelte/store';

	export let status: writable<object>;

	const toTime = (secs: number) => {
		var hours = Math.floor(secs / (60 * 60));

		var divisor_for_minutes = secs % (60 * 60);
		var minutes = Math.floor(divisor_for_minutes / 60);

		var divisor_for_seconds = divisor_for_minutes % 60;
		var seconds = Math.ceil(divisor_for_seconds);

		var obj = {
			h: hours,
			m: minutes,
			s: seconds
		};
		return obj;
	};

	const toUptimestring = (secs: number): string => {
		let time = toTime(secs);

		return `${time.h}h ${time.m}m ${time.s}s`;
	};

	let memoryFreePercent: number = 50;
	let rssiPercent: number = 50;
	let wifiStrengthColor: string = 'info';

	status.subscribe((value: object) => {
		memoryFreePercent = Math.round((value.espFreeHeap / value.espHeapSize) * 100);

		rssiPercent = Math.round(((value.rssi + 120) / (-30 + 120)) * 100);

		if (value.rssi > -55) {
			wifiStrengthColor = 'success';
		} else if (value.rssi < -87) {
			wifiStrengthColor = 'warning';
		} else {
			wifiStrengthColor = 'info';
		}
	});
</script>

<Col>
	<Card>
		<CardHeader>
			<CardTitle>{$_('section.status.title', { default: 'Status' })}</CardTitle>
		</CardHeader>
		<CardBody>
			<section>
				<Rendered status={$status}></Rendered>
			</section>

			<hr />

			<Progress striped value={memoryFreePercent}>{memoryFreePercent}%</Progress>
			<div class="d-flex justify-content-between">
				<div>{$_('section.status.memoryFree')}</div>
				<div>
					{Math.round($status.espFreeHeap / 1024)} / {Math.round($status.espHeapSize / 1024)} KiB
				</div>
			</div>
			<hr />
			<Progress striped id="rssiBar" color={wifiStrengthColor} value={rssiPercent}
				>{rssiPercent}%</Progress
			>
			<Tooltip target="rssiBar" placement="bottom">{$_('rssiBar.tooltip')}</Tooltip>

			<div class="d-flex justify-content-between">
				<div>{$_('section.status.wifiSignalStrength')}</div>
				<div>
					{$status.rssi} dBm
				</div>
			</div>
			<hr />
			{$_('section.status.uptime')}: {toUptimestring($status.espUptime)}
		</CardBody>
	</Card>
</Col>
