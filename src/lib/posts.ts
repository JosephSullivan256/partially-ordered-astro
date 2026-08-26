import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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

export const posts: Post[] = [
  { slug: 'de-rham', title: 'De Rham’s Theorem', date: 'December 2023', excerpt: 'De Rham’s theorem provides an important connection between topology and smooth manifolds: de Rham cohomology is real singular cohomology, with the isomorphism given by integration.', tags: ['Topology'] },
  { slug: 'covering-spaces', title: 'Covering Spaces', date: 'August 2022', excerpt: 'Covering spaces are a cool thing in topology. Finding covering spaces is like unwrapping a topological space, with intimate connections to the fundamental group.', tags: ['Topology'] },
  { slug: 'nullstellensatz', title: 'Nullstellensatz', date: 'July 2022', excerpt: 'Hilbert’s Nullstellensatz bridges algebra and geometry. This article develops commutative algebra before arriving at a proof.', tags: ['Algebra'] },
  { slug: 'sylow', title: 'Sylow Theorems', date: 'December 2021', excerpt: 'The Sylow Theorems are fundamental to finite groups. We build toward their proof through group actions, existence, and conjugation.', tags: ['Algebra'] },
  { slug: 'products-and-coproducts', title: 'Products and Coproducts', date: 'December 2021', excerpt: 'We get our feet wet in category theory through universal properties, examples, and the uniqueness of products and coproducts.', tags: ['Category Theory'] },
  { slug: 'modules-over-pids', title: 'FTFGMPID', date: 'October 2021', excerpt: 'The Fundamental Theorem of Finitely Generated Modules over a PID quickly gives the classification of finitely generated abelian groups and Jordan normal form.', tags: ['Algebra'] },
  { slug: 'relations-well-foundedness-and-noetherian-induction', title: 'Relations, Well-Foundedness, and Noetherian Induction', date: 'August 2020', excerpt: 'What exactly does induction require? We generalize the natural numbers with well-founded relations, and correspondingly generalize induction.', tags: ['Foundations'] },
];

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
  if (!match) throw new Error(`Could not extract article content for ${slug}`);
  return match[1].replace(/src="(?!https?:|\/)([^"]+)"/g, 'src="/posts/$1"');
}
