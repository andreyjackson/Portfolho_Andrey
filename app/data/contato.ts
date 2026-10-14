import { links, perfil } from './perfil'
import type { InfoContato, LinkContato } from './tipos'

/** Botões da seção de contato. A ordem aqui é a ordem na tela. */
export const linksContato: LinkContato[] = [
  { rotulo: 'LinkedIn', icone: 'i-simple-icons-linkedin', url: links.linkedin },
  { rotulo: 'GitHub', icone: 'i-simple-icons-github', url: links.github },
  { rotulo: 'WhatsApp', icone: 'i-simple-icons-whatsapp', url: links.whatsapp },
  { rotulo: { pt: 'E-mail', en: 'Email' }, icone: 'i-lucide-mail', url: links.email },
]

/** Informações exibidas como texto acima dos botões. Apague uma linha para tirá-la do site. */
export const infosContato: InfoContato[] = [
  { icone: 'i-lucide-mail', descricao: { pt: 'E-mail', en: 'Email' }, texto: perfil.email },
  { icone: 'i-lucide-phone', descricao: { pt: 'Celular e WhatsApp', en: 'Phone and WhatsApp' }, texto: perfil.telefone },
  { icone: 'i-lucide-map-pin', descricao: { pt: 'Localização', en: 'Location' }, texto: perfil.localizacao },
]
