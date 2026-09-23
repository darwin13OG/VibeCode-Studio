/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';
import scanPosBanner from '../assets/images/scan_pos_preview_1790120288719.jpg';
import focusWaveBanner from '../assets/images/focus_wave_preview_1790173931038.jpg';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'focus-wave',
    name: 'Focus Wave',
    repoName: 'focus-wave',
    githubUrl: 'https://github.com/darwin13OG/focus-wave',
    cloudflareUrl: 'https://focus-wave.pages.dev',
    category: 'Productividad',
    description: 'Espacio inmersivo de sonidos relajantes para concentración y calma: lluvia, viento, trueno, cafetería, temporizador Pomodoro, lista de tareas y respiración guiada.',
    whatItsUsedFor: 'Diseñado para potenciar el enfoque profundo y la serenidad mental mientras trabajas o estudias. Permite combinar generadores de audio ambiental, organizar tus pendientes y realizar ejercicios de respiración consciente.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Vite', 'Cloudflare Pages'],
    iconType: 'waves',
    bannerUrl: focusWaveBanner,
    updatedDate: 'Nuevo',
  },
  {
    id: 'scan-pos',
    name: 'Scan POS',
    repoName: 'Scan-POS',
    githubUrl: 'https://github.com/darwin13OG/Scan-POS',
    cloudflareUrl: 'https://scan-pos.pages.dev',
    category: 'Herramientas',
    description: 'Punto de Venta (POS) web ágil y ligero para navegadores móviles y de escritorio. Escanea códigos de barras con la cámara, gestiona inventario en tiempo real y emite tickets digitales.',
    whatItsUsedFor: 'Ideal para comercios, tiendas retail y emprendedores que necesitan registrar ventas, control de productos y escaneo de códigos de barra sin depender de equipos o software costosos.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5', 'Cloudflare Pages'],
    iconType: 'scanner',
    bannerUrl: scanPosBanner,
    updatedDate: 'Reciente',
  }
];
