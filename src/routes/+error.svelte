<script>
	import { page } from '$app/state';
</script>

<h2>{page.status}</h2>
<p class="subhead">{page.error?.message}</p>

<p><strong>Sorry!</strong> Maybe try one of these links?</p>
<ul>
	<li><a href="/">Home</a></li>
</ul>
