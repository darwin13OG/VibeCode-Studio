/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectCategory = 'Todas' | 'Herramientas' | 'Finanzas' | 'Productividad' | 'Utilidades' | 'Dev';

export interface Project {
  id: string;
  name: string;
  repoName: string; // e.g. "Scan-POS"
  githubUrl: string; // https://github.com/darwin13OG/Scan-POS
  cloudflareUrl: string; // https://scanpos.pages.dev
  description: string;
  whatItsUsedFor: string;
  category: string;
  techStack: string[];
  faviconUrl?: string;
  iconType?: 'scanner' | 'fintech' | 'waves' | 'custom' | 'auto';
  iconSvg?: string;
  bannerUrl?: string;
  updatedDate?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'favorite';
}
