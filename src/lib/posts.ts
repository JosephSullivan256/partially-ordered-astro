import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { generatedPosts } from './generated-posts';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface PostTag {
  name: string;
  slug: string;
}

const unsortedPosts: Post[] = [
  ...generatedPosts,
  { slug: 'de-rham', title: 'De Rham’s Theorem', date: 'December 2023', excerpt: 'De Rham’s theorem provides an important connection between topology and smooth manifolds: de Rham cohomology is real singular cohomology, with the isomorphism given by integration.', tags: ['Topology'] },
  { slug: 'covering-spaces', title: 'Covering Spaces', date: 'August 2022', excerpt: 'Covering spaces are a cool thing in topology. Finding covering spaces is like unwrapping a topological space, with intimate connections to the fundamental group.', tags: ['Topology'] },
  { slug: 'sylow', title: 'Sylow Theorems', date: 'December 2021', excerpt: 'The Sylow Theorems are fundamental to finite groups. We build toward their proof through group actions, existence, and conjugation.', tags: ['Algebra'] },
  { slug: 'products-and-coproducts', title: 'Products and Coproducts', date: 'December 2021', excerpt: 'We get our feet wet in category theory through universal properties, examples, and the uniqueness of products and coproducts.', tags: ['Category Theory'] },
  { slug: 'modules-over-pids', title: 'FTFGMPID', date: 'October 2021', excerpt: 'The Fundamental Theorem of Finitely Generated Modules over a PID quickly gives the classification of finitely generated abelian groups and Jordan normal form.', tags: ['Algebra'] },
  { slug: 'relations-well-foundedness-and-noetherian-induction', title: 'Relations, Well-Foundedness, and Noetherian Induction', date: 'August 2020', excerpt: 'What exactly does induction require? We generalize the natural numbers with well-founded relations, and correspondingly generalize induction.', tags: ['Foundations'] },
];

function dateValue(date: string) {
  return Date.parse(`${date} 1`);
}

// A blog is conventionally shown newest first, while still using the actual
// publication date as the sole ordering key.
export const posts = unsortedPosts.toSorted((left, right) => dateValue(right.date) - dateValue(left.date));

export const featuredPosts = posts.slice(0, 3);

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const tags: PostTag[] = [...new Set(posts.flatMap((post) => post.tags))]
  .map((name) => ({ name, slug: tagSlug(name) }));

export function postsForTag(tag: PostTag) {
  return posts.filter((post) => post.tags.includes(tag.name));
}

export function articleHtml(slug: string) {
  const source = readFileSync(join(process.cwd(), 'src', 'article-source', 'posts', `${slug}.html`), 'utf8');
  const match = source.match(/<div class="content serif reading-margins">([\s\S]*?)<\/div>\s*<\/section>\s*<footer/);
  const article = match ? match[1] : source;

  // Pandoc occasionally emits `\left\langlex` without a token boundary after
  // `\langle`. TeX reads that as the nonexistent command `\langlex`, leaving
  // MathJax without a delimiter for `\left`.
  return article
    .replace(/src="(?!https?:|\/)([^"]+)"/g, 'src="/posts/$1"')
    .replace(/\\left\\langle(?=[A-Za-z])/g, '\\left\\langle ')
    // Text-style operators keep graded superscripts beside their names;
    // MathJax gives \mathop and \operatorname display-style limits.
    .replace(/\\mathop\{\\mathrm\{([A-Za-z]+)\}\}/g, '\\mathrm{$1}')
    .replace(/\\operatorname\{([A-Za-z]+)\}/g, '\\mathrm{$1}');
}
