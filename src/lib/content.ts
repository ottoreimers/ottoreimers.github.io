/**
 * All text on the site lives here. Edit this file to change what the page says.
 * Anything in [hakparenteser] is a placeholder waiting for your real details.
 */

export type ExperienceItem = {
	/** Shown in the left column, e.g. "Oktober 2017 — nu" */
	period: string;
	/** Role or programme name */
	title: string;
	/** Company or school */
	org: string;
	/** City, optional */
	location?: string;
	/** One or more paragraphs describing the role */
	paragraphs: string[];
};

export type SkillGroup = {
	title: string;
	skills: string[];
};

export type ContactLink = {
	kind: 'email' | 'phone' | 'linkedin' | 'github' | 'web';
	label: string;
	href: string;
};

export type Content = {
	name: { first: string; last: string };
	title: string;
	location: string;
	summary: string;
	experience: ExperienceItem[];
	education: ExperienceItem[];
	skills: SkillGroup[];
	personal: string[];
	contact: ContactLink[];
	/** Path to a square photo in static/, e.g. "/otto.webp". Leave undefined to show initials. */
	photo?: string;
};

export const content: Content = {
	name: { first: 'Otto', last: 'Reimers' },
	title: 'Webbutvecklare',
	location: 'Stockholm, Sverige',
	summary:
		'Webbutvecklare på Fröjd i Stockholm sedan 2022. Jag bygger och förvaltar webbplatser i Wagtail, Next.js och WordPress, med ett öga för detaljer och en förkärlek för att lära mig nya saker.',

	experience: [
		{
			period: '2022 — nu',
			title: 'Webbutvecklare',
			org: 'Fröjd',
			location: 'Stockholm',
			paragraphs: [
				'På Fröjd jobbar jag med allt från vår Wagtail/Next.js-stack till renodlade WordPress-sajter, samt projekt i Umbraco.'
			]
		}
	],

	education: [
		{
			period: '2020 — 2022',
			title: 'Fullstack webbutveckling',
			org: 'Chas Academy',
			paragraphs: []
		}
	],

	skills: [
		{
			title: 'Frontend',
			skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Svelte']
		},
		{
			title: 'Backend',
			skills: ['Python', 'Django']
		},
		{
			title: 'Verktyg',
			skills: ['Git', 'Vite']
		},
		{
			title: 'CMS',
			skills: ['Wagtail', 'WordPress', 'Umbraco']
		}
	],

	personal: [
		'När jag inte kodar hittar ni mig på gymmet, i köket eller på golvet där jag brottas ner av mina barn.'
	],

	contact: [
		{ kind: 'email', label: 'otto.reimers@gmail.com', href: 'mailto:otto.reimers@gmail.com' },
		{
			kind: 'linkedin',
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/otto-reimers-78ba3484/'
		},
		{ kind: 'github', label: 'GitHub', href: 'https://github.com/ottoreimers' }
	],

	photo: '/otto.jpg'
};
