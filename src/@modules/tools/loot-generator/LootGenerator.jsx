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
        { name: 'Chain Shirt', value: '50 gp', rarity: '