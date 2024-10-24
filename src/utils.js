/*
Elf

id
name
excludes
santa to
list


List

id
link
notes


*/

const data = [
    {
        "id": "1111",
        "name": "Sarah",
        "excludes": ["9999"],
        "santaTo": "2222"
    },
    {
        "id": "2222",
        "name": "David",
        "excludes": [],
        "santaTo": "1111"
    }

]

const sampleList = [
    {
        "id": "aa",
        "link": "https://www.amazon.com/STA-BIL-22214-Fuel-Stabilizer-Fluid_Ounces/dp/B000B68V6I",
        "notes": "It's oil"
    },
    {
        "id": "bb",
        "link": "https://chipotle.com"
    }
]


function init() {
    data.forEach(d => {
        if(!localStorage.getItem(d.id)) {
            localStorage.setItem(d.id, JSON.stringify(sampleList))
        }

    })
}

function getListForElf(id) {
    let list = []
    const rawList = localStorage.getItem(id)

    if(rawList) {
        list = JSON.parse(rawList)
    }

    return list
    
}

export function getElf(id) {

    let elf = null
    const elves = data.filter(e => e.id === id)

    if(elves.length > 0) {

        elf = elves[0]

        elf.list = getListForElf(elf.id)

        const santaObjects = data.filter(d => d.id === elf.santaTo);

        if(santaObjects.length > 0) {
            elf.santaToObject = santaObjects[0]
            elf.santaToObject.list = getListForElf(elf.santaToObject.id)
        }

    } 
    return elf
}

export function deleteListItem(elfId, listItemId) {
    const list = getListForElf(elfId);

    const newList = list.filter(e => e.id !== listItemId);

    localStorage.setItem(elfId, JSON.stringify(newList))


}

// export function saveList(id, list) {
//     localStorage.setItem('items', JSON.stringify(items));
// }

init()