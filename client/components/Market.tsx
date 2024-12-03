import { useState, useEffect } from 'react'
import { Mushrooms } from '@game/scenes/Mushrooms'
import { InventoryItem, ShopInventory } from '@interfaces'

const initialShopInventory: ShopInventory = [
  {
    item: {
      name: 'Lovers Redcap',
      img: '/assets/item_red_mushroom.png',
      type: 'Cap',
      description: 'It do be a cap doe',
      value: 200,
    },
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]

export default function Market({ sceneData }: { sceneData: Mushrooms | null }) {
  const [scene, setScene] = useState<Mushrooms | null>(null)
  const [money, setMoney] = useState<number>(0)
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [shop, setShop] = useState(initialShopInventory)
  const [slotIndex, setSlotIndex] = useState<number | null>(null)
  const [shopSlotIndex, setShopSlotIndex] = useState<number | null>(null)

  useEffect(() => {
    setScene(sceneData)

    const inventoryData = scene?.registry.get('inventory')
    if (inventoryData) {
      const length = inventoryData.length
      for (let i = 0; i < 30 - length; i++) inventoryData.push(null)
      setInventory(inventoryData)
    }

    const money = scene?.registry.get('money')
    if (money) setMoney(money)
  }, [sceneData, scene])

  const handleSell = () => {
    if (slotIndex === null || inventory[slotIndex] === null) return

    // Removing quantity of the item by one
    inventory[slotIndex].quantity--
    // Setting new money value globally
    setMoney(money + inventory[slotIndex].item.value)
    scene?.events.emit('registry:add-money', inventory[slotIndex].item.value)
    // And now if quantity is 0 - removing it from the array and updating it
    if (inventory[slotIndex].quantity === 0) inventory[slotIndex] = null
    setInventory([...inventory])
  }

  const handleBuy = () => {
    if (
      shopSlotIndex === null ||
      shop[shopSlotIndex] === null ||
      shop[shopSlotIndex].item.value > money
    ) {
      return
    }

    const shopItem = shop[shopSlotIndex]
    const emptySlotIndex = inventory.findIndex((slot) => slot === null)
    const existingSlotIndex = inventory.findIndex(
      (slot) => slot?.item.name === shopItem.item.name,
    )
    console.log(existingSlotIndex)
    console.log(inventory[existingSlotIndex])
    if (existingSlotIndex >= 0 && inventory[existingSlotIndex] !== null) {
      console.log('Adding to existent')
      inventory[existingSlotIndex].quantity++
    } else if (inventory[emptySlotIndex]) {
      console.log('Adding new')
      inventory[emptySlotIndex].quantity = 1
    }
    setInventory([...inventory])
    setMoney(money - shop[shopSlotIndex].item.value)
    scene?.events.emit(
      'registry:subtract-money',
      shop[shopSlotIndex].item.value,
    )
  }

  return (
    <div className="flex h-[800px] w-[1300px] flex-col rounded-2xl bg-white bg-contain p-6 pl-14">
      <div className="flex justify-evenly pb-6">
        <button
          className="border-grey-300 rounded border p-1 shadow"
          onClick={handleSell}
        >
          Sell
        </button>

        <div>Cash: ${money}</div>

        <button
          className="border-grey-300 rounded border p-1 shadow"
          onClick={handleBuy}
        >
          Buy
        </button>
      </div>

      <div className="flex flex-row">
        <div className="w-500 mr-14 flex flex-wrap gap-3 rounded-2xl">
          {inventory &&
            inventory.map((item, index) => (
              <button
                key={index}
                className="flex h-28 w-28 flex-row flex-wrap items-start justify-center rounded border border-gray-300 bg-white shadow transition hover:bg-gray-100 focus:border-red-700"
                onClick={() => setSlotIndex(index)}
              >
                <img
                  src={item?.item.img}
                  alt=""
                  className="h-24 translate-x-2"
                />
                <div className="bg-yellow-500">{item?.quantity}</div>
                {item?.item && (
                  <div className="rounded-lg bg-green-500 pl-2 pr-2">
                    {item.item.value}
                  </div>
                )}
              </button>
            ))}
        </div>
        <div className="w-400 flex flex-wrap gap-3 rounded-2xl">
          {shop.map((item, index) => (
            <button
              key={index}
              className="flex h-28 w-28 items-center justify-center rounded border border-gray-300 bg-white shadow transition hover:bg-gray-100 focus:border-red-700"
              onClick={() => setShopSlotIndex(index)}
            >
              <img
                src={item?.item.img}
                alt=""
                className="size-24 translate-x-2"
              />
              {item?.item && (
                <div className="rounded-lg bg-green-500 pl-2 pr-2">
                  {item.item.value}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
