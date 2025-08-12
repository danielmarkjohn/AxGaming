
import { TOOLS_CONFIG } from '../@config/tools'
import { GAMES_CONFIG } from '../@config/games'
import { Gamepad2, Wrench } from 'lucide-react'

export const categories = [
    {
      id: 'games',
      title: 'Games',
      desc: 'Launch & play your favorite games',
      icon: Gamepad2,
      color: 'from-blue-600 to-purple-600',
      count: GAMES_CONFIG.length
    },
    {
      id: 'tools',
      title: 'Tools',
      desc: 'Productivity & utility applications',
      icon: Wrench,
      color: 'from-green-600 to-teal-600',
      count: TOOLS_CONFIG.length
    }
  ];
