import { config, fields, collection } from '@keystatic/core';

export default config({
	// Under `astro dev`, edits are saved straight to files in this repo.
	// On the deployed site, editors sign in with Keystatic Cloud and each save
	// is committed to GitHub, which triggers a new Cloudflare build.
	storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
	cloud: {
		// TODO: replace with your Keystatic Cloud "team/project" slug
		project: 'TEAM/PROJECT',
	},

	collections: {
		pioneers: collection({
			label: 'Pioneers',
			slugField: 'title',
			path: 'src/content/pioneers/*',
			format: { contentField: 'bio' },
			columns: ['title'],
			schema: {
				title: fields.slug({ name: { label: 'Name' } }),
				intro: fields.text({
					label: 'Intro',
					description: 'One or two sentences shown on the homepage card.',
					multiline: true,
					validation: { isRequired: true },
				}),
				image: fields.image({
					label: 'Photo',
					directory: 'public/images/pioneers',
					publicPath: '/images/pioneers/',
					validation: { isRequired: true },
				}),
				homepage: fields.url({ label: 'Homepage', validation: { isRequired: true } }),
				bio: fields.markdoc({
					label: 'Bio',
					options: {
						heading: [2, 3],
						blockquote: false,
						orderedList: false,
						table: false,
						image: false,
						divider: false,
						codeBlock: false,
					},
				}),
			},
		}),
	},
});
