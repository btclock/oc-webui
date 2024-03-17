<script lang="ts">
	import { PUBLIC_BASE_URL } from '$lib/config';
	import { strftime } from '$lib/strftime';
	import { createEventDispatcher } from 'svelte';

	import { _ } from 'svelte-i18n';
	import {
		Button,
		Card,
		CardBody,
		CardHeader,
		CardTitle,
		Col,
		Form,
		FormText,
		Input,
		InputGroup,
		InputGroupText,
		Label,
		Row
	} from 'sveltestrap';

	export let settings;

	const wifiTxPowerMap = new Map<string, number>([
		['Default', 80],
		['19.5dBm', 78], // 19.5dBm
		['19dBm', 76], // 19dBm
		['18.5dBm', 74], // 18.5dBm
		['17dBm', 68], // 17dBm
		['15dBm', 60], // 15dBm
		['13dBm', 52], // 13dBm
		['11dBm', 44], // 11dBm
		['8.5dBm', 34], // 8.5dBm
		['7dBm', 28], // 7dBm
		['5dBm', 20] // 5dBm
	]);

	const rowOptions = new Map<string, number>([
		['BLOCKHEIGHT', 0],
		['MEMPOOL_FEES', 1],
		['MEMPOOL_FEES_MEDIAN', 2],
		['HALVING_COUNTDOWN', 10],
		['SATSPERUNIT', 20],
		['FIATPRICE', 30],
		['MARKETCAP', 40],
		['TIME', 99],
		['DATE', 100]
	]);

	const currencyOptions = ['USD', 'EUR', 'GBP', 'YEN'];

	const dispatch = createEventDispatcher();

	const handleReset = (e: Event) => {
		e.preventDefault();
		dispatch('formReset');
	};

	const onSave = async (e: Event) => {
		e.preventDefault();
		let formSettings = $settings;

		delete formSettings['gitRev'];
		delete formSettings['ip'];
		delete formSettings['lastBuildTime'];

		await fetch(`${PUBLIC_BASE_URL}/api/json/settings`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formSettings)
		})
			.then(() => {
				dispatch('showToast', {
					color: 'success',
					text: $_('section.settings.settingsSaved')
				});
			})
			.catch(() => {
				dispatch('showToast', {
					color: 'danger',
					text: $_('section.settings.errorSavingSettings')
				});
			});
	};
</script>

<Col>
	<Card>
		<CardHeader>
			<CardTitle>{$_('section.settings.title', { default: 'Settings' })}</CardTitle>
		</CardHeader>
		<CardBody>
			<Form on:submit={onSave}>
				<Row>
					<Label md={6} for="fgColor" size="sm"
						>{$_('section.settings.row1', { default: 'Row 1' })}</Label
					>
					<Col md="6">
						<Input
							type="select"
							bind:value={$settings.row1}
							name="select"
							id="row1"
							bsSize="sm"
							class="form-select-sm"
						>
							{#each rowOptions as [key, value]}
								<option {value}>{$_(`section.lines.${key}`)}</option>
							{/each}
						</Input>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="fgColor" size="sm"
						>{$_('section.settings.row2', { default: 'Row 2' })}</Label
					>
					<Col md="6">
						<Input
							type="select"
							bind:value={$settings.row2}
							name="select"
							id="row2"
							bsSize="sm"
							class="form-select-sm"
						>
							{#each rowOptions as [key, value]}
								<option {value}>{$_(`section.lines.${key}`)}</option>
							{/each}
						</Input>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="row3" size="sm"
						>{$_('section.settings.row3', { default: 'Row 3' })}</Label
					>
					<Col md="6">
						<Input
							type="select"
							bind:value={$settings.row3}
							name="select"
							id="row3"
							bsSize="sm"
							class="form-select-sm"
						>
							{#each rowOptions as [key, value]}
								<option {value}>{$_(`section.lines.${key}`)}</option>
							{/each}
						</Input>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="currency" size="sm"
						>{$_('section.settings.currency', { default: 'Currency' })}</Label
					>
					<Col md="6">
						<Input
							type="select"
							bind:value={$settings.currency}
							name="select"
							id="currency"
							bsSize="sm"
							class="form-select-sm"
						>
							{#each currencyOptions as value}
								<option {value}>{value}</option>
							{/each}
						</Input>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="timeFormat" size="sm"
						>{$_('section.settings.timeFormat', { default: 'Time format' })}</Label
					>
					<Col md="6">
						<Input
							type="text"
							bind:value={$settings.timeFormat}
							name="timeFormat"
							id="timeFormat"
							bsSize="sm"
							maxlength="16"
						></Input>
						<FormText>{$_('section.settings.preview')}: {strftime($settings.timeFormat)}</FormText>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="dateFormat" size="sm"
						>{$_('section.settings.dateFormat', { default: 'Date format' })}</Label
					>
					<Col md="6">
						<Input
							type="text"
							bind:value={$settings.dateFormat}
							name="dateFormat"
							id="dateFormat"
							bsSize="sm"
							maxlength="16"
						></Input>
						<FormText>{$_('section.settings.preview')}: {strftime($settings.dateFormat)}</FormText>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="tzOffset" size="sm">{$_('section.settings.timezoneOffset')}</Label>
					<Col md="6">
						<InputGroup size="sm">
							<Input
								type="number"
								step="1"
								name="tzOffset"
								id="tzOffset"
								bind:value={$settings.timeOffsetMin}
							/>
							<InputGroupText>{$_('time.minutes')}</InputGroupText>
						</InputGroup>
						<FormText>{$_('section.settings.tzOffsetHelpText')}</FormText>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="wifiTxPower" size="sm"
						>{$_('section.settings.wifiTxPower', { default: 'WiFi Tx Power' })}</Label
					>
					<Col md="6">
						<Input
							type="select"
							bind:value={$settings.txPower}
							name="select"
							id="fgColor"
							bsSize="sm"
							class="form-select-sm"
						>
							{#each wifiTxPowerMap as [key, value]}
								<option {value}>{key}</option>
							{/each}
						</Input>
						<FormText>{$_('section.settings.wifiTxPowerText')}</FormText>
					</Col>
				</Row>
				<Row>
					<Label md={6} for="mempoolInstance" size="sm"
						>{$_('section.settings.mempoolnstance')}</Label
					>
					<Col md="6">
						<Input
							type="text"
							bind:value={$settings.mempoolInstance}
							name="mempoolInstance"
							id="mempoolInstance"
							bsSize="sm"
						></Input>
					</Col>
				</Row>

				<Button on:click={handleReset} color="secondary">{$_('button.reset')}</Button>
				<Button color="primary">{$_('button.save')}</Button>
			</Form>
		</CardBody>
	</Card>
</Col>
