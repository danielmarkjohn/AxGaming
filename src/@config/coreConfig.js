
import { TOOLS_CONFIG } from '../@config/tools'
import { Wrench } from 'lucide-react'

export const categories = [
    {
      id: 'tools',
      title: 'Tools',
      desc: 'Productivity & utility applications',
      icon: Wrench,
      color: 'from-green-600 to-teal-600',
      count: TOOLS_CONFIG.length
    }
  ];
