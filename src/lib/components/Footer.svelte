<script lang="ts">
	import { Github, Mail, Linkedin } from '@lucide/svelte';
	import { userConfig } from '$lib/config/userConfig';

	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-background/80 border-border border-t p-4 backdrop-blur-sm">
	<!-- Desktop layout -->
	<div class="mx-auto hidden max-w-4xl items-center justify-between px-4 py-2 md:flex">
		<div class="text-muted-foreground text-sm">
			<span>© {currentYear} {userConfig.name}</span>
		</div>

		<div class="flex items-center space-x-4">
			<a
				href="mailto:{userConfig.email}"
				class="text-muted-foreground hover:text-foreground transition-colors"
				title="Email"
			>
				<Mail size={18} />
			</a>
			<a
				href={userConfig.social.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground transition-colors"
				title="LinkedIn"
			>
				<Linkedin size={18} />
			</a>
			<a
				href={userConfig.social.github}
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground transition-colors"
				title="GitHub"
			>
				<Github size={18} />
			</a>
		</div>
	</div>

	<!-- Mobile layout - stacked -->
	<div class="mx-auto flex max-w-4xl flex-col items-center space-y-3 px-4 py-2 md:hidden">
		<div class="text-muted-foreground flex items-center space-x-4 text-sm">
			<span>© {currentYear} {userConfig.name}</span>
		</div>

		<div class="flex items-center space-x-6">
			<a
				href="mailto:{userConfig.email}"
				class="text-muted-foreground hover:text-foreground transition-colors"
				title="Email"
			>
				<Mail size={20} />
			</a>
			<a
				href={userConfig.social.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground transition-colors"
				title="LinkedIn"
			>
				<Linkedin size={20} />
			</a>
			<a
				href={userConfig.social.github}
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground transition-colors"
				title="GitHub"
			>
				<Github size={20} />
			</a>
		</div>
	</div>
</footer>
