/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';
import scanPosBanner from '../assets/images/scan_pos_preview_1790120288719.jpg';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'scan-pos',
    name: 'Scan POS',
    repoName: 'Scan-POS',
    githubUrl: 'https://github.com/darwin13OG/Scan-POS',
    cloudflareUrl: 'https://scanpos.pages.dev',
    category: 'Herramientas',
    description: 'Punto de Venta (POS) web ágil y ligero para navegadores móviles y de escritorio. Escanea códigos de barras con la cámara, gestiona inventario en tiempo real y emite tickets digitales.',
    whatItsUsedFor: 'Ideal para comercios, tiendas retail y emprendedores que necesitan registrar ventas, control de productos y escaneo de códigos de barra sin depender de equipos o software costosos.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'Cloudflare Pages'],
    iconType: 'scanner',
    bannerUrl: scanPosBanner,
    updatedDate: 'Reciente',
  }
];
