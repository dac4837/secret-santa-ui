import axios from "axios";


async function getListForElf(id) {

    try {
        const response = await axios.get('/elfList/' + id);

        console.log(response)
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data ? error.response.data : `Error getting elf ${id}`;
        console.error(errorMessage);

        throw new Error("Error getting elf. Do you have the right url?");
    }
}

export async function getElf(id) {
    try {
        const response = await axios.get('/elf/' + id);

        return response.data

    } catch (error) {
        const errorMessage = error?.response?.data ? error.response.data : `Error getting elf ${id}`;
        console.error(errorMessage);

        throw new Error("Error getting elf.");
    }
    
}

export async function deleteListItem(elfId, listItemId) {
    const list = await getListForElf(elfId);

    const newList = list.filter(e => e.id !== listItemId);

    saveListForElf(elfId, newList)

}

export async function saveListForElf(id, list) {
    try {
        await axios.put('/elfList/' + id, list);

        return await getListForElf(id)
    } catch (error) {
        const errorMessage = error?.response?.data ? error.response.data : `Error getting elf ${id}`;
        console.error(errorMessage);

        throw new Error("Error saving elf list");
    }

}