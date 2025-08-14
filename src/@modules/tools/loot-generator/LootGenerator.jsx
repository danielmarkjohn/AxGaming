import React, { useState } from 'react'

export default function LootGenerator() {
  const [settings, setSettings] = useState({
    level: 'low',
    type: 'treasure',
    quantity: 5
  })
  const [generatedLoot, setGeneratedLoot] = useState([])

  const lootTables = {
    treasure: {
      low: [
        { name: 'Copper Coins', value: '2d10 cp', rarity: 'common' },
        { name: 'Silver Coins', value: '1d6 sp', rarity: 'common' },
        { name: 'Gold Coins', value: '1d4 gp', rarity: 'uncommon' },
        { name: 'Healing Potion', value: '50 gp', rarity: 'common' },
        { name: 'Torch', value: '2 cp', rarity: 'common' },
        { name: 'Rope (50 ft)', value: '2 gp', rarity: 'common' },
        { name: 'Rations (1 day)', value: '2 sp', rarity: 'common' },
        { name: 'Simple Weapon', value: '2-25 gp', rarity: 'common' },
        { name: 'Leather Armor', value: '10 gp', rarity: 'common' },
        { name: 'Shield', value: '10 gp', rarity: 'common' }
      ],
      medium: [
        { name: 'Gold Coins', value: '2d6 gp', rarity: 'common' },
        { name: 'Platinum Coins', value: '1d4 pp', rarity: 'uncommon' },
        { name: 'Magic Weapon +1', value: '500-1000 gp', rarity: 'uncommon' },
        { name: 'Magic Armor +1', value: '500-1000 gp', rarity: 'uncommon' },
        { name: 'Potion of Greater Healing', value: '150 gp', rarity: 'uncommon' },
        { name: 'Scroll of 2nd Level Spell', value: '150 gp', rarity: 'uncommon' },
        { name: 'Bag of Holding', value: '4000 gp', rarity: 'uncommon' },
        { name: 'Cloak of Protection', value: '3500 gp', rarity: 'uncommon' },
        { name: 'Ring of Protection', value: '3500 gp', rarity: 'uncommon' },
        { name: 'Wand of Magic Missiles', value: '8000 gp', rarity: 'uncommon' }
      ],
      high: [
        { name: 'Platinum Coins', value: '3d6 pp', rarity: 'common' },
        { name: 'Gems', value: '1000-5000 gp', rarity: 'uncommon' },
        { name: 'Magic Weapon +2', value: '5000-10000 gp', rarity: 'rare' },
        { name: 'Magic Armor +2', value: '5000-10000 gp', rarity: 'rare' },
        { name: 'Staff of Power', value: '95500 gp', rarity: 'very rare' },
        { name: 'Ring of Spell Storing', value: '24000 gp', rarity: 'rare' },
        { name: 'Robe of the Archmagi', value: '34000 gp', rarity: 'legendary' },
        { name: 'Holy Avenger', value: '165000 gp', rarity: 'legendary' },
        { name: 'Artifact Fragment', value: 'Priceless', rarity: 'legendary' },
        { name: 'Wish Scroll', value: '50000 gp', rarity: 'legendary' }
      ]
    },
    weapons: {
      low: [
        { name: 'Dagger', value: '2 gp', rarity: 'common' },
        { name: 'Shortsword', value: '10 gp', rarity: 'common' },
        { name: 'Mace', value: '5 gp', rarity: 'common' },
        { name: 'Spear', value: '1 gp', rarity: 'common' },
        { name: 'Light Crossbow', value: '25 gp', rarity: 'common' },
        { name: 'Handaxe', value: '5 gp', rarity: 'common' },
        { name: 'Javelin', value: '5 sp', rarity: 'common' },
        { name: 'Sling', value: '1 sp', rarity: 'common' }
      ],
      medium: [
        { name: 'Longsword +1', value: '1000 gp', rarity: 'uncommon' },
        { name: 'Battleaxe +1', value: '1000 gp', rarity: 'uncommon' },
        { name: 'Warhammer +1', value: '1000 gp', rarity: 'uncommon' },
        { name: 'Longbow +1', value: '1000 gp', rarity: 'uncommon' },
        { name: 'Flaming Sword', value: '2000 gp', rarity: 'uncommon' },
        { name: 'Frost Brand', value: '2600 gp', rarity: 'very rare' },
        { name: 'Vicious Weapon', value: '350 gp', rarity: 'rare' }
      ],
      high: [
        { name: 'Vorpal Sword', value: '24000 gp', rarity: 'legendary' },
        { name: 'Holy Avenger', value: '165000 gp', rarity: 'legendary' },
        { name: 'Defender', value: '23000 gp', rarity: 'legendary' },
        { name: 'Luck Blade', value: '61000 gp', rarity: 'legendary' },
        { name: 'Sword of Sharpness', value: '41000 gp', rarity: 'very rare' },
        { name: 'Oathbow', value: '3500 gp', rarity: 'very rare' }
      ]
    },
    armor: {
      low: [
        { name: 'Leather Armor', value: '10 gp', rarity: 'common' },
        { name: 'Studded Leather', value: '45 gp', rarity: 'common' },
        { name: 'Chain Shirt', value: '50 gp', rarity: 'common' },
        { name: 'Hide Armor', value: '10 gp', rarity: 'common' },
        { name: 'Scale Mail', value: '50 gp', rarity: 'common' },
        { name: 'Breastplate', value: '400 gp', rarity: 'common' },
        { name: 'Half Plate', value: '750 gp', rarity: 'common' }
      ],  
      medium: [
        { name: 'Ring Mail', value: '30 gp', rarity: 'common' },
        { name: 'Chain Mail', value: '75 gp', rarity: 'common' },   
        { name: 'Splint Mail', value: '200 gp', rarity: 'common' }, 
        { name: 'Plate Mail', value: '1500 gp', rarity: 'common' },
        { name: 'Shield of Deflection', value: '1000 gp', rarity: 'uncommon' },
        { name: 'Shield of Protection', value: '1000 gp', rarity: 'uncommon' }
      ],
      high: [
        { name: 'Shield of Reflection', value: '2000 gp', rarity: 'rare' },
        { name: 'Shield of Resistance', value: '2000 gp', rarity: 'rare' },
        { name: 'Shield of Warding', value: '2000 gp', rarity: 'rare' }
      ]
    }
  }

  const generateLoot = () => {    
    const table = lootTables[settings.type][settings.level]
    const loot = []
    
    for (let i = 0; i < settings.quantity; i++) {
      const item = table[Math.floor(Math.random() * table.length)]
      loot.push(item)
    }
    
    setGeneratedLoot(loot)
  }

  const copyLoot = async () => {
    if (generatedLoot.length === 0) {
      showNotification('No loot to copy', 'warning')
      return
    } 

    const lootText = generatedLoot.map(item => `${item.name} - ${item.value}`).join('\n')
    try {
      await navigator.clipboard.writeText(lootText)
      showNotification('Loot copied to clipboard!', 'success')
    } catch (error) {
      showNotification('Failed to copy loot', 'error')
    }
  }

  const downloadLoot = () => {
    if (generatedLoot.length === 0) {
      showNotification('No loot to download', 'warning')
      return
    }

    const lootText = generatedLoot.map(item => `${item.name} - ${item.value}`).join('\n')
    const blob = new Blob([lootText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob) 
    
    const a = document.createElement('a')
    a.href = url
    a.download = `loot-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    showNotification('Loot downloaded!', 'success')
  }

  const clearLoot = () => {
    setGeneratedLoot([])
    showNotification('Loot cleared!', 'success')
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Loot Generator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-muted mb-1">Type</label>
              <select
                value={settings.type}
                onChange={(e) => setSettings(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-surface panel-border rounded p-2"
              >
                <option value="treasure">Treasure</option>
                <option value="weapons">Weapons</option>
                <option value="armor">Armor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Level</label>
              <select
                value={settings.level}
                onChange={(e) => setSettings(prev => ({ ...prev, level: e.target.value }))}
                className="w-full bg-surface panel-border rounded p-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                max="100"
                value={settings.quantity}
                onChange={(e) => setSettings(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                className="w-full bg-surface panel-border rounded p-2"
              /></div>  
          </div>
          <div className="flex gap-2">
            <button
              onClick={generateLoot}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              🎲 Generate
            </button>
            <button
              onClick={copyLoot}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              📋 Copy
            </button>
            <button
              onClick={downloadLoot}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              💾 Download
            </button>
            <button
              onClick={clearLoot}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
        {generatedLoot.length > 0 && (
          <div className="panel panel-border p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Generated Loot</h3>
            <ul className="list-disc list-inside">
              {generatedLoot.map((item, i) => ( 
                <li key={i} className="mb-2">
                  {item.name} - {item.value} ({item.rarity})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}