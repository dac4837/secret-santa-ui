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
        "santaTo": "2222",
        "list": [
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
    },
    {
        "id": "2222",
        "name": "David",
        "excludes": [],
        "santaTo": "1111",
        "list": [
        ]
    }

]

export function getElf(id) {

    let elf = null
    const elves = data.filter(e => e.id === id)

    if(elves.length > 0) {

        elf = elves[0]

        const santaObjects = data.filter(d => d.id === elf.santaTo);

        if(santaObjects.length > 0) {
            elf.santaToObject = santaObjects[0]
        }

    } 
    return elf
}