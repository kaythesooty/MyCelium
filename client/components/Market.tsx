import { useState } from 'react'
import { Inventory, Item, ShopInventory } from '@models/inventory'

const playerInventory: Inventory = [
  {
    item: {
      name: 'Lovers Redcap',
      img: '/assets/red_mushroom_item.png',
      type: 'Cap',
      value: 10,
      description: 'It do be a cap doe',
    },
    quantity: 20,
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
  null,
]

const initialShopInventory: ShopInventory = [
  {
    item: {
      name: 'Lovers Redcap',
      img: '/assets/red_mushroom_item.png',
      type: 'Cap',
      value: 10,
      description: 'It do be a cap doe',
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

export default function Market() {
  const [inventory, setInventory] = useState(playerInventory)
  const [shopInventory, setShopInventory] = useState(initialShopInventory)

  const [selectedInventorySlot, setSelectedInventorySlot] = useState<
    number | null
  >() // State to hold tile data
  const [selectedShopSlot, setSelectedShopSlot] = useState<number | null>(null) // State to track the selected slot

  const handleInventorySlotClick = (slot: number) => {
    setSelectedInventorySlot(slot) // Set the selected tile to display inventory data
  }

  const handleShopSlotClick = (slot: number) => {
    setSelectedShopSlot(slot)
  }

  const handleSell = (selectedInventorySlot: number) => {
    const newInventory: Inventory = inventory.map((slot, index) => {
      if (slot === null || slot === undefined) return null
      else if (index !== selectedInventorySlot) {
        return slot
      } else if (slot.quantity > 1) {
        slot.quantity -= 1
        return slot
      } else {
        return null
      }
    })
    setInventory(newInventory)
  }
  const handleBuy = (selectedItem: Item) => {
    const newInventory = [...inventory]
    const emptySlot = newInventory.findIndex((slot) => slot === null)
    if (newInventory.some((item) => item?.item.name === selectedItem.name)) {
      console.log('Hello!')
      const itemSlotIndex = newInventory.findIndex(
        (item) => selectedItem.name === item?.item.name,
      )
      newInventory[itemSlotIndex]!.quantity += 1
    } else if (emptySlot !== -1) {
      newInventory[emptySlot] = {
        item: selectedItem,
        quantity: 1,
      }
    }
    setInventory(newInventory)
  }
  return (
    <div className="flex h-[800px] w-[1300px] flex-col rounded-2xl bg-white bg-contain p-6 pl-14">
      <div className="flex justify-evenly pb-6">
        <button
          className="border-grey-300 rounded border p-1 shadow"
          onClick={() => {
            {
              typeof selectedInventorySlot === 'number' &&
                handleSell(selectedInventorySlot)
            }
          }}
        >
          Sell
        </button>
        <div>Cash: 73</div>
        <button
          className="border-grey-300 rounded border p-1 shadow"
          onClick={() => {
            {
              typeof selectedShopSlot === 'number' &&
                shopInventory[selectedShopSlot] !== null &&
                handleBuy(shopInventory[selectedShopSlot].item)
            }
          }}
        >
          Buy
        </button>
      </div>
      <div className="flex flex-row">
        <div className="w-500 mr-14 flex flex-wrap gap-3 rounded-2xl">
          {inventory.map((item, index) => (
            <button
              key={index}
              className="flex h-28 w-28 flex-row flex-wrap items-start justify-center rounded border border-gray-300 bg-white shadow transition hover:bg-gray-100 focus:border-red-700"
              onClick={() => handleInventorySlotClick(index)}
            >
              <img src={item?.item.img} alt="" className="h-24 translate-x-2" />
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
          {shopInventory.map((item, index) => (
            <button
              key={index}
              className="flex h-28 w-28 items-center justify-center rounded border border-gray-300 bg-white shadow transition hover:bg-gray-100 focus:border-red-700"
              onClick={() => handleShopSlotClick(index)}
            >
              <img src={item?.item.img} alt="" className="h-24 translate-x-2" />
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
