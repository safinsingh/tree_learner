import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { FormattedMindTree } from 'tree_learner';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type FlattenedMindTreeNode = FormattedMindTree & { depth: number };

export function flattenMindTree(tree: FormattedMindTree, depth = 0): FlattenedMindTreeNode[] {
	const deepNode = { ...tree, depth };
	let nodes: FlattenedMindTreeNode[] = [deepNode];

	if ('sections' in tree) {
		for (const section of tree.sections) {
			const childNodes = flattenMindTree({ ...section }, depth + 1);
			nodes = nodes.concat(childNodes);
		}
	}

	return nodes;
}
