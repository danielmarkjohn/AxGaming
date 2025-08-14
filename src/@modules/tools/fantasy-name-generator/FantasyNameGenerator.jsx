import React, { useState } from 'react'

export default function FantasyNameGenerator() {
  const [nameType, setNameType] = useState('human')
  const [gender, setGender] = useState('any')
  const [generatedNames, setGeneratedNames] = useState([])
  const [count, setCount] = useState(5)

  const nameData = {
    human: {
      male: {
        first: ['Aiden', 'Bran', 'Cael', 'Darius', 'Ewan', 'Finn', 'Gareth', 'Hale', 'Ivan', 'Joren', 'Kael', 'Liam', 'Magnus', 'Nolan', 'Owen', 'Pierce', 'Quinn', 'Rowan', 'Sean', 'Thane'],
        last: ['Blackwood', 'Stormwind', 'Ironforge', 'Goldleaf', 'Shadowmere', 'Brightblade', 'Darkbane', 'Swiftarrow', 'Strongarm', 'Lightbringer']
      },
      female: {
        first: ['Aria', 'Brenna', 'Cora', 'Diana', 'Elara', 'Fiona', 'Gwen', 'Hana', 'Iris', 'Jenna', 'Kira', 'Luna', 'Mira', 'Nora', 'Olivia', 'Piper', 'Quinn', 'Raven', 'Sera', 'Tara'],
        last: ['Blackwood', 'Stormwind', 'Ironforge', 'Goldleaf', 'Shadowmere', 'Brightblade', 'Darkbane', 'Swiftarrow', 'Strongarm', 'Lightbringer']
      }
    },
    elf: {
      male: {
        first: ['Aelindra', 'Beiro', 'Celeborn', 'Dain', 'Elrond', 'Faelar', 'Galinndan', 'Halimath', 'Ivellios', 'Jaelynn', 'Kythorn', 'Lamlis', 'Mindartis', 'Nutae', 'Otaehryn', 'Peren', 'Quarion', 'Riardon', 'Silvyr', 'Thamior'],
        last: ['Amakir', 'Amarthen', 'Bereris', 'Cithreth', 'Enna', 'Galinndan', 'Hadarai', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis', 'Naal', 'Nutae', 'Paelynn', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Silvyr', 'Suhnaal']
      },
      female: {
        first: ['Adrie', 'Birel', 'Caelynn', 'Dara', 'Enna', 'Galinndan', 'Halimath', 'Immeral', 'Ivellios', 'Korfel', 'Lamlis', 'Mindartis', 'Naal', 'Nutae', 'Paelynn', 'Peren', 'Quarion', 'Riardon', 'Silvyr', 'Suhnaal'],
        last: ['Amakir', 'Amarthen', 'Bereris', 'Cithreth', 'Enna', 'Galinndan', 'Hadarai', 'Immeral', 'Ivellios', 'Laucian', 'Mindartis', 'Naal', 'Nutae', 'Paelynn', 'Peren', 'Quarion', 'Riardon', 'Rolen', 'Silvyr', 'Suhnaal']
      }
    },
    dwarf: {
      male: {
        first: ['Adrik', 'Baern', 'Darrak', 'Eberk', 'Fargrim', 'Gardain', 'Harbek', 'Kildrak', 'Morgran', 'Orsik', 'Rangrim', 'Taklinn', 'Thorek', 'Ulfgar', 'Vondal'],
        last: ['Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
      },
      female: {
        first: ['Amber', 'Bardryn', 'Diesa', 'Eldeth', 'Gunnloda', 'Gwyn', 'Helja', 'Hlin', 'Kathra', 'Kristryd', 'Ilde', 'Liftrasa', 'Mardred', 'Riswynn', 'Sannl', 'Torbera', 'Torgga', 'Vistra'],
        last: ['Battlehammer', 'Brawnanvil', 'Dankil', 'Fireforge', 'Frostbeard', 'Gorunn', 'Holderhek', 'Ironfist', 'Loderr', 'Lutgehr', 'Rumnaheim', 'Strakeln', 'Torunn', 'Ungart']
      }
    },
    orc: {
      male: {
        first: ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth', 'Krusk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Trag', 'Ugor', 'Varg'],
        last: ['Bloodfang', 'Ironskull', 'Bonecrusher', 'Grimaxe', 'Blacktooth', 'Redfist', 'Skullsplitter', 'Warbringer', 'Doomhammer', 'Goretusk']
      },
      female: {
        first: ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Sutha', 'Vola', 'Volen', 'Yevelda'],
        last: ['Bloodfang', 'Ironskull', 'Bonecrusher', 'Grimaxe', 'Blacktooth', 'Redfist', 'Skullsplitter', 'Warbringer', 'Doomhammer', 'Goretusk']
      }
    }
  }

  const generateNames = () => {
    const names = []
    const raceData = nameData[nameType]
    
    for (let i = 0; i < count; i++) {
      let selectedGender = gender
      if (gender === 'any') {
        selectedGender = Math.random() < 0.5 ? 'male' : 'female'
      }
      
      const genderData = raceData[selectedGender]
      const firstName = genderData.first[Math.floor(Math.random() * genderData.first.length)]
      const lastName = genderData.last[Math.floor(Math.random() * genderData.last.length)]
      
      names.push({
        full: `${firstName} ${lastName}`,
        first: firstName,
        last: lastName,
        gender: selectedGender,
        race: nameType
      })
    }
    
    setGeneratedNames(names)
  }

  const copyName = (name) => {
    navigator.clipboard.writeText(name)
  }

  const raceOptions = [
    { value: 'human', label: 'Human' },
    { value: 'elf', label: 'Elf' },
    { value: 'dwarf', label: 'Dwarf' },
    { value: 'orc', label: 'Orc' }
  ]

  const genderOptions = [
    { value: 'any', label: 'Any' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Fantasy Name Generator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-muted mb-1">Race</label>
              <select
                value={nameType}
                onChange={(e) => setNameType(e.target.value)}
                className="w-full bg-surface panel-border rounded p-2"
              >
                {raceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-muted mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-surface panel-border rounded p-2"
              >
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-muted mb-1">Count</label>
              <input
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 5)}
                className="w-full bg-surface panel-border rounded p-2"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={generateNames}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors font-semibold"
              >
                Generate Names
              </button>
            </div>
          </div>
        </div>

        {generatedNames.length > 0 && (
          <div className="panel panel-border p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Generated Names</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generatedNames.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-surface panel-border rounded hover:border-white/30 transition-colors"
                >
                  <div>
                    <div className="font-semibold">{name.full}</div>
                    <div className="text-sm text-muted capitalize">
                      {name.race} • {name.gender}
                    </div>
                  </div>
                  <button
                    onClick={() => copyName(name.full)}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                    title="Copy to clipboard"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">About Fantasy Names</h3>
          <p className="text-sm text-muted">
            This generator creates names suitable for fantasy RPGs, novels, and games. 
            Each race has culturally appropriate naming conventions:
          </p>
          <ul className="text-sm text-muted mt-2 space-y-1">
            <li><strong>Human:</strong> Traditional fantasy names with descriptive surnames</li>
            <li><strong>Elf:</strong> Flowing, melodic names with nature-inspired elements</li>
            <li><strong>Dwarf:</strong> Strong, consonant-heavy names with clan surnames</li>
            <li><strong>Orc:</strong> Harsh, guttural names with intimidating surnames</li>
          </ul>
        </div>
      </div>
    </div>
  )
}