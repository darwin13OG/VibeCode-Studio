/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';
import scanPosBanner from '../assets/images/scan_pos_preview_1790120288719.jpg';
import focusWaveBanner from '../assets/images/focus_wave_preview_1790173931038.jpg';
import cotizadorExpresBanner from '../assets/images/cotizador_expres_banner.jpg';
import cotizadorExpresIcon from '../assets/images/cotizador_expres_icon.png';
import codeWaveBanner from '../assets/images/code_wave_banner.jpg';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'code-wave',
    name: 'Code Wave',
    repoName: 'Code-View-AI-',
    githubUrl: 'https://github.com/darwin13OG/Code-View-AI-',
    cloudflareUrl: 'https://code-wave.pages.dev',
    category: 'Diseño UX/UI',
    description: 'Showcase interactivo de diseño UX/UI, componentes avanzados y microinteracciones fluidas creado para demostrar mis habilidades como Vibecoder y atraer contrataciones en Workana.',
    whatItsUsedFor: 'Sirve como carta de presentación interactiva para clientes en Workana que buscan contratarme como Vibecoder. Permite explorar y probar en vivo demos de interfaces modernas (checkout 3D, barras líquidas, docks paramétricos, tarjetas holográficas, switches cyberpunk y animaciones táctiles) demostrando dominio visual y técnico.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Spline 3D', 'Vite', 'Cloudflare Pages'],
    iconType: 'codewave',
    bannerUrl: codeWaveBanner,
  },
  {
    id: 'cotizador-expres',
    name: 'Cotizador Exprés',
    repoName: 'cotizador-expres',
    githubUrl: 'https://github.com/darwin13OG/cotizador-expres',
    cloudflareUrl: 'https://cotizador-expres.pages.dev',
    category: 'Herramientas',
    description: 'Generador ágil de cotizaciones y presupuestos profesionales en PDF, con cálculo automático por unidad o jornal, logotipo propio y envío directo por WhatsApp.',
    whatItsUsedFor: 'Diseñado para técnicos, independientes y negocios de servicios que necesitan armar presupuestos claros en segundos desde el celular o PC. Permite detallar conceptos o días de trabajo, definir días de vigencia, incluir cláusulas de garantía, guardar historial local y exportar un PDF listo para compartir con el cliente.',
    techStack: ['HTML5', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'jsPDF', 'Cloudflare Pages'],
    faviconUrl: cotizadorExpresIcon,
    bannerUrl: cotizadorExpresBanner,
  },
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
  }
];
