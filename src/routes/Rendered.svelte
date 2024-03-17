<script lang="ts">
	export let status = {};
</script>

<div class="screen-wrapper" id="screen-wrapper">
	<div class="ar-wrapper">
		<div class="oc-screen">
			<div class="oc-row">
				<div class="icon">{status.icon1}</div>
				{status.row1}
			</div>
			<div class="oc-row">
				<div class="icon">{status.icon2}</div>
				{status.row2}
			</div>
			<div class="oc-row">
				<div class="icon">{status.icon3}</div>
				{status.row3}
			</div>
		</div>
	</div>
</div>
