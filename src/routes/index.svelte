<script context="module">
	export async function preload(page, session) {
		let articles;
		{
			const res = await this.fetch("/data/article");
			articles = await res.json();
		}
		return { articles };
	}
</script>

<script>
	export let articles = [];
	let reveal_contacts = false;
	const toDisplayDate = (date) => {
		const d = new Date(date);
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
			2,
			"0"
		)}-${String(d.getDate()).padStart(2, "0")}`;
	};
</script>

<style lang="scss">
	.root {
		// width: 100vw;
		min-height: 100vh;
		header {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			place-items: center;
			gap: 20px;
			#pic-of-me {
				width: 180px;
				height: 180px;
				border-radius: 50%;
				background: url(/you-probably-should-not-save-this.webp)
					no-repeat center center;
				background-size: cover;
			}
			.description {
				h1,
				p {
					margin: 10px 0;
					text-align: left;
				}
				.links {
					a {
						display: inline-flex;
						align-items: center;
						color: #000;
						text-decoration: none;
						border: solid #000 1px;
						border-radius: 5px;
						padding: 5px 10px;
						&:hover {
							color: #fff;
							background: #000;
						}
						svg {
							margin-right: 10px;
						}
					}
				}
			}
		}

		#articles {
			margin: 50px auto;
			a.article {
				display: grid;
				grid-template-columns: auto 1fr auto;
				gap: 20px;
				margin: 20px auto;
				padding: 10px 20px;
				border: solid #efefef 1px;
				border-radius: 5px;
				text-decoration: none;
				font-size: 20px;
				color: inherit;
				transition: all 0.3s;
				&:hover {
					transform: scale(1.05);
					background: #efefef;
				}
				.icon {
					align-self: center;
					font-size: 30px;
					line-height: 30px;
					width: 30px;
					height: 30px;
				}
				.info {
					.subtitle {
						font-size: 12px;
						color: #777;
					}
				}
				.date {
					font-size: 15px;
					text-align: right;
				}
				.tags {
					.tag {
						background: #333;
						color: white;
						font-size: 12px;
						padding: 2px 5px;
						margin: 2px;
						display: inline-block;
						border-radius: 2px;
					}
				}
			}
		}
		#reveal_contacts {
			border-radius: 2px;
			padding: 2px 5px;
			color: inherit;
			text-decoration: none;
			background: #efefef;
		}
	}
</style>

<div class="root">
	<header>
		<div id="pic-of-me" />
		<div class="description">
			<h1>Hi. I'm Eunsoo.</h1>
			<p>I write code and things about code.</p>
			<p>
				I overuse JavaScript: NodeJS, Svelte, React
				<br />
				I enjoy functional programming, thanks to OCaml.
			</p>
			<div class="links">
				<a href="https://github.com/esinx" target="_blank">
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15">
						<path
							d="M9.358 2.145a8.209 8.209 0 00-3.716
              0c-.706-.433-1.245-.632-1.637-.716a2.17 2.17 0 00-.51-.053 1.258
              1.258 0 00-.232.028l-.01.002-.004.002h-.003l.137.481-.137-.48a.5.5
              0 00-.32.276 3.12 3.12 0 00-.159 2.101A3.354 3.354 0 002 5.93c0
              1.553.458 2.597 1.239 3.268.547.47 1.211.72 1.877.863a2.34 2.34 0
              00-.116.958v.598c-.407.085-.689.058-.89-.008-.251-.083-.444-.25-.629-.49a4.798
              4.798 0 01-.27-.402l-.057-.093a9.216 9.216 0
              00-.224-.354c-.19-.281-.472-.633-.928-.753l-.484-.127-.254.968.484.127c.08.02.184.095.355.346a7.2
              7.2 0 01.19.302l.068.11c.094.152.202.32.327.484.253.33.598.663
              1.11.832.35.116.748.144 1.202.074V14.5a.5.5 0 00.5.5h4a.5.5 0
              00.5-.5v-3.563c0-.315-.014-.604-.103-.873.663-.14 1.322-.39
              1.866-.86.78-.676 1.237-1.73 1.237-3.292v-.001a3.354 3.354 0
              00-.768-2.125 3.12 3.12 0 00-.159-2.1.5.5 0
              00-.319-.277l-.137.48c.137-.48.136-.48.135-.48l-.002-.001-.004-.002-.009-.002a.671.671
              0 00-.075-.015 1.261 1.261 0 00-.158-.013 2.172 2.172 0
              00-.51.053c-.391.084-.93.283-1.636.716z"
							fill="currentColor" />
					</svg>
					@esinx
				</a>
				<a href="https://twitter.com/e_sinx" target="_blank">
					<svg
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15">
						<path
							d="M14.977 1.467a.5.5 0 00-.87-.301 2.559 2.559 0
              01-1.226.763A3.441 3.441 0 0010.526 1a3.539 3.539 0 00-3.537
              3.541v.44C3.998 4.75 2.4 2.477 1.967 1.325a.5.5 0
              00-.916-.048C.004 3.373-.157 5.407.604 7.139 1.27 8.656 2.61 9.864
              4.51 10.665 3.647 11.276 2.194 12 .5 12a.5.5 0 00-.278.916C1.847
              14 3.55 14 5.132 14h.048c4.861 0 8.8-3.946
              8.8-8.812v-.479c.363-.37.646-.747.82-1.236.193-.546.232-1.178.177-2.006z"
							fill="currentColor" />
					</svg>
					@e_sinx
				</a>
			</div>
			<p>I have a <a href="/resume">résumé page</a></p>
			<p style="color:#ccc;">
				These icons are teenyicons and the font is IBM Plex Mono. Both
				awesome works.
			</p>
		</div>
	</header>

	<div id="articles">
		<h1>🖋 Articles</h1>
		{#each articles as article}
			<a class="article" href={`/articles/${article.slug}`}>
				<div class="icon">{article.icon}</div>
				<div class="info">
					<div class="title">{article.title}</div>
					<div class="subtitle">{article.subtitle}</div>
					<div class="tags">
						{#each article.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				</div>
				<div class="date">{toDisplayDate(article.date)}</div>
			</a>
		{/each}
	</div>
	<p>
		By the way, this blog is still under construction. Aren't my page
		transitions sick? It's
		<a href="https://sapper.svelte.dev/" target="_blank">sapper</a>
		magic
	</p>

	<div id="contact">
		<h1>📬 Contact</h1>
		<p>
			Hey spambots,
			<a
				id="reveal_contacts"
				href="javascript:void(0)"
				on:click={() => {
					reveal_contacts = true;
				}}>
				click me
			</a>
			to reveal my online mail address
		</p>
		{#if reveal_contacts}
			<div id="contact-grid">
				<div>📧 me@esinx.net</div>
			</div>
		{/if}
	</div>
</div>
